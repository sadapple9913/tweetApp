import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faGoogle, faGithub  ,} from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome , faGoogle, faGithub)

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState('');



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user : ",user);
        setIsLoggedIn(true);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });


  });
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      
      <footer>&copy;{new Date().getFullYear()} Tweet </footer>
    </>
  );
}

export default App;
