(function() {
var video = document.getElementById('video-player');
var currentView = 'lap-view';
var timeOutNotSet = false;

video.onended = function(e) {
	$('.video-screen').addClass('animated fadeOut');
	$('.pano-controls').css('display', 'block');

	$('.video-screen').one('webkitAnimationEnd animationend', function(){
		$('.video-screen').css('display', 'none');
		onDeviceMotionEvent();
	});
};

var ExitTimer;
function showDoneModal() {
	$("#modal-content, #modal-background").addClass("active");
	ExitTimer = setTimeout(function(){ 

		if(currentView == 'lap-view') {
			window.location.href = window.location.pathname; 
		}

	}, 10000);
}

var timeout = [];
function resetTimeout () {
    if (timeout) {
        $.each(timeout, function(index, value){
            clearTimeout(value);
            timeout.splice(index, 1);
        });
    }
    timeout.push(setTimeout(showDoneModal, 120000));
}

$(document).on('click tap drag', resetTimeout);

$('.splash-screen').click(function(){
	$('.splash-screen').addClass('animated fadeOut');
	$('.splash-screen').one('webkitAnimationEnd animationend', function(){
		$('.splash-screen').css('display', 'none');
		
		$('.video-controls').addClass('fade-in');
		var video = document.getElementById('video-player');
		video.play();

		var krpano = getKrpanoObject();
		krpano.call("zoomto(.43, smooth);");

		disablePano();
		//hideHotSpots();
	});
});

$('.skip-icon').click(function(){
	var video = document.getElementById('video-player');
	video.currentTime = video.duration
});

$('.btn-skip-overhead').click(function(){
	$('.home-info-modal').addClass('animated fadeOut');
	$('.home-info-modal').one('webkitAnimationEnd animationend', function(){
		$('.home-info-modal').css('display', 'none');

		showHotSpots();
		showControls();
		var krpano = getKrpanoObject();
		//krpano.call("zoomto(.3, smooth);");

		/*document.body.addEventListener("click", function() {
			var krpano = getKrpanoObject();
			var mx = krpano.get("mouse.x");
			var my = krpano.get("mouse.y");
			var pt = krpano.screentosphere(mx,my);

			alert("Horizontal: " + pt.x.toFixed(3) + "  Vertical: " + pt.y.toFixed(3));
		});*/

		fade();
	});
});

$('.sound-icon').click(function(){
	var video = document.getElementById('video-player');
		
	if(!video.muted) {
		video.muted = true;
		$('.on').css("display", "none");;
		$('.off').css("display", "block");;
	} else {
		video.muted = false;
		$('.off').css("display", "none");;
		$('.on').css("display", "block");;
	}

});

$('.refocus-icon').click(function(){
	//var krpano = getKrpanoObject();
	//krpano.call("moveto(0, 0, 'smooth');"); 
	krpanoMoveTo(0,0); 
	krpanoZoomTo(.43); 

	$('.hotspot-map').show();    

	if($('.popup-modal').is(':visible')) {
		$('.close-icon').click();
	}  
});

$('.start-over-btn').click(function(){
	window.location.href = window.location.pathname; 
});

$('.hotspot img').click(function(){
	var x = $(this).data('x');
	var y = $(this).data('y');

	var krpano = getKrpanoObject();
	krpano.call("moveto("+ x + ", " + y + ", 'smooth');"); 

	$('.hotspot-map').hide();
});

$('.about-icon').click(function(){

});

$('.close-icon').click(function(){
	$('.popup-modal').hide();
	enablePano();

	var name = $('.close-icon').data('lasthotspot');

	var krpano = getKrpanoObject();
    var query = "hotspot['"+name+"']"; // i.e. "hotspot['spot0']"
    var hotspot = krpano.get(query); 
    hotspot.alpha = .25;
});

function onDeviceMotionEvent() {
	window.ondevicemotion = function(e) {
	    var z = e.accelerationIncludingGravity.z;
	    
	    if(z >= 5) {
	        $('.home-screen').addClass('animated fadeOut');
	        $('.home-screen').css('display', 'none');
			$('.home-info-modal').css('display', 'none');

			if($('.pano-controls').hasClass('fade-in')) {
				$('.pano-controls').removeClass('fade-in').addClass('fade-out');

				setTimeout(function(){
					$('.overhead-popup').addClass('fade-in');

					setTimeout(function(){
						$('.overhead-popup').addClass('fade-out');
					}, 4000);
				}, 4000);
        	}

        	if($('.start-over').hasClass('fade-in')) {
				$('.start-over').removeClass('fade-in').addClass('fade-out');
        	}

        	if(!$('.popup-modal').is(':visible')) {
				$('.close-icon').click();
			}
			timeOutNotSet = true;

			if(timeOutNotSet) {
				timeOutNotSet = false;
				setTimeout(function(){
					$('.overhead-modal').css('opacity', 1);

					setTimeout(function(){
						$('.overhead-modal').css('opacity', 0);
					}, 5000);
				}, 5000);
			}

			currentView = 'overhead-view';
	    }
	    
	    if(z <= 1.5) {
	    	if(!$('.home-screen').is(':visible')) {
	        	$('.home-screen').removeClass('fadeOut').addClass('animated fadeIn');
	        	$('.home-screen').css('display', 'block');

	        	if(!$('.pano-controls').hasClass('fade-in')) {
					$('.pano-controls').removeClass('fade-out').addClass('fade-in');
	        	}

	        	if(!$('.start-over').hasClass('fade-in')) {
					$('.start-over').removeClass('fade-out').addClass('fade-in');
	        	}

	        	var krpano = getKrpanoObject();
				krpano.call("moveto(0, 0, 'smooth');");  
				krpanoZoomTo(.43); 

				enablePano();
				timeOutNotSet = true;
	        }

	        currentView = 'lap-view';
	    }
	}
}

function showControls() {
	$('.pano-controls').removeClass('fade-out').addClass('fade-in');
	$('.start-over').removeClass('fade-out').addClass('fade-in');
}

function hideControls() {
	$('.pano-controls').removeClass('fade-in').addClass('fade-out');
	$('.start-over').removeClass('fade-in').addClass('fade-out');
}

$('#modal-background, #modal-content').click(function(){
	$("#modal-content, #modal-background").removeClass("active");
	clearTimeout(ExitTimer);
});

})();