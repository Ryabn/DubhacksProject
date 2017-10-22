var phobiaList = ["spider", "lobster"];
hideAllImages();

var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
    processImage(images[i]);
}

function hideAllImages() {
    $("img").each(function() {
        this.style = "opacity:0";
    })
}

function processImage(tagOfImage) {
   
    // ******************************************
    // * Update or verify the following values. *
    // ******************************************

    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "60a9460bb13a4dcc813f715b9227c115";

    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    var sourceImageUrl = tagOfImage.src;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    
    .done(function(data) {
        console.log(JSON.stringify(data));
        var fear = matchesFilter(data.description.tags, phobiaList);
        if (fear != null) {
            var width = tagOfImage.width;
            var height = tagOfImage.height;
            var covered = document.createElement('div');
            covered.style.width = width + "px";
            covered.style.height = height + "px";
            covered.style.background = "gray";
            covered.style.margin = "2px";
            covered.style.border = "10px double black";
            var fontSize = height * width / 10000;
            covered.style.font = "bold " + fontSize + "px Georgia, serif";
            var textBox = document.createElement('div');
            textBox.innerHTML = "Image hidden because it contained the following content: \n";
            var fearText = document.createElement('p');
            fearText.innerText = fear;
            fearText.style.color = "red";
            textBox.appendChild(fearText);
            var clickBox = document.createElement('div');
            clickBox.innerHTML = "Click here to show";
            covered.appendChild(textBox);
            covered.appendChild(clickBox);
            covered.style.textAlign = "center";
            covered.appendChild(textBox);
            covered.style.display = "flex";
            covered.style.flexDirection = "column-reverse";
            covered.style.justifyContent = "space-around";
            covered.classList.add(sourceImageUrl);
            
            covered.onclick = function() {
                this.style.backgroundImage = "url(" + this.className + ")";
                this.style.border = "";
                this.innerHTML = "";
            };

            tagOfImage.parentNode.insertBefore(covered, tagOfImage);
            tagOfImage.parentNode.removeChild(tagOfImage);
        }
        tagOfImage.style = "opacity: 1.0";    
        tagOfImage.classList.add("phobiaBlockerScanned");
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
       
    });

}

function matchesFilter(tags, phobiaList) {
    var map = new Map();
    for(var i = 0; i < phobiaList.length; i++) {
        map.set(phobiaList[i], false);
    }
    for(var i = 0; i < tags.length; i++) {
        var word = tags[i];
        if(!map.has(word)) {
            map.set(word, false);
        } else {
            return word;
        }
    }
    return null;
}