const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMBrowseInfo_Localize-' + OLSKRoutingLanguage, function () {

		context('KOMBrowseInfoItem', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					KOMBrowseInfoItem: JSON.stringify({}),
				});
			});

			it('localizes KOMBrowseInfoToolbarBackButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarBackButton, 'title', uLocalized('KOMBrowseInfoToolbarBackButtonText'));
			});

			it('localizes KOMBrowseInfoToolbarDiscardButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarDiscardButton, 'title', uLocalized('KOMBrowseInfoToolbarDiscardButtonText'));
			});

			it('localizes KOMBrowseInfoToolbarTemplateButton', function () {
				browser.assert.attribute(KOMBrowseInfoToolbarTemplateButton, 'title', uLocalized('KOMBrowseInfoToolbarTemplateButtonText'));
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

			it('localizes KOMBrowseInfoFormRearReadButton', function () {
				browser.assert.text(KOMBrowseInfoFormRearReadButton, uLocalized('KOMBrowseInfoFormRearReadButtonText'));
			});

			it('localizes KOMBrowseInfoFormNotesField', function () {
				browser.assert.attribute(KOMBrowseInfoFormNotesField, 'placeholder', uLocalized('KOMBrowseInfoFormNotesFieldText'));
			});

			it('localizes KOMBrowseInfoLauncherItemToggleRetire', function () {
				return browser.assert.OLSKLauncherItemText('KOMBrowseInfoLauncherItemToggleRetire', uLocalized('KOMBrowseInfoLauncherItemToggleRetireText'));
			});

			it('localizes KOMBrowseInfoLauncherItemDebug', function () {
				return browser.assert.OLSKLauncherItemText('KOMBrowseInfoLauncherItemDebug', uLocalized('KOMBrowseInfoLauncherItemDebugText'));
			});

			context('KOMBrowseInfoToolbarDiscardButton', function () {
				
				it('localizes KOMBrowseInfoDiscardConfirm', function () {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(KOMBrowseInfoToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
			
			});

		});

	});

});
