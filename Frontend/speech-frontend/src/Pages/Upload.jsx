import { useState } from "react";

import api from "../Services/api";

import AudioRecorder from "../Components/AudioRecorder";
import RealtimeSpeech
from "../Components/RealtimeSpeech";

import { toast } from "react-toastify";

function Upload() {

    const [file, setFile] =
            useState(null);

    const [transcript, setTranscript] =
            useState("");

    const [loading, setLoading] =
            useState(false);

    const [language, setLanguage] =
            useState("en");

    const handleUpload = async () => {

        if (!file) {

            toast.warning(
                "Please Select Audio File"
            );

            return;
        }

        const formData =
                new FormData();

        formData.append(
                "file",
                file
        );

        formData.append(
                "language",
                language
        );

        try {

            setLoading(true);

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

            console.log(error);

            toast.error(
                    "Upload Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            className="
                min-h-screen
                bg-black
                flex
                justify-center
                items-center
                p-6
            "
        >

            <div
                className="
                    bg-gradient-to-br
                    from-gray-900
                    to-black
                    text-white
                    border
                    border-gray-800
                    p-10
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-3xl
                "
            >

                <h1
                    className="
                        text-5xl
                        font-bold
                        text-center
                        mb-8
                    "
                >

                    🎵 AI Speech To Text

                </h1>

                <input
                    type="file"

                    accept="audio/*"

                    onChange={(e) =>
                        setFile(
                                e.target.files[0]
                        )
                    }

                    className="
                        w-full
                        border
                        border-gray-700
                        bg-gray-800
                        p-3
                        rounded-xl
                        mb-5
                    "
                />

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
                        mb-5
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

                <button
                    onClick={handleUpload}

                    className="
                        bg-gradient-to-r
                        from-purple-500
                        to-pink-500
                        hover:scale-105
                        hover:shadow-pink-500/50
                        transition-all
                        duration-300
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        w-full
                        flex
                        justify-center
                        items-center
                        font-semibold
                    "
                >

                    {
                        loading ? (

                            <div
                                className="
                                    h-6
                                    w-6
                                    border-2
                                    border-white
                                    border-t-transparent
                                    rounded-full
                                    animate-spin
                                "
                            ></div>

                        ) : (

                            "Upload Audio"
                        )
                    }

                </button>

                {
                    transcript && (

                        <div
                            className="
                                mt-8
                                bg-gray-800
                                p-6
                                rounded-2xl
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-3
                                "
                            >

                                Transcript

                            </h2>

                            <p
                                className="
                                    text-gray-300
                                    leading-8
                                "
                            >

                                {transcript}

                            </p>

                        </div>
                    )
                }

                <AudioRecorder />
                <RealtimeSpeech />

            </div>

        </div>
    );
}

export default Upload;