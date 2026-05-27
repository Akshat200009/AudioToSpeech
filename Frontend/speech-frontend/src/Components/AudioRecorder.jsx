import { useState } from "react";
import { ReactMic } from "react-mic";
import api from "../Services/api";

function AudioRecorder() {

    const [record, setRecord] = useState(false);

    const [transcript, setTranscript] = useState("");

    const [loading, setLoading] = useState(false);

    const startRecording = () => {

        setRecord(true);
    };

    const stopRecording = () => {

        setRecord(false);
    };

    const onStop = async (recordedBlob) => {

        console.log(recordedBlob);

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append(
                "file",
                recordedBlob.blob,
                "recording.mp3"
            );

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

            alert("Transcript Generated");

        } catch (error) {

            console.log(error);

            alert("Recording Upload Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="flex flex-col items-center mt-10 mb-20">

            <h2 className="text-2xl font-bold mb-5">

                Record Audio

            </h2>

            <div className="bg-white shadow-lg rounded p-6 w-[500px]">

                <ReactMic
                    record={record}
                    onStop={onStop}
                    mimeType="audio/mp3"
                    strokeColor="#000000"
                    backgroundColor="#f1f1f1"
                    className="w-full"
                />

                <div className="flex gap-4 mt-5">

                    <button
                        onClick={startRecording}
                        className="bg-green-500 text-white px-5 py-2 rounded w-full"
                    >
                        Start Recording
                    </button>

                    <button
                        onClick={stopRecording}
                        className="bg-red-500 text-white px-5 py-2 rounded w-full"
                    >
                        Stop Recording
                    </button>

                </div>

                {
                    loading && (

                        <p className="mt-4 text-center">

                            Processing Audio...

                        </p>
                    )
                }

                {
                    transcript && (

                        <div className="mt-6">

                            <h3 className="text-xl font-bold mb-2">

                                Transcript

                            </h3>

                            <div className="bg-gray-100 p-4 rounded">

                                {transcript}

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default AudioRecorder;