const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseInfoAudio: '.KOMBrowseInfoAudio',
	
	KOMBrowseInfoAudioRecordButton: '.KOMBrowseInfoAudioRecordButton',
	KOMBrowseInfoAudioRecordingAlert: '.KOMBrowseInfoAudioRecordingAlert',
	
	KOMBrowseInfoAudioPlaybackButton: '.KOMBrowseInfoAudioPlaybackButton',
	KOMBrowseInfoAudioClearButton: '.KOMBrowseInfoAudioClearButton',

	KOMBrowseInfoAudioNotAvailableAlert: '.KOMBrowseInfoAudioNotAvailableAlert',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowseInfoAudio_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoAudioItem: JSON.stringify({
				KOMCardID: 'alfa',
			}),
			KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
		});
	});

	it('shows KOMBrowseInfoAudio', function () {
		browser.assert.elements(KOMBrowseInfoAudio, 1);
	});

	it('shows KOMBrowseInfoAudioRecordButton', function () {
		browser.assert.elements(KOMBrowseInfoAudioRecordButton, 1);
	});

	it('hides KOMBrowseInfoAudioRecordingAlert', function () {
		browser.assert.elements(KOMBrowseInfoAudioRecordingAlert, 0);
	});

	it('hides KOMBrowseInfoAudioPlaybackButton', function () {
		browser.assert.elements(KOMBrowseInfoAudioPlaybackButton, 0);
	});

	it('hides KOMBrowseInfoAudioClearButton', function () {
		browser.assert.elements(KOMBrowseInfoAudioClearButton, 0);
	});

	it('hides KOMBrowseInfoAudioNotAvailableAlert', function () {
		browser.assert.elements(KOMBrowseInfoAudioNotAvailableAlert, 0);
	});

	context('KOMBrowseInfoAudioRecordButton', function () {
		
		context('click', function () {
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioRecordButton);
			});

			it('shows KOMBrowseInfoAudioRecordingAlert', function () {
				browser.assert.elements(KOMBrowseInfoAudioRecordingAlert, 1);
			});
		
		});

		context('click during record', function () {
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioRecordButton);
			});

			it('hides KOMBrowseInfoAudioRecordingAlert', function () {
				browser.assert.elements(KOMBrowseInfoAudioRecordingAlert, 0);
			});
		
		});
	
	});

	context('KOMBrowseInfoAudioItemProperty', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
					KOMCardFrontAudio: 'bravo',
				}),
				KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('hides KOMBrowseInfoAudioRecordButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioRecordButton, 0);
		});

		it('shows KOMBrowseInfoAudioPlaybackButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioPlaybackButton, 1);
		});

		it('shows KOMBrowseInfoAudioClearButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioClearButton, 1);
		});
	
	});

	context('KOMBrowseInfoAudioAvailable', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoAudioAvailable: false,
				KOMBrowseInfoAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
				}),
				KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('hides KOMBrowseInfoAudioRecordButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioRecordButton, 0);
		});

		it('hides KOMBrowseInfoAudioPlaybackButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioPlaybackButton, 0);
		});

		it('hides KOMBrowseInfoAudioClearButton', function () {
			browser.assert.elements(KOMBrowseInfoAudioClearButton, 0);
		});

		it('shows KOMBrowseInfoAudioNotAvailableAlert', function () {
			browser.assert.elements(KOMBrowseInfoAudioNotAvailableAlert, 1);
		});
	
	});

});
