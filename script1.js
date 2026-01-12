const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

// Set up a container for the message box within the body
const messageContainer = document.createElement('div');
messageContainer.classList.add('message-container');
document.body.appendChild(messageContainer);

/** 
 * 1. CHANGE: Define your local folder and filenames here
 * Make sure these files are inside a folder named "images" relative to your HTML file
 */
const folderPath = 'images/'; 
const filenames = [
    'a.jpg',
    'b.jpg',
    'c.JFIF',
    'a.JFIF',
    'e.jpg',
    'a.WEBP',
        'b.jpg',
    'c.JFIF',
    'a.JFIF',
    'e.jpg',
    'a.WEBP',
        'b.jpg',
    'c.JFIF',
    'a.JFIF',
    'e.jpg',
    'a.WEBP',
    'ff.jpg'

    // Add as many as you have in your folder...
];

// Map filenames to the full path
const options = filenames.map(name => folderPath + name);

const numOptions = options.length;
const degreesPerOption = 360 / numOptions;

// Define an array of colors (kept your original list logic)
const colors = ['RosyBrown', 'IndianRed', 'LightCoral', 'Salmon', 'DarkSalmon', 'LightSalmon', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'PaleVioletRed', 'LightSalmon', 'Coral', 'Tomato', 'OrangeRed', 'DarkOrange', 'Orange', 'Gold', 'Yellow', 'LightYellow', 'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Khaki', 'DarkKhaki', 'Lavender', 'Thistle', 'Plum', 'Violet', 'Orchid', 'Fuchsia', 'Magenta', 'MediumOrchid', 'MediumPurple', 'RebeccaPurple', 'BlueViolet', 'DarkViolet', 'DarkOrchid', 'DarkMagenta', 'Purple', 'Indigo', 'SlateBlue', 'DarkSlateBlue', 'MediumSlateBlue', 'GreenYellow', 'Chartreuse', 'LawnGreen', 'Lime', 'LimeGreen', 'PaleGreen', 'LightGreen', 'MediumSpringGreen', 'SpringGreen', 'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'YellowGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'MediumAquamarine', 'DarkSeaGreen', 'LightSeaGreen', 'DarkCyan', 'Teal', 'Aqua', 'Cyan', 'LightCyan', 'PaleTurquoise', 'Aquamarine', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'CadetBlue', 'SteelBlue', 'LightSteelBlue', 'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue', 'DeepSkyBlue', 'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'Blue', 'MediumBlue', 'DarkBlue', 'Navy', 'MidnightBlue', 'Cornsilk', 'BlanchedAlmond', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan', 'RosyBrown', 'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'White', 'Snow', 'Honeydew', 'MintCream', 'Azure', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'Seashell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite', 'Linen', 'LavenderBlush', 'MistyRose', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray', 'DimGray', 'LightSlateGray', 'SlateGray', 'DarkSlateGray', 'Black'];

function drawWheelSectionsMulticolor() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numOptions; i++) {
        const sliceAngle = (2 * Math.PI) / numOptions;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(sliceAngle * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.restore();
    }
}

drawWheelSectionsMulticolor();

let isSpinning = false;
let currentRotation = 0;

function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinButton.disabled = true;

    // Generate a random rotation (at least 2 full circles + random)
    const extraDegrees = Math.floor(Math.random() * 360);
    const spinDegrees = 1440 + extraDegrees; // 1440 is 4 full spins
    currentRotation += spinDegrees;

    canvas.style.transition = 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)';
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    canvas.addEventListener('transitionend', () => {
        // Calculate which index is at the top (0 degrees)
        // We subtract the rotation from 360 because the wheel spins clockwise
        const actualDegrees = currentRotation % 360;
        const winningIndex = Math.floor((360 - actualDegrees) / degreesPerOption) % numOptions;
        const winningOption = options[winningIndex];

        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');

        const winningImg = new Image();
        winningImg.src = winningOption;

        winningImg.onload = () => {
            messageBox.appendChild(winningImg);
            const text = document.createElement('p');
            text.textContent = "Congratulations! You won a Whale!";
            messageBox.appendChild(text);
            document.body.appendChild(messageBox);

            setTimeout(() => {
                messageBox.remove();
                isSpinning = false;
                spinButton.disabled = false;
            }, 5000);
        };

        winningImg.onerror = () => {
            console.error("Failed to load local image:", winningOption);
            isSpinning = false;
            spinButton.disabled = false;
        };
    }, { once: true });
}

spinButton.addEventListener('click', spinWheel);