import React from 'react';
import './home.css';
import { CreatePost, Navbar } from '../../containers';
import Feed from '../../containers/feed';

export default function home() {
    return (
        <div className="home">
        <Navbar/>
        <CreatePost/>
        <Feed/>
        </div>
    );
}
