import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, orderBy, where, addDoc } from "firebase/firestore";
import {db ,auth , storage} from '../fbase'
import { update } from "firebase/database";
import Tweet from "../components/TweetMention";
import { UpdateData } from "firebase/firestore";
import {async} from "@firebase/util"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navigation from "../components/Navigation";
import { getDownloadURL, ref, uploadString}  from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import "../styles/Profiles.scss"


const Profiles = ({userObj}) => {
  const [tweets , setTweets] = useState([]);
  const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
  const[attachment ,setAttachment ] = useState(userObj.photoUrl);
  const navigate = useNavigate();
   const [tweet, setTweet] = useState("");

  // const db = getFirestore();
  // const auth = getAuth();

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  useEffect(() =>{
    const q = query(collection(db, "tweets"), where("creatorId", "==", userObj.uid),orderBy("createdAt" ,"desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(), id:doc.id});
      });
      setTweets(newArray);
    });
  },[])


  const onChange = (e) =>{
    e.preventDefault();
    const { target: { value } } = e;
    setNewDisplayName(value);

    }
  
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        let attachmentUrl = "";
        if (attachment !== "") {
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(ref(storage, response.ref));
        }
        await updateProfile(userObj, {
          displayName: newDisplayName,
          photoURL: attachmentUrl !== "" ? attachmentUrl : userObj.photoURL,
        });
      } catch (e) {
        console.error("Error updating profile: ", e);
      }
      setAttachment("");
    };
  
  const onFileChange = (e) =>{
    console.log('e->',e);
    const {target:{files}} = e;

    const theFile = files[0];
    console.log('theFile->',theFile);

    const reader = new FileReader(); //브라우저에 사진미리보기를 하고싶으면 FileReader를 사용해야된다
    reader.onloadend = (finishedEvent) => {
      console.log("finishedEvent ->" ,finishedEvent);
      const {currentTarget:{result}} = finishedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); //theFile이라는 값을 URL로 읽어서 보이게 한다
  }

  const onClearAttachment = () =>{
    setAttachment("");
  }

console.log("newDisplayName ", newDisplayName )
console.log("photoURL ", attachment )

  return (
    <div className="container">
    <form onSubmit={onSubmit} className="profileForm" >
      <input type="text" onChange={onChange} value={newDisplayName} placeholder="Display Name" className="formInput" />
      {/* <img src="" alt='' /> */}
      <input type="submit" value="Update Profile" className="formBtn" />
      <input type='file' accept='image/*' onChange={onFileChange}  className="formBtn" style={{opacity:0}}/>
      {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
        <div>
          <img src={attachment} width="50" height="50" alt='' />
          <button onClick={onClearAttachment}>remove~~</button>

        </div>
        
      )}
    </form>
      <span onClick={onLogOutClick} className="formBtn cancleBtn logOut" >Log Out</span>
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id} 
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
          />
      ))}

    </div>
  );
};

export default Profiles;
