const slides = document.querySelectorAll("section .slides");

slides.forEach((slide) => {
  let currentImg = 0;
  let z = 10000000;

  const images = slide.querySelectorAll("img");

  images.forEach((image) => {
    z--;
    image.style.zIndex = z;
  });

  // Load images
  gsap.set(images, { opacity: 0 });

  imagesLoaded(images, function () {
    // image come in and arrange
    const timeline = gsap.timeline();

    timeline
      .set(images, {
        x: () => {
          return 500 * Math.random() - 250;
        },
        y: "500%",
        rotation: () => {
          return 90 * Math.random() - 45;
        },
        opacity: 1,
      })
      .to(images, { x: 0, y: 0, stagger: -0.25 })
      .to(images, {
        rotation: () => {
          return 16 * Math.random() - 8;
        },
      });
  });

  slide.addEventListener("click", function () {
    z--;

    let direction = "150%";
    let midAngle = 15;

    if (Math.random() > 0.5) {
      direction = "-150%";
      midAngle = -15;
    }

    const currentImageNum = images[currentImg];

    // card flip animation
    const flipTimeline = gsap.timeline();

    flipTimeline
      .set(currentImageNum, { x: 0 })
      .to(currentImageNum, {
        x: direction,
        rotation: midAngle,
        scale: 1.1,
      })
      .set(currentImageNum, { zIndex: z })
      .to(currentImageNum, {
        x: 0,
        rotation: () => {
          return 16 * Math.random() - 8;
        },
        scale: 1,
      });

    // images[currentImg].style.zIndex = z;

    currentImg++;
    currentImg = currentImg % images.length;
  });
});
