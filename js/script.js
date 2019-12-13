const doc = document

const canvas = doc.querySelector ('#canv')
const ctx = canvas.getContext ('2d')
console.log (ctx)

const xBlock = doc.querySelector ('#x-coord')
const yBlock = doc.querySelector ('#y-coord')

// ctx.fillStyle = 'red'
// ctx.fillRect (10, 10, 100, 100)

// ctx.fillStyle = 'green'
// ctx.fillRect (110, 110, 10, 10)

let editor = {
    width: canvas.getAttribute ('width'),
    height: canvas.getAttribute ('height'),
    currentTool: null,
    currentColor: '#000',
    brushSize: 5,
    x: 0,
    y: 0,

    _init () {
        doc.addEventListener ('input', this.inputHandler)
        doc.addEventListener ('click', this.clickHandler)

        canvas.addEventListener ('mousemove', this.getCoordinates)
        canvas.addEventListener ('mousedown', this.startDraw)
        canvas.addEventListener ('mouseup', this.endDraw)
    },

    inputHandler (evt) {
        let id = evt.target.id
        let val = evt.target.value
        if (id === 'select-color' || id === 'select-size') {
            id === 'select-color' ? editor.currentColor = val : editor.brushSize = val
            if (id === 'select-color') ctx.fillStyle = editor.currentColor
        }
    },
    clickHandler (evt) {
        let el = evt.target
        if (el.name === 'tool-button') {
            editor.currentTool = el.dataset.name
            console.log (editor.currentTool)
        }
    },
    getCoordinates (evt) {
        editor.x = evt.offsetX
        editor.y = evt.offsetY
        
        xBlock.innerText = editor.x
        yBlock.innerText = editor.y
    },
    startDraw (evt) {
        if (editor.currentTool === 'brush') editor._drawBrush (evt)
    },
    endDraw () {
        canvas.onmousemove = null
    },
    _drawBrush () {
        canvas.onmousemove = () => {
            ctx.fillRect (editor.x, editor.y, editor.brushSize, editor.brushSize)
        }
    }
}

editor._init ()

// 1) Допиливаем магазин
// 2) Допиливаем Фотошоп
// 3) Допиливаем интерфейсные решения для старых примеров (камень-ножницы, быки...)