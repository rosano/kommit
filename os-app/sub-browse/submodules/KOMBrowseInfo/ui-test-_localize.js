const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowseInfo_Localize-${ languageCode }`, function () {

		context('KOMBrowseInfoItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					KOMBrowseInfoItem: JSON.stringify({}),
				});
			});

			it('localizes KOMBrowseInfoToolbarBackButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarBackButton, 'title', uLocalized('KOMBrowseInfoToolbarBackButtonText'));
			});

			it('localizes KOMBrowseInfoToolbarDiscardButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarDiscardButton, 'title', uLocalized('KOMBrowseInfoToolbarDiscardButtonText'));
			});

			it('localizes KOMBrowseInfoFormFrontField', function () {
				browser.assert.attribute(KOMBrowseInfoFormFrontField, 'placeholder', uLocalized('KOMBrowseInfoFormFrontFieldText'));
			});

			it('localizes KOMBrowseInfoFormAnswerField', function () {
				browser.assert.attribute(KOMBrowseInfoFormAnswerField, 'placeholder', uLocalized('KOMBrowseInfoFormAnswerFieldText'));
			});

			it('localizes KOMBrowseInfoFormHintField', function () {
				browser.assert.attribute(KOMBrowseInfoFormHintField, 'placeholder', uLocalized('KOMBrowseInfoFormHintFieldText'));
			});

		});

	});

});
