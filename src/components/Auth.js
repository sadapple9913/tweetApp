import React, { useState } from "react";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider,GithubAuthProvider,signInWithPopup,} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthForm from "./AuthForm";
import '../styles/Auth.scss'


function Auth() {
  const auth = getAuth();

 

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new GoogleAuthProvider();
    } else if (name === "GitHub") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon icon="fa-brands fa-twitter" size="3x" color={"#04aaff"} style={{marginBottom:30}} />
      
      <AuthForm />

      <div className="authBtns">
        <button onClick={onSocialClick} name="Google" className="authBtn">
          Coutinue wiht Google. <FontAwesomeIcon icon="fa-brands fa-google" />
        </button>
        <button onClick={onSocialClick} name="GitHub" className="authBtn">
          Coutinue wiht GitHub. <FontAwesomeIcon icon="fa-brands fa-github" />
        </button>
      </div>
    </div>
  );
}

export default Auth;
