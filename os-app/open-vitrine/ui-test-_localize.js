const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function () {
			browser.assert.text('title', uLocalized('KOMVitrineTitle'));
		});

		it('localizes meta[description]', function () {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('KOMVitrineDescription'));
		});

		it('localizes KOMVitrineCrownName', function () {
			browser.assert.text(KOMVitrineCrownName, uLocalized('KOMVitrineTitle'));
		});

		it('localizes KOMVitrineFeaturesHeading', function () {
			browser.assert.text(KOMVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes KOMVitrineGuideButton', function () {
			browser.assert.text(KOMVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes KOMVitrineGazetteHeading', function () {
			browser.assert.text(KOMVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
		});

		it('localizes KOMVitrineSupportHeading', function () {
			browser.assert.text(KOMVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes KOMVitrineSupportBlurb', function () {
			browser.assert.text(KOMVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('KOMVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
			});
		
		});

	});

});
