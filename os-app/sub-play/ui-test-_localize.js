const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardQuestion: 'bravo',
			KOMCardAnswer: 'charlie',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMPlay_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMPlayCards: JSON.stringify([kTesting.StubCardObjectValid()]),
			});
		});

		it('localizes KOMPlayToolbarBackButton', function () {
			browser.assert.text(KOMPlayToolbarBackButton, uLocalized('KOMPlayToolbarBackButtonText'));
		});

		it('localizes KOMPlayToolbarDoneButton', function () {
			browser.assert.text(KOMPlayToolbarDoneButton, uLocalized('KOMPlayToolbarDoneButtonText'));
		});

		context('flip', function () {

			before(function () {
				browser.click(KOMPlayCard);
			});
			
			it('localizes KOMPlayResponseButtonAgain', function () {
				browser.assert.text(KOMPlayResponseButtonAgain, uLocalized('KOMPlayResponseButtonAgainText'));
			});

			it('localizes KOMPlayResponseButtonHard', function () {
				browser.assert.text(KOMPlayResponseButtonHard, uLocalized('KOMPlayResponseButtonHardText'));
			});

			it('localizes KOMPlayResponseButtonGood', function () {
				browser.assert.text(KOMPlayResponseButtonGood, uLocalized('KOMPlayResponseButtonGoodText'));
			});

			it('localizes KOMPlayResponseButtonEasy', function () {
				browser.assert.text(KOMPlayResponseButtonEasy, uLocalized('KOMPlayResponseButtonEasyText'));
			});

		});

	});

});
