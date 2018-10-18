var services = [{
	'name': 'Background',
	'id': 1111
},
{
	'name': 'Foreground',
	'id': 1112
},
{
	'name': 'BackgroundLocation',
	'id': 1113,
	'type': 'geo'
},
{
	'name': 'ForegroundLocation',
	'id': 1114,
	'type': 'geo'
}]

function doClick(e) {
	console.log('Button clicked: ', e);

	var svc = services[e.source.idx];

	if(svc.isStarted){
		//cancel the service
		svc.isStarted = false;
		stopService(svc)
	} else {
		svc.isStarted = true;

		if(svc.type === 'geo'){
			geoService(svc);
		} else {
			startService(svc);
		}
	}
}

$.index.open();

function geoService(e){
	if (Ti.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS)) {
		startService(e);
	} else {
		Ti.Geolocation.requestLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS, function(){
			startService(e);
		});
	}
}


function startService(e) {
	console.log('startService', e);			

	e.alarmManager = require('bencoding.alarmmanager').createAlarmManager();

	
	e.alarmManager.addAlarmService({
		requestCode: e.id,
		service : Ti.App.id + '.'+ e.name + 'Service',
		forceRestart : true,
		//minute : 1
		second: 1,
		interval: 5000,
		//repeat: 5000
	});
}

function stopService(e){
	e.alarmManager.cancelAlarmService(e.id);
	console.log('cancelled service', e);
	e.alarmManager = null;
}