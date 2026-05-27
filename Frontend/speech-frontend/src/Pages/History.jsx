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
                    text-4xl
                    font-bold
                    mb-10
                    text-center
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
                            rounded-2xl
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
                            gap-6
                        "
                    >

                        {
                            history.map((item) => (

                                <div
                                    key={item.id}

                                    className="
                                        bg-white
                                        p-6
                                        rounded-2xl
                                        shadow-lg
                                        hover:shadow-2xl
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                            mb-4
                                        "
                                    >

                                        <h2
                                            className="
                                                text-2xl
                                                font-bold
                                            "
                                        >

                                            {item.audioFileName}

                                        </h2>

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
                                                px-4
                                                py-2
                                                rounded
                                                shadow-md
                                            "
                                        >

                                            Delete

                                        </button>

                                    </div>

                                    <p
                                        className="
                                            text-gray-700
                                            leading-7
                                        "
                                    >

                                        {item.transcript}

                                    </p>

                                    <p
                                        className="
                                            mt-5
                                            text-sm
                                            text-gray-500
                                        "
                                    >

                                        {item.createdAt}

                                    </p>

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