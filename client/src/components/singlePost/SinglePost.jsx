import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css"

export default function SinglePost(){
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);  
            setDesc(res.data.description);        
        }
        getPost()
    },[path]);

    const handleDelete = async ()=>{
        try {
            await axiosInstance.delete("/api/posts/" + path, {
                data: { username: user.username },
            }); 
            window.location.replace("/");
        } catch (err) {
            
        }
      
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put("/api/posts/" + path, {
                username: user.username, 
                title, 
                description,
            }); 
        setUpdateMode(false);
        } catch (err) {
            
        }
    };


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img 
                    className="singlePostImg" 
                    src={PF + post.photo} 
                    alt="" 
                /> )}
            {
                updateMode ? ( 
                <input 
                    type="text" 
                    value={title} 
                    className="singlePostTitleInput"
                    autoFocus
                    onChange={(e)=>setTitle(e.target.value)}
                    />) : (

                    <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username &&
                <div className="singlePostEdit">
                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
                }            
            </h1>
                )
            }
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Author: 
                <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
                </Link>
                </span>
                <span className="singlePostDate">{new Date(post.timestamps).toDateString()}</span>
            </div>
            {updateMode ? (<textarea className="singlePostDescInput" value={description} onChange={(e)=>setDesc(e.target.value)}/>) : (
                <p className="singlePostDesc">
                {description}
            </p>
            ) }
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>Speichern</button>
            )}
            
            </div>
        </div>
    );
}