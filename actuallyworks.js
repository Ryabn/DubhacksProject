var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
	processImage(images[i]);
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
    	console.log(JSON.stringify(data));

            if(data.description.tags.includes("star")) {
                var width = tagOfImage.width;
                var height = tagOfImage.height;
                
                tagOfImage.src = "imageblock.jpg";
                tagOfImage.style = "opacity: 1; width: "+width+"px; height: "+height+"px";
            } else {
                tagOfImage.style = "opacity: 1";
            }


    })

    .fail(function(jqXHR, textStatus, errorThrown) {
       
    });

}