import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"
    
    const handleLogout = ()  => {
        dispatch({type:"LOGOUT"});
    }

    return (
        <div className="top">
            <div className="topLeft">
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/" >STARTSEITE</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to="/write" >EINTRAG</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "ABMELDUNG"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings">
                            <img 
                            className="topImg"
                            src={PF + user.profilepic} 
                            alt=""
                            />
                        </Link>
                    

                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                            <Link className="link" to="/login" >ANMELDEN</Link>
                            </li>
                            <li className="topListItem">
                            <Link className="link" to="/register" >REGISTRIEREN</Link>
                            </li>                       
                        </ul>
                    )
                }
                
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>               
            </div>
        </div>
    )
}