document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".image-slides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const images = document.querySelectorAll(".sample-img");

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
