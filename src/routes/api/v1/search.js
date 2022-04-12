const router = require('express').Router();
const {
    anime, book, company, country, define, github, npm, steam, knowYourMeme
} = require('../../../controllers/search');
const { authorizeUser } = require('../../../middleware/authorize');

router.get('/anime', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await anime(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/book', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await book(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/company', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await company(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/country', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await country(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/define', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await define(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/github', authorizeUser, async (req, res) => {
    const { author, repository } = req.query;
    if (!author || !repository) return res.status(400).json({ error: 'Please provide an author and a repository!' });
    try {
        const data = await github(author, repository);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/npm', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await npm(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/steam', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await steam(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/knowYourMeme', authorizeUser, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Please provide a query!' });
    try {
        const data = await knowYourMeme(query);
        res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;