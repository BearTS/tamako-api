const { letterTrans, wordTrans } = require('custom-translate');
const request = require('node-superfetch');

const base64 = async (mode, text) => {
    if (mode === 'encode') {
        return Buffer.from(text).toString('base64');
    } else {
        return Buffer.from(text, 'base64').toString('utf8');
    }
};

const binary = async (text) => {
    return text.split('').map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, '0');
    }).join(' ');
};

const braille = async(text) => {
    const dictionary =  require('../assets/json/braille');
    return letterTrans(text, dictionary);
};

const bronySpeak = async(text) => {
    const dictionary =  require('../assets/json/brony-speak');
    return wordTrans(text, dictionary);
};

const cowSay = async (text) => {
    const { body } = await request
        .get('http://cowsay.morecode.org/say')
        .query({
            message: text,
            format: 'json'
        });
    return body.cow;
};

const cursive = async (text) => {
    const dictionary =  require('../assets/json/cursive');
    return letterTrans(text, dictionary);
};

const Dvorak = async (text) => {
    const dictionary =  require('../assets/json/dvorak');
    return letterTrans(text, dictionary);
};

const emojify = async (text) => {
    const dictionary = require('../assets/json/emojify');
    return letterTrans(text, dictionary);
};

const fancy = async (text) => {
    const dictionary =  require('../assets/json/fancy');
    return letterTrans(text, dictionary);
};

module.exports = {
    binary,
    base64,
    braille,
    bronySpeak,
    cowSay,
    cursive,
    Dvorak,
    emojify,
    fancy
};