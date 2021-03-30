import React, {useContext } from 'react';
import { signInWithGoogle } from '../../Services/auth';
import {UserContext} from '../../context/user';
import './styles.css';

export default function SigninBtn() {
    const[users,setUser] = useContext(UserContext).user;
    console.log(users);


    const signInFunction = async () =>{
        let userSigned = await signInWithGoogle();
        if(userSigned){
            setUser(userSigned);
            console.log(userSigned);
        }
    };


    return (
        <div className="signin-btn" onClick={signInFunction}>
        <p>Sign In With Google</p>      
        </div>
    );
}
