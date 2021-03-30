import React,{useContext,useState} from 'react'
import './style.css';
import { SignIn } from '../../components';
import {UserContext} from '../../context/user';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { db, storage } from '../../fbse';
import makeID from '../../helper/strings';
import firebase from 'firebase';


export default function CreatePost() {
    const[user,setUser] = useContext(UserContext).user;
    const [caption,setCaption] = useState("");
    const[image,setImage] = useState(null);
    const[progress,setProgress] = useState(0);
   
    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            var selectedImagesrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById('image_preview');
            imagePreview.src = selectedImagesrc;
            imagePreview.style.display = "block";
        }
    };
    const handleUpload=()=>{
        if(image){
            var name = makeID(10);
            const uploadData = storage.ref(`images/${name}.jpg`)
            .put(image);

            uploadData.on('state_changed', (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            },(e)=>{
                console.log(e);
            },()=>{
                storage.ref('images').child(`${name}.jpg`)
                .getDownloadURL().then((imgs)=>{
                    db.collection('posts').add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption :caption,
                        photoUrLs:imgs,
                        username :user.email.replace("@gmail.com"," "),
                    });
                });
                setCaption("");
                setProgress(0);
                setImage(null);

                document.getElementById("image_preview").style.display="none";
            });

        }
    };
    return (
        <div className="createPost">
        {user ? (
                <div className="createpost_login" >
                <p>Create Post</p>
                <div className="createpost_login_center">
                <textarea className="create_post"
                rows='3'
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                placeholder="Enter Some Caption Bro !!"
                >
                </textarea>
                <div>
                </div>
                <div className="createPost_image">
                <img id="image_preview" alt=""/> 
                </div>
                </div>
             <div className="post_social">
             <div className="createPost_imageUpload">
             <label htmlFor="a">
             <AddAPhotoIcon style={{cursor:"pointer" ,fontSize:"20px"}}/>
             </label>
             <input  id="a" type="file" accept="image/*"  onChange={handleChange}/>
             </div>
             <button className="post_upload" onClick={handleUpload} 
             style={{color: caption ? "#000":"lightgrey"}}>
             {`Upload ${progress!==0 ? progress :""}`}
             </button>
             </div>
                </div>
                ) : ( 
                <div>
            <SignIn/>
            <p style={{ marginLeft:"12px"}}>Post and Comment</p>
            </div>
            )}
            
        </div>
    );
}
