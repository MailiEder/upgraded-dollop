import "./header.css"

export default function Header(){

    const PF = "http://localhost:5000/images/";

    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Eine Rückschau auf den</span>
                <span className="headerTitleLg">Maximiliansweg</span>
            </div>
            <img 
                className="headerImg" 
                src={PF +"1676813880038KueheaufmWeg.jpg"}
                alt="" 
            />
        </div>
    )
}