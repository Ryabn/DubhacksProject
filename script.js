var phobiaList = ["table"];
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
   
    // ********************************************
    // * Update or verify the following values. *
    // ********************************************

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
    	//console.log(JSON.stringify(data));
        if(matchesFilter(data.description.tags, phobiaList)) {
            var width = tagOfImage.width;
            var height = tagOfImage.height;
            
            tagOfImage.src = "imageblock.jpg";
            tagOfImage.style = "opacity: 1; width: "+width+"px; height: "+height+"px";
        } else {
            tagOfImage.style = "opacity: 1";
        }
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
            return true;
        }
    }
    return false;
}


