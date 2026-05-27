import { useState } from "react";
import api from "../Services/api";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const userData = {
                name,
                email,
                password
            };

            const response = await api.post(
                "/register",
                userData
            );

            console.log(response.data);

            alert("Registration Successful");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (

        <div className="flex justify-center mt-16">

            <div className="w-[400px] shadow-lg rounded p-6">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Register

                </h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border p-3 mb-4 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-3 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border p-3 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="bg-black text-white w-full p-3 rounded hover:bg-gray-800"
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;