console.log('[BackgroundLocation] running service ' + new Date().toString());

//stop it after one run
//Ti.Android.currentService.stop();

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
Ti.Geolocation.addEventListener('location', locationCallback);

function locationCallback(e) {

	if (e.error) {
		console.warn('[BackgroundLocation] Geolocation error', e);
	} else {
		console.log('[BackgroundLocation] Geolocation response', e);
		
		//stop the service
		Ti.Geolocation.removeEventListener('location', locationCallback);
		console.log('[BackgroundLocation] remove Geolocation listener');
	}

}