require('dotenv').config();
const { join } = require('path');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const isImageUrl = require('is-image-url');
const { stripIndents } = require('common-tags');


const threekyears = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', '3000-years.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 200, 200, 461, 127);
    ctx.drawImage(data, x, y, width, height);
    return canvas.toBuffer();
};

const alert = async (message) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'alert.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '30px SF Pro Display Medium';
    ctx.fillStyle = '#1f1f1f';
    ctx.textBaseline = 'top';
    let text = await wrapText(ctx, message, 540);
    text = text.length > 3 ? `${text.slice(0, 3).join('\n')}...` : text.join('\n');
    ctx.fillText(text, 48, 178);
    return canvas.toBuffer();
};

const bartChalkboard = async (text) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'bart-chalkboard.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.font = '19px akbar';
    ctx.fillStyle = 'white';
    const shortened = shortenText(ctx, text.toUpperCase(), 500);
    const arr = [];
    for (let i = 0; i < 12; i++) arr.push(shortened);
    ctx.fillText(arr.join('\n'), 30, 27);
    return canvas.toBuffer();
};

const beLikeBill = async (name) => {
    const texts = [
        '{{name}} has a girlfriend, but he doesn\'t post 56 photos a day about it. {{name}} likes to keep these things private.',
        '{{name}} is on the internet. {{name}} sees something that offends him. {{name}} moves on.',
        '{{name}} doesn\'t spam his friends with Be Like Bill memes.',
        '{{name}} doesn\'t drive with his fog lights on when it isn\'t foggy. {{name}} knows this is annoying and dazzles other drivers.',
        '{{name}} doesn\'t talk to a friend when that friend just woke up.',
        '{{name}} can afford a Mac but he gets a PC instead because {{name}} is not a dumbass.',
        '{{name}} does not play Candy Crush. {{name}} has a life.',
        '{{name}} is a jerk.',
        '{{name}} wakes up and sees it snowing outside. {{name}} doesn\'t post about it because he knows his friends also have windows.',
        '{{name}} knows tomorrow is Monday. {{name}} doesn\'t post about it, because he knows it happens every week.',
        '{{name}} doesn\'t shout at the TV when football is on. {{name}} knows they can\'t hear him.',
        '{{name}} pays attention in class instead of chatting with his friends on Discord.',
        '{{name}} has a good camera. {{name}} doesn\'t take useless photos and call himself a photographer.',
        '{{name}} doesn\'t beg for his PRs to get merged when he had three merged today.',
        '{{name}} is a bad meme. {{name}} has a good sense of humor about it.',
        '{{name}} likes to play games with his nephew. {{name}} lets him win all the time.',
        '{{name}} meets Della. {{name}} loves Della. Della loves {{name}}. {{name}} and Della dump social networks.',
        '{{name}} sees your picture has only three likes. {{name}} presses like and comments with a compliement.',
        '{{name}} bought a new car. {{name}} doesn\'t post pictures and tag 49 others about it.',
        '{{name}} is nice.',
        '{{name}} has the heart to tell the truth when his friends don\'t look very good.',
        '{{name}} likes dogs. {{name}} doesn\'t bring his dogs to your house uninvited.',
        '{{name}} likes to go bowling. {{name}} doesn\'t put up bumpers.',
        '{{name}} eats pant.',
        '{{name}} likes to use Tamako. {{name}} doesn\'t complain when it goes closed source.',
        '{{name}} loves to buy shoes. {{name}} doesn\'t buy 200 pairs for no reason.',
        '{{name}} doesn\'t like dogs. {{name}} doesn\'t complain on the internet because he knows no one cares.',
        '{{name}}. Enough said.',
        '{{name}} is a butt.',
        '{{name}} knows.',
        '{{name}} uses Discord\'s dark theme so he doesn\'t go blind.'
    ];
	
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'be-like-bill.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '23px arialbd';
    const text = await wrapText(ctx, texts[Math.floor(Math.random() * texts.length)].replaceAll('{{name}}', name), 569);
    ctx.fillText(stripIndents`
			This is ${name}.
			${text.join('\n')}
			${name} is smart.
			Be like ${name}.
		`, 31, 80);
    return canvas.toBuffer();
};

const beautiful = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'beautiful.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.drawImage(avatar, 249, 24, 105, 105);
    ctx.drawImage(avatar, 249, 223, 105, 105);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const boardroomMeeting = async (question, suggestion1, suggestion2, final) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'boardroom-meeting.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textBaseline = 'top';
    ctx.font = '25px Noto Regular';
    ctx.fillText(question, 153, 8, 300);
    ctx.font = '15px Noto Regular';
    ctx.fillText(suggestion1, 30, 251, 90);
    ctx.fillText(suggestion2, 167, 258, 75);
    ctx.fillText(final, 310, 269, 130);
    return canvas.toBuffer();
};

const challenger = async (image, silhouetted) => {
    if (!isImageUrl(image)) return 0;
    const truthy = new Set(['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+']);
    const falsy = new Set(['false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-']);
    if (truthy.has(silhouetted)) silhouetted = true;
    if (falsy.has(silhouetted)) silhouetted = false;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'challenger.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 256, 256, 484, 98);
    ctx.drawImage(silhouetted ? silhouetteImage(data) : data, x, y, width, height);
    return canvas.toBuffer();
};

const changeMyMind = async (text) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'change-my-mind.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-24 * (Math.PI / 180));
    ctx.font = '35px Noto Regular';
    let fontSize = 35;
    while (ctx.measureText(text).width > 843) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, text, 337);
    ctx.fillText(lines.join('\n'), 142, 430, 337);
    ctx.rotate(24 * (Math.PI / 180));
    return canvas.toBuffer();
};

const chiIdea = async (text) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'chi-idea.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '13px wildwordsroman';
    let fontSize = 15;
    while (ctx.measureText(text).width > 500) {
        fontSize--;
        ctx.font = `${fontSize}px wildwordsroman`;
    }
    const lines = await wrapText(ctx, text, 83);
    const topMost = 137 - (((fontSize * lines.length) / 2) + ((5 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 5) * i);
        ctx.fillText(lines[i], 70, height);
    }
    return canvas.toBuffer();
};

const crush = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'crush.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.rotate(-3.79 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 400, 400, 79, 472);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(3.79 * (Math.PI / 180));
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const cursedSponge = async (amount) => {
    const sponge = await loadImage(join(__dirname, '..', 'assets', 'images', 'cursed-spongs.png'));
    const rows = Math.ceil(amount / 10);
    const canvas = createCanvas(sponge.width * (rows > 1 ? 10 : amount), sponge.height * rows);
    const ctx = canvas.getContext('2d');
    let width = 0;
    for (let i = 0; i < amount; i++) {
        const row = Math.ceil((i + 1) / 10);
        ctx.drawImage(sponge, width, sponge.height * (row - 1));
        if ((width + sponge.width) === (sponge.width * (rows > 1 ? 10 : amount))) width = 0;
        else width += sponge.width;
    }
    return canvas.toBuffer();
};

const deepFry = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    desaturate(ctx, -20, 0, 0, data.width, data.height);
    contrast(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer('image/jpeg', { quality: 0.2 });
};

const demotivational = async (title, text, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(750, 600);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const { y, width, height } = centerImagePart(data, 602, 402, 0, 44);
    const x = (canvas.width / 2) - (width / 2);
    ctx.fillStyle = 'white';
    ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    ctx.drawImage(data, x, y, width, height);
    ctx.textAlign = 'center';
    ctx.font = '60px Noto Regular';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(shortenText(ctx, title, 610), 375, 518);
    ctx.font = '27px Noto Regular';
    ctx.fillStyle = 'white';
    ctx.fillText(shortenText(ctx, text, 610), 375, 565);
};

const dislike = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..', 'assets', 'images', 'dislike.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    return canvas.toBuffer();
};

const distractedBF = async (otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL) => {
    if (!isImageUrl(otherGirlAvatarURL) || !isImageUrl(boyfriendAvatarURL) || !isImageUrl(girlfriendAvatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'distracted-boyfriend.png'));
    const boyfriendAvatarData = await request.get(boyfriendAvatarURL);
    const boyfriendAvatar = await loadImage(boyfriendAvatarData.body);
    const girlfriendAvatarData = await request.get(girlfriendAvatarURL);
    const girlfriendAvatar = await loadImage(girlfriendAvatarData.body);
    const otherGirlAvatarData = await request.get(otherGirlAvatarURL);
    const otherGirlAvatar = await loadImage(otherGirlAvatarData.body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-18.06 * (Math.PI / 180));
    ctx.drawImage(boyfriendAvatar, 290, 165, 125, 125);
    ctx.rotate(18.06 * (Math.PI / 180));
    ctx.rotate(3.11 * (Math.PI / 180));
    ctx.drawImage(girlfriendAvatar, 539, 67, 100, 125);
    ctx.rotate(-3.11 * (Math.PI / 180));
    ctx.drawImage(otherGirlAvatar, 120, 96, 175, 175);
    return canvas.toBuffer();
};

const drakePosting = async (nah, yeah) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'drakeposting.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px Noto Regular';
    let fontSize = 50;
    while (ctx.measureText(nah).width > 3003) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const nahLines = await wrapText(ctx, nah, 462);
    const nahTopMost = 256 - (((fontSize * nahLines.length) / 2) + ((10 * (nahLines.length - 1)) / 2));
    for (let i = 0; i < nahLines.length; i++) {
        const height = nahTopMost + ((fontSize + 10) * i);
        ctx.fillText(nahLines[i], 768, height);
    }
    ctx.font = '50px Noto Regular';
    fontSize = 50;
    while (ctx.measureText(yeah).width > 3003) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const yeahLines = await wrapText(ctx, yeah, 462);
    const yeahTopMost = 768 - (((fontSize * yeahLines.length) / 2) + ((10 * (yeahLines.length - 1)) / 2));
    for (let i = 0; i < yeahLines.length; i++) {
        const height = yeahTopMost + ((fontSize + 10) * i);
        ctx.fillText(yeahLines[i], 768, height);
    }
};

const EddFactBook = async (fact) => {
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'edd-facts-book.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(15 * (Math.PI / 180));
    ctx.font = '30px Noto Regular';
    let fontSize = 30;
    while (ctx.measureText(fact).width > 458) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Regular`;
    }
    const lines = await wrapText(ctx, fact, 183);
    ctx.fillText(lines.join('\n'), 119, 306, 183);
    ctx.rotate(-15 * (Math.PI / 180));
    return canvas.toBuffer();
};

const enslaved = async (name, image) => {
    if (isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'enslaved.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const { x, y, width, height } = centerImagePart(data, 200, 200, 254, 145);
    ctx.drawImage(data, x, y, width, height);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.font = '50px Noto Regular';
    ctx.fillText(name.toLowerCase(), 365, 400, 240);
    return canvas.toBuffer();
};

const FoodBroke = async (avatarURL) => {
    if (!isImageUrl(avatarURL)) return 0;
    const base = await loadImage(join(__dirname, '..', 'assets', 'images', 'food-broke.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 23, 9, 125, 125);
    contrast(ctx, 23, 9, 125, 125);
    ctx.drawImage(avatar, 117, 382, 75, 75);
    contrast(ctx, 117, 382, 75, 75);
    return canvas.toBuffer();
};

const ForFiveHours = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const base = await loadImage(body);
    const plate = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'for-five-hours.png'));
    const scaleH = plate.width / base.width;
    const height = Math.round(base.height * scaleH);
    const canvas = createCanvas(plate.width, plate.height + height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0, plate.width, height);
    ctx.drawImage(plate, 0, height + 1);
    return canvas.toBuffer();
};

function contrast(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    const factor = (259 / 100) + 1;
    const intercept = 128 * (1 - factor);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = (data.data[i] * factor) + intercept;
        data.data[i + 1] = (data.data[i + 1] * factor) + intercept;
        data.data[i + 2] = (data.data[i + 2] * factor) + intercept;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function desaturate(ctx, level, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const dest = ((i * width) + j) * 4;
            const grey = Number.parseInt(
                (0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 1]) + (0.0721 * data.data[dest + 2]), 10
            );
            data.data[dest] += level * (grey - data.data[dest]);
            data.data[dest + 1] += level * (grey - data.data[dest + 1]);
            data.data[dest + 2] += level * (grey - data.data[dest + 2]);
        }
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function silhouetteImage(image) {
    if (!hasAlpha(image)) return image;
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    silhouette(ctx, 0, 0, image.width, image.height);
    return canvas;
}

function  silhouette(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = 0;
        data.data[i + 1] = 0;
        data.data[i + 2] = 0;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function hasAlpha(image) {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let hasAlphaPixels = false;
    for (let i = 3; i < data.data.length; i += 4) {
        if (data.data[i] < 255) {
            hasAlphaPixels = true;
            break;
        }
    }
    return hasAlphaPixels;
}

function centerImagePart(data, maxWidth, maxHeight, widthOffset, heightOffest) {
    let { width, height } = data;
    if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height *= ratio;
    }
    if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width *= ratio;
    }
    const x = widthOffset + ((maxWidth / 2) - (width / 2));
    const y = heightOffest + ((maxHeight / 2) - (height / 2));
    return { x, y, width, height };
}

function wrapText(ctx, text, maxWidth) {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) {
                    words[1] = `${temp.slice(-1)}${words[1]}`;
                } else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
                line += `${words.shift()} `;
            } else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}

function shortenText(ctx, text, maxWidth) { 
    let shorten = false;
    while (ctx.measureText(`${text}...`).width > maxWidth) {
        if (!shorten) shorten = true;
        text = text.substr(0, text.length - 1);
    }
    return shorten ? `${text}...` : text;
}


module.exports = {
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
    dislike,
    distractedBF,
    drakePosting,
    EddFactBook,
    enslaved,
    FoodBroke,
    ForFiveHours
};