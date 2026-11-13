/* Showcase: thumbnail switching and a simple lightbox. */
(function () {
  var products = document.querySelectorAll(".product");
  var box = document.getElementById("lightbox");
  var boxImg = box ? box.querySelector("img") : null;
  var boxCap = box ? box.querySelector("figcaption") : null;
  var current = { gallery: null, index: 0 };

  function thumbsOf(gallery) { return Array.prototype.slice.call(gallery.querySelectorAll(".thumb")); }

  function select(gallery, index) {
    var thumbs = thumbsOf(gallery);
    index = (index + thumbs.length) % thumbs.length;
    var t = thumbs[index];
    var stage = gallery.querySelector(".stage img");
    stage.src = t.dataset.src;
    stage.alt = t.dataset.alt;
    thumbs.forEach(function (b, i) { b.setAttribute("aria-pressed", i === index ? "true" : "false"); });
    gallery.dataset.index = index;
    return index;
  }

  function showInBox(gallery, index) {
    var thumbs = thumbsOf(gallery);
    index = (index + thumbs.length) % thumbs.length;
    var t = thumbs[index];
    current = { gallery: gallery, index: index };
    boxImg.src = t.dataset.src;
    boxImg.alt = t.dataset.alt;
    boxCap.textContent = t.dataset.caption + " (" + (index + 1) + " of " + thumbs.length + ")";
  }

  products.forEach(function (p) {
    var gallery = p.querySelector(".gallery");
    gallery.dataset.index = 0;
    thumbsOf(gallery).forEach(function (b, i) {
      b.addEventListener("click", function () { select(gallery, i); });
    });
    gallery.querySelector(".stage").addEventListener("click", function () {
      if (!box || typeof box.showModal !== "function") return;
      showInBox(gallery, parseInt(gallery.dataset.index, 10) || 0);
      box.showModal();
    });
  });

  if (!box) return;
  box.querySelector(".lb-close").addEventListener("click", function () { box.close(); });
  box.querySelector(".lb-prev").addEventListener("click", function () { showInBox(current.gallery, current.index - 1); });
  box.querySelector(".lb-next").addEventListener("click", function () { showInBox(current.gallery, current.index + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { showInBox(current.gallery, current.index - 1); }
    if (e.key === "ArrowRight") { showInBox(current.gallery, current.index + 1); }
  });
  // Keep the page thumbnails in step with what the visitor last viewed.
  box.addEventListener("close", function () {
    if (current.gallery) select(current.gallery, current.index);
  });
})();
