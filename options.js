chrome.storage.local.get('phobias', function(result) {
	loadStored = result.phobias;
	var toPrint = "";
	for(var i = 0; i < loadStored.length; i++) {
		toPrint = toPrint + loadStored[i] + ", ";
	}
	toPrint = toPrint.substring(0, toPrint.length-2);
	document.getElementById("submit").value = toPrint;
});
	document.getElementById("update").addEventListener("click", getOptions);
	

function getOptions() {
	var box = document.getElementById("submit").value;
	var values = box.split(", ");
	chrome.storage.local.set({"phobias": values});
}