import { getUser } from "../service/auth.js";

function restrictToLoggedInUsersOnly(req, res, next) {
    console.log('Request cookies:', req.cookies);
    const userUid = req.cookies?.uid;
    console.log('userUid', userUid);
    if (!userUid) return res.redirect('/login')

    const user = getUser(userUid)
    console.log('user from session map:', user);

    if (!user) return res.redirect('/login')

    req.user = user
    next()

}

function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid;
    const userUid = req.headers['authorization'];

    console.log('userUid', userUid);
    if (!userUid) {
        return res.redirect('/login');
    }


    const token = userUid.split('Bearer ')[1]
    console.log('token', token);
    const user = getUser(token)


    if (!user) return res.redirect('/login')

    req.user = user
    console.log('setting req.user', req.user);
    next()

}

export { restrictToLoggedInUsersOnly, checkAuth }