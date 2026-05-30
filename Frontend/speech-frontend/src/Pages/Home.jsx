import { Link } from "react-router-dom";

function Home() {

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-slate-50
                to-indigo-50
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-20
                "
            >

                <div
                    className="
                        grid
                        md:grid-cols-2
                        gap-16
                        items-center
                    "
                >

                    {/* Left Side */}

                    <div>

                        <span
                            className="
                                bg-indigo-100
                                text-indigo-600
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                            "
                        >
                            AI Powered Speech Recognition
                        </span>

                        <h1
                            className="
                                text-6xl
                                font-bold
                                text-gray-900
                                mt-6
                                leading-tight
                            "
                        >
                            Convert Speech
                            <br />
                            Into Text
                        </h1>

                        <p
                            className="
                                text-xl
                                text-gray-600
                                mt-6
                                leading-relaxed
                            "
                        >
                            Upload audio files,
                            record your voice,
                            or use real-time speech
                            recognition to generate
                            accurate transcripts instantly.
                        </p>

                        <div
                            className="
                                flex
                                gap-4
                                mt-10
                                flex-wrap
                            "
                        >

                            <Link
                                to="/upload"
                                className="
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    text-white
                                    px-8
                                    py-4
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                Upload Audio
                            </Link>

                            <Link
                                to="/upload"
                                className="
                                    bg-white
                                    border
                                    border-gray-300
                                    hover:border-indigo-600
                                    px-8
                                    py-4
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                Record Audio
                            </Link>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div
                        className="
                            flex
                            justify-center
                        "
                    >

                        <div
                            className="
                                bg-white
                                shadow-xl
                                rounded-3xl
                                p-10
                                w-full
                                max-w-md
                            "
                        >

                            <div
                                className="
                                    text-center
                                    text-8xl
                                "
                            >
                                🎤
                            </div>

                            <h3
                                className="
                                    text-2xl
                                    font-bold
                                    text-center
                                    mt-4
                                "
                            >
                                Smart Speech Recognition
                            </h3>

                            <p
                                className="
                                    text-gray-600
                                    text-center
                                    mt-4
                                "
                            >
                                Convert spoken words into
                                text with high accuracy using
                                AI-powered transcription.
                            </p>

                            <div
                                className="
                                    mt-8
                                    space-y-3
                                "
                            >

                                <div
                                    className="
                                        bg-green-50
                                        text-green-700
                                        p-3
                                        rounded-lg
                                    "
                                >
                                    ✅ Audio Upload
                                </div>

                                <div
                                    className="
                                        bg-blue-50
                                        text-blue-700
                                        p-3
                                        rounded-lg
                                    "
                                >
                                    🎙️ Voice Recording
                                </div>

                                <div
                                    className="
                                        bg-purple-50
                                        text-purple-700
                                        p-3
                                        rounded-lg
                                    "
                                >
                                    ⚡ Real-Time Speech
                                </div>

                                <div
                                    className="
                                        bg-orange-50
                                        text-orange-700
                                        p-3
                                        rounded-lg
                                    "
                                >
                                    🌍 Multi-Language Support
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Feature Cards */}

                <div
                    className="
                        grid
                        md:grid-cols-4
                        gap-6
                        mt-24
                    "
                >

                    <div
                        className="
                            bg-white
                            p-6
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        <div className="text-4xl">
                            📤
                        </div>

                        <h3
                            className="
                                text-xl
                                font-bold
                                mt-4
                            "
                        >
                            Upload Audio
                        </h3>

                        <p
                            className="
                                text-gray-600
                                mt-3
                            "
                        >
                            Upload MP3 and WAV files
                            for instant transcription.
                        </p>

                    </div>

                    <div
                        className="
                            bg-white
                            p-6
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        <div className="text-4xl">
                            🎙️
                        </div>

                        <h3
                            className="
                                text-xl
                                font-bold
                                mt-4
                            "
                        >
                            Record Audio
                        </h3>

                        <p
                            className="
                                text-gray-600
                                mt-3
                            "
                        >
                            Record directly from your
                            browser and convert instantly.
                        </p>

                    </div>

                    <div
                        className="
                            bg-white
                            p-6
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        <div className="text-4xl">
                            ⚡
                        </div>

                        <h3
                            className="
                                text-xl
                                font-bold
                                mt-4
                            "
                        >
                            Real-Time Speech
                        </h3>

                        <p
                            className="
                                text-gray-600
                                mt-3
                            "
                        >
                            Watch speech convert into
                            text instantly.
                        </p>

                    </div>

                    <div
                        className="
                            bg-white
                            p-6
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        <div className="text-4xl">
                            📜
                        </div>

                        <h3
                            className="
                                text-xl
                                font-bold
                                mt-4
                            "
                        >
                            Transcript History
                        </h3>

                        <p
                            className="
                                text-gray-600
                                mt-3
                            "
                        >
                            View, download and manage
                            previous transcripts.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Home;