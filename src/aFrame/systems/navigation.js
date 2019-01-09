import aframe from 'aframe'
import 'aframe-animation-component'
import 'aframe-animation-timeline-component'
import { initSpecialElement } from '../lib/utils'

const MAX_LEVEL = 2

const navigation = aframe.registerSystem('navigation', {
  init: function () {
    this.level = 0 
  },
  move: function (direction) {
    if(this.level + direction >= 0 && this.level + direction <= MAX_LEVEL) {
      this.level += direction
      animate(this.level)
    }
    
  }
});  


const animate = (level) => {
  const scene = document.querySelector('a-scene')
  const assets = document.querySelector('a-assets')
  const player = document.querySelector('#player')
  const playerPosition = player.getAttribute('position');
  const playerRotation = player.getAttribute('rotation');
 
  console.log(assets, player, playerPosition, playerRotation)

  // var tl = aframe.anime.timeline({
  //   easing: 'easeOutExpo',
  //   duration: 1000
  // });

  // tl.add({
  //     targets: playerPosition,
  //     x: 0,
  //     y: 0,
  //     z:-2
  // }) 
  // .add({
  //   targets: playerRotation,
  //   x: -90,
  //   y: 0,
  //   z: 0
  // })    
  // .add({
  //   targets: playerPosition,
  //   x: 0,
  //   y: 0,
  //   z: -4
  // })

  player.setAttribute(
    'animation__move0',
    {
        property: 'position',
        autoplay: 'true',
        from: playerPosition,
        to: '0 3 0',
        easing: 'easeInSine',
        dur: '1000',
        autoplay: 'false'
    }
  )

  player.setAttribute(
    'animation__rotate',
    {
        property: 'rotation',
        autoplay: 'true',
        from: playerRotation,
        to: '-90 0 0',
        easing: 'easeInSine',
        dur: '500',
        autoplay: 'false'
    }
  )

  player.setAttribute(
    'animation__move1',
    {
        property: 'position',
        autoplay: 'true',
        from: playerPosition,
        to: '0 -5 0',
        easing: 'easeInSine',
        dur: '2000',
        autoplay: 'false'
    }
  )

  const timeLine = initSpecialElement('a-timeline', {
    id: 'timeLine'
  })

  const animationMove0 = initSpecialElement('a-timeline-animation', {
    select: '#player',
    name: 'move0'
  })

  const animationRotate = initSpecialElement('a-timeline-animation', {
    select: '#player',
    name: 'rotate',
    offset: '500'
    
  })

  const animationMove1 = initSpecialElement('a-timeline-animation', {
    select: '#player',
    name: 'move1',
    offset: '500'
  })

  timeLine.appendChild(animationMove0)
  timeLine.appendChild(animationRotate)
  timeLine.appendChild(animationMove1)

  assets.appendChild(timeLine)

  scene.setAttribute('animation-timeline__1', 'timeline: #timeLine')
  
}

export default navigation