import "./home.css";
import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <div className="homeBackground">
          <Posts posts={posts} />
          {/* <Sidebar /> */}
        </div>
      </div>
    </>
  );
}
