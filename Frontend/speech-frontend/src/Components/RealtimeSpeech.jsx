import { useState, useRef } from "react";
import { toast } from "react-toastify";

function RealtimeSpeech() {

    const [listening, setListening] =
        useState(false);

    const [transcript, setTranscript] =
        useState("");

    const recognitionRef =
        useRef(null);

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            toast.error(
                "Speech Recognition not supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.lang = "en-US";

        recognition.onresult = (event) => {

            let finalTranscript = "";

            for (
                let i = 0;
                i < event.results.length;
                i++
            ) {

                finalTranscript +=
                    event.results[i][0].transcript;
            }

            setTranscript(
                finalTranscript
            );
        };

        recognition.start();

        recognitionRef.current =
            recognition;

        setListening(true);

        toast.success(
            "Listening Started"
        );
    };

    const stopListening = () => {

        recognitionRef.current?.stop();

        setListening(false);

        toast.info(
            "Listening Stopped"
        );
    };

    return (

        <div
            className="
                mt-10
                bg-white
                p-8
                rounded-3xl
                shadow-xl
            "
        >

            <h2
                className="
                    text-3xl
                    font-bold
                    mb-6
                    text-center
                "
            >
                ⚡ Real-Time Speech Recognition
            </h2>

            <div
                className="
                    flex
                    justify-center
                    gap-4
                    mb-6
                "
            >

                <button
                    onClick={startListening}
                    className="
                        bg-green-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    Start Listening
                </button>

                <button
                    onClick={stopListening}
                    className="
                        bg-red-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    Stop Listening
                </button>

            </div>

            <div
                className="
                    min-h-[150px]
                    bg-gray-100
                    p-5
                    rounded-xl
                "
            >

                {transcript ||
                    "Speak something..."}

            </div>

        </div>
    );
}

export default RealtimeSpeech;