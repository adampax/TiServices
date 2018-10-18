console.log('[Foreground] running service ' + new Date().toString());
foregroundNotify();
//stop it after one run
//Ti.Android.currentService.stop();


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

    setTimeout(function(){
        foregroundCancel();
    }, 2000);
}

function foregroundCancel(){
    Ti.Android.currentService.foregroundCancel();
}