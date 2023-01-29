import React,{useContext, useEffect} from 'react'
import noteContext from "../context/notes/NoteContext";
import User from "./User";

const Myprofile = () => {
  const context = useContext(noteContext);
  const { notes, getUser} = context;
  console.log('my Notes',notes)
  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {notes.length === 0 && "No Notes found"}
      
            {<User/>}
          
    </div>
  )
}

export default Myprofile
