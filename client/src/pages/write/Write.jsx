import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username:user.username,
            title,
            description,
        };
        if(file){
            const data = new FormData();
            const filename=Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try{
                await axiosInstance.post("/api/upload", data)
            }catch(err){

            }

        }

        try {

          const res = await axiosInstance.post("/api/posts", newPost);
          window.location.replace("/post/" + res.data.postid)
        } catch (err) {
            
        }


        
    }


    return(
        <div className="write">
            {file && (
                <img
                className="writeImg" 
                src={URL.createObjectURL(file)}
                alt=""
                 />
            )}          
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput"  style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                    <input 
                        type="text" 
                        placeholder="Titel" 
                        className="writeInput" 
                        autoFocus={true} 
                        onChange ={e=>setTitle(e.target.value)}
                    />
                </div> 
                <div className="writeFormGroup">
                    <textarea 
                    placeholder="Erzählen Sie Ihre Geschichte..." 
                    type="text" 
                    className="writeInput writeText"
                    onChange ={e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">Veröffentlichen</button>
            </form>
        </div>
    )
   
}