var phobiaList = [];

function enterPhobiaInput() {
    "use strict";
    var list = document.getElementById("userPhobiaList");
    var tempUserPhobia = document.getElementById('userPhobia').value;
    phobiaList.push(tempUserPhobia);
    
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(tempUserPhobia));
    list.appendChild(entry);
    document.getElementById("userPhobia").value = "";
}

// Function wrapper
(function() {
    // Use strict style (doesn't affect functionality)
    'use strict';

    // Set up shortcuts for getting elements of web page
    var $$$ = function(id) { return document.getElementById(id); };
    var $$ = function(id) { return document.getElementsByClassName(id); };
    var currentJSON = "";

    // Window onload function. This code is executed when the HTML page first loads
    window.onload = function() {
        var phobia = ["spiders", "clowns", "snails"];
        var image = "https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg";
        document.querySelector("#sourceImage").src = image;
        processImage(image, $("#sourceImage"));
        
    };

    function enterPhobiaInput(){
        var phobia = document.getElementById('phobia').value;
    }

    function processImage(sourceImageURL, tagOfImage) {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

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
        var sourceImageUrl = sourceImageURL;
        var returnTrueOrFalse = false;
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
            if(data.categories[0].name = "animal_cat") {
                $("#sourceImage").attr({"style":"opacity: 0"});
            }
            
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });

    }


})();

 