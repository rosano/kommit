const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetailAudio: '.KOMReviewDetailAudio',
	
	KOMReviewDetailAudioRecordButton: '.KOMReviewDetailAudioRecordButton',
	
	KOMReviewDetailAudioPlaybackButton: '.KOMReviewDetailAudioPlaybackButton',
	KOMReviewDetailAudioClearButton: '.KOMReviewDetailAudioClearButton',

	KOMReviewDetailAudioNotAvailableAlert: '.KOMReviewDetailAudioNotAvailableAlert',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewDetailAudio_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailAudioItem: JSON.stringify({
				KOMCardID: 'alfa',
			}),
			KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
		});
	});

	it('shows KOMReviewDetailAudio', function () {
		browser.assert.elements(KOMReviewDetailAudio, 1);
	});

	it('shows KOMReviewDetailAudioRecordButton', function () {
		browser.assert.elements(KOMReviewDetailAudioRecordButton, 1);
	});

	it('hides KOMReviewDetailAudioPlaybackButton', function () {
		browser.assert.elements(KOMReviewDetailAudioPlaybackButton, 0);
	});

	it('hides KOMReviewDetailAudioClearButton', function () {
		browser.assert.elements(KOMReviewDetailAudioClearButton, 0);
	});

	it('hides KOMReviewDetailAudioNotAvailableAlert', function () {
		browser.assert.elements(KOMReviewDetailAudioNotAvailableAlert, 0);
	});

	context('KOMReviewDetailAudioItemProperty', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
					KOMCardFrontAudio: 'bravo',
				}),
				KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('hides KOMReviewDetailAudioRecordButton', function () {
			browser.assert.elements(KOMReviewDetailAudioRecordButton, 0);
		});

		it('shows KOMReviewDetailAudioPlaybackButton', function () {
			browser.assert.elements(KOMReviewDetailAudioPlaybackButton, 1);
		});

		it('shows KOMReviewDetailAudioClearButton', function () {
			browser.assert.elements(KOMReviewDetailAudioClearButton, 1);
		});
	
	});

	context('KOMReviewDetailAudioAvailable', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailAudioAvailable: false,
				KOMReviewDetailAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
				}),
				KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('hides KOMReviewDetailAudioRecordButton', function () {
			console.log(browser.url);
			browser.assert.elements(KOMReviewDetailAudioRecordButton, 0);
		});

		it('hides KOMReviewDetailAudioPlaybackButton', function () {
			browser.assert.elements(KOMReviewDetailAudioPlaybackButton, 0);
		});

		it('hides KOMReviewDetailAudioClearButton', function () {
			browser.assert.elements(KOMReviewDetailAudioClearButton, 0);
		});

		it('shows KOMReviewDetailAudioNotAvailableAlert', function () {
			browser.assert.elements(KOMReviewDetailAudioNotAvailableAlert, 1);
		});
	
	});

});
