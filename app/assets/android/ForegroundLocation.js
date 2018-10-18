console.log('[ForegroundLocation] running service ' + new Date().toString());
foregroundNotify();
//stop it after one run
//Ti.Android.currentService.stop();

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
Ti.Geolocation.addEventListener('location', locationCallback);

function locationCallback(e) {

	if (e.error) {
		console.warn('[ForegroundLocation] Geolocation error', e);
	} else {
		console.log('[ForegroundLocation] Geolocation response', e);
		
		//stop the service
		Ti.Geolocation.removeEventListener('location', locationCallback);
        console.log('[ForegroundLocation] remove Geolocation listener');
        Ti.Android.currentService.foregroundCancel();
	}

}


function foregroundNotify(){
    // Gets an intent used to resume the app if running in the background.
    function getAppResumeIntent() {
        var intent = Ti.App.Android.launchIntent;
        if (!intent) {
            intent = Ti.Android.createIntent({});
        }
        return intent;
    }

    // Put this service into the foreground state.
    var notificationId = 123;
    Ti.Android.currentService.foregroundNotify(notificationId, Ti.Android.createNotification({
        contentTitle: "Foreground Service",
        contentText: "Content Text",
        contentIntent: Ti.Android.createPendingIntent({
            // Using the launch intent will resume the app when tapped.
            intent: getAppResumeIntent(),
        }),
    }));
}