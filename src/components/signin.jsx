import React ,{useState} from "react";
import { Link } from "react-router-dom";
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
// import { useState } from "react";

const Signin = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict name to only text (letters and spaces)
        if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};
        const { name, password } = formData;

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.name === formData.name && storedUser.password === formData.password) {
                alert("Login Successful");
                setFormData({ name: "", password: "" });
            } else {
                alert("Invalid Credentials");
            }
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         console.log("Form submitted:", formData);
    //         setFormData({ name: "", password: "" }); // Reset form
    //         setErrors({}); // Clear errors
    //     }
    // };


    return(
        <form className="box-container login-container" onSubmit={handleSubmit}>
            <div className="form-title">
                <span>Welcome Back</span>
                <p>Please Enter your Account details</p>
            </div>
            {/* <div className="error-message">Error Message</div> */}
            {Object.keys(errors).length > 0 && (
                <div className="error-message">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <div className="form-inputs">
                <div className="input-box">
                    <input type="text"  name="name" className="inputs input-field" placeholder="Name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="input-box password-input">
                    <input type={passwordVisible ? "text" : "password"} name="password" className="inputs input-field" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <span
                        className="eye-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
            </div>
            <div className="forgot-pass">
                <a href="#">Forgot password</a>
            </div>
            <div className="input-box ">
                <button type="submit" className="inputs btn submit-btn">
                    <span>Sign In</span>
                    <IconArrowNarrowRight size={20} />
                </button>
            </div>
            <div className="form-bottom-links">
                <span>Don't have an account? <Link to="/signup" className="bottom-link">Sign Up</Link></span>
            </div>
        </form>
    )
}

export default Signin;