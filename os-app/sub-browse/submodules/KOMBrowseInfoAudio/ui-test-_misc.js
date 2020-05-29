const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseInfoAudio_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoAudioItem: JSON.stringify({
				KOMCardID: 'alfa',
			}),
			KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
		});
	});

	describe('KOMBrowseInfoAudioRecordButton', function test_KOMBrowseInfoAudioRecordButton () {

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);

			return _log.join(',');
		};

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioLog', '');
			});
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioRecordButton);
			});

			it('starts record', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('record'));
			});
		
		});

		context('click during recording', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '0');
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCaptureData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioRecordButton);
			});

			it('stops record', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('stop'));
			});
			
			it('sends KOMBrowseInfoAudioDispatchCapture', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '1');
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCaptureData', JSON.stringify('KOMCardFrontAudio'));
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

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);

			return _log.join(',');
		};

		describe('KOMBrowseInfoAudioPlaybackButton', function test_KOMBrowseInfoAudioPlaybackButton () {

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestKOMBrowseInfoAudioLog', '');
				});

				before(function () {
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '0');
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetchData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMBrowseInfoAudioPlaybackButton);
				});

				it('sends KOMBrowseInfoAudioDispatchFetch', function () {
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '1');
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetchData', JSON.stringify('KOMCardFrontAudio'));
				});
				
				it('starts play', function () {
					browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('play:bravo'));
				});
			
			});

			context('click during playback', function () {
				
				before(function () {
					return browser.pressButton(KOMBrowseInfoAudioPlaybackButton);
				});

				it('starts play', function () {
					browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('stop'));
				});
			
			});

		});

		describe('KOMBrowseInfoAudioClearButton', function test_KOMBrowseInfoAudioClearButton () {

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '0');
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchClearData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMBrowseInfoAudioClearButton);
				});

				it('sends KOMBrowseInfoAudioDispatchClear', function () {
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '1');
					browser.assert.text('#TestKOMBrowseInfoAudioDispatchClearData', JSON.stringify('KOMCardFrontAudio'));
				});
			
			});

		});

	});

});
