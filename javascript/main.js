let canvas = document.getElementById("main-canvas");
let cx = canvas.getContext("2d");
let scale = 1/100;
let height_step = scale * canvas.height;
let line_width = scale * canvas.width;
let num_lines = canvas.width / line_width;
let heights = [];
let delay;

for (let i = 0; i < num_lines; i++){
    heights.push(i * height_step + 6);
}

shuffleLines();
drawLines();

let btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    let list_value = document.querySelector('.list').value;
    switch (list_value){
        case 'shuffle':
            shuffleLines();
            drawLines();
            break;

        case 'bubble-sort':
            bubbleSort();
            break;
        
        case 'insertion-sort':
            insSort();
            break;

        case 'selection-sort':
            SelectionSort();
            break;
    }
    delay = document.querySelector('.slider').value;
});