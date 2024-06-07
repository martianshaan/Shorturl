import { nanoid } from 'nanoid';
import URL from '../models/url.js';

const handleShortGenerateURL = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'url is required' });
    }

    const urlIsPresent = await URL.findOne({ redirectUrl: body.url.trim() })

    console.log('urlIsPresent', urlIsPresent);
    if (urlIsPresent) {
        const shortID = urlIsPresent.shortId;
        res.status(201).json({ shortId: shortID });
    }
    const shortID = nanoid(8);

    console.log('body ki url', body.url);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url.trim(),
        visitedHistory: [],
        createdBy: req.user._id
    });

    // res.status(201).json({ shortId: shortID });
    res.redirect("/")
};

const handleGetShortURL = async (req, res) => {
    const shortId = req.params.id;
    try {
        const entry = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitedHistory: {
                    timestamp: Date.now()
                }
            }
        })

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        console.log('entry', entry);

        const directToThisURL = entry.redirectUrl

        console.log('redirecturl', entry.redirectUrl);
        res.redirect(directToThisURL)
    } catch (errpr) {
        console.error('Error occurred while processing the short URL:', error);
        res.status(500).send('Internal server error');
    }
};

const handleAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
}
export { handleShortGenerateURL, handleGetShortURL, handleAnalytics };
