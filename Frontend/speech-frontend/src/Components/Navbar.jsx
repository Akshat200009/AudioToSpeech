import { Link } from "react-router-dom";

function Navbar() {

    return (

        <div className="bg-black text-white px-10 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
                Speech App
            </h1>

            <div className="flex gap-6 text-lg">

                <Link
                    to="/"
                    className="hover:text-gray-300"
                >
                    Home
                </Link>

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

                <Link
            to="/upload"
            className="hover:text-gray-300">
             Upload
            </Link>

              <Link
               to="/history"
               className="hover:text-gray-300"
              >
                 History
            </Link>

            </div>

        </div>
    );
}

export default Navbar;