package com.AudiotoSpeech.Services;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.AudiotoSpeech.Entities.Transcription;
import com.AudiotoSpeech.Repository.TranscriptionRepository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SpeechService {

    @Autowired
    private TranscriptionRepository transcriptionRepository;

    @Value("${assemblyai.api.key}")
    private String apiKey;

    public String convertSpeechToText(
            MultipartFile file
    ) {

        try {

            File convFile =
                    new File(
                            file.getOriginalFilename()
                    );

            FileOutputStream fos =
                    new FileOutputStream(convFile);

            fos.write(file.getBytes());

            fos.close();

            RestTemplate restTemplate =
                    new RestTemplate();

            ObjectMapper objectMapper =
                    new ObjectMapper();

            HttpHeaders headers =
                    new HttpHeaders();

            headers.set(
                    "authorization",
                    apiKey
            );

            headers.setContentType(
                    MediaType.APPLICATION_OCTET_STREAM
            );

            HttpEntity<byte[]> request =
                    new HttpEntity<>(

                            Files.readAllBytes(
                                    convFile.toPath()
                            ),

                            headers
                    );

            ResponseEntity<String> uploadResponse =
                    restTemplate.postForEntity(

                            "https://api.assemblyai.com/v2/upload",

                            request,

                            String.class
                    );

            JsonNode uploadJson =
                    objectMapper.readTree(
                            uploadResponse.getBody()
                    );

            String uploadUrl =
                    uploadJson.get("upload_url")
                            .asText();

            String jsonBody =
                    "{ \"audio_url\": \"" +
                            uploadUrl +
                            "\", \"speech_models\": [\"universal-2\"] }";

            HttpHeaders transcriptHeaders =
                    new HttpHeaders();

            transcriptHeaders.set(
                    "authorization",
                    apiKey
            );

            transcriptHeaders.setContentType(
                    MediaType.APPLICATION_JSON
            );

            HttpEntity<String> transcriptRequest =
                    new HttpEntity<>(

                            jsonBody,

                            transcriptHeaders
                    );

            ResponseEntity<String> transcriptResponse =
                    restTemplate.postForEntity(

                            "https://api.assemblyai.com/v2/transcript",

                            transcriptRequest,

                            String.class
                    );

            JsonNode transcriptJson =
                    objectMapper.readTree(
                            transcriptResponse.getBody()
                    );

            String transcriptId =
                    transcriptJson.get("id")
                            .asText();

            String pollingEndpoint =
                    "https://api.assemblyai.com/v2/transcript/"
                            + transcriptId;

            while (true) {

                HttpEntity<String> pollingEntity =
                        new HttpEntity<>(
                                transcriptHeaders
                        );

                ResponseEntity<String> pollingResponse =
                        restTemplate.exchange(

                                pollingEndpoint,

                                HttpMethod.GET,

                                pollingEntity,

                                String.class
                        );

                JsonNode pollingJson =
                        objectMapper.readTree(
                                pollingResponse.getBody()
                        );

                String status =
                        pollingJson.get("status")
                                .asText();

                System.out.println(status);

                if (status.equals("completed")) {

                    String transcript =
                            pollingJson.get("text")
                                    .asText();

                    Transcription transcription =
                            new Transcription();

                    transcription.setAudioFileName(
                            file.getOriginalFilename()
                    );

                    transcription.setTranscript(
                            transcript
                    );

                    transcription.setCreatedAt(
                            LocalDateTime.now()
                                    .toString()
                    );

                    transcriptionRepository.save(
                            transcription
                    );

                    return transcript;
                }

                else if (status.equals("error")) {

                    return "Transcription Failed";
                }

                Thread.sleep(3000);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return "Error while processing audio";
        }
    }

    public List<Transcription>
    getAllTranscriptions() {

        return transcriptionRepository.findAll();
    }
}