import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import api from "../Services/api";
import { toast } from "react-toastify";

function AudioRecorder() {

    const [record, setRecord] =
            useState(false);

    const [transcript, setTranscript] =
            useState("");

    const [loading, setLoading] =
            useState(false);

    const [language, setLanguage] =
            useState("en");

    const languageRef =
            useRef("en");

    const startRecording = () => {

        setRecord(true);

        toast.info(
                "Recording Started"
        );
    };

    const stopRecording = () => {

        setRecord(false);

        toast.info(
                "Recording Stopped"
        );
    };

    const onStop = async (
            recordedBlob
    ) => {

        try {

            setLoading(true);

            const formData =
                    new FormData();

            formData.append(
                    "file",
                    recordedBlob.blob,
                    "recording.mp3"
            );

            console.log(
                    "Sending Language:",
                    languageRef.current
            );

            formData.append(
                    "language",
                    languageRef.current
            );

            const token =
                    localStorage.getItem(
                            "token"
                    );

            const response =
                    await api.post(

                            "/speech-to-text",

                            formData,

                            {
                                headers: {
                                    Authorization:
                                            `Bearer ${token}`
                                }
                            }
                    );

            setTranscript(
                    response.data.transcript
            );

            toast.success(
                    "Transcript Generated"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                    "Failed To Generate Transcript"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            className="
                mt-14
                bg-gradient-to-br
                from-black
                via-gray-900
                to-blue-950
                p-8
                rounded-3xl
                shadow-2xl
                text-white
            "
        >

            <h1
                className="
                    text-4xl
                    font-bold
                    text-center
                    mb-8
                "
            >
                🎤 Record Audio
            </h1>

            <select
                value={language}

                onChange={(e) => {

                    setLanguage(
                            e.target.value
                    );

                    languageRef.current =
                            e.target.value;

                    console.log(
                            "Dropdown Changed:",
                            languageRef.current
                    );
                }}

                className="
                    w-full
                    p-4
                    rounded-xl
                    mb-6
                    text-black
                    font-medium
                "
            >

                <option value="en">
                    English
                </option>

                <option value="hi">
                    Hindi
                </option>

                <option value="mr">
                    Marathi
                </option>

                <option value="es">
                    Spanish
                </option>

                <option value="fr">
                    French
                </option>

            </select>

            <div
                className="
                    bg-black
                    rounded-2xl
                    p-4
                    border
                    border-gray-700
                    shadow-inner
                "
            >

                <ReactMic
                    record={record}
                    onStop={onStop}
                    className="w-full"
                    strokeColor="#00ff88"
                    backgroundColor="#000000"
                />

            </div>

            <div
                className="
                    flex
                    justify-center
                    gap-6
                    mt-8
                "
            >

                <button
                    onClick={startRecording}

                    className="
                        bg-green-500
                        hover:bg-green-700
                        hover:scale-105
                        transition-all
                        duration-300
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-lg
                    "
                >
                    Start Recording
                </button>

                <button
                    onClick={stopRecording}

                    className="
                        bg-red-500
                        hover:bg-red-700
                        hover:scale-105
                        transition-all
                        duration-300
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-lg
                    "
                >
                    Stop Recording
                </button>

            </div>

            {loading && (

                <div
                    className="
                        flex
                        justify-center
                        mt-8
                    "
                >

                    <div
                        className="
                            h-10
                            w-10
                            border-4
                            border-white
                            border-t-transparent
                            rounded-full
                            animate-spin
                        "
                    ></div>

                </div>
            )}

            {transcript && (

                <div
                    className="
                        mt-10
                        bg-white
                        text-black
                        p-6
                        rounded-2xl
                        shadow-xl
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-4
                        "
                    >
                        Transcript
                    </h2>

                    <p
                        className="
                            text-gray-700
                            leading-8
                        "
                    >
                        {transcript}
                    </p>

                </div>
            )}

        </div>
    );
}

export default AudioRecorder;