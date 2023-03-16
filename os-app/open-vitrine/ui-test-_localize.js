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

		it('localizes KOMVitrineVideoHeading', function () {
			browser.assert.text(KOMVitrineVideoHeading, uLocalized('OLSKWordingVideo'));
		});

		it('localizes KOMVitrineVideo1Heading', function () {
			browser.assert.text(KOMVitrineVideo1Heading, uLocalized('KOMVitrineVideo1HeadingText'));
		});

		it('localizes KOMVitrineDeeperHeading', function () {
			browser.assert.text(KOMVitrineDeeperHeading, uLocalized('OLSKWordingDeeperHeading'));
		});

		it('localizes KOMVitrineGlossaryHeading', function () {
			browser.assert.text(KOMVitrineGlossaryHeading, uLocalized('KOMVitrineGlossaryHeadingText'));
		});

		it('localizes KOMVitrineGlossaryThaiLink', function () {
			browser.assert.text(KOMVitrineGlossaryThaiLink, uLocalized('KOMVitrineGlossaryThaiLinkText'));
		});

		it('localizes KOMVitrineGlossaryThaiBlurb', function() {
			browser.assert.text(KOMVitrineGlossaryThaiBlurb, uLocalized('KOMVitrineGlossaryThaiBlurbText'));
		});

		it('localizes KOMVitrineGlossaryFamilyLink', function () {
			browser.assert.text(KOMVitrineGlossaryFamilyLink, uLocalized('KOMVitrineGlossaryFamilyLinkText'));
		});

		it('localizes KOMVitrineGlossaryFamilyBlurb', function() {
			browser.assert.text(KOMVitrineGlossaryFamilyBlurb, uLocalized('KOMVitrineGlossaryFamilyBlurbText'));
		});

		it('localizes KOMVitrineGlossaryFriendsLink', function () {
			browser.assert.text(KOMVitrineGlossaryFriendsLink, uLocalized('KOMVitrineGlossaryFriendsLinkText'));
		});

		it('localizes KOMVitrineGlossaryFriendsBlurb', function() {
			browser.assert.text(KOMVitrineGlossaryFriendsBlurb, uLocalized('KOMVitrineGlossaryFriendsBlurbText'));
		});

		it('localizes KOMVitrineGlossaryPortugueseLink', function () {
			browser.assert.text(KOMVitrineGlossaryPortugueseLink, uLocalized('KOMVitrineGlossaryPortugueseLinkText'));
		});

		it('localizes KOMVitrineGlossaryPortugueseBlurb', function() {
			browser.assert.text(KOMVitrineGlossaryPortugueseBlurb, uLocalized('KOMVitrineGlossaryPortugueseBlurbText'));
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
