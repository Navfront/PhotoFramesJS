const root = document.querySelector('#root')

function render(width, heigth, photoarr = []) {
    const parent = document.createElement('div')

    parent.classList.add('ramka')
    root.appendChild(parent);
    parent.style.width = `${width}px`;
    parent.style.height = `${heigth}px`;

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
        parent.appendChild(element)
        console.log(photo);
    }
}

/**
 * @param n - количество фоторамок
 * @param width - ширина области для фоторамок
 * @param height - высота области для фоторамок
 */
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
            arr.push({ width: pW, height: pH, x: Math.ceil(currX + pW + xSpaceLeft), y: Math.ceil(currRow * pH + offsetY)})
            currCol++;
            currX += pW;
            if (currCol > nInCustomRow) {
                currRow++
                currX = pW / 2 - pW;
                currCol = 1;
            }
        } else {

            arr.push({ width: pW, height: pH, x: Math.ceil(currX + pW), y: Math.ceil(currRow * pH + offsetY) })
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

render(300, 200, calculate(6,300,200))


