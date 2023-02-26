import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./sidebar.css"

export default function Sidebar(){
    const [cats, setCats] = useState([]);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(()=>{
        const getCats = async () =>
        {
            const res = await axiosInstance.get("/api/categories");
            setCats(res.data);
        }
        getCats();
    },[])
    return(
        <div className="sidebar">
            <div className="sidebarItem">
            <span className="sidebarTitle">Kategorien</span>
            <ul className="sidebarList">
               {cats.map(c=>(
                <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
                </Link>                
               ))} 
            </ul>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">FOLGE UNS</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
            </div>
        </div>
    )
}