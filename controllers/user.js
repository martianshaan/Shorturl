import USER from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../service/auth.js';

const handleUserSignUp = async (req, res) => {
    console.log('Signup request received');
    const { name, email, password } = req.body
    console.log('body', req.body);

    await USER.create({
        name,
        email,
        password
    })

    res.redirect("/")
}


const handleUserLogin = async (req, res) => {
    const { name, email, password } = req.body
    // console.log('body', req.body);

    const validUser = await USER.findOne({ email, password })

    if (!validUser) {
        console.log('invalid user');
        return res.render("login", {
            error: "Invalid Username or Password"
        })
    }

    // const sessionId = uuidv4();

    // setUser(sessionId, validUser)
    const token = setUser(validUser)
    // res.cookie("uid", token)
    res.json({token})
    console.log('Login successful, sessionId:', token);

    res.redirect("/")
}

export { handleUserSignUp, handleUserLogin }