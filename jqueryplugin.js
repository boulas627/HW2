//create the jquery plugin
$( function( $ ) {
    $.fn.hexed = function(diff) {
        //var output = '<div class="slidecontainer"><input type="range" min="0" max="10" value="5" class="slider" id="myRange"><p>Difficulty Level: <span id="value"></span></p></div><div id="red"></div><div id="green"></div><div id="blue"></div><div id="swatch" class="ui-widget-content ui-corner-all"></div><div id="swatchcont"></div>';
        var guess = 0;
        var color = 0;
	    var r = getRandomColor255();
	    var g = getRandomColor255();
	    var b = getRandomColor255();
	    var swatchhex = document.getElementById("swatchHex");
		//    var swatch = '<div id="swatch" style="width:100px;height:100px;background-color:' + color + ';" ></div>';
	    
		/*Variables to control the game*/
		var round = 0;
		var score = 0;
		var startTime = 0;
		var difficulty = 5;

	    //Set the color of the slider swatch
	    swatchhex.innerHTML = hexFromRGB(r, g, b);

	    //function to convert rgb to hex
	    function hexFromRGB(r, g, b) {
	      var hex = [
	        r.toString( 16 ),
	        g.toString( 16 ),
	        b.toString( 16 )
	      ];
	      $.each( hex, function( nr, val ) {
	        if ( val.length === 1 ) {
	          hex[ nr ] = "0" + val;
	        }
	      });
	      return hex.join( "" ).toUpperCase();
	    }

	    //function to reset the swatch
	    function refreshSwatch() {
	      var red = $( "#red" ).slider( "value" ),
	        green = $( "#green" ).slider( "value" ),
	        blue = $( "#blue" ).slider( "value" ),
	        hex = hexFromRGB( red, green, blue );
	      $( "#swatch" ).css( "background-color", "#" + hex );
	      $("#swatchHex").html(hex);
	    }
	 	
	 	//code to change items when sliders are moved
	    $( "#red, #green, #blue" ).slider({
	      orientation: "horizontal",
	      range: "min",
	      max: 255,
	      value: 127,
	      slide: refreshSwatch,
	      change: refreshSwatch
	    });
	    $( "#red" ).slider( "value", r );
	    $( "#green" ).slider( "value", g );
	    $( "#blue" ).slider( "value", b );

		//code to set the color of swatchCompare for the current round
		function setColor(){
			var color = getRandomColor();
			$("#swatchCompare").css("background-color", "#"+color);
			return color;
		}

		/* Function comapres to RGB values
			Input: two hex numbers
			Output: percent different between them */
		function compareRGB(guess, color){
			//Convert to int
			guess = "0x" + guess;
			guess = parseInt(guess);
			color = "0x" + color;
			color = parseInt(color);

			var percent = Math.abs(color - guess);
			percent = percent / 255;
			percent = percent * 100;
			return percent;
		}

		/* Function splits hex color into RGB values and returns their percents
			Input: 2 hex colors
			Output: percent differences between the RGB values*/
		function getScore(guess, color, time){
			//guess
			var r1 = guess.substring(0,2);
			var g1 = guess.substring(2,4);
			var b1 = guess.substring(4,6);

			//color
			var r2 = color.substring(0,2);
			var g2 = color.substring(2,4);
			var b2 = color.substring(4,6);

			//compare the values
			var res1 = compareRGB(r1,r2);
			var res2 = compareRGB(g1,g2);
			var res3 = compareRGB(b1,b2);

			//display the values
			$("#rgb").html("R: " + res1.toFixed(2) + " G: " + res2.toFixed(2) + " B: " + res3.toFixed(2));

			//get average
			var average = res1 + res2 + res3;
			average = average / 3;
			average = Math.abs(average);

			//get timed score
			var round = 15 - difficulty - average;
			round = round / (15 - difficulty);
			round = round * (15000 - time);

			//check for negative score
			if(round < 0){
				round = 0;
			}

			return round;
		}

		/*
			Buttons to control the game
			round
			score
			timer
		*/

		//button clicked when user has guess
		$("#checkit").click(function(){
			//get the color from the sliders
			var red = $( "#red" ).slider( "value" ),
		        green = $( "#green" ).slider( "value" ),
		        blue = $( "#blue" ).slider( "value" ),
		        hex = hexFromRGB( red, green, blue );

		    //end the timer
		    var elapsed = new Date() - startTime;

		    //get the score from their guess
			score += getScore(hex,color,elapsed);
			$("#scoreDisplay").html(score.toFixed(2));

			//update the color
			color = setColor();

			//update the round
			round++;

			//check if the game is over
			if(round >= 3 ){
				//then game is over
				round = 0;

				//update buttons and swatch
				$("#start").css("display","block");
				$("#checkit").css("display", "none");
				$("#swatchCompare").css("display","none");
			}
		});

		//button to start the game
		$("#start").click(function(){
			//get the difficulty
			difficulty = $("#myRange").val();

			//update the round
			round = 0;
			score = 0;
			$("#scoreDisplay").html(score.toFixed(2));

			//display the color
			$("#swatchCompare").css("display", "block");
			color = setColor();

			//Start the timer
			startTime = new Date();

			//update buttons
			$("#start").css("display","none");
			$("#checkit").css("display", "block");
		}); 

	 





	//    (function ( $ ) {
	//        $.fn.hexed = function() {
	//            var color = getRandomColor();
	//            var swatchcont = document.getElementById("swatchcont");
	//            var swatch = '<div id="swatch" style="width:100px;height:100px;background-color:' + color + ';" ></div>';
	//            swatchcont.innerHTML = '<div>' + color + '</div>' + swatch;
	//        };
	//    }( jQuery ));

	// random color generator 
	// set values for red, green, and blue to a certain number 
	// create slider that includes number
	// 	-> circle on the left will be the target color 
	// 	-> circle on the right will be the current hexadecimal color that is being displayed
	function getRandomColor() {
		var elements = '0123456789ABCDEF'; 
		var color = ""; 
	    var index = 0;
		for (var i=0; i < 6; i++) {
	        index = Math.floor((Math.random() * 15) + 1);
			color += elements[index];
		}
		return color;
	}

	//function to get random 255 value for slider
	function getRandomColor255() {
		return Math.floor((Math.random() * 255) + 1);
	}



    };

}( jQuery ));