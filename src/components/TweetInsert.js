import React,{useState } from 'react'
import {addDoc,collection } from "firebase/firestore";
import {db,storage} from '../fbase'
import { v4 as uuidv4 } from 'uuid';
import {ref, uploadString, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/TweetInsert.scss"


function TweetInsert({userObj}) {

  const [tweet, setTweet] = useState("");
  const[attachment ,setAttachment ] = useState("");


  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let attachmentUrl = ""; 
        if(attachment !== ""){
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); //경로지정
          const response = await uploadString(storageRef, attachment, 'data_url');
          console.log('reponse ->',response)
          attachmentUrl = await getDownloadURL(ref(storage, response.ref));//https:
        }

      const docRef = await addDoc(collection(db, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid, // ID of the logged in user
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");
    setAttachment("")
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
      setAttachment(result); //이미지 데이터값
    }
    reader.readAsDataURL(theFile); //theFile이라는 값을 URL로 읽어서 보이게 한다
  }

  const onClearAttachment = () =>{
    setAttachment("");
  }

  return (
    <form onSubmit={onSubmit} className='InsertForm'>

    <div className='InsertInput__container'>

    <input
      type='text' 
      value={tweet}
      onChange={onChange}
      placeholder="go tweet~ go tweet~" 
      maxLength={120} className='InsertInput_Input'
    />
    <input type='submit' value={'Tweet'} className='InsertInput__arrow'/>
    </div>


   <label htmlfor="attach-file" className='InsertInput__label'>
    <span>Add photos123123123</span>
    <FontAwesomeIcon icon="fa-soild fa-plus" />
   </label>
   <input type='file' accept='image/*' onChange={onFileChange} id='attach-file' style={{opacity:0}} />



    {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
      <div className='Insertfom__attachment'>
        <img src={attachment}  width="100" height="100" style={{backgroundImage:attachment}} alt='' />
        <div className='Insertform__clear' onClick={onClearAttachment} >
        <span>Remove</span>
        <FontAwesomeIcon icon="fa-solid fa-xmark"/>
        </div>
        
      </div>
    )}

  </form>
  
  )
}

export default TweetInsert