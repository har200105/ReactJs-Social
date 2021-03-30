import React, { useEffect, useState } from 'react';
import { db } from '../../fbse';
import Post from '../posts';
import './style.css';

export default function Feed() {
    const[posts,setPosts] =  useState([]);
    useEffect(()=>{
        db.collection('posts').onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map((doc)=>({id:doc.id, post:doc.data()})));
            })
        },[])
    return (
        <div className="feed">
        {
            posts.map(({id,post})=>{
                return <Post
                key={id}
                id={id}
                username={post.username}
                photoUrl = {post.photoUrLs}
                picUrl = {post.picurl}
                caption = {post.caption}
                comments={post.comments}
                />
            })
        }
        </div>
    )
}
