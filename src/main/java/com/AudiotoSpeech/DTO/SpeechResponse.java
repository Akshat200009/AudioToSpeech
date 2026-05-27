package com.AudiotoSpeech.DTO;

public class SpeechResponse {

    private String transcript;

    public SpeechResponse() {
    }

    public SpeechResponse(String transcript) {
        this.transcript = transcript;
    }

    public String getTranscript() {
        return transcript;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }
}