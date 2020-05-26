const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewDetailAudio_Misc', function () {

	const item = {
		KOMCardID: 'alfa',
	};

	const _log = [];
	const uLog = function (inputData) {
		_log.push(inputData);

		return _log.join(',');
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailAudioItem: JSON.stringify(item),
			KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
		});
	});

	describe('KOMReviewDetailAudioRecordButton', function test_KOMReviewDetailAudioRecordButton () {

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailAudioLog', '');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailAudioRecordButton);
			});

			it('starts record', function () {
				browser.assert.text('#TestKOMReviewDetailAudioLog', uLog('record'));
			});
		
		});

		context('click during recording', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailAudioDispatchCapture', '0');
				browser.assert.text('#TestKOMReviewDetailAudioDispatchCaptureData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailAudioRecordButton);
			});

			it('stops record', function () {
				browser.assert.text('#TestKOMReviewDetailAudioLog', uLog('stop'));
			});
			
			it('sends KOMReviewDetailAudioDispatchCapture', function () {
				browser.assert.text('#TestKOMReviewDetailAudioDispatchCapture', '1');
				browser.assert.text('#TestKOMReviewDetailAudioDispatchCaptureData', JSON.stringify('KOMCardFrontAudio'));
			});
		
		});

	});

	context('KOMReviewDetailAudioItemProperty', function () {
		
		const item = {
			KOMCardID: 'alfa',
			KOMCardFrontAudio: 'bravo',
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailAudioItem: JSON.stringify(item),
				KOMReviewDetailAudioItemProperty: 'KOMCardFrontAudio',
			});
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);

			return _log.join(',');
		};

		describe('KOMReviewDetailAudioPlaybackButton', function test_KOMReviewDetailAudioPlaybackButton () {

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestKOMReviewDetailAudioLog', '');
				});
				
				before(function () {
					return browser.pressButton(KOMReviewDetailAudioPlaybackButton);
				});

				it('starts play', function () {
					browser.assert.text('#TestKOMReviewDetailAudioLog', uLog('play'));
				});
			
			});

			context('click during playback', function () {
				
				before(function () {
					return browser.pressButton(KOMReviewDetailAudioPlaybackButton);
				});

				it('starts play', function () {
					browser.assert.text('#TestKOMReviewDetailAudioLog', uLog('stop'));
				});
			
			});

		});

		describe('KOMReviewDetailAudioClearButton', function test_KOMReviewDetailAudioClearButton () {

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestKOMReviewDetailAudioDispatchClear', '0');
					browser.assert.text('#TestKOMReviewDetailAudioDispatchClearData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMReviewDetailAudioClearButton);
				});

				it('sends KOMReviewDetailAudioDispatchClear', function () {
					browser.assert.text('#TestKOMReviewDetailAudioDispatchClear', '1');
					browser.assert.text('#TestKOMReviewDetailAudioDispatchClearData', JSON.stringify('KOMCardFrontAudio'));
				});
			
			});

		});

	});

});
