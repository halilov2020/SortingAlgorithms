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

function renderFrame(ms){
    return setTimeoutPromise(drawLines, ms);
}

async function bubbleSort(){
    // bubble sort algorithm
    for (let b = 0; b < heights.length; b++) {
        for (let i = 0; i < heights.length - b; i++) {
            if (heights[i] > heights[i + 1]) {
                let a = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = a;
            }
            var ms = i;
        }
        await renderFrame(ms)
    }
}

async function insSort(){
    // insertion sort algorithm
    for (let b = 0; b < heights.length; b++){
        let a = b;
        while (a != 0){
            if (heights[a] < heights[a - 1]){
                let t = heights[a];
                heights[a] = heights[a - 1];
                heights[a - 1] = t;
            } else break
            a--;
        }
        var ms = a*2;
        await renderFrame(ms);
    }
}