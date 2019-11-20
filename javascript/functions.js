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

function renderFrame(ms){
    return setTimeoutPromise(drawLines, ms);
}

function renderAnimation(ms, i, color){
    return setTimeoutAnimation(drawAnimation, ms, i, color)
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
            await renderFrame(5)
            await renderAnimation(5, i, "blue")
            if (heights[i] > heights[i + 1]) {
                let a = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = a;
                await renderAnimation(5, i-1, "green")
            } else { await renderAnimation(2, i-1) }
            var ms = i;
            
            
        }
    }
}

async function insSort(){
    // insertion sort algorithm
    for (let b = 0; b < heights.length; b++){ 
        let a = b;
        await renderAnimation(5, b, "blue");
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
        await renderAnimation(5, a, "green");
    }
    await renderFrame(30);
}

async function SelectionSort(){
    //selection sort algorithm
    let aux = [];
    while (heights.length != 0){
        aux.push(minim(heights));
        cut(heights, minim(heights));
        heights
        await renderFrame(30);
        }
    heights = aux;
    drawLines();
}

function minim(arr){
    //find a minimum value of an array
    let t = arr[0];
    for(let i = 0; i < arr.length; i++){
        if( t > arr[i+1] ){ t = arr[i+1] }
    }
    return t;
}

function cut(arr, el){
    //cut an element by his value from the array
    let v;
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === el){
            v = arr[i];
           arr.splice(i, 1);
        }
    }
    return v;
}