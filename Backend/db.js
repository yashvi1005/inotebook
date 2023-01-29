const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://yashvi:Tc91gSYMc0O5Bviy@cluster0.cshlb.mongodb.net/inotebook"

const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongo')
    })
}

module.exports = connectToMongo