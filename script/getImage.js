var imageBase = window.location.href.indexOf('localhost') > -1 ? 'https://6l8u0zp261.execute-api.us-east-1.amazonaws.com/dev/images/' : window.location.href;
var shareLink = document.getElementById('wat-link');

document.addEventListener("DOMContentLoaded", function() {
    var imgParam = window.location.hash.match('[A-Za-z0-9]+');
    if (imgParam != null) {
        setWatImg(imageBase + imgParam[0]);
    } else {
        loadRandomWat();
    }
});

function setWatImg(url) {
    if (url.indexOf('.jpg') === -1) {
        url += '.jpg';
    }
    document.getElementById('wat-img').src = url;
    var imagePathArr = url.split('/');
    window.location.hash = imagePathArr[imagePathArr.length - 1].replace('.jpg', '');

    shareLink.href = window.location.href;
    shareLink.innerText = window.location.href;
}

function loadRandomWat() {
    var watbtn = document.getElementById('wat-btn');
    watbtn.disabled = true;
    httpGet('https://6l8u0zp261.execute-api.us-east-1.amazonaws.com/dev/WataaS', function(data) {
        setWatImg(data['image']);
        watbtn.disabled = false;
    });
}

function httpGet(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            console.error(response);
        }
    };
    request.onerror = function() {
        console.error(response);
        // There was a connection error of some sort
    };

    request.send();
}