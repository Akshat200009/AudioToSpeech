package com.AudiotoSpeech.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AudiotoSpeech.Entities.Transcript;

public interface TranscriptRepository extends JpaRepository<Transcript, Long> {

}
