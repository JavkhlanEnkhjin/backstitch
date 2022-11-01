import "./posts.css"
import  Post from "../post/Post"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
export default function Posts({ posts }) {
const {user} = useContext(Context);
  return (
    <div className="posts">
      {posts.map((p, index)=> (
      <div key={index}>
        {p.username === user.username &&
          <Post post={p} />
        }
        </div>
      ))
    } 
    </div>
  )
}
