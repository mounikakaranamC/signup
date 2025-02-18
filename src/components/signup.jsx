import React, {useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Name should contain only letters
        if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) return;
        setFormData({...formData, [name]: value});
        

        // Password should contain only numbers
        if (name === "password" && !/^\d*$/.test(value)) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validateForm = () => {
        let newErrors = {};
        const { name, email, phone, password } = formData;

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            localStorage.setItem("user", JSON.stringify(formData)); // Store user details
            alert("Signup Successful! You can now sign in.");
            // console.log("Form submitted:", formData);
            setFormData({ name: "", email: "", phone: "", password: "" }); // Reset form
            setErrors({}); // Clear errors
            navigate("/signin");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // const validateForm = () => {
    //     let newErrors = {};
    //     const { name, email, phone, password } = formData;

    //     if (!name.trim()) {
    //         newErrors.name = "Name is required.";
    //     }

    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!email.trim()) {
    //         newErrors.email = "Email is required.";
    //     } else if (!emailRegex.test(email)) {
    //         newErrors.email = "Invalid email format.";
    //     }

    //     const phoneRegex = /^[0-9]{10}$/;
    //     if (!phone.trim()) {
    //         newErrors.phone = "Phone number is required.";
    //     } else if (!phoneRegex.test(phone)) {
    //         newErrors.phone = "Phone number must be 10 digits.";
    //     }

    //     if (!password.trim()) {
    //         newErrors.password = "Password is required.";
    //     } else if (password.length < 6) {
    //         newErrors.password = "Password must be at least 6 characters.";
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0; // Returns true if no errors
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         console.log("Form submitted:", formData);
    //         setErrors({}); // Clear errors after successful validation
    //     }
    // };


    

    return(
        <form className="box-container register-container" onSubmit={handleSubmit} >
            <div className="form-title">
                <span>Welcome Back</span>
                <p>Please Enter your Account details</p>
            </div>
            {/* <div className="error-message">Error Message</div> */}
            
            {/* Display error messages */}
            {Object.keys(errors).length > 0 && (
                <div className="error-message">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <div className="form-inputs">
                <div className="input-box">
                    <input type="text" name="name" className="inputs input-field" placeholder="Name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="input-box">
                    <input type="email" name="email" className="inputs input-field" placeholder="Email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="input-box">
                    <input type="number" name="phone" className="inputs input-field" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
                <div className="input-box ">
                    <div className="password-input">
                        <input type={showPassword ? "text" : "password"} name="password" className="inputs input-field" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Eye icon toggle */}
                        </span>
                    </div>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
            </div>
            <div className="input-box">
                <button type="submit" className="inputs btn submit-btn">
                    <span>Sign Up</span>
                    <IconArrowNarrowRight size={20} />
                </button>
            </div>
            <div className="form-bottom-links">
                <span>Already have an account? <Link to="/signin" className="bottom-link">Sign In</Link></span>
            </div>
        </form>
    )
}

export default Signup;