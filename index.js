import express from 'express';
import { ConnectMongoDb } from './connect.js';
import URL from './models/url.js';
import path from 'path';

import { router as urlRouter } from './routes/url.js';
import { router as urlGetRouter } from './routes/urlGet.js';
import { router as staticRouter } from './routes/staticRouter.js';
import { router as userRouter } from './routes/user.js';

import cookieParser from 'cookie-parser';
import { checkAuth, restrictToLoggedInUsersOnly } from './middlerware/auth.js';

ConnectMongoDb('mongodb://localhost:27017/short-url').then(() => {
    console.log('Mongodb connected');
});

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Public routes
app.use('/user', userRouter);
app.use('/', staticRouter);
app.use('', urlGetRouter);

// // Apply checkAuth to ensure user is authenticated before accessing these routes
// app.use(checkAuth);

app.get('/allurl', async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
    console.log('allurls links', allUrls);
    res.render('home', { urls: allUrls });
});

app.get('/test', async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
    console.log('allurls', allUrls);
    return res.send(`
    <html>
    <head>
    </head>   
    <body>
    <ol>
    ${allUrls.map((url, id) => `<li key=${url._id}>${url.shortId}-${url.redirectUrl}-${url.visitedHistory.length}</li>`).join('')}
    </ol>
    </body>
    </html>
    `);
});

app.use('/url', restrictToLoggedInUsersOnly, urlRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
