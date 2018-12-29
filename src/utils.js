import { THREE } from './aframe';

function setAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

Element.prototype.addAttributes = function(args) {
    setAttributes(this, args || {});
}

function setAttributesGroup(els, attrs) {
    els.forEach(el => el.addAttributes(attrs));
}

function initElement(name, attrs) {
    attrs = attrs || {}
    let el = document.createElement(name)

    let { pos, rot } = attrs
    pos = pos || { x: 0, y: 0, z: 0 }
    rot = rot || { x: 0, y: 0, z: 0 }

    el.object3D.position.set(pos.x, pos.y, pos.z)
    el.object3D.rotation.set(
        THREE.Math.degToRad(rot.x),
        THREE.Math.degToRad(rot.y),
        THREE.Math.degToRad(rot.z)
    )

    Object.keys(attrs).forEach(key => {
        if (key !== 'pos' && key !== 'rot') { el.setAttribute(key, attrs[key]) }
    })

    el.addAttributes(attrs)
    return el
}

function getColor(uv, src) {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = src

        img.onload = function() {
            let coords = {
                x: uv.x * img.width,
                y: (1 - uv.y) * img.height,
            }

            // create a canvas to manipulate the image
            var canvas = document.createElement('canvas')
            canvas.width = img.width;
            canvas.height = img.height;

            document.getElementsByTagName('body')[0].appendChild(canvas)
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
            var pixelData = canvas.getContext('2d').getImageData(coords.x, coords.y, 1, 1).data;
            canvas.remove()
            resolve(pixelData);
        }
    })
}

export { initElement, setAttributesGroup, getColor }