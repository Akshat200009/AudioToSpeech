package com.AudiotoSpeech.Controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.AudiotoSpeech.DTO.SpeechResponse;
import com.AudiotoSpeech.Entities.Transcription;
import com.AudiotoSpeech.Services.SpeechService;
import org.springframework.http.ResponseEntity;

@RestController
public class AudioController {
	
	@Autowired
	private SpeechService speechService;

    private final String UPLOAD_DIR =
            System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAudio(
            @RequestParam("file") MultipartFile file) {

        if(file.isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Please select a file");
        }

        if(!file.getContentType().startsWith("audio/")) {

            return ResponseEntity.badRequest()
                    .body("Only audio files are allowed");
        }

        try {

            File uploadFolder = new File(UPLOAD_DIR);

            if(!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            String fileName = file.getOriginalFilename();

            File destinationFile =
                    new File(UPLOAD_DIR + fileName);

            file.transferTo(destinationFile);

            return ResponseEntity.ok(
                    "File Uploaded Successfully : " + fileName);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("File Upload Failed");
        }
    }
    
    @PostMapping("/speech-to-text")
    public SpeechResponse convertSpeechToText(
            @RequestParam("file") MultipartFile file) {

        String transcript =
                speechService.convertSpeechToText(file);

        return new SpeechResponse(transcript);
    }
    @GetMapping("/history")
    public List<Transcription> getHistory() {

        return speechService.getAllTranscriptions();
    }
}