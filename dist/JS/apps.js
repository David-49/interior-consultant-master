var btn = document.querySelector(".burger-menu");
var nav = document.querySelector(".mobile");

btn.addEventListener("click", function () {
  btn.classList.toggle("active");
  nav.classList.toggle("mobile-active");
});
