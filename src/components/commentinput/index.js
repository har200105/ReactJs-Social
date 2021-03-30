import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user';
import './style.css';
import { db } from '../../fbse';

export default function CommentInput({comments,id}) {
    const[comment,setComment] = useState("");
    const[user,setUser] =  useContext(UserContext).user;
    const [commentArray, setcommentArray] = useState(comments ? comments : [])

    const addComment = ()=>{
        if(comment!==""){
        commentArray.push({
            comment: comment,
            username:user.email.replace("@gmail.com","").toLowerCase(),
        });

        db.collection('posts').doc(id).update({
            comments:commentArray,
        }).then(()=>{
            setComment("");
        }).catch((e)=>{
            console.log(e);
        })
    }
    }
    return (
        <div className="commentInput">
            <textarea className="commentInput_textarea"  rows="1"  
            placeholder="Wana Comment ??"
            onChange={(e)=>setComment(e.target.value)}
            value={comment}
            onClick={addComment}
            >
            </textarea>
            <button className="commentInput_btn">Comment</button>
        </div>
    )
}
