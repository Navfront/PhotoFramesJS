const root = document.querySelector('#root')
const range = document.querySelector('.range')
const counter = document.querySelector('.counter')

let frame = null
let frameWidth = 300 
let frameHeigth = 200
let photoCount = 1


function useDebounce(ms) {
    let canWork = true;
    return (fn) => {
        if (canWork) {
            fn();
            canWork = false;
            setTimeout(() => {
                canWork = true;
            }, ms)
        } 
    }
}

const debounce = useDebounce(300)


function render(n = photoCount, width = frameWidth, height = frameHeigth) {
    if (frame) {
        frame.remove();
        frame = null;
        renderFrame(width, height, calculate(n,width,height))
    } else
    { renderFrame(width, height, calculate(n, width, height)) }
    
}

function renderFrame(width, heigth, photoarr = []) {
    frame = document.createElement('div')
    frame.classList.add('frame')
    root.appendChild(frame);
    frame.style.width = `${width}px`;
    frame.style.height = `${heigth}px`;

    for (photo of photoarr) {
        const element = document.createElement('div');
        const nail = document.createElement('div');
        element.classList.add('photo');
        element.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        element.style.width = `${photo.width}px`;
        element.style.height = `${photo.height}px`;
        element.style.left = `${photo.x}px`;
        element.style.top = `${photo.y}px`;
        nail.classList.add('nail')
        element.appendChild(nail)
        frame.appendChild(element)
    }
}

function calculate(n, width, height) { 
    const arr = []
    const cols = Math.ceil(Math.sqrt(n)) 
    const pW = width / cols; 
    const pH = height / cols 
    const rows = Math.ceil(n / cols);
    const offsetY = (height - pH * rows) / 2; 
    const nInCustomRow = n % cols; 
    
    let currCol = 1;
    let currX = pW / 2 - pW;
    let currRow = 0;
    for (let i = 0; i < n; i++){
        if (i < nInCustomRow) {
            let xSpaceLeft = (width - pW * nInCustomRow) / 2;
            arr.push({ width: pW, height: pH, x: Math.round(currX + pW + xSpaceLeft), y: Math.round(currRow * pH + offsetY)})
            currCol++;
            currX += pW;
            if (currCol > nInCustomRow) {
                currRow++
                currX = pW / 2 - pW;
                currCol = 1;
            }
        } else {

            arr.push({ width: pW, height: pH, x: Math.round(currX + pW), y: Math.round(currRow * pH + offsetY) })
            currX += pW;
            currCol++;
            if (currCol > cols) {
                currRow++
                currX = pW / 2 - pW;
                currCol = 1;
            }
        }
        
    }
    return arr
}

range.addEventListener('input', (evt) => {
    debounce(() => {
        render(evt.target.value);
        counter.textContent = evt.target.value;
    })
})

render()


