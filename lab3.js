/* global $ */
let currentImage;
function addImage(address) { 
    // Create a HTML element using jQuery and store it in a variable
    let element = $('<div>');
    // ... then you can manipulate element using jQuery
    element.text('Hello World!');
    let imageContainer = $('#imageContainer');
    let image = $('<img />', {
        src: address,
    });
    imageContainer.append(image);
    console.log(image);
    if (image.is(':first-child')) {
        currentImage = image;
    } else {
        image.hide();
    }
    return image;
}

function showImage(image) {
    currentImage.hide();
    currentImage = image;
    currentImage.show();
}

function nextImage() {
    let image = currentImage.next();
    if (image.length == 0) {
        image = $(' #imageContainer').children().first();
    }

    showImage(image);
}

function prevImage() {
    let image = currentImage.previous()
    if (image.length == 0) {
        image = $(' #imageContainer').children().last();
    }

    showImage(image);
}

function clearImages() {
    imageContainer.clear();
}
addImage("https://placeimg.com/640/480/animals");
addImage("https://placeimg.com/640/480/animals");
addImage("https://placeimg.com/640/480/animals");

$('#nextImg').click(function() {
    nextImage();
});

$('#prevImg').click(function() {
    prevImage();
});