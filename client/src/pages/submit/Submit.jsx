import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../context/Context'
import './submit.css'
export default function Submit() {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const {user} = useContext(Context);
const handleSubmit = async (e)=> {
  e.preventDefault();
  const newPost = {
    username:user.username,
    title,
    desc,
  };
  if(file){
    const data =new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename)
    data.append("file",file)
    newPost.photo = filename;
    try{
      await axios.post("/upload", data);
    }catch(err){}
  }
  try{
    const res = await axios.post("/posts", newPost);
    window.location.replace("/");
   }catch(err){}  
  };
  return (
    <div className="submit">
      {file && (
        <img className="submitImg" alt="" src={URL.createObjectURL(file)}/>
      )}
        <form className='submitForm' onSubmit={handleSubmit}>
            <div className="submitFormGroup">
                <label htmlFor='fileInput'><i className=" submitIcon fa-solid fa-upload"></i></label>
                <input type='file' id='fileInput' style=
                {{display:"none"}} 
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <input type='text' placeholder='Title' className='submitInput' autoFocus={true}
                onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className="submitFormGroup">
                <textarea placeholder='Desciption' type='text' className="submitInput submitText" 
                onChange={e=>setDesc(e.target.value)}></textarea>
            </div>
            <button className="submitBtn" type="submit">Submit</button>
        </form>
    </div>
  )
}
