var fileRef = new File(
    "/Users/leocaadi-stefan/Desktop/site/interface/core/scripts/file2.psd"
);

var docRef = app.open(fileRef);

var decalLayer = docRef.artLayers.getByName("Decal");

var docWidth = docRef.width;
var docHeight = docRef.height;

var decalBounds = decalLayer.bounds; // [left, top, right, bottom]

var decalLeft = decalBounds[0];
var decalTop = decalBounds[1];
var decalWidth = decalBounds[2] - decalLeft;
var decalHeight = decalBounds[3] - decalTop;

var decalLeftPercent = parseFloat((decalLeft / docWidth * 100).toFixed(3));
var decalTopPercent = parseFloat((decalTop / docHeight * 100).toFixed(3));
var decalWidthPercent = parseFloat((decalWidth / docWidth * 100).toFixed(3));
var decalHeightPercent = parseFloat((decalHeight / docHeight * 100).toFixed(3));


var savePath = "/Users/leocaadi-stefan/Desktop/site/interface/core/scripts/file2dimensiuni.txt";
var file = new File(savePath);
file.open("w");
file.write("Decal Left: " + decalLeftPercent + "%\n");
file.write("Decal Top: " + decalTopPercent + "%\n");
file.write("Decal Width: " + decalWidthPercent + "%\n");
file.write("Decal Height: " + decalHeightPercent + "%\n");
file.close();