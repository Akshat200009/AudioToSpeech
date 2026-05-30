import { useState, useRef } from "react";
import { toast } from "react-toastify";

function RealtimeSpeech() {

    const [listening, setListening] =
        useState(false);

    const [transcript, setTranscript] =
        useState("");

    const [language, setLanguage] =
        useState("en-US");

    const recognitionRef =
        useRef(null);

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            toast.error(
                "Speech Recognition Not Supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.lang = language;

        recognition.onstart = () => {

            setListening(true);

            toast.success(
                "Listening Started"
            );
        };

        recognition.onresult = (event) => {

            let text = "";

            for (
                let i = 0;
                i < event.results.length;
                i++
            ) {

                text +=
                    event.results[i][0]
                        .transcript + " ";
            }

            setTranscript(text);
        };

        recognition.onerror = (event) => {

            console.log(event.error);

            toast.error(
                event.error
            );
        };

        recognition.onend = () => {

            setListening(false);
        };

        recognitionRef.current =
            recognition;

        recognition.start();
    };

    const stopListening = () => {

        if (
            recognitionRef.current
        ) {

            recognitionRef.current.stop();
        }

        toast.info(
            "Listening Stopped"
        );
    };

    const copyTranscript = () => {

        navigator.clipboard.writeText(
            transcript
        );

        toast.success(
            "Transcript Copied"
        );
    };

    const clearTranscript = () => {

        setTranscript("");

        toast.info(
            "Transcript Cleared"
        );
    };

    const downloadTranscript = () => {

        const element =
            document.createElement("a");

        const file =
            new Blob(
                [transcript],
                {
                    type: "text/plain"
                }
            );

        element.href =
            URL.createObjectURL(file);

        element.download =
            "RealtimeTranscript.txt";

        document.body.appendChild(
            element
        );

        element.click();

        toast.success(
            "Transcript Downloaded"
        );
    };

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-2xl
                p-8
                mt-10
            "
        >

            <h2
                className="
                    text-4xl
                    font-bold
                    text-center
                    mb-6
                    text-gray-800
                "
            >
                ⚡ Real-Time Speech Recognition
            </h2>

            <select
                value={language}
                onChange={(e) =>
                    setLanguage(
                        e.target.value
                    )
                }
                className="
                    w-full
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    mb-5
                "
            >

                <option value="en-US">
                    English
                </option>

                <option value="hi-IN">
                    Hindi
                </option>

                <option value="mr-IN">
                    Marathi
                </option>

            </select>

            <div
                className="
                    text-center
                    text-lg
                    font-semibold
                    mb-6
                "
            >

                {
                    listening
                        ? "🟢 Listening..."
                        : "🔴 Stopped"
                }

            </div>

            <div
                className="
                    flex
                    justify-center
                    gap-4
                    flex-wrap
                    mb-6
                "
            >

                <button
                    onClick={
                        startListening
                    }
                    className="
                        bg-green-500
                        hover:bg-green-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "
                >
                    Start Listening
                </button>

                <button
                    onClick={
                        stopListening
                    }
                    className="
                        bg-red-500
                        hover:bg-red-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "
                >
                    Stop Listening
                </button>

                <button
                    onClick={
                        copyTranscript
                    }
                    className="
                        bg-blue-500
                        hover:bg-blue-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "
                >
                    Copy
                </button>

                <button
                    onClick={
                        downloadTranscript
                    }
                    className="
                        bg-purple-600
                        hover:bg-purple-800
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "
                >
                    Download
                </button>

                <button
                    onClick={
                        clearTranscript
                    }
                    className="
                        bg-gray-700
                        hover:bg-black
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "
                >
                    Clear
                </button>

            </div>

            <div
                className="
                    bg-white
                    border
                    border-gray-300
                    rounded-2xl
                    p-6
                    min-h-[180px]
                    text-black
                    text-lg
                    font-medium
                    leading-8
                    shadow-inner
                "
            >

                {
                    transcript
                        ? transcript
                        : (
                            <span className="text-gray-400">
                                🎤 Start speaking...
                            </span>
                        )
                }

            </div>

        </div>
    );
}

export default RealtimeSpeech;