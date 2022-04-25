const router = require('express').Router();

const {
    threekyears,
    alert,
    bartChalkboard,
    beLikeBill,
    beautiful,
    boardroomMeeting,
    challenger,
    changeMyMind,
    chiIdea,
    crush,
    cursedSponge,
    deepFry,
    demotivational,
    distractedBF,
    drakePosting,
    EddFactBook,
    enslaved,
    FoodBroke,
    ForFiveHours,
    genieRules,
    girlWorthFightingFor,
    gruPlan,
    iFearNoMan,
    ifThoseKidsCouldRead,
    kyonGun,
    like,
    LisaPresentation,
    LookAtThisPhotograph,
    MarioBrosViews,
    memeGenClassic,
    memeGenModern,
    metamorphosis,
    MyCollectionGrows,
    newPassword,
    nikeAd,
    PanikKalmPanik,
    PhoebeTeachingJoey,
    pills,
    PlanktonPlan,
    pogchamp,
    ScrollOfTruth,
    SkyrimSkill,
    SonicSays,
    soraSelfie,
    sos,
    SpidermanPointing,
    SpongebobBurn,
    ThatSignWontStopMe,
    ThisGuy,
    ToBeContinued,
    TuxedoPooh,
    TwoButtons,
    UltimateTattoo,
    VietnamFlashbacks,
    WorseThanHitler,
    worthless,
} = require('../../../controllers/edit-meme');
const { errorResponse } = require('../../../helper/ApiResponse');
const { authRateLimiter } = require('../../../middleware/rateLimiter');

// Ratelimiter
router.use(authRateLimiter);

router.get('/3000years', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await threekyears(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/alert', async (req, res) => {
    const message = req.query.message;
    if (!message) return errorResponse(req, res, 'Invalid message', 406);
    if (message.length > 280) return errorResponse(req, res, 'Message too long', 406);
    try {
        const buffer = await alert(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/bartChalkboard', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 50) return errorResponse(req, res, 'Message too long', 406);
    try {
        const buffer = await bartChalkboard(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/beLikeBill', async (req, res) => {
    const name = req.query.name || 'Bill';
    if (!name) return errorResponse(req, res, 'Name is required', 406);
    if (name.length > 50) return errorResponse(req, res, 'Message too long', 406);
    try {
        const buffer = await beLikeBill(name);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/beautiful', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return errorResponse(req, res, 'Avatar URL required', 406);
    try {
        const buffer = await beautiful(avatarURL);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/boardroomMeeting', async (req, res) => {
    const { question, suggestion1, suggestion2, final} = req.query;
    if (!question || !suggestion1 || !suggestion2 || !final) return errorResponse(req, res, 'Missing Parameters', 406);
    if (question.length > 100 || suggestion1.length > 50 || suggestion2.length > 50 || final.length > 50) return errorResponse(req, res, 'Strings too long', 406);
    try {
        const buffer = await boardroomMeeting(question, suggestion1, suggestion2, final);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/challenger', async (req, res) => {
    const { image, silhouetted } = req.query;
    if (!image || !silhouetted) return errorResponse(req, res, 'Invalid Parameters', 406);
    try {
        const buffer = await challenger(image, silhouetted);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/change-my-mind', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await changeMyMind(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/chi-idea', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 100) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await chiIdea(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/crush', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Avatar URL required', 406);
    try {
        const buffer = await crush(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/cursed-sponge', async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return errorResponse(req, res, 'No amount provided', 406);
    if (amount > 100) return errorResponse(req, res, 'Amount too high', 406);
    if (amount < 1) return errorResponse(req, res, 'Amount too low', 406);
    try {
        const buffer = await cursedSponge(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/deep-fry', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Image required', 406);
    try {
        const buffer = await deepFry(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/demotivational', async (req, res) => {
    const { title, image, text } = req.query;
    if (!title) return errorResponse(req, res, 'Title required', 406);
    if (!text) return errorResponse(req, res, 'Amount too low', 406);
    if (!image) return errorResponse(req, res, 'Image required', 406);
    if (text.length > 100 || title.length > 50) return errorResponse(req, res, 'Amount too low', 406);
    try {
        const buffer = await demotivational(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/distracted-boyfriend', async (req, res) => {
    const { otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL } = req.query;
    if (!otherGirlAvatarURL || !boyfriendAvatarURL|| !girlfriendAvatarURL) return errorResponse(req, res, 'Missing Parameters', 406);
    try {
        const buffer = await distractedBF(otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/drakePosting', async (req, res) => {
    const { yeah, nah } = req.query;
    if (!yeah || !nah) return errorResponse(req, res, 'Missing Parameters', 406);
    if (yeah.length > 500 || nah.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await drakePosting(nah, yeah);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/edd-facts-book', async (req, res) => {
    const fact = req.query.fact;
    if (!fact) return errorResponse(req, res, 'No text provided', 406);
    if (fact.length > 500) return errorResponse(req, res, 'Message too long', 406);
    try {
        const buffer = await EddFactBook(fact);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/enslaved', async (req, res) => {
    const { image, name } = req.query;
    if (!image) return errorResponse(req, res, 'Image required', 406);
    if (!name) return errorResponse(req, res, 'No Name provided', 406);
    if (name.length > 20) return errorResponse(req, res, 'Name too long', 406);
    try {
        const buffer = await enslaved(name, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/food-broke', async (req, res) => {
    const avatarURL = req.query.avatarURL;
    if (!avatarURL) return errorResponse(req, res, 'Avatar URL required', 406);
    try {
        const buffer = await FoodBroke(avatarURL);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/for-five-hours', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await ForFiveHours(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/genie-rules', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await genieRules(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/girl-worth-fighting-for', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await girlWorthFightingFor(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});


router.get('/gru-plan', async (req, res) => {
    const { step1, step2, step3 } = req.query;
    if (!step1 || !step2 || !step3) return errorResponse(req, res, 'Missing Parameters', 406);
    if (step1.length > 150 || step2.length > 150 || step3.length > 150) return errorResponse(req, res, 'Parameters provided should be less than 150 characters', 406);
    try {
        const buffer = await gruPlan(step1, step2, step3);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/i-fear-no-man', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await iFearNoMan(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/if-those-kids-could-read', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await ifThoseKidsCouldRead(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/kyonGun', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await kyonGun(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/like', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await like(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/lisa-presentation', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await LisaPresentation(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/look-at-this-photograph', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await LookAtThisPhotograph(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/mario-bros-view', async (req, res) => {
    const {thing, mario, luigi}= req.query;
    if (!thing, !mario, !luigi) return errorResponse(req, res, 'Missing Parameters', 406);
    if (thing.length > 20 || mario.length > 280 || luigi.length > 280) return errorResponse(req, res, 'Too long', 406);
    try {
        const buffer = await MarioBrosViews(thing, mario, luigi);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/meme-gen-classic', async (req, res) => {
    const { top, bottom, image }= req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    if (!top || !bottom) return errorResponse(req, res, 'Please provide a top and bottom text', 406);
    if (top.length > 50 || bottom.length > 50) return errorResponse(req, res, 'Parameters provided should be less than 50 characters', 406);
    try {
        const buffer = await memeGenClassic(top, bottom, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a meme with this image.', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/meme-gen-modern', async (req, res) => {
    const { text, image }= req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    if (!text ) return errorResponse(req, res, 'Missing Parameters');
    try {
        const buffer = await memeGenModern(text, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/metamorphosis', async (req, res) => {
    const { name, image }= req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    if (!name ) return errorResponse(req, res, 'Missing Parameters');
    if (name.length > 280) return errorResponse(req, res, 'Name too long', 406);
    try {
        const buffer = await metamorphosis(name, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/my-collection-grows', async (req, res) => {
    const image = req.query.image;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await MyCollectionGrows(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/new-password', async (req, res) => {
    const {weak, strong}= req.query;
    if (!weak, !strong) return errorResponse(req, res, 'Missing Parameters', 406);
    if (weak.length > 50 || strong.length > 50) return errorResponse(req, res, 'Too long', 406);
    try {
        const buffer = await newPassword(weak, strong);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/nike-ad', async (req, res) => {
    const { something, sacrifice, image }= req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    if (!something || !sacrifice) return errorResponse(req, res, 'Missing Parameters');
    if (something.length > 50 || sacrifice.length > 50) return errorResponse(req, res, 'Parameters provided should be less than 50 characters', 406);
    try {
        const buffer = await nikeAd(image, something, sacrifice);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        if (buffer === 406) return errorResponse(req, res, 'There\'s not enough width to make a Nike ad with this image.', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/panik-kalm-panik', async (req, res) => {
    const {panik, kalm, panik2} = req.query;
    if (!panik || !kalm || !panik2) return errorResponse(req, res, 'Missing Parameters');
    if (panik.length > 500 || kalm.length > 500 || panik2.length > 500) return errorResponse(req, res, 'Parameters provided should be less than 500 characters', 406);
    try {
        const buffer = await PanikKalmPanik(panik, kalm, panik2);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/phoebe-teaching-joey', async (req, res) => {
    const { correct, incorrect } = req.query;
    if (!correct || !incorrect) return errorResponse(req, res, 'Missing Parameters');
    if (correct.split(' ') < 3) return errorResponse(req, res, 'Correct answer should be at least 3 words', 406);
    if (correct.length > 50) return errorResponse(req, res, 'Correct answer should be less than 50 characters', 406);
    try {
        const buffer = await PhoebeTeachingJoey(correct, incorrect);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});


router.get('/pills', async (req, res) => {
    const text = req.query.text;
    if (!text) return errorResponse(req, res, 'No text provided', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await pills(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/plankton-plan', async (req, res) => {
    const { step1, step2, step3 } = req.query;
    if (!step1 || !step2 || !step3) return errorResponse(req, res, 'Missing Parameters');
    if (step1.length > 150 || step2.length > 150 || step3.length > 150) return errorResponse(req, res, 'Parameters provided should be less than 150 characters', 406);
    try {
        const buffer = await PlanktonPlan(step1, step2, step3);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/pogchamp', async (req, res) => {
    const amount = req.query.amount;
    if (!amount) return errorResponse(req, res, 'Please provide an amount', 406);
    if (amount.length > 100) return errorResponse(req, res, 'Amount too long', 406);
    try {
        const buffer = await pogchamp(amount);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/scroll-of-truth', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'Please provide text', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await ScrollOfTruth(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/skyrim-skill', async (req, res) => {
    const { skill, image }= req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    if (!skill) return errorResponse(req, res, 'Please provide a skill', 406);
    if (skill.length > 20) return errorResponse(req, res, 'Skill provided should be less than 20 characters', 406);
    try {
        const buffer = await SkyrimSkill(skill, image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/sonic-says', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'Please provide text', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await SonicSays(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/soraSelfies', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await soraSelfie(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/sos', async (req, res) => {
    const { message } = req.query;
    if (!message) return errorResponse(req, res, 'Please provide a message', 406);
    if (message.length > 10) return errorResponse(req, res, 'Message should be less than 10 characters', 406);
    try {
        const buffer = await sos(message);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/spiderman-pointing', async (req, res) => {
    const { first, second } = req.query;
    if (!first || !second) return errorResponse(req, res, 'Please provide two images', 406);
    if (first.length > 500 || second.length > 500) return errorResponse(req, res, 'Image url should be less than 500 characters', 406);
    try {
        const buffer = await SpidermanPointing(first, second);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/spongebob-burn', async (req, res) => {
    const { burn, person } = req.query;
    if (!burn || !person) return errorResponse(req, res, 'Please provide an image and a person', 406);
    if (burn.length > 150 || person.length > 15) return errorResponse(req, res, 'Image url and person should be less than 15 characters', 406);
    try {
        const buffer = await SpongebobBurn(burn, person);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/that-sign-wont-stop-me', async (req, res) => {
    const { text } = req.query;
    if (!text) return errorResponse(req, res, 'Please provide text', 406);
    if (text.length > 500) return errorResponse(req, res, 'Text too long', 406);
    try {
        const buffer = await ThatSignWontStopMe(text);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ThisGuy', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await ThisGuy(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/ToBeContinued', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await ToBeContinued(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/TuxedoPooh', async (req, res) => {
    const { normal, tuxedo }  = req.query;
    if (!normal || !tuxedo) return errorResponse(req, res, 'Please provide two images', 406);
    if (normal.length > 500 || tuxedo.length > 500) return errorResponse(req, res, 'Image url should be less than 500 characters', 406);
    try {
        const buffer = await TuxedoPooh(normal, tuxedo);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/TwoButtons', async (req, res) => {
    const { first, second } = req.query;
    if (!first || !second) return errorResponse(req, res, 'Please provide two images', 406);
    if (first.length > 280 || second.length > 280) return errorResponse(req, res, 'Image url should be less than 280 characters', 406);
    try {
        const buffer = await TwoButtons(first, second);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/UltimateTattoo', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await UltimateTattoo(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/VietnamFlashbacks', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await VietnamFlashbacks(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/WorseThanHitler', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await WorseThanHitler(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

router.get('/worthless', async (req, res) => {
    const { image } = req.query;
    if (!image) return errorResponse(req, res, 'Please provide an image');
    try {
        const buffer = await worthless(image);
        if (buffer === 0) return errorResponse(req, res, 'Invalid image url', 406);
        res.writeHead(200,{ 'Content-Type': 'image/jpg' });
        res.end(buffer);
    } catch (err) {
        errorResponse(req, res, err.message, 500);
    }
});

module.exports = router;
