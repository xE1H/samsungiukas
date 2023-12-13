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
  // If is on phone
  var isOnPhone = window.matchMedia("(max-width: 768px)").matches;
  if (isOnPhone) {
    return;
  }
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
  ).to({}, {'duration': 1});

  gsap.timeline({
    scrollTrigger: {
      trigger: '#progresas',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#progresas"
    }
  })
    .to({}, {'duration': 1}).set("body", {
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
  })
    .to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#rezervacijos',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#rezervacijos"
    }
  })
    .to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#islaidos',
      start: 'top',
      end: 'bottom',
      scrub: 1,
      pin: "#islaidos"
    }
  })
    .to({}, {'duration': 1}).set("body", {
    'overflow-y': 'hidden !important'
  });

  progresas
}

function init3dModel() {
  var canvas = document.getElementById("renderCanvas");

  var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Set the clear color to transparent

    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2 - 1, Math.PI / 2, 5, new BABYLON.Vector3(-3, 3, -3), scene);
    camera.lowerRadiuslimit = 5;
    camera.upperRadiusLimit = 5;

    camera.setPosition(new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    BABYLON.SceneLoader.ImportMesh("", "img/", "studija_latesc.glb", scene, function (meshes) {
      camera.target = meshes[0].position; // this is x = 0, y = 0, make it look at the center of the object
      scene.createDefaultCameraOrLight(true, true, true);
    });

    return scene;
  }

  var scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });
}
