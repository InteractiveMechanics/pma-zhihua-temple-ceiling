(function() {
var video = document.getElementById('video-player');
video.onended = function(e) {
	$('.video-screen').addClass('animated fadeOut');
};

$('.btn-begin').click(function(){
	$('.spash-screen').addClass('animated fadeOut');
	$('.spash-screen').one('webkitAnimationEnd animationend', function(){
		$('.spash-screen').css('display', 'none');

		var video = document.getElementById('video-player');
		video.play();
	});
});

$('.muted-icon').click(function(){

	if(video.muted) {
		video.muted = false;
		$(this).removeClass('fa-volume-up').addClass('fa-volume-off');
	} else {
		video.muted = true;
		$(this).removeClass('fa-volume-off').addClass('fa-volume-up');
	}
});

window.ondevicemotion = function(e) {
	var z = e.accelerationIncludingGravity.z;
	
	if(z >= 3) {
		
	}
	
	if(z <= -3) {
		
	}
}


})();