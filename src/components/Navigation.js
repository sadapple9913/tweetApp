import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navigation({userObj , attachment}) {
  console.log("user->",userObj)
  return (
    <nav>
      <ul style={{display : "flex" , justifyContent: "center" , marginTop:50}}>
      <li>
        <Link to ={'/'}>
          <FontAwesomeIcon icon="fa-brands fa-twitter" size="2x" color={"#0faaff"} />
        </Link>
        </li>
      <li>
        <Link to ={'/Profiles'} style={{display: "flex", flexDirection: "column" , alignItems:"center" , marginLeft:10 , fontSize:12,}}>
        <FontAwesomeIcon icon="fa-solid fa-user" size="2x" color={"#0faaff"} />
        <span style={{marginTop:10}}>
          {userObj.displayName ? `${userObj.displayName}의 My profile` : "Profile"}
          </span>
        <img src={attachment} alt=''/>
      </Link>
      </li>
      </ul>
    </nav>
  )
}

export default Navigation