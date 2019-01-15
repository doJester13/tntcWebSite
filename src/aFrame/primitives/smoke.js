import aframe from 'aframe'
import 'aframe-animation-component'
import { initElement, initSpecialElement } from '../lib/utils'

const smoke = aframe.registerPrimitive('cloud-smoke', {
    defaultComponents: {
        'smoke-particles': ''
    }
})

aframe.registerComponent('smoke-particles', {
    schema: {
        particles: {type: 'number', default: 100},
        size:{type: 'number', default: 20},
        maxx: {type: 'number', default: 10},
        maxy: {type: 'number', default: 10},
        maxz: {type: 'number', default: 10},
        minx: {type: 'number', default: -10},
        miny: {type: 'number', default: -10},
        minz: {type: 'number', default: -10},
    },
    init: function() {
        let particles = new Array(this.data.particles);

        // let smokeTexture = aframe.THREE.ImageUtils.loadTexture(`${process.env.PUBLIC_URL }/assets/images/Smoke-Element.png`);
        // let smokeMaterial = new aframe.THREE.MeshLambertMaterial({color: 0x00dddd, map: smokeTexture, transparent: true});

        for (let i = 0; i < this.data.particles; i++) {

            let pos = `
            ${this.el.object3D.position.x + Math.random() * (this.data.maxx - this.data.minx + 1) +this.data.minx } 
            ${ this.el.object3D.position.y + Math.random() * (this.data.maxy - this.data.miny + 1)  + this.data.miny} 
            ${this.el.object3D.position.z + Math.random() * (this.data.maxz  - this.data.minz + 1) +this.data.minz }`
               
            let rot = `0 0 ${Math.random() * 360}`

            // const particle = initElement('a-entity',{
            //     position: pos,
            //     rotation: rot,
            //     material: `color: #424242; transparent: true; src:#smokeElement;`,
            //     geometry: `primitive:plane; height: ${this.data.size}; width: ${this.data.size}`,
            //     blendmode: 'mode: MultiplyBlending '
            // })

            //src="#logoBroadcast" position="3 2.5 -4" width="1" height="1.48" 

            const particle = initElement('a-entity',{
                position: pos,
                rotation: rot,
                height: this.data.size,
                width: this.data.size,
                // src: '#smokeElement',
                material: `color: #424242; transparent: true; src:#smokeElement; opacity:0.5;`,
                geometry: `primitive:plane; height: ${this.data.size}; width: ${this.data.size}`,
                // blendmode: 'mode: MultiplyBlending '
            })

            this.el.appendChild(particle)
            particles[i] = particle
        }

        this.particles = particles
    },
    tick: function (time, timeDelta) {
        this.particles.forEach(e => {
            e.object3D.rotation.z += timeDelta /10000
        })
    }
})

aframe.registerComponent('blendmode', {
    schema: {
      mode: {default: 'AdditiveBlending'} //Available Modes are: var blendings = [ "NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending" ];
    },
  
      dependencies: ['material'],
  
    update: function () {
      // entity data
      var el = this.el;
      var data = this.data;
  
        if (el.components.hasOwnProperty("material")) {
            var mat = el.components.material.material;
            mat.blending = aframe.THREE[data.mode];
        }
    }
})

export default smoke