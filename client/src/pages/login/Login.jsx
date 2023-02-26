import "./login.css"
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login(){

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axiosInstance.post("/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE"});
        }

    };

 

    return(
        <div className="login">
            <span className="loginTitle">Anmelden</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Benutzername</label>
                <input 
                    type="text" 
                    className="loginInput" 
                    placeholder="Geben Sie Ihren Benutzernamen ein..."
                    ref={userRef}
                />
                <label>Passwort</label>
                <input 
                    type="password" 
                    className="loginInput" 
                    placeholder="Geben Sie Ihr Passwort ein..."
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit"  disabled={isFetching}>
                    Anmelden
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Registrieren</Link>
            </button>

        </div>
    )
}