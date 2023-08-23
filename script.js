
var simage = null;
var himage = null;
var canvas = null;

function clearBits(colorval) {
  var x = Math.floor(colorval / 16) * 16;
  return x;
}

function chop2hide(image) {
  for (var px of image.values()) {
    px.setRed(clearBits(px.getRed()));
    px.setGreen(clearBits(px.getGreen()));
    px.setBlue(clearBits(px.getBlue()));
  }
  return image;
}

function shift(image) {
  for (var px of image.values()) {
    px.setRed(px.getRed() / 16);
    px.setGreen(px.getGreen() / 16);
    px.setBlue(px.getBlue() / 16);
  }
  return image;
}

function combine(show, hide) {
  var show = chop2hide(simage);
  var hide = shift(himage);
  var answer = new SimpleImage(show.getWidth(), show.getHeight());

  for (var px of answer.values()) {
    var x = px.getX();
    var y = px.getY();

    var showpixel = show.getPixel(x, y);
    var hidepixel = hide.getPixel(x, y);

    px.setRed(showpixel.getRed() + hidepixel.getRed());
    px.setGreen(showpixel.getGreen() + hidepixel.getGreen());
    px.setBlue(showpixel.getBlue() + hidepixel.getBlue());
  }
  return answer;
}

function uploads() {
  var showimage = document.getElementById("show");
  simage = new SimpleImage(showimage);
  canvas = document.getElementById("showcan");
  simage.drawTo(canvas);
}

function uploadh() {
  var hideimage = document.getElementById("hide");
  himage = new SimpleImage(hideimage);
  canvas = document.getElementById("hidecan");
  himage.drawTo(canvas);
}

function dohide() {
  //check that images are loaded
  if (simage == null || !simage.complete()) {
    alert("Showing image not loaded");
  }
  if (himage == null || !himage.complete()) {
    alert("Embedding image not loaded");
  }
  // clear canvases
  //   clearCanvas();
  var finalImage = combine(show, hide);
  finalImage.drawTo(outputcan);
}

function clearCanvas() {
  doClear(showcan);
  doClear(hidecan);
  doClear(outputcan);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
