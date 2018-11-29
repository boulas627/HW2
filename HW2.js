$(document).ready(function() {
//	$("#default").click(function() {
//		alert("Medium Level Of Difficulty"); 
//	});
//
//	$("#easy").click(function() {
//		alert("Easiest Level Of Difficulty"); 
//	});
//
//	$("#hard").click(function() {
//		alert("Easiest Level Of Difficulty"); 
//	});
    
    var color = getRandomColor();
    var swatchcont = document.getElementById("swatchcont");
    var swatch = '<div id="swatch" style="width:100px;height:100px;background-color:' + color + ';" ></div>';
    
    swatchcont.innerHTML = '<div>' + color + '</div>' + swatch;

//    swatchcont.style = 'width:100px;height:100px;background-color:' + color + ';';
    
});

// random color generator 
// set values for red, green, and blue to a certain number 
// create slider that includes number
// 	-> circle on the left will be the target color 
// 	-> circle on the right will be the current hexadecimal color that is being displayed
function getRandomColor() {
	var elements = '0123456789ABCDEF'; 
	var color = '#'; 
    var index = 0;
	for (var i=0; i < 6; i++) {
        index = Math.floor((Math.random() * 15) + 1);
		color += elements[index];
	}
	return color; 
}

