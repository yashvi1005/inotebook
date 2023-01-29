const Notes = require('../models/Notes');
const { validationResult} = require('express-validator');


exports.postFetchNotes = async (req, res) => {
    try{
    const notes = await Notes.find({user: req.user.id})
    res.json(notes);
} catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

exports.postNotes = async (req, res) => {
     //If there are errors return bad requst and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  const title = req.body.title;
  const description = req.body.description;
  const tag = req.body.tag;
  const date = req.body.date;

  const notes = new Notes(
    {
        title : title,
        description : description,
        tag : tag,
        date : date,
        user : req.user.id
    }
  )
  res.send(notes);
  return await notes.save();
    
} catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }

}

exports.postUpdateNotes = async(req, res) => {
    const {title, description , tag} = req.body;
    try{
    //create a new note object
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be update
    const note =await Notes.findById(req.params.id)
    if(!note){
       return res.status(404).send("404 Not found");
    }

    if(note.user.toString() !== req.user.id){
       return res.status(401).send("not Allowed");
    }
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(updatedNote);
} catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

exports.postDeleteNotes = async (req, res) => {
    try {
    const note = await Notes.findByIdAndRemove(req.params.id);
    if(!note){
        return res.status(404).send("404 Not found");
     }
 
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("not Allowed");
     }
     console.log('note deleted');
     res.json('note deleted')
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      }
}