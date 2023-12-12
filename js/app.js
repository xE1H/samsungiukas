var slidex;

function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }

  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
    /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }

    function getCursorPos(e) {
      var a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }

    slide(w);
    slidex = slide;
  }
}


// const lenis = new Lenis();
//
// lenis.on('scroll', (e) => {
//   //console.log(e);
// })
//
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
//
// requestAnimationFrame(raf);

function initAnimations() {
  var slider = document.getElementsByClassName("img-comp-slider")[0];

// animated drag image thing on scroll
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger: {
      trigger: '#videoDiv',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#videoDiv"
    }
  }).to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#photovideoslider',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#photovideoslider"
    }
  }).to('.img-comp-slider', {
    'left': 'calc(0% - 20px)',
    'duration': 50
  }).to('#before', {
      'width': 0,
      'duration': 50
    }, '<'
  ).to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#tinklalaides',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#tinklalaides"
    }
  }).to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });
}

let scene, camera, renderer, model;

function init3dModel() {
  // Create the scene and set the scene size.
  scene = new THREE.Scene();
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

  // Create a renderer and add it to the DOM.
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  // Create a camera, zoom it out from the model a bit, and add it to the scene.
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
  camera.position.set(0,2,10);
  scene.add(camera);

  // Create a light and add it to the scene.
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 20, 0);
  scene.add(light);

  // Load the GLTF model using GLTFLoader
  const loader = new THREE.GLTFLoader();
  loader.load('path_to_your_model.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
  }, undefined, function(error) {
    console.error(error);
  });

  // Resize Update
  window.addEventListener('resize', () => {
    const WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the model over time
  if(model) {
    model.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}
