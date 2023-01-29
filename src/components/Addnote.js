import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote ] = useState({title: "", description: "", tag: ""})

  const handleAddClick = (e) => {
    e.preventDefault();
    // addNote(note)
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added successfully", "success")
    setNote({title: "", description: "", tag: ""})
  }
  
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div className="container my-4">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            minLength={5}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              value={note.tag}
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          
          <button type="submit" disabled={note.title.length<5 || note.description.length< 5} className="btn btn-primary" onClick={handleAddClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}

export default Addnote
