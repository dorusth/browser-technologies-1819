const constraints = {
	audio: false,
	video: {
		width: 1280,
		height: 720,
		facingMode: "environment"
	}
};

if (document.querySelector('video')) {
	console.log('hallo');
	navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
			let video = document.querySelector('video');
			video.srcObject = mediaStream;
			video.onloadedmetadata = function(e) {
				video.play();
			};
		})
		.catch(function(err) {
			console.log(err.name + ": " + err.message);
		}); // always check for errors at the end.
}
