const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMBrowseInfoAudio_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				KOMBrowseInfoAudioItem: JSON.stringify({
					KOMCardID: 'alfa',
				}),
				KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		it('localizes KOMBrowseInfoAudioRecordButton', function () {
			browser.assert.text(KOMBrowseInfoAudioRecordButton, uLocalized('KOMBrowseInfoAudioRecordButtonText'));
		});

		context('click KOMBrowseInfoAudioRecordButton', function () {

			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioRecordButton);
			});

			it('localizes KOMBrowseInfoAudioRecordingAlert', function () {
				browser.assert.text(KOMBrowseInfoAudioRecordingAlert, uLocalized('KOMBrowseInfoAudioRecordingAlertText'));
			});

		});

		context('KOMBrowseInfoAudioItemProperty', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					KOMBrowseInfoAudioItem: JSON.stringify({
						KOMCardID: 'alfa',
						KOMCardFrontAudio: 'bravo',
					}),
					KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
				});
			});

			it('localizes KOMBrowseInfoAudioPlaybackButton', function () {
				browser.assert.text(KOMBrowseInfoAudioPlaybackButton, uLocalized('KOMBrowseInfoAudioPlaybackButtonText'));
			});

			it('localizes KOMBrowseInfoAudioClearButton', function () {
				browser.assert.text(KOMBrowseInfoAudioClearButton, uLocalized('KOMBrowseInfoAudioClearButtonText'));
			});

		});

		context('KOMBrowseInfoAudioAvailable', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					KOMBrowseInfoAudioAvailable: false,
					KOMBrowseInfoAudioItem: JSON.stringify({
						KOMCardID: 'alfa',
					}),
					KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
				});
			});

			it('localizes KOMBrowseInfoAudioNotAvailableAlert', function () {
				browser.assert.text(KOMBrowseInfoAudioNotAvailableAlert, uLocalized('KOMBrowseInfoAudioNotAvailableAlertText'));
			});

		});

	});

});
