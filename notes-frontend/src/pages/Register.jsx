import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        document.title = "Register";
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
            return;
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await registerUser(formData);
            console.log("User registered: ", res);

            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            navigate("/");
        } catch (err) {
            console.error("Registration error: ", err.message);
            setErrorMsg("Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 min-h-screen flex justify-center items-center bg-gradient-to-l from-blue-400 to-indigo-900">
            <form
                className="w-full max-w-md bg-white p-8 pb-5 rounded-2xl shadow-2xl bg-gradient-to-bl from-green-200 to-blue-200"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl text-center font-semibold">Welcome</h1>

                <input
                    className="border-b-blue-300 border-b-3 focus:border-blue-500 px-4 py-2 outline-none mt-5 block max-w-xs w-full mx-auto transition-colors duration-500"
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <input
                    className="border-b-blue-300 border-b-3 focus:border-blue-500 px-4 py-2 outline-none mt-3 block max-w-xs w-full mx-auto transition-colors duration-500"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    className="border-b-blue-300 border-b-3 focus:border-blue-500 px-4 py-2 outline-none mt-3 block max-w-xs w-full mx-auto transition-colors duration-500"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                />

                <button
                    className="bg-blue-500 px-4 py-2 mt-8 max-w-xs w-full rounded-md text-white block mx-auto cursor-pointer hover:bg-blue-800 outline-none focus:bg-blue-800 transition-colors duration-500"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <img src="/loader.gif" className="h-6 w-6 m-auto" />
                    ) : (
                        "Register"
                    )}
                </button>

                {errorMsg && (
                    <p className="text-red-500 text-xs text-center mt-2">
                        {errorMsg}
                    </p>
                )}

                <p className="text-center mt-5 text-xs">
                    Already have an account?{" "}
                    <span
                        className="text-purple-900 cursor-pointer hover:text-blue-500 hover:underline"
                        onClick={() => {
                            navigate("/login");
                            return;
                        }}
                    >
                        Login Here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
