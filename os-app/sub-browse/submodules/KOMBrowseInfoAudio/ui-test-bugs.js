const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseInfoAudio_Bugs', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoAudioItem: JSON.stringify({
				KOMCardID: 'alfa',
				KOMCardFrontAudio: 'bravo',
			}),
			KOMBrowseInfoAudioItemProperty: 'KOMCardFrontAudio',
			DebugFakeChangeObject: JSON.stringify({
				KOMCardID: 'bravo',
				KOMCardFrontAudio: 'charlie',
			}),
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
				return browser.pressButton(KOMBrowseInfoAudioPlaybackButton);
			});

			it('plays object 1', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('play:bravo'));
			});

		});

		context('object change', function () {
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoAudioPlaybackButton);
			});

			it('plays object 2', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioLog', uLog('stop,clear,play:charlie'));
			});
		
		});

	});

});
