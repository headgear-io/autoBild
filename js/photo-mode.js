AFRAME.registerComponent('photo-mode', {
  init: function() {
    const container = document.getElementById('photoModeContainer')
    const image = document.getElementById('photoModeImage')
    const shutterButton = document.getElementById('shutterButton')
    const twoDoorButton = document.getElementById('twoDoorButton')
    const fourDoorButton = document.getElementById('fourDoorButton')
    const closeButton = document.getElementById('closeButton')
    var sceneEl = document.querySelector('a-scene')

    // Container starts hidden so it isn't visible when the page is still loading
    container.style.display = 'block'

    closeButton.addEventListener('click', () => {
      container.classList.remove('photo')
    })

    shutterButton.addEventListener('click', () => {
      // Emit a screenshotrequest to the xrweb component
      this.el.sceneEl.emit('screenshotrequest')

      // Show the flash while the image is being taken
      container.classList.add('flash')
    })

    // switchButton.addEventListener('click', () => {
    //   // Emit a modelrequest to the xrweb component
    //   this.el.sceneEl.querySelector('a-entity#carModel').setAttribute('visible', 'true')
    // })

    this.el.sceneEl.addEventListener('screenshotready', e => {
      // Hide the flash
      container.classList.remove('flash')

      // If an error occurs while trying to take the screenshot, e.detail will be empty.
      // We could either retry or return control to the user
      if (!e.detail) {
        return
      }

      // e.detail is the base64 representation of the JPEG screenshot
      image.src = 'data:image/jpeg;base64,' + e.detail

      // Show the photo
      container.classList.add('photo')
      container.classList.remove('model')
    })
    twoDoorButton.addEventListener('click', () => {
      container.classList.add('model')
      sceneEl.querySelector('a-entity#carModel1').setAttribute('visible', 'false')
      sceneEl.querySelector('a-entity#carModel2').setAttribute('visible', 'true')
    })
    fourDoorButton.addEventListener('click', () => {
      container.classList.remove('model')
      sceneEl.querySelector('a-entity#carModel2').setAttribute('visible', 'false')
      sceneEl.querySelector('a-entity#carModel1').setAttribute('visible', 'true')
    })
  }
})
