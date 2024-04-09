const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userSignUp = async (request, response) => {
    try {
        console.log("inside the signUp page")
        console.log(request.body);
        const exist = await User.findOne({
            $or: [
                { username: request.body.username },
                { email: request.body.email }
            ]
        });

        if (exist) {
            if (exist.username === request.body.username) {
                return response.status(401).json({ message: 'Username already exists' });
            } else if (exist.email === request.body.email) {
                return response.status(401).json({ message: 'Email already exists' });
            }

        }

        else {
            request.body.password = await bcrypt.hash(request.body.password, 10);

            const user = request.body;
            //const email = user.email

            //otp = await sendOTP({ email: email })
            // user.otp = otp
            const newUser = new User(user);
            await newUser.save();
            console.log(newUser)
            response.status(200).json({
                message: 'User registered successfully',
                date: {
                    data: user
                }
            });
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: error });
    }
}
const userLogIn = async () => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error });
    }
}
module.exports.userSignUp = userSignUp
module.exports.userLogIn = userLogIn