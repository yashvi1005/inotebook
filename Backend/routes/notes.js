const express = require('express');
const router  = express.Router();
const authController = require('../controller/notes');
const fetchuser = require('../middleware/fetchuser');
const { body } = require("express-validator");

// ROUTE : 1 fetch all notes of particulaer user using GET "/api/notes/postFetchNotes"
 router.get('/postFetchNotes',fetchuser, authController.postFetchNotes)

// ROUTE : 2 Add a new not using POST "/api/notes/postNotes" //Login rewuired
router.post('/postNotes',fetchuser,
[
    body('title','Enter valid Title' ).isLength({ min : 3}),
    body('description', 'description length must be 5 charcater').isLength({ min : 5})
],
authController.postNotes)

// ROUTE : 3 update a new not using POST "/api/notes/postUpdateNotes" //Login required
router.put('/postUpdateNotes/:id',fetchuser,
[
    body('title','Enter valid Title' ).isLength({ min : 3}),
    body('description', 'description length must be 5 charcater').isLength({ min : 5})
],
authController.postUpdateNotes)

// ROUTE : 3 update a new not using POST "/api/notes/postDeleteNotes" //Login required
router.delete('/postDeleteNotes/:id',fetchuser, authController.postDeleteNotes)

    module.exports = router;