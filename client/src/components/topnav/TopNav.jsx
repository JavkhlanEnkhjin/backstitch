import "./topnav.css"
import React from 'react'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";
 
export default function TopNav() {
  

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className="topnav">
      <div className="topnavLeft">
       <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_41cbcf53abc70d9cb22d52c310e0b398/backstitch.jpg" alt='logo' />
      </div>
      <div className="topnavCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/submit">{user && "SUBMIT"}</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topnavRight">
    
        {user ? (
          
        <Link to="/settings">

          <img className="topImg"
          src={PF + user.profilePicture}
          alt=""
          />
        </Link>)
        :  ""
        }
      </div>
    </div>
  )
}
