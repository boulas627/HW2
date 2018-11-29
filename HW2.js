$(function() {

    var r = getRandomColor255();
    var g = getRandomColor255();
    var b = getRandomColor255();
    var swatchcont = document.getElementById("swatchcont");
//    var swatch = '<div id="swatch" style="width:100px;height:100px;background-color:' + color + ';" ></div>';
    
    swatchcont.innerHTML = '<div>#' + hexFromRGB(r, g, b) + '</div>';

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
    function refreshSwatch() {
      var red = $( "#red" ).slider( "value" ),
        green = $( "#green" ).slider( "value" ),
        blue = $( "#blue" ).slider( "value" ),
        hex = hexFromRGB( red, green, blue );
      $( "#swatch" ).css( "background-color", "#" + hex );
    }
 
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
        
//    (function ( $ ) {
//        $.fn.hexed = function() {
//            var color = getRandomColor();
//            var swatchcont = document.getElementById("swatchcont");
//            var swatch = '<div id="swatch" style="width:100px;height:100px;background-color:' + color + ';" ></div>';
//            swatchcont.innerHTML = '<div>' + color + '</div>' + swatch;
//        };
//    }( jQuery ));
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

function getRandomColor255() {
	return Math.floor((Math.random() * 255) + 1);
}
