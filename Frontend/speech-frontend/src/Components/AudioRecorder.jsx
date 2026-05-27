import { ReactMic } from "react-mic";

import { useState } from "react";

import api from "../Services/api";

import { toast } from "react-toastify";

function AudioRecorder() {

    const [record, setRecord] =
            useState(false);

    const [transcript, setTranscript] =
            useState("");

    const [loading, setLoading] =
            useState(false);

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

    const onStop = async (recordedBlob) => {

        try {

            setLoading(true);

            toast.info(
                "Processing Audio..."
            );

            const formData =
                    new FormData();

            formData.append(

                    "file",

                    recordedBlob.blob,

                    "recording.mp3"
            );

            const token =
                    localStorage.getItem("token");

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
                "Transcript Ready"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Recording Upload Failed"
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
                to-gray-900
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

            {
                loading && (

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
                )
            }

            {
                transcript && (

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
                )
            }

        </div>
    );
}

export default AudioRecorder;