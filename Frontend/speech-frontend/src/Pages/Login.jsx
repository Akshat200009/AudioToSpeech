import { useState } from "react";
import api from "../Services/api";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const loginData = {
                email,
                password
            };

            const response = await api.post(
                "/login",
                loginData
            );

            const token = response.data;

            localStorage.setItem("token", token);

            alert("Login Successful");

            window.location.href = "/upload";

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials");
        }
    };

    return (

        <div className="flex justify-center mt-16">

            <div className="w-[400px] shadow-lg rounded p-6">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Login

                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-3 mb-4 rounded outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border p-3 mb-4 rounded outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-black text-white w-full p-3 rounded hover:bg-gray-800"
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;