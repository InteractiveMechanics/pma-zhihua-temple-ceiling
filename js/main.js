(function() {
var video = document.getElementById('video-player');
var currentView = 'lap-view';
var timeOutNotSet = false;

//Video ended event that 
video.onended = function(e) {

	sendEventMessage("Video completed", video.duration);

	$('.video-screen').addClass('animated fadeOut');
	$('.pano-controls').css('display', 'block');

	$('.video-screen').one('webkitAnimationEnd animationend', function(){
		$('.video-screen').css('display', 'none');
		onDeviceMotionEvent();
	});

	enablePano();
};

var ExitTimer;
function showDoneModal() {
	$("#modal-content, #modal-background").addClass("active");
	ExitTimer = setTimeout(function(){ 

		if(currentView == 'lap-view') {
			window.location.href = window.location.pathname; 
		}

	}, 90000);
}

function showBatteryModal() {
	$("#battery-low-modal-content, #modal-background").addClass("active");
}

function showOutOfRangeModal() {
	$("#out-of-range-modal-content, #modal-background").addClass("active");
}

var timeout = [];
function resetTimeout () {
    if (timeout) {
        $.each(timeout, function(index, value){
            clearTimeout(value);
            timeout.splice(index, 1);
        });
    }
    timeout.push(setTimeout(showDoneModal, 1200000));
}

$(document).on('click tap drag', resetTimeout);

$('.splash-screen').click(function(){

	sendEventMessage("Intro video played (new session)");

	$('.splash-screen').addClass('animated fadeOut');
	$('.splash-screen').one('webkitAnimationEnd animationend', function(){
		$('.splash-screen').css('display', 'none');
		
		$('.video-controls').addClass('fade-in');
		var video = document.getElementById('video-player');
		video.play();

		var krpano = getKrpanoObject();
		krpano.call("zoomto(.48, smooth);");

		disablePano();
	});
});

$('.instructions').click(function(){
	if( !$('.home-info-modal').is(':visible') ) {
		$(this).css('display', 'none');
	}
})

$('.skip-icon').click(function(){
	var video = document.getElementById('video-player');
	video.currentTime = video.duration

	sendEventMessage("Video skipped", video.currentTime);
});

$('.btn-skip-overhead').click(function(){
	
	sendEventMessage("Skip overhead view pressed");

	//Start LapView Pano

	$('.instructions').css('display', 'block')
	$('.home-info-modal').addClass('animated fadeOut');
	$('.home-info-modal').one('webkitAnimationEnd animationend', function(){
		$('.home-info-modal').css('display', 'none');

		if($('.instructions').css('opacity') == 0) {
			$('.instructions').removeClass('fade-out').addClass('fade-in');
		}

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
	});
});

$('.sound-icon').click(function(){
	var video = document.getElementById('video-player');
		
	if(!video.muted) {
		video.muted = true;
		$('.on').css("display", "none");;
		$('.off').css("display", "block");;

		sendEventMessage("Video muted");
	} else {
		video.muted = false;
		$('.off').css("display", "none");;
		$('.on').css("display", "block");;

		sendEventMessage("Video unmuted");
	}

});

$('.refocus-icon').click(function(){
	var krpano = document.getElementById("krpanoSWFObject");
    krpano.call("looktohotspot('a1', .48, tween('easeInOutQuad', 0.5));");

	if($('.popup-modal').is(':visible')) {
		$('.close-icon').click();
	}  
});

$('.start-over-btn').click(function(){
	sendEventMessage("Session ended");
	window.location.href = window.location.pathname; 
});

$('.about-icon').click(function(){
	sendEventMessage("About the Temple selected");

	$('.about-modal').show();

	setupAbout();
});

$('.about-modal .close-icon').click(function(){
	$('.about-modal').hide();
});

$('.popup-modal .close-icon').click(function(){
	$('.popup-modal').hide();
	enablePano();

	var name = $('.close-icon').data('lasthotspot');

	var krpano = getKrpanoObject();
    var query = "hotspot['"+name+"']"; // i.e. "hotspot['spot0']"
    var hotspot = krpano.get(query); 
    hotspot.alpha = .25;

    $('.refocus-icon').click();

    var zIndexValue = $(".tiny-temple-screen").css("z-index");

    if(zIndexValue == 2) {
    	$(".tiny-temple-screen").addClass('fade-out');
    	setTimeout(function() {

	    	$(".tiny-temple-screen").removeClass('fade-in').css("z-index", -1);
    
    	}, 160);
    	showControls();
    } else {
    	$('.popup-modal').hide();
		var krpano = document.getElementById("krpanoSWFObject");
	    krpano.call("looktohotspot('a1', .48, tween('easeInOutQuad', 0.5));");
    }
});

function onDeviceMotionEvent() {
	window.ondevicemotion = function(e) {
	    var z = e.accelerationIncludingGravity.z;
	    
	    if(z >= 5) {
	        $('.home-screen').addClass('animated fadeOut');
	        $('.home-screen').css('display', 'none');

	        if($('.home-info-modal').css('display') == 'block') {
	        	$('.instructions').css('display', 'block');
				$('.instructions').removeClass('fade-out').addClass('fade-in');
			}

			$('.home-info-modal').css('display', 'none');

			if($('.pano-controls').hasClass('fade-in')) {
				$('.pano-controls').removeClass('fade-in').addClass('fade-out');
        	}

        	if($('.start-over').hasClass('fade-in')) {
				$('.start-over').removeClass('fade-in').addClass('fade-out');
        	}

        	if(!$('.popup-modal').is(':visible')) {
				$('.close-icon').click();
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
				krpanoZoomTo(.48);

				enablePano();
				timeOutNotSet = true;

				ceilingZoomTo(100)
	        }

	        currentView = 'lap-view';
	    }
	}
}

$('#modal-background, #modal-content, #battery-low-modal-content, #out-of-range-modal-content').click(function(){

	if($('#modal-content').is(':visible')) {
		$("#modal-content, #modal-background").removeClass("active");
	}

	if($('#out-of-range-modal-content').is(':visible')) {
		$("#out-of-range-modal-content, #modal-background").removeClass("active");
	}

	if($('#battery-low-modal-content').is(':visible')) {
		$("#battery-low-modal-content, #modal-background").removeClass("active");
	}
	clearTimeout(ExitTimer);
});

})();