import "./post.css"
import {Link} from "react-router-dom"

export default function Post({post}){

    const PF = "http://localhost:5000/images/";

    return (
        <div className="post">
            {post.photo && (
                <img 
                className="postImg" 
                src={PF + post.photo} 
                alt="" 
                />
            )}
           
            <div className="postInfo">
                <div className="postCats">
                    {post.name.map((c) => (
                        <span className="postCat">{c}</span>
                    ))}               
                </div>
                    <Link to={`/post/${post.postid}`} className="link">
                    <span className="postTitle">
                   {post.title}
                </span>
                    </Link>                
                <hr/>
                <span className="postDate">{new Date(post.timestamps).toDateString()}</span>
            </div>
            <p className="postDesc">
            {post.description}
            </p>
        </div>
    )
}