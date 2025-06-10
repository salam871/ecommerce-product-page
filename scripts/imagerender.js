const displayImage = document.getElementById("display-img");
const thumbnails = document.querySelectorAll("#thumbnails img");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    const displaySrc = this.src.replace("-thumbnail", "");
    displayImage.src = displaySrc;
    thumbnails.forEach((img) => img.classList.remove("selected-img"));
    this.classList.add("selected-img");
  });
});
