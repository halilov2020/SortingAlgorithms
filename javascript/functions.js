function drawLines(){
    // just draw lines 
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < num_lines; i++){
        cx.beginPath();
        cx.fillRect(i * line_width, canvas.height, line_width, -heights[i]);
        cx.closePath();
    }
}

function drawAnimation(i, color){
    // cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.beginPath();
    cx.fillStyle = color;
    cx.clearRect(i * line_width, canvas.height, line_width, -heights[i]);
    cx.fillRect(i * line_width, canvas.height, line_width, -heights[i]);
    cx.fillStyle = "black";
    cx.closePath();
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

function setTimeoutAnimation(callback, offset, i, color="red"){
    let prom = new Promise((resolve, reject) => {
        setTimeout(() => resolve(callback(i, color)), offset);
    })
    return prom;
}

function renderFrame(){
    return setTimeoutPromise(drawLines, delay);
}

function renderAnimation(i, color){
    return setTimeoutAnimation(drawAnimation, delay, i, color)
}

function finishAnimation(color){
    for (let i = 0; i < heights.length; i++){
        cx.clearRect(i * line_width, canvas.height, line_width, -heights[i]);
        cx.fillStyle = color;
        
    }
}
async function bubbleSort(){
    // bubble sort algorithm
    for (let b = 0; b < heights.length; b++) {
        for (let i = 0; i < heights.length - b; i++) {
            await renderFrame()
            await renderAnimation(i, "blue")
            if (heights[i] > heights[i + 1]) {
                let a = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = a;
                await renderAnimation(i-1, "green")
            } else { await renderAnimation(i-1) }
        }
    }
}

async function insSort(){
    // insertion sort algorithm
    for (let b = 0; b < heights.length; b++){ 
        let a = b;
        await renderAnimation(b, "blue");
        while (a != 0){
            if (heights[a] < heights[a - 1]){
                let t = heights[a];
                heights[a] = heights[a - 1];
                heights[a - 1] = t;
            } else break
            a--;
        }
        await renderFrame();
        await renderAnimation(a, "green");
    }
    await renderFrame();
}



async function SelectionSort(){
    for(let i = 0; i<heights.length; i++){
        let k = i;
        for(let j = i+1; j<=heights.length; j++){
            if(heights[k]>heights[j]){
                k = j;
            }
        }
        if(k!=i){
            let aux = heights[i];
            await renderFrame();
            await renderAnimation(k, "yellow");
            heights[i] = heights[k];
            await renderFrame();
            await renderAnimation(i, "green");
            heights[k] = aux;
            await renderFrame();
            await renderAnimation(k, "blue");
            
        }
        await renderFrame();
    }
}