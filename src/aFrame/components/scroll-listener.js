import aframe from 'aframe'

let throttling = false
const mouseWheelHandler = (e, self) => {
    const direction = Math.sign(e.wheelDelta);
    if (!throttling) {
        throttling = true
        self.el.emit('on-scroll', {direction}, false)
        setTimeout(() => {
            throttling = false
        }, 2000)
    }
}

const scrollListener = aframe.registerComponent('scroll-listener', {
    init: function() {
        const myEl = window
        
        if (myEl.addEventListener) {
            myEl.addEventListener('mousewheel', (e) => mouseWheelHandler(e, this), false) // IE9, Chrome, Safari, Opera
            myEl.addEventListener('DOMMouseScroll', (e) => mouseWheelHandler(e, this), false) // Firefox 
        } else myEl.attachEvent('onmousewheel', (e) => mouseWheelHandler(e, this)) // IE 6/7/8
    }
})

export default scrollListener