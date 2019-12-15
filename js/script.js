const doc = document

const canvas = doc.querySelector ('#canv')

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
    currentFillColor: '#000',
    currentLineColor: '#000',
    currentContext: null,
    brushSize: 5,
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,

    _init () {
        doc.addEventListener ('input', this.inputHandler)
        doc.addEventListener ('click', this.clickHandler)

        canvas.addEventListener ('mousemove', this.getCoordinates)
        canvas.addEventListener ('mousedown', this.startDraw)
        canvas.addEventListener ('mouseup', this.endDraw)

        editor.currentContext = canvas.getContext ('2d')
        console.log (editor.currentContext)

        editor.currentTool = 'brush'
    },
    inputHandler (evt) {
        let id = evt.target.id
        let val = evt.target.value
        if (id.includes('select')) {
            if (id === 'select-brush-size') editor.brushSize = val
            if (id === 'select-fill-color') editor.currentFillColor = val
            if (id === 'select-line-color') editor.currentLineColor = val
        }
    },
    clickHandler (evt) {
        let el = evt.target
        if (el.name === 'tool-button') {
            editor.currentTool = el.dataset.name
            doc.querySelector ('.selected').className = doc.querySelector ('.selected').className.replace ('selected','')
            el.className += 'selected'
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
        editor.originX = editor.x
        editor.originY = editor.y
        editor.currentContext = canvas.getContext ('2d')
        console.log (editor.currentContext)
            
        if (editor.currentTool === 'brush') editor._drawBrush ()
        if (editor.currentTool === 'rect') editor._drawRect ()
        if (editor.currentTool === 'line') editor._drawLine ()
        if (editor.currentTool === 'circle') editor._drawCircle ()
    },
    endDraw () {
        canvas.onmousemove = null
        if (editor.currentTool === 'line') {
            editor.currentContext.lineTo (editor.x, editor.y)
            editor.currentContext.closePath ()
            editor.currentContext.stroke ()
        }
        if (editor.currentTool === 'circle') {
            editor.currentContext.closePath ()
        }
    },
    _drawBrush () {
        editor.currentContext.fillStyle = editor.currentFillColor
        canvas.onmousemove = () => {
            editor.currentContext.fillRect (editor.x, editor.y, editor.brushSize, editor.brushSize)
        }
    },
    _drawRect () {
        editor.currentContext.fillStyle = editor.currentFillColor
        canvas.onmousemove = () => {
            editor.currentContext.fillRect (editor.originX, editor.originY, editor.x - editor.originX, editor.y - editor.originY)
        }
    },
    _drawCircle () {
        editor.currentContext.fillStyle = editor.currentFillColor
        editor.currentContext.strokeStyle = editor.currentLineColor
        editor.currentContext.lineWidth = editor.brushSize
        canvas.onmousemove = () => {
            editor.currentContext.beginPath ()
            editor.currentContext.moveTo (this.originX, this.originY)
            editor.currentContext.arc (editor.originX, editor.originY, Math.abs (editor.x - editor.originX), Math.abs (editor.y - editor.originY), 0, Math.PI * 2, true)
            editor.currentContext.fill ()
            editor.currentContext.stroke ()
        }
    },
    _drawLine () {
        editor.currentContext.strokeStyle = editor.currentLineColor
        editor.currentContext.lineWidth = editor.brushSize
        editor.currentContext.beginPath ()
        editor.currentContext.moveTo (this.originX, this.originY)
    }
}

editor._init ()
