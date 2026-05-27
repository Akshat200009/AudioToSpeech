import { useState } from "react";

import api from "../Services/api";

import AudioRecorder from "../Components/AudioRecorder";

import { toast } from "react-toastify";

function Upload() {

    const [file, setFile] = useState(null);

    const [transcript, setTranscript] =
            useState("");

    const [loading, setLoading] =
            useState(false);

    const handleUpload = async () => {

        if (!file) {

            toast.warning(
                "Please Select Audio File"
            );

            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

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
                bg-gradient-to-br
                from-gray-100
                to-gray-300
                flex
                justify-center
                items-center
                p-6
            "
        >

            <div
                className="
                    bg-white
                    p-10
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-2xl
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

                    Upload Audio

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
                        p-3
                        rounded
                        mb-6
                    "
                />

                <button
                    onClick={handleUpload}

                    className="
                        bg-black
                        hover:bg-gray-800
                        transition-all
                        duration-300
                        text-white
                        px-6
                        py-3
                        rounded
                        w-full
                        flex
                        justify-center
                        items-center
                    "
                >

                    {
                        loading ? (

                            <div
                                className="
                                    h-5
                                    w-5
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

                <div className="mt-10">

                    <AudioRecorder />

                </div>

                {
                    transcript && (

                        <div
                            className="
                                mt-10
                                bg-gray-100
                                p-6
                                rounded-xl
                                shadow-md
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
                                    leading-7
                                "
                            >

                                {transcript}

                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Upload;