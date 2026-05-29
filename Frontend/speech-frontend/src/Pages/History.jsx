import { useEffect, useState } from "react";

import api from "../Services/api";

import { toast } from "react-toastify";

function History() {

    const [history, setHistory] =
            useState([]);

    const [loading, setLoading] =
            useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const token =
                    localStorage.getItem("token");

            const response =
                    await api.get(

                            "/history",

                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                    );

            setHistory(response.data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed To Load History"
            );

        } finally {

            setLoading(false);
        }
    };

    const deleteTranscript =
            async (id) => {

        try {

            const token =
                    localStorage.getItem("token");

            await api.delete(

                    `/delete/${id}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
            );

            toast.success(
                "Transcript Deleted"
            );

            fetchHistory();

        } catch (error) {

            console.log(error);

            toast.error(
                "Delete Failed"
            );
        }
    };

    const downloadTranscript = (
            transcript,
            fileName
    ) => {

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
                `${fileName}.txt`;

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
                min-h-screen
                bg-gradient-to-br
                from-gray-100
                to-gray-300
                p-10
            "
        >

            <h1
                className="
                    text-5xl
                    font-bold
                    mb-12
                    text-center
                    text-gray-900
                "
            >

                Transcript History

            </h1>

            {
                loading ? (

                    <div
                        className="
                            flex
                            justify-center
                            items-center
                            mt-20
                        "
                    >

                        <div
                            className="
                                h-12
                                w-12
                                border-4
                                border-black
                                border-t-transparent
                                rounded-full
                                animate-spin
                            "
                        ></div>

                    </div>

                ) : history.length === 0 ? (

                    <div
                        className="
                            bg-white
                            p-10
                            rounded-3xl
                            shadow-xl
                            text-center
                            max-w-xl
                            mx-auto
                        "
                    >

                        <h2
                            className="
                                text-3xl
                                font-bold
                                mb-4
                            "
                        >

                            No Transcripts Found

                        </h2>

                        <p
                            className="
                                text-gray-600
                                text-lg
                            "
                        >

                            Upload audio to generate
                            transcripts.

                        </p>

                    </div>

                ) : (

                    <div
                        className="
                            grid
                            gap-8
                        "
                    >

                        {
                            history.map((item) => (

                                <div
                                    key={item.id}

                                    className="
                                        bg-white
                                        p-8
                                        rounded-3xl
                                        shadow-lg
                                        hover:shadow-2xl
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                        border
                                        border-gray-200
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                            mb-6
                                            flex-wrap
                                            gap-4
                                        "
                                    >

                                        <div>

                                            <h2
                                                className="
                                                    text-2xl
                                                    font-bold
                                                    text-gray-900
                                                "
                                            >

                                                {item.audioFileName}

                                            </h2>

                                            <p
                                                className="
                                                    text-sm
                                                    text-gray-500
                                                    mt-1
                                                "
                                            >

                                                {item.createdAt}

                                            </p>

                                        </div>

                                        <div
                                            className="
                                                flex
                                                gap-3
                                            "
                                        >

                                            <button
                                                onClick={() =>
                                                    downloadTranscript(
                                                        item.transcript,
                                                        item.audioFileName
                                                    )
                                                }

                                                className="
                                                    bg-blue-500
                                                    hover:bg-blue-700
                                                    hover:scale-105
                                                    transition-all
                                                    duration-300
                                                    text-white
                                                    px-5
                                                    py-2
                                                    rounded-xl
                                                    shadow-md
                                                "
                                            >

                                                Download

                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteTranscript(
                                                        item.id
                                                    )
                                                }

                                                className="
                                                    bg-red-500
                                                    hover:bg-red-700
                                                    hover:scale-105
                                                    transition-all
                                                    duration-300
                                                    text-white
                                                    px-5
                                                    py-2
                                                    rounded-xl
                                                    shadow-md
                                                "
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                    <div
                                        className="
                                            bg-gray-100
                                            p-5
                                            rounded-2xl
                                        "
                                    >

                                        <p
                                            className="
                                                text-gray-700
                                                leading-8
                                                text-lg
                                            "
                                        >

                                            {item.transcript}

                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
}

export default History;