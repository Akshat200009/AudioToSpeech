package com.AudiotoSpeech.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AudiotoSpeech.Entities.Transcription;

public interface TranscriptionRepository extends JpaRepository<Transcription, Integer> {

}
