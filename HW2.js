$(document).ready(function() {
	$("#default").click(function() {
		alert("Medium Level Of Difficulty"); 
	});

	$("#easy").click(function() {
		alert("Easiest Level Of Difficulty"); 
	});

	$("#hard").click(function() {
		alert("Easiest Level Of Difficulty"); 
	});
});

// random color generator 

// set values for red, green, and blue to a certain number 

// create slider that includes number
// 	-> circle on the left will be the target color 
// 	-> circle on the right will be the current hexadecimal color that is being displayed



function getRandomColor() {
	var elements = '0123456789ABCDEF'; 
	var color = '#'; 
	for (var i=0; i < 6; i++)
	{
		color += letters[Math.random() * 16]; 
	}

	return color; 
}

