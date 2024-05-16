var fileRef = new File(
  "/Users/leocaadi-stefan/Desktop/site/interface/core/scripts/file2.psd"
);

var docRef = app.open(fileRef);

placeFileIntoDocument(arguments[0]);
placeFileIntoDocument(arguments[1]);

var labelLayer = docRef.artLayers.getByName("Label");
var modelLayer = docRef.artLayers.getByName("Model");
var decalLayer = docRef.artLayers.getByName("Decal");
var backgroundLayer = docRef.artLayers.getByName("Background");
var imageLayer = docRef.artLayers.getByName("Image");

applyTransforms(imageLayer, -1.4, -3.7, 61.4);

labelLayer.move(imageLayer, ElementPlacement.PLACEBEFORE);
modelLayer.move(labelLayer, ElementPlacement.PLACEBEFORE);
decalLayer.move(modelLayer, ElementPlacement.PLACEBEFORE);
backgroundLayer.move(decalLayer, ElementPlacement.PLACEBEFORE);
imageLayer.move(backgroundLayer, ElementPlacement.PLACEBEFORE);

imageLayer.grouped = true;
backgroundLayer.grouped = true;

function applyTransforms(layer, xPercent, yPercent, scalePercent) {
  var bgLayer = app.activeDocument.artLayers.add();
  bgLayer.name = "Temp_BG";
  bgLayer.move(layer, ElementPlacement.PLACEAFTER);

  // Fill white background
  app.activeDocument.selection.selectAll();
  var whiteColor = new SolidColor();
  whiteColor.rgb.red = 255;
  whiteColor.rgb.green = 255;
  whiteColor.rgb.blue = 255;
  app.activeDocument.selection.fill(whiteColor);
  app.activeDocument.selection.deselect();

  // Group the layers
  var group = app.activeDocument.layerSets.add();
  layer.move(group, ElementPlacement.INSIDE);
  bgLayer.move(group, ElementPlacement.INSIDE);

  // Scale the group
  group.resize(scalePercent, scalePercent);

  // Get document dimensions
  var docWidth = app.activeDocument.width;
  var docHeight = app.activeDocument.height;

  // Get the dimensions of the group
  var groupBounds = group.bounds;
  var groupWidth = groupBounds[2] - groupBounds[0];
  var groupHeight = groupBounds[3] - groupBounds[1];

  // Calculate the position to move the group to center it
  var dx = (docWidth - groupWidth) / 2 - groupBounds[0];
  var dy = (docHeight - groupHeight) / 2 - groupBounds[1];

  // Translate to center
  group.translate(dx, dy);

  // Additional X and Y translations
  var xMove = groupWidth * (xPercent / 100);
  var yMove = groupHeight * (yPercent / 100);

  // Apply additional translations
  group.translate(xMove, yMove);

  // Ungroup and clean up
  layer.move(app.activeDocument, ElementPlacement.PLACEATEND);
  bgLayer.remove();
  group.remove();
}

function addTextLayer(content) {
  var textLayer = app.activeDocument.artLayers.add();
  textLayer.kind = LayerKind.TEXT;
  textLayer.textItem.contents = content;
}

function placeFileIntoDocument(filePath) {
  var idPlc = charIDToTypeID("Plc ");
  var desc11 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  desc11.putPath(idnull, new File(filePath));
  var idFTcs = charIDToTypeID("FTcs");
  var idQCSt = charIDToTypeID("QCSt");
  var idQcsa = charIDToTypeID("Qcsa");
  desc11.putEnumerated(idFTcs, idQCSt, idQcsa);
  var idOfst = charIDToTypeID("Ofst");
  var desc12 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idRlt = charIDToTypeID("#Rlt");
  desc12.putUnitDouble(idHrzn, idRlt, 0.0);
  var idVrtc = charIDToTypeID("Vrtc");
  var idRlt = charIDToTypeID("#Rlt");
  desc12.putUnitDouble(idVrtc, idRlt, 0.0);
  var idOfst = charIDToTypeID("Ofst");
  desc11.putObject(idOfst, idOfst, desc12);
  executeAction(idPlc, desc11, DialogModes.NO);
}
