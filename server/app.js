const express = require('express');
const cors = require('cors')
const app = express();
const db = require('./config/db')

const bodyParser = require('body-parser');
const User = require('./controller/userController')
app.use(cors())
app.use(bodyParser.json());
const multer = require('multer')



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/signup', User.userSignUp)
app.post('/login', User.userLogIn)
//app.get('/users', User.displayUser)



app.listen(3005, () => {
    console.log('Server started on port 3005');
  });