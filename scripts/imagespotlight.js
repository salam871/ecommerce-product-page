const dispImg = document.getElementById("display-img");
const modalSlider = document.getElementById("spotlight-slider");
const modalThumbnail = document.getElementById("spotlight-thumbnails");
const spotlightModal = document.getElementById("spotlight-modal");
const spotlightClose = document.querySelector(".spotlight-close");

dispImg.addEventListener("click", function () {
  spotlightModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  modalSlider.innerHTML = document.getElementById(
    "image-slides-container"
  ).innerHTML;
  modalThumbnail.innerHTML = document.getElementById("thumbnails").innerHTML;

  // Add event listeners to modal thumbnails
  const modalThumbs = document.querySelectorAll("#spotlight-thumbnails img");
  modalThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      const slides = modalSlider.querySelector(".image-slides");
      slides.scrollTo({
        left: slides.offsetWidth * index,
        behavior: "smooth",
      });

      // Update selected thumbnail
      modalThumbs.forEach((t) => t.classList.remove("selected-img"));
      thumb.classList.add("selected-img");
    });
  });

  //Spotlight Image Navigation Buttons
  const prevBtn = document.querySelector("#spotlight-slider .navigation .prev");
  const nextBtn = document.querySelector("#spotlight-slider .navigation .next");
  const images = document.querySelectorAll(
    "#spotlight-slider .image-slides .sample-img"
  );
  const slider = document.querySelector("#spotlight-slider .image-slides");

  let currentIndex = 0;

  function scrollToImage(index) {
    slider.scrollTo({
      left: images[index].offsetLeft,
      behavior: "smooth",
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    scrollToImage(currentIndex);
  });

  // Optional: Update currentIndex on scroll
  slider.addEventListener("scroll", () => {
    const scrollPosition = slider.scrollLeft + slider.offsetWidth / 2;
    images.forEach((img, index) => {
      if (
        img.offsetLeft <= scrollPosition &&
        img.offsetLeft + img.offsetWidth > scrollPosition
      ) {
        currentIndex = index;
      }
    });
  });
});

spotlightClose.addEventListener("click", function () {
  spotlightModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close when clicking outside content
spotlightModal.addEventListener("click", function (e) {
  if (e.target === spotlightModal) {
    spotlightModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
