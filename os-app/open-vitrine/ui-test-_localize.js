const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMVitrine_Localize-' + OLSKRoutingLanguage, function () {

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

		it('localizes KOMVitrineFeaturesHeading', function () {
			browser.assert.text(KOMVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes KOMVitrineGuideButton', function () {
			browser.assert.text(KOMVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes KOMVitrineGazetteHeading', function () {
			browser.assert.text(KOMVitrineGazetteHeading, uLocalized('ROCOBulletinHeadingText'));
		});

		it('localizes KOMVitrineJarHeading', function () {
			browser.assert.text(KOMVitrineJarHeading, uLocalized('OLSKJarHeadingText'));
		});

		it('localizes KOMVitrineSupportHeading', function () {
			browser.assert.text(KOMVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes KOMVitrineSupportBlurb', function () {
			browser.assert.text(KOMVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('KOMVitrineTitle'));
			});
		
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

			it('localizes OLSKLandingActionHref', function () {
				browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-review/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage,
				}));
			});
		
		});

	});

});
