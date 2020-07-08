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

			it('localizes KOMBrowseInfoToolbarCreateButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarCreateButton, 'title', uLocalized('KOMBrowseInfoToolbarCreateButtonText'));
			});

			it('localizes KOMBrowseInfoFormFrontTextField', function () {
				browser.assert.attribute(KOMBrowseInfoFormFrontTextField, 'placeholder', uLocalized('KOMBrowseInfoFormFrontTextFieldText'));
			});

			it('localizes KOMBrowseInfoFormFrontReadButton', function () {
				browser.assert.text(KOMBrowseInfoFormFrontReadButton, uLocalized('KOMBrowseInfoFormFrontReadButtonText'));
			});

			it('localizes KOMBrowseInfoFormRearTextField', function () {
				browser.assert.attribute(KOMBrowseInfoFormRearTextField, 'placeholder', uLocalized('KOMBrowseInfoFormRearTextFieldText'));
			});

			it('localizes KOMBrowseInfoFormNotesField', function () {
				browser.assert.attribute(KOMBrowseInfoFormNotesField, 'placeholder', uLocalized('KOMBrowseInfoFormNotesFieldText'));
			});

		});

	});

});
