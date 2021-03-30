import React, { useContext } from 'react';
import Comment from '../../components/comments';
import './style.css';
import { db, storage } from '../../fbse';
import CommentInput from '../../components/commentinput';
import {UserContext} from '../../context/user';

export default function Post({picUrl,username,id,photoUrl,caption,comments}) {
    const[user,setUser]=useContext(UserContext).user;
    const DeletePost = () =>{
        if(user){
        var imageRef = storage.refFromURL(photoUrl);
        imageRef.delete().then(()=>{
            console.log("Deleted");
        }).catch((e)=>{
            console.log(e);
        })
        db.collection("posts").doc(id).delete();
    }
    else{
        
    }
    }

    return (
        <div className="post">
        <div style={{display: 'flex' ,justifyContent:'space-between'}}>
            <div className="post_show">
            <p style={{margin:"8px"}}>{username}</p>
            <button onClick={DeletePost} className="post-delete">Delete</button>
            </div>
            </div>
            <div className="post_center">
            <img className="photo_url" src={photoUrl} alt=""/>
            </div>
            <div>
            <p>
            <span style={{fontWeight:"500" , marginRight:"8px"}}
            >{username}</span>
            {caption}
            </p>
            </div>
            {comments ? comments.map((comment)=> 
            <Comment  username={comment.username} caption={comment.comment}/>   ): <div></div>}
            {user ? <CommentInput id={id} comments={comments}/> : <div></div>}
        </div>
    );
}
