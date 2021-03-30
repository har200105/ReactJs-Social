import { auth, provider } from '../fbse';


export const signInWithGoogle = async() => {
    let users;
    await auth.signInWithPopup(provider).then((res) => {
        console.log(res.user);
        users = res.user;
    }).catch((err) => {
        console.log(err.message);
    })


    return users;
}


export const logOut = async() => {
    let logOutSuccess;
    await auth.signOut()
        .then(() => {
            logOutSuccess = true;
        }).catch((res) => {
            console.log(res.message);
        });
    return logOutSuccess;
}