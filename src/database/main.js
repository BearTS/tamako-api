const Enmap = require('enmap');

const userTable = new Enmap({
    name: 'UserManager',
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

const canvasData = new Enmap({
    name: 'EditAvatarTable',
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',
    dataDir: './data/canvasData',
    autoEnsure: {
        'edit-avatar': {
            avatarFusion: [],
            eject: [],
            fire: [],
            hat: [],
            hearts: [],
            heLivesInYou: [],
            iHaveThePower: [],
            milk: [],
            rip: [],
            sip: [],
            steamNowPlaying: [],
            steamNowPlayingClassic: [],
            triggered: [],
        },
        'edit-image': [],
        'edit-meme': [],
    }
});

module.exports.canvasData = canvasData;
module.exports.userTable = userTable;