// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     console.log(`Setting user: ${id} ->`, user); 
//     return sessionIdToUserMap.set(id, user)
// }

// function getUser(id) {
//     console.log(`Getting user for id: ${id}`);
//     return sessionIdToUserMap.get(id)
// }

// export { setUser, getUser }

import jwt from 'jsonwebtoken'

const secret = 'shantanu@123$s'

function setUser(user) {
    console.log(`Setting user ->`, user);
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret)
}

function getUser(token) {
    console.log(`Getting user: ${token}`);
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}

export { setUser, getUser }