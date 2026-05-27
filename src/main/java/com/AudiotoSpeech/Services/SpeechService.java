package com.AudiotoSpeech.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.AudiotoSpeech.Entities.Transcription;
import com.AudiotoSpeech.Repository.TranscriptionRepository;

@Service
public class SpeechService {

    @Autowired
    private TranscriptionRepository transcriptionRepository;

    public String convertSpeechToText(MultipartFile file) {

        String fileName = file.getOriginalFilename();

        String transcript =
                "Transcript generated from : " + fileName;

        Transcription transcription = new Transcription();

        transcription.setAudioFileName(fileName);

        transcription.setTranscript(transcript);

        transcriptionRepository.save(transcription);

        return transcript;
    }

    public List<Transcription> getAllTranscriptions() {

        return transcriptionRepository.findAll();
    }
}