require('dotenv').config();
const { join } = require('path');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const isImageUrl = require('is-image-url');
const stackBlur = require('stackblur-canvas');
const moment = require('moment');

const minecraftachivement = async (text) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'achievement.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '17px Minecraftia';
    ctx.fillStyle = '#ffff00';
    ctx.fillText('Achievement Get!', 60, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(shortenText(ctx, text, 230), 60, 60);
    return canvas.toBuffer();
};

const approve = async (url) => {
    if (!isImageUrl(url)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'approved.png'));
    const { body } = await request.get(url);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const { x, y, width, height } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    return canvas.toBuffer();
};

const axiscult = async (username, gender, age, profession) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'axis-cult-sign-up.jpg'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '96px Konosuba';
    ctx.fillText(username, 960, 1558);
    ctx.fillText(gender, 960, 1752);
    ctx.fillText(age, 1700, 1752);
    ctx.fillText('XXX-XXX-XXXX', 960, 1960);
    ctx.fillText(profession, 960, 2169);
    ctx.fillText('Tamako', 960, 2370);
    ctx.font = '123px Konosuba';
    ctx.fillText('ERIS PADS\nHER CHEST!', 1037, 2874);
    return canvas.toBuffer();
}; 

const blur = async (radius, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    stackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, radius);
    return canvas.toBuffer();
};

const bobross = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'bob-ross.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    const { x, y, width, height } = centerImagePart(data, 440, 440, 15, 20);
    ctx.drawImage(data, x, y, width, height);
    ctx.drawImage(base, 0, 0);
    return canvas.toBuffer();
};

const brazzers = async (image) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'brazzers.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const ratio = base.width / base.height;
    const width = data.width / 3;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, 0, data.height - height, width, height);
    return canvas.toBuffer();
};

const caution = async (text) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'caution.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '60px Noto Bold';
    let fontSize = 60;
    while (ctx.measureText(text).width > 3311) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Bold`;
    }
    const lines = await wrapText(ctx, text.toUpperCase(), 895);
    const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    return canvas.toBuffer();
};

const certificate = async (reason, name) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'certificate.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '30px oldengl';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(reason, 518, 273);
    ctx.fillText(name, 518, 419);
    ctx.fillText(moment().format('MM/DD/YYYY'), 309, 503);
    return canvas.toBuffer();
};

const chineserestaurant = async (text) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'chinese-restaurant.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = '#1f1f1f';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 28px Futura Condensed';
    const lines = await wrapText(ctx, text.toUpperCase(), 340);
    if (lines.length === 1) {
        ctx.fillText(lines[0], base.width / 2, 288);
    } else if (lines.length === 2) {
        ctx.fillText(lines[0], base.width / 2, 288);
        ctx.fillText(lines[1], base.width / 2, 315);
    } else if (lines.length === 3) {
        ctx.fillText(lines[0], base.width / 2, 261);
        ctx.fillText(lines[1], base.width / 2, 288);
        ctx.fillText(lines[2], base.width / 2, 315);
    } else {
        ctx.fillText(lines[0], base.width / 2, 261);
        ctx.fillText(lines[1], base.width / 2, 288);
        ctx.fillText(lines[2], base.width / 2, 315);
        ctx.fillText(lines[3], base.width / 2, 342);
    }
    return canvas.toBuffer();
}; 

const circle = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const dimensions = data.width <= data.height ? data.width : data.height;
    const canvas = createCanvas(dimensions, dimensions);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(data, (canvas.width / 2) - (data.width / 2), (canvas.height / 2) - (data.height / 2));
    return canvas.toBuffer();
};

const color = async(color) => {
    color = color.toLowerCase();
    const canvas = createCanvas(250, 250);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 250, 250);
    return canvas.toBuffer();
};

const communist = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'chinese-restaurant.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, 'red', 0, 0, data.width, data.height);
    const { x, y, width, height } = centerImage(base, data);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(base, x + (width / 20), y + (height / 20), width * 0.9, height * 0.9);
    ctx.globalAlpha = 1;
    return canvas.toBuffer();
};

const contrast = async (image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    contrast(ctx, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const createQr = async (text) => {
    const { body } = await request
        .get('https://api.qrserver.com/v1/create-qr-code/')
        .query({ data: text });
    
    return body;
};

const danger = async (text) => {
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'danger.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '60px Noto Bold';
    let fontSize = 60;
    while (ctx.measureText(text).width > 2520) {
        fontSize--;
        ctx.font = `${fontSize}px Noto Bold`;
    }
    const lines = await wrapText(ctx, text.toUpperCase(), 840);
    const topMost = 510 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    return canvas.toBuffer();
};

const dannydevito = async (image) => {
    if (!isImageUrl(image)) return 0;
    const danny = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'danny-devito.png'));
    const imgData = await request.get(image);
    try {
        const faces = await detect(imgData);
        if (!faces) return 400;
        if (faces === 'size') return 2;
        const base = await loadImage(imgData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        for (const face of faces) {
            const landmarks = face.landmark;
            const width = landmarks.contour_right1.x - landmarks.contour_left1.x;
            const ratio = width / danny.width;
            const height = danny.height * ratio;
            ctx.drawImage(
                danny,
                landmarks.contour_left1.x - (width * 0.25),
                landmarks.contour_left1.y - (height / 2) - (height * 0.25),
                width * 1.5,
                height * 1.5
            );
        }
        return canvas.toBuffer();
    } catch (err) {
        if (err.status === 400)  return 400;
        if (err.status === 403) return 403;
        return 500;
    }

};


const desaturate = async (level, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fdesaturate(ctx, level, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};

const dexter = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'dexter.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.rotate(-11 * (Math.PI / 180));
    const { x, y, width, height } = centerImagePart(data, 225, 225, 234, 274);
    ctx.drawImage(data, x, y, width, height);
    ctx.rotate(11 * (Math.PI / 180));
    return canvas.toBuffer();
};

const distort = async (level, image) => {
    if (!isImageUrl(image)) return 0;
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fdistort(ctx, level, 0, 0, data.width, data.height);
    return canvas.toBuffer();

};

const eyes = async (image) => {
    if (!isImageUrl(image)) return 0;
    const eyes = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'eyes.png'));
    const imgData = await request.get(image);
    try {
        const faces = await detect(imgData);
        if (!faces) return 400;
        if (faces === 'size') return 2;
        const base = await loadImage(imgData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        for (const face of faces) {
            const landmarks = face.landmark;
            const leftWidth = landmarks.left_eye_right_corner.x - landmarks.left_eye_left_corner.x;
            const leftRatio = leftWidth / eyes.width;
            const leftHeight = eyes.height * leftRatio;
            ctx.drawImage(
                eyes,
                landmarks.left_eye_left_corner.x - (leftWidth / 2),
                landmarks.left_eye_left_corner.y - (leftHeight / 2) - (leftHeight / 2),
                leftWidth * 2,
                leftHeight * 2
            );
            const rightWidth = landmarks.right_eye_right_corner.x - landmarks.right_eye_left_corner.x;
            const rightRatio = rightWidth / eyes.width;
            const rightHeight = eyes.height * rightRatio;
            ctx.drawImage(
                eyes,
                landmarks.right_eye_left_corner.x - (rightWidth / 2),
                landmarks.right_eye_left_corner.y - (rightHeight / 2) - (rightHeight / 2),
                rightWidth * 2,
                rightHeight * 2
            );
        }
        return canvas.toBuffer();
    } catch (err) {
        if (err.status === 400)  return 400;
        if (err.status === 403) return 403;
        return 500;
    }
};

const fireframe = async (image) => {
    if (!isImageUrl(image)) return 0;
    const base = await loadImage(join(__dirname, '..', '..', 'assets', 'images', 'fire-frame.png'));
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, '#fc671e', 0, 0, data.width, data.height);
    ctx.drawImage(base, 0, 0, data.width, data.height);
    return canvas.toBuffer();
};


function shortenText(ctx, text, maxWidth) {
    let shorten = false;
    while (ctx.measureText(`${text}...`).width > maxWidth) {
        if (!shorten) shorten = true;
        text = text.substr(0, text.length - 1);
    }
    return shorten ? `${text}...` : text;
}

function centerImage(base, data) {
    const dataRatio = data.width / data.height;
    const baseRatio = base.width / base.height;
    let { width, height } = data;
    let x = 0;
    let y = 0;
    if (baseRatio < dataRatio) {
        height = data.height;
        width = base.width * (height / base.height);
        x = (data.width - width) / 2;
        y = 0;
    } else if (baseRatio > dataRatio) {
        width = data.width;
        height = base.height * (width / base.width);
        x = 0;
        y = (data.height - height) / 2;
    }
    return { x, y, width, height };
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

function drawImageWithTint(ctx, image, color, x, y, width, height) {
    const { fillStyle, globalAlpha } = ctx;
    ctx.fillStyle = color;
    ctx.drawImage(image, x, y, width, height);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = globalAlpha;
    return ctx;
}

function fdesaturate(ctx, level, x, y, width, height) {
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

function fdistort(ctx, amplitude, x, y, width, height, strideLevel = 4) {
    const data = ctx.getImageData(x, y, width, height);
    const temp = ctx.getImageData(x, y, width, height);
    const stride = width * strideLevel;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const xs = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / height)));
            const ys = Math.round(amplitude * Math.cos(2 * Math.PI * 3 * (i / width)));
            const dest = (j * stride) + (i * strideLevel);
            const src = ((j + ys) * stride) + ((i + xs) * strideLevel);
            data.data[dest] = temp.data[src];
            data.data[dest + 1] = temp.data[src + 1];
            data.data[dest + 2] = temp.data[src + 2];
        }
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function  base64(text, mode = 'encode') {
    if (mode === 'encode') return Buffer.from(text).toString('base64');
    if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
    throw new TypeError(`${mode} is not a supported base64 mode.`);
}

async function detect(imgData) {
    if (Buffer.byteLength(imgData.body) >= 2e+6) return 'size';
    const { body } = await request
        .post('https://api-us.faceplusplus.com/facepp/v3/detect')
        .attach('image_base64', base64(imgData.body))
        .query({
            api_key: process.env.FACEPLUSPLUS_KEY,
            api_secret: process.env.FACEPLUSPLUS_SECRET,
            return_landmark: 1
        });
    if (!body.faces || !body.faces.length) return null;
    return body.faces;
}


module.exports = {
    minecraftachivement,
    approve,
    axiscult,
    blur,
    bobross,
    brazzers,
    caution,
    certificate,
    chineserestaurant,
    circle,
    color,
    communist,
    contrast,
    createQr,
    danger,
    dannydevito,
    desaturate,
    dexter,
    distort,
    eyes,
    fireframe
};