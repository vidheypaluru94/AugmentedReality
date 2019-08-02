AFRAME.registerComponent('markerhandler', {

    init: function() {
        const animatedMarker = document.querySelector("#animated-marker");
        const aEntity = document.querySelector("#animated-model");

        // every click, we make our model grow in size :)
        animatedMarker.addEventListener('click', function(ev, target){
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            if (aEntity && intersectedElement === aEntity) {
                const scale = aEntity.getAttribute('scale');
                Object.keys(scale).forEach((key) => scale[key] = scale[key] + 0.25);
                aEntity.setAttribute('scale', scale);
            }
        });
}});


AFRAME.registerComponent("foo",{
    init:function() {
      var element = document.querySelector('body');
      this.marker = document.querySelector("#animated-marker")
      var model = document.querySelector("#animated-model");
      var hammertime = new Hammer(element);
      var pinch = new Hammer.Pinch(); // Pinch is not by default in the recognisers
      hammertime.add(pinch); // add it to the Manager instance      

      hammertime.get('rotate').set({ enable: true });
      hammertime.on('rotate', (ev) => {
        let rotation = model.getAttribute("rotation")
        if (ev.rotation > 0) {
            rotation.y = rotation.y + 4
        } else {
            rotation.y = rotation.y - 4
        }    

        model.setAttribute("rotation", rotation)
      });


      hammertime.on('pan', (ev) => {
        let position = model.getAttribute("position")
        switch(ev.direction) {
          case 2:
            position.x = position.x - 0.05
            break;
          case 4:
            position.x = position.x + 0.05
            break;
          case 8:
            position.z = position.z - 0.05
            break;
          case 16:
            position.z = position.z + 0.05
            break;
          default:
            break;
        }
        model.setAttribute("position", position)
      });

     hammertime.on("pinch", (ev) => {
        let scale = {x:ev.scale, y:ev.scale, z:ev.scale}
        model.setAttribute("scale", scale);
    });
  }
});