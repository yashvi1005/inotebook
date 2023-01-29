import React, { useState } from "react";
import NoteContext  from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
    const notesinitial =[]

      const [notes,setNotes] = useState(notesinitial)

      //get User detail
      const getUser = async() => {
        //API call
        const response = await fetch(`${host}/api/auth/logedinUser`, {
          method: 'GET',
           headers: {
            'auth-token'  : localStorage.getItem('token')
          }
        });
       const json = await response.json()
       console.log("my json" , json)
       setNotes(json);
      }

       //get note
       const getNote = async() => {
        //API call
        const response = await fetch(`${host}/api/notes/postFetchNotes`, {
          method: 'GET',
           headers: {
            'Content-Type': 'application/json',
            'auth-token'  : localStorage.getItem('token')
          }
        });
       const json = await response.json()
       console.log('my json',json)
       setNotes(json);
      }

      //Add note
      const addNote = async(title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/postNotes`, {
          method: 'POST',
           headers: {
            'Content-Type': 'application/json',
            'auth-token'  : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const note = await response.json();
        setNotes(notes.concat(note));
      }

      //Delete note
      const deleteNote = async(_id) => {
        //API call
        const response = await fetch(`${host}/api/notes/postDeleteNotes/${_id}`, {
          method: 'DELETE',
           headers: {
            'Content-Type': 'application/json',
            'auth-token'  : localStorage.getItem('token')
          },
          body: JSON.stringify({}) 
        });
        const json = response.json(); 
        console.log(json)
        // console.log('deleting note' + _id)
        const newNotes = notes.filter((note) => {
          return note._id !== _id
        })
        setNotes(newNotes);
    }

      //Edit note
      const editNote = async(_id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/postUpdateNotes/${_id}`, {
          method: 'PUT',
           headers: {
            'Content-Type': 'application/json',
            'auth-token'  : localStorage.getItem('token')
          },
          body: JSON.stringify({title ,description ,tag}) 
        });
        const json = response.json(); 
        console.log(json)
      
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === _id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
          }
          
        }
        setNotes(newNotes)
    }
  
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote, getUser}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;