import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const User = (props) => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
    <div className="container text-center">
      <h3>Profile Detail 👩‍💻</h3>
    </div>
    
    <div className="container">
     
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          value={notes.name}
          className="form-control"
          id="name"
          name="name"
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          value={notes.email}
          className="form-control"
          id="email"
          name="email"
          readOnly
        />
      </div>
    </div>
    </>
  );
};

export default User;
