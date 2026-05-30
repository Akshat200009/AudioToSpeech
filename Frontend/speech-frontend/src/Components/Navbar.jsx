import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <nav
            className="
                bg-white
                shadow-md
                sticky
                top-0
                z-50
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    h-20
                    flex
                    justify-between
                    items-center
                "
            >

                <Link
                    to="/"
                    className="
                        text-3xl
                        font-bold
                        text-indigo-600
                    "
                >
                    🎤 Speech App
                </Link>

                <div
                    className="
                        flex
                        items-center
                        gap-6
                    "
                >

                    <Link
                        to="/"
                        className="
                            text-gray-700
                            hover:text-indigo-600
                            font-medium
                            transition
                        "
                    >
                        Home
                    </Link>

                    <Link
                        to="/upload"
                        className="
                            text-gray-700
                            hover:text-indigo-600
                            font-medium
                            transition
                        "
                    >
                        Upload
                    </Link>

                    <Link
                        to="/history"
                        className="
                            text-gray-700
                            hover:text-indigo-600
                            font-medium
                            transition
                        "
                    >
                        History
                    </Link>

                    <button
                        onClick={logout}
                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            transition
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;