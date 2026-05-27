import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token =
            localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <nav
            className="
                bg-black
                text-white
                px-10
                py-5
                flex
                justify-between
                items-center
            "
        >

            <h1 className="text-3xl font-bold">

                Speech App

            </h1>

            <div className="flex gap-6 items-center">

                <Link
                    to="/"
                    className="hover:text-gray-300"
                >

                    Home

                </Link>

                {
                    !token && (

                        <>
                            <Link
                                to="/login"
                                className="hover:text-gray-300"
                            >

                                Login

                            </Link>

                            <Link
                                to="/register"
                                className="hover:text-gray-300"
                            >

                                Register

                            </Link>
                        </>
                    )
                }

                {
                    token && (

                        <>
                            <Link
                                to="/upload"
                                className="hover:text-gray-300"
                            >

                                Upload

                            </Link>

                            <Link
                                to="/history"
                                className="hover:text-gray-300"
                            >

                                History

                            </Link>

                            <button
                                onClick={handleLogout}

                                className="
                                    bg-red-500
                                    hover:bg-red-700
                                    px-4
                                    py-2
                                    rounded
                                    transition-all
                                    duration-300
                                "
                            >

                                Logout

                            </button>
                        </>
                    )
                }

            </div>

        </nav>
    );
}

export default Navbar;