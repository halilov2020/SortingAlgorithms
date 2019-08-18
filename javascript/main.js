let canvas = document.getElementById("main-canvas");
let cx = canvas.getContext("2d");
let scale = 1/100;
let height_step = scale * canvas.height;
let line_width = scale * canvas.width;
let num_lines = canvas.width / line_width;
let heights = [];

for (let i = 0; i < num_lines; i++){
    heights.push(i * height_step + 6);
}

shuffleLines();
drawLines();

let btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    let value = document.querySelector('.list').value;
    switch (value){
        case 'shuffle':
            shuffleLines();
            drawLines();
            break;

        case 'bubble-sort':
            bubbleSort();
            break;
        
    }
});