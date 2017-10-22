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

    // Window onload function. This code is executed when the HTML page first loads
    window.onload = function() {
        var phobia = ["spiders", "clowns", "snails"];
        var image = "https://img00.deviantart.net/8ad8/i/2013/186/9/a/realistic_spider_by_natihassansin-d6c3rj2.jpg";
        document.querySelector("#sourceImage").src = image;
        
        hideAllImages();
        $("img").each(function(){
            processImage(this);
        });

        
    };

    function hideAllImages() {
        $("img").each(function() {
            this.style = "opacity:0";
        })
    }

    function enterPhobiaInput(){
        var phobia = document.getElementById('phobia').value;
    }

    function processImage(tagOfImage) {
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
            
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });

    }

    function matchesFilter(tags, phobiaList) {
        return false;
    }


})();

 