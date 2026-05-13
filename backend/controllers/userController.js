const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const createUser = async(req, res) => {
    const {username, password, income} = req.body;
    if(!username|| !password){
        return res.status(400).json("username and password are required.");
    }
    
    try {
        //check if user already exist
        const existingUser = await User.findOne({username});  

        if(existingUser){
            return res.status(409).json("User already exist.");
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //create user
        const newUser = new User({
            username,
            password: hashedPassword,
            income
        });
        
        const savedUser = newUser.save();
        
        res.status(201).json({message: "User created successfully", userId: (await savedUser)._id});

        //create a JWT payload
        const payload = {userId: (await savedUser)._id, username: (await savedUser).username};

        //sign  token
        const token = jwt.sign(payload, secretKey, {expiresIn: '3h'});

        res.status(200).json({message: "Login successfully", token})
    } catch (error) {
        console.error({Registation_Error: error.message});
        res.status(500).json({Error: "Inernal Server Error"});
    }
}

const Login = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({error: "username and password are required"});
    }

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error: "Invalid credentials"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({error: "Invalid credentials"});
        }

        //payload
        const payload = {userId: user._id, username: user.username};

        //sign token
        const token = jwt.sign(payload, secretKey, {expiresIn: '3h'});

        res.status(200).json({message: "Login successfully", token});
    } catch (error) {
        console.error({Login_Error: error.message});
        res.status(500).json({error: "Internal Server Error"});
    }
}

const Me = async(req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.json(user);
    } catch (error) {
        console.error({Error_fetching_User: error.message});
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {createUser, Login, Me};