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
  }
}


function smoothScroll() {
  const divs = Array.from(document.querySelectorAll('body > div'));
  let isScrolling = false;

  let lastScrollTop = 0;

  function getClosestDiv(deltaY) {
    let closest = null;
    let minDistance = Number.MAX_VALUE;
    let scrollDirection = null;

    // Determine the scroll direction
    if (deltaY < 0) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }

    divs.forEach((div) => {
      const rect = div.getBoundingClientRect();
      const distance = Math.abs(rect.top - window.innerHeight / 2);

      if (distance < minDistance) {
        // If scrolling down, select the div below the current one
        // If scrolling up, select the div above the current one
        if ((scrollDirection === 'down' && rect.top > 0) || (scrollDirection === 'up' && rect.bottom < window.innerHeight)) {
          minDistance = distance;
          closest = div;
        }
      }
    });

    return closest;
  }

  function scrollToElement(element) {
    //isScrolling = true;
    element.scrollIntoView({behavior: 'smooth'});
  }

  function handleScroll(e) {
    e.preventDefault(); // Prevent default scrolling

    if (isScrolling) return;

    let deltaY;
    let scrollDirection;

    if (e.type === 'wheel') {
      deltaY = e.deltaY;
    } else if (e.type === 'touchmove') {
      deltaY = e.touches[0].clientY;
      deltaY = deltaY < window.innerHeight / 2 ? 1 : -1;
    }

    const closestDiv = getClosestDiv(deltaY);

    if (closestDiv) {
      scrollToElement(closestDiv);
    }
  }

  window.addEventListener('wheel', handleScroll, {passive: false}); // Declare the listener as non-passive
  window.addEventListener('touchmove', handleScroll, {passive: false}); // Declare the listener as non-passive for touch devices

  window.addEventListener('scrollend', () => {
    isScrolling = false;
  });
}
