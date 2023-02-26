import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings(){
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userid:user.userid,
            username,
            email,
            password,
        };
        if(file){
            const data = new FormData();
            const filename=Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilepic = filename;
            try{
                await axiosInstance.post("/api/upload", data)
            }catch(err){

            }

        }

        try {
         const res = await axiosInstance.put("/api/users/" + user.userid, updatedUser);
         setSuccess(true);
         dispatch({ type: "UPDATE_SUCCESS", payload:res.data})
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" })
        }
       
    }



    return(
        <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Aktualisieren Sie Ihr Konto</span>
                <span className="settingsDeleteTitle">Löschen Sie Ihr Konto</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profilbild</label>
                <div className="settingsPP">
                <img 
                    src={file ? URL.createObjectURL(file) : PF + user.profilepic}
                    alt=""
                />
                <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{display:"none"}}
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <label>Benutzername</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                <label>E-Mail</label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                <label>Passwort</label>
                <input type="password" onChange={e=>setPassword(e.target.value)}/>
                <button className="settingsSubmit" type="submit">Speichern</button>
                {success && <span style={{ color: "green", textAlign:"center", marginTop:"20px"}} >Profil wurde aktualisiert....</span>}
            </form>
        </div>
        <Sidebar />
        </div>
    )
}