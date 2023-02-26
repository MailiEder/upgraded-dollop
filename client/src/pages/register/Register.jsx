import "./register.css"
import axios from "axios"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false);

        try {
            
            const res = await axiosInstance.post("/api/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }       
    };

    return(
        <div className="register">
            <span className="registerTitle">Registrieren</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Benutzername</label>
                <input 
                    type="text" 
                    className="registerInput" 
                    placeholder="Geben Sie Ihren Benutzernamen ein..."
                    onChange={e=>setUsername(e.target.value)}
                    />
                <label>E-Mail</label>
                <input 
                    type="text" 
                    className="registerInput" 
                    placeholder="Geben Sie Ihre E-Mail-Adresse ein..."
                    onChange={e=>setEmail(e.target.value)}
                    />
                <label>Passwort</label>
                <input 
                    type="password" 
                    className="registerInput" 
                    placeholder="Geben Sie Ihr Passwort ein..."
                    onChange={e=>setPassword(e.target.value)}
                    />
                <button className="registerButton" type="submit">Registrieren</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Anmelden</Link>
            </button>
            { error && <span style={{color:"red", marginTop:"10px"}}>Etwas stimmt nicht!</span>}
        </div>
    )
}