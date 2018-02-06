/* global $ */
let currentImage;
let imageContainer = $('#imageContainer');
function addImage(address) { 
    imageContainer = $('#imageContainer');
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
    image.show();
}

function nextImage() {
    let image = currentImage.next();
    if (image.length == 0) {
        image = $(' #imageContainer').children().first();
    }

    showImage(image);
}

function prevImage() {
    let image = currentImage.prev()
    if (image.length == 0) {
        image = $(' #imageContainer').children().last();
    }

    showImage(image);
}

function clearImages() {
    imageContainer.clear();
}
for(i = 0; i < 8; i++) {
addImage("https://placeimg.com/800/60" +i+ "/animals");  
}


$('#nextImg').click(function() {
    nextImage();
});

$('#prevImg').click(function() {
    prevImage();
});