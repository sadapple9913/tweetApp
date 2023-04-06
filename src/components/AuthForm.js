import React, { useState } from 'react'
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import '../styles/AuthForm.scss'

function AuthForm() {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccount] = useState(true);

  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);  
    } else if (name === "password") {
      setPassword(value);
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccout) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
    <form onSubmit={onSubmit} className='container'>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange} className='authInput'
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange} className='authInput'
        />
        <input type="submit" value={newAccout ? "Create Account" : "Sign In"} className='authInput authSubmit' />
        {error && <span className='authError'>{error}</span>}
      </form>

      <span onClick={toggleAccount} className='authSwitch'>
      {newAccout ? "Sign In" : "Create Account"}
      </span>
    </>
  )
}

export default AuthForm