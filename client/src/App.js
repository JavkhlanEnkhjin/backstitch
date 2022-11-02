import TopNav from "./components/topnav/TopNav";
import Home from "./pages/home/Home";
import Submit from "./pages/submit/Submit";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
/* import Single from "./pages/single/Single"; */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <home /> : <Login />} />
        <Route path="/submit" element={user ? <Submit /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        {/*
        <Route path="//post/:postId" element={<Single />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
