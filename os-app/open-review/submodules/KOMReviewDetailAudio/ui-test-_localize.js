const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetailAudio_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
				}),
				KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('localizes KOMReviewDetailAudioRecordButton', function () {
			browser.assert.text(KOMReviewDetailAudioRecordButton, uLocalized('KOMReviewDetailAudioRecordButtonText'));
		});

		context('click KOMReviewDetailAudioRecordButton', function () {
			
			before(function () {
				return browser.pressButton(KOMReviewDetailAudioRecordButton);
			});

			it('localizes KOMReviewDetailAudioRecordingAlert', function () {
				browser.assert.text(KOMReviewDetailAudioRecordingAlert, uLocalized('KOMReviewDetailAudioRecordingAlertText'));
			});
		
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

			it('localizes KOMReviewDetailAudioPlaybackButton', function () {
				browser.assert.text(KOMReviewDetailAudioPlaybackButton, uLocalized('KOMReviewDetailAudioPlaybackButtonText'));
			});

			it('localizes KOMReviewDetailAudioClearButton', function () {
				browser.assert.text(KOMReviewDetailAudioClearButton, uLocalized('KOMReviewDetailAudioClearButtonText'));
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

			it('localizes KOMReviewDetailAudioNotAvailableAlert', function () {
				browser.assert.text(KOMReviewDetailAudioNotAvailableAlert, uLocalized('KOMReviewDetailAudioNotAvailableAlertText'));
			});
		
		});

	});

});
