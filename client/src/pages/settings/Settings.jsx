import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Settings() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      email,
      password,
    };
    //
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile picture:</label>
          <div className="settingsProfilePicture">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsProfileIcon fa-solid fa-user-tie"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>User name:</label>
          <input type="text" placeholder={user.username} disabled="true" />
          <label>Email:</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              Profile has been updated.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
