import { useEffect, useState } from "react";
import api from "../Services/api";

function History() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const token =
                    localStorage.getItem("token");

            const response = await api.get(

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

            alert("Failed To Load History");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-8">

                Transcript History

            </h1>

            {
                loading ? (

                    <p>Loading...</p>

                ) : (

                    <div className="grid gap-6">

                        {
                            history.map((item) => (

                                <div
                                    key={item.id}
                                    className="shadow-lg p-5 rounded bg-white"
                                >

                                    <h2 className="text-xl font-bold mb-2">

                                        {item.audioFileName}

                                    </h2>

                                    <p className="mb-3 text-gray-700">

                                        {item.transcript}

                                    </p>

                                    <p className="text-sm text-gray-500">

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