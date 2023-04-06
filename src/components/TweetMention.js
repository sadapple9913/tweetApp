import { deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {db,storage} from '../fbase'
import React, { useEffect, useState } from 'react'
import {ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/TweetMention.scss"


function Tweet(props) {
  const {tweetObj:{text,id,attachmentUrl,createdAt},isOwner,} = props;
  const [editing, setEditing] = useState(false);
  const [newTweet , setNewTweet] = useState(text);
  console.log(props);
  const[nowDate , setNowDate] = useState(createdAt);


  const onDeleteClick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
     const data = await deleteDoc(doc(db, "tweets", `/${id}`));
     if(attachmentUrl !== ""){
      const desertRef = ref(storage, attachmentUrl);
      await deleteObject(desertRef);
     }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev); //토글기능

  const onChange = (e) =>{
    const{target:{value}} = e;
    setNewTweet(value);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    const newTweetRef = doc(db, "tweets", `/${id}`);

    // Set the "capital" field of the city 'DC'
    await updateDoc(newTweetRef, {
      text: newTweet,
      createdAt : Date.now(),
    });

    setEditing(false);
    console.log(newTweetRef);
  }

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString());
    console.log("123",timeStamp);
  },[])


  return (
    <div className='tweet'>
      {editing ? (
        <>
        <form onSubmit = {onSubmit} className='container tweetEdit'>
           {attachmentUrl && (
            <img className='editImg' src={attachmentUrl} alt=''  />
            )}
          <input className='editInput' type='text' onChange={onChange} value={newTweet} required />
          <input type='submit' value="Updata Tweet" className='formBtn'/>
          </form > 
          <div onClick={toggleEditing} className='formBtn cancleBtn'>Cancle</div>

        </>

      ) : (

        <>
        <h4>{text}</h4>
        {attachmentUrl && (
        <img src={attachmentUrl} width="50" height="50" alt=''  />
        )}
        <span>{nowDate}</span>

        {isOwner && (
          <div className='tweet__actions'>
          <span onClick={onDeleteClick}>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
          </span>
          <span onClick={toggleEditing}>
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
          </span>
          </div>
 
        )}
         </>
      )}
      

    </div> 
  )
}

export default Tweet