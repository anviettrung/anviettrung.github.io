// Author: An Viet Trung (AnZero74)

// Save the current perferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits  = app.preferences.typeUnits;
var startDisplayDialog = app.displayDialogs;

var doc = app.activeDocument;
var layers = doc.layers;

// --------------------------------------------------------
// Save init layers
var initLayers = [];
var n = 0;
for (var i = 0; i < layers.length; i++)
{
	if (layers[i].visible) {
		initLayers.push(layers[i]);
		n += 1;
	}
}

// Split
for (var i = 1; i < n; i++) {
	CutLayerHalf(initLayers[i-1], initLayers[i]);
}

// Remove orignal
for (var i = 1; i < n; i++) {
	initLayers[i].remove();
}

// --------------------------------------------------------

function CutLayerHalf(preLayer, desLayer) {
	var Left   = desLayer.bounds[0];
	var Top    = desLayer.bounds[1];
	var Right  = preLayer.bounds[2];
	var Bottom = preLayer.bounds[3];

	// Left part
	activeDocument.activeLayer = desLayer;
	DrawInvisiblePixel(Right-1, Bottom-1);

	activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE, 0, false);

	activeDocument.selection.copy(false);
	activeDocument.paste();

	activeDocument.selection.deselect();

	// Right part
	Left  = preLayer.bounds[2];
	Right = desLayer.bounds[2];

	activeDocument.activeLayer = desLayer;
	DrawInvisiblePixel(Right-1, Bottom-1);

	activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE, 0, false);

	activeDocument.selection.copy(false);
	activeDocument.paste();

	activeDocument.selection.deselect();
}

function DrawInvisiblePixel(x, y) 
{
	var Left = x;
	var Top = y;
	var Right = x+1;
	var Bottom = y+1;

	var whiteColor = new SolidColor();
	whiteColor.rgb.hexValue = "ffffff";
	activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE, 0, false);

	//activeDocument.selection.fill(whiteColor, ColorBlendMode.CLEAR, 100);
	activeDocument.selection.fill(whiteColor, ColorBlendMode.NORMAL, 1);

	activeDocument.selection.deselect();
}

// --------------------------------------------------------
// Function này không còn dùng nữa nhưng tôi không muốn
// xoá nó đi vì nó gợi nhớ cho tôi kỉ niệm đau đớn khi
// phải viết script cho photoshop :'(
// Hiện tại là Sunday Jan 5, 2020 lúc 2:36am. Tôi vừa hoàn
// thành xong cái script chết tiệt này sau 1 ngày dài đằng
// đẵng...
// --------------------------------------------------------
// function SaveInfoInCoord(info, bounds, x, y) {
// 	var Left = bounds[0] + x;
// 	var Top = bounds[1] + y;
// 	var Right = bounds[0]+1 + x;
// 	var Bottom = bounds[1]+1 + y;

// 	var whiteColor = new SolidColor();
// 	whiteColor.rgb.hexValue = "ffffff";
// 	var fillColour = new SolidColor();
// 	fillColour.rgb.red = info;
// 	fillColour.rgb.green = 0;
// 	fillColour.rgb.blue = 0;

// 	activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE, 0, false);

// 	//executeAction(charIDToTypeID( "CpTL" ), undefined, DialogModes.NO );

// 	//activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE, 0, false);

// 	activeDocument.selection.fill(whiteColor, ColorBlendMode.CLEAR, 100);
// 	activeDocument.selection.fill(fillColour, ColorBlendMode.NORMAL, 100);

// 	activeDocument.selection.deselect();
// }

// function createLayerBelowCurrent(astring)
// {
//   var currentActivelayer = app.activeDocument.activeLayer;
//   var idx = getLayerIndex(currentActivelayer);

//   // Get a reference to the active layer
//   var layerRef = app.activeDocument.layers[idx];

//   // Create a new Art Layer, by default at the top of the document
//   var newLayerRef = app.activeDocument.artLayers.add();

//   // Move the new layer set to after the previously first layer
//   newLayerRef.move(layerRef, ElementPlacement.PLACEAFTER);

//   return newLayerRef;
// }


// function getLayerIndex(ref)
// {
//   // return the idex of ALL layers
//   var numOfLayers = app.activeDocument.layers.length;

//   // work from the top of the stack down!
//   for (var i = numOfLayers -1; i >= 0; i--)
//   {
//     var tempLayer = app.activeDocument.layers[i];
//     if (tempLayer == ref) return i

//     if (tempLayer.typename == "LayerSet")
//     {
//       var subDoc = app.activeDocument.layers[i];
//       for (var j = numOfSubLayers -1; j >= 0; j--)
//       {
//         var tempSubLayer = subDoc.layers[j]
//         if (tempSubLayer == ref) return j
//       }
//     }
//   }
// }

// //******************************************
// // MOVE LAYER TO
// // Author: Max Kielland
// //
// // Moves layer fLayer to the absolute
// // position fX,fY. The unit of fX and fY are
// // the same as the ruler setting. 

// function MoveLayerTo(fLayer,fX,fY) {

//   var Position = fLayer.bounds;
//   Position[0] = fX - Position[0];
//   Position[1] = fY - Position[1];

//   fLayer.translate(-Position[0],-Position[1]);
// }