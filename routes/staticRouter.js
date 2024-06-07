import express from 'express';
import URL from '../models/url.js'
import { checkAuth } from '../middlerware/auth.js';

const router = express.Router();


router.get('', checkAuth, async (req, res) => {
    console.log('req.user', req.user);
    if (!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy: req.user._id })
    console.log('allurls', allUrls);
    // const allUrls = await URL.find()
    // console.log('allurls links', allUrls);
    res.render('home', { urls: allUrls })
})

router.get('/signup', async (req, res) => {
    res.render('signup')
})

router.get('/login', async (req, res) => {
    res.render('login')
})
export { router }