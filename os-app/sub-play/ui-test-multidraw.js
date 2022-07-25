const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;

describe('KOMPlay_Multidraw', function () {

	context('text_only', function () {
		
		const items = StubSpacingArray();

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid({
					KOMDeckIsMultiDraw: true,
				})),
			});
		});

		describe('KOMPlayCardQuestionPair', function test_KOMPlayCardQuestionPair() {

			it('sets text', function () {
				browser.assert.text(KOMPlayCardQuestionPair, items[1].$KOMSpacingCard.KOMCardFrontText);
			});

		});

		describe('KOMPlayCardAnswerPair', function test_KOMPlayCardAnswerPair() {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('sets text', function () {
				browser.assert.text(KOMPlayCardAnswerPair, items[1].$KOMSpacingCard.KOMCardRearText);
			});

		});
	
	});

	describe('speech', function () {

		const items = StubSpacingArray();
		const deck = StubDeckObjectValid({
			KOMDeckIsMultiDraw: true,
			KOMDeckFrontSpeechIsEnabled: true,
			KOMDeckFrontLanguageCode: 'en',
			KOMDeckRearSpeechIsEnabled: true,
			KOMDeckRearLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('starts read', function () {
			browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardFrontText } ${ items[1].$KOMSpacingCard.KOMCardFrontText }`));
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`stop,read:${ deck.KOMDeckRearLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardRearText } ${ items[1].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

	});

	describe.skip('audio', function () {

		const items = StubSpacingArray().map(function (e, i) {
			return Object.assign(e, {
				$KOMSpacingCard: Object.assign(e.$KOMSpacingCard, {
					KOMCardFrontAudio: true,
				}),
			});
		});
		const deck = StubDeckObjectValid({
			KOMDeckIsMultiDraw: true,
			KOMDeckAudioIsEnabled: true,
			// KOMDeckFrontSpeechIsEnabled: true,
			// KOMDeckFrontLanguageCode: 'en',
			// KOMDeckRearSpeechIsEnabled: true,
			// KOMDeckRearLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('starts audio', function () {
			browser.assert.text('#TestKOMPlayAudioLog', uLog('fetch,play:KOMCardFrontAudio,play:KOMCardFrontAudio'));
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop,play:KOMCardRearAudio,play:KOMCardRearAudio'));
			});

		});

	})

});
