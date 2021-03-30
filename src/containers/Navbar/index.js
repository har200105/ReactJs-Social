import React from 'react';
import{useContext } from 'react';
import {UserContext} from '../../context/user';
import { SignIn } from '../../components';
import './style.css';


export default function Navbar() {
    const[user,setUser] = useContext(UserContext).user;
    return (
        <div className="navbar">
            <p>Sociallyy</p>
          {user ? <img className="navbar_img" src={user.photoURL}  alt=""/> : <SignIn/> } 
        </div>
    )
}
