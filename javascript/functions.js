function drawLines(){
    // just draw lines 
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < num_lines; i++){
        cx.beginPath();
        cx.fillRect(i * line_width, canvas.height, line_width, -heights[i]);
        cx.closePath();
    }
}

function shuffleLines(){
    // get an array with heights of each line and shuffle values in the random order
    let shuffled = []
    while (heights.length !== 0) {
        let rand = Math.floor(Math.random() * heights.length)
        shuffled.push(heights[rand])
        heights.splice(rand, 1)
    }
    heights = shuffled;
}

function setTimeoutPromise(callback, offset){
    let prom = new Promise((resolve, reject) => {
        setTimeout(() => resolve(callback()), offset);
    })
    return prom
}

function renderFrame(){
    return setTimeoutPromise(drawLines, 100)
}

async function bubbleSort(){
    // algorithm of sorting lines
    for (let b = 0; b < heights.length; b++) {
        for (let i = 0; i < heights.length; i++) {
            if (heights[i] > heights[i + 1]) {
                let a = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = a;
            }
        }
        await renderFrame()
    }
}

