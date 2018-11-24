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

function getRandomColor() {
	var elements = '0123456789ABCDEF'; 
	var color = '#'; 
	for (var i=0; i < 6; i++)
	{
		color += letters[Math.random() * 16]; 
	}

	return color; 
}