import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(formData);
            console.log("User Logged in: ", res);

            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            navigate("/");
        } catch (err) {
            console.error("Login error: ", err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
            />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
