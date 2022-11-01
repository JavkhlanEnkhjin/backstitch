import './singlePost.css'
import {useLocation} from "react-router"
import { useEffect } from 'react';
import axios from 'axios';

export default function SinglePost() {
    const location = useLocation();
    const pathSplitted = location.pathname.split("/")[2];
    console.log(pathSplitted); 
    // useEffect(() => {
    //     const getPost = async () => {
    //         const res = await axios.get("/posts/"+path);
    //         console.log(res);
    //     };
    //     getPost();
    // },[path]);
   
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            <img src="https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="singlePostImg" />
            <h1 className="singlePostTitle">Title vblala 
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
                    <i className="singlePostIcon fa-regular fa-trash-can"></i>
                </div>
            </h1>
            <div className="singlePostInfo">
                <span className='singlePostDate'>
                    1 hour ago
                </span>
            </div>
            <p className='singlePostDesc'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>
    </div>
  )
}
