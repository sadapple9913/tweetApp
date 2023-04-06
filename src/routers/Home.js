import React, { useEffect, useState } from 'react'
import { querySnapshot, addDoc, getDocs, onSnapshot, orderBy, query, collection } from "firebase/firestore";
import {db,storage} from '../fbase'
import Tweet from '../components/TweetMention';
import { v4 as uuidv4 } from 'uuid';
import {ref, uploadString, getDownloadURL } from "firebase/storage";
import TweetInsert from '../components/TweetInsert';
import "../styles/TweetInsert.scss"
import Navigation from '../components/Navigation';



function Home({ userObj }) {
  console.log(`userObj->`,userObj);
  // const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);


  useEffect(() =>{
    // getTweets();
      const q = query(collection(db,"tweets"),
                  orderBy("createdAt","desc"));
      const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) =>{
          newArray.push({...doc.data(), id:doc.id});
          console.log(newArray);
        });
        setTweets(newArray);
      });
  },[]);


  return (
    <>
    <div className='container'>
      <TweetInsert userObj={userObj} />
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id} 
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
          />
      ))}

    </div>
    {/* <Navigation userObj={userObj} /> */}
  </>
  )
}

export default Home