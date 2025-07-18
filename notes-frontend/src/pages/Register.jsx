import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(formData);
            console.log("User registered: ", res);

            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            navigate("/");
        } catch (err) {
            console.error("Registration error: ", err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
            />
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

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
