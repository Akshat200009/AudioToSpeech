import { useState } from "react";
import api from "../Services/api";
import AudioRecorder from "../Components/AudioRecorder";

function Upload() {

    const [file, setFile] = useState(null);

    const [transcript, setTranscript] = useState("");

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {

            alert("Please Select Audio File");

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            const token = localStorage.getItem("token");

            const response = await api.post(

                "/speech-to-text",

                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setTranscript(response.data.transcript);

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="flex flex-col items-center mt-16">

            <h1 className="text-4xl font-bold mb-8">

                Upload Audio File

            </h1>

            <div className="shadow-lg p-8 rounded w-[500px] bg-white">

                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-5"
                />

                <button
                    onClick={handleUpload}
                    className="bg-black text-white px-6 py-3 rounded w-full"
                >

                    {
                        loading ? "Processing..." : "Upload Audio"
                    }

                </button>

                {
                    transcript && (

                        <div className="mt-6">

                            <h2 className="text-2xl font-bold mb-3">

                                Transcript

                            </h2>

                            <div className="bg-gray-100 p-4 rounded">

                                {transcript}

                            </div>

                        </div>
                    )
                }

            </div>

            <AudioRecorder />

        </div>
    );
}

export default Upload;