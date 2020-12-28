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

		it('localizes OLSKCommonWhatIsIt', function () {
			browser.assert.text('.OLSKCommonWhatIsIt', uLocalized('OLSKCommonWhatIsItText'));
		});

		it('localizes KOMVitrineContent', function () {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ OLSKRoutingLanguage }.md`), 'utf-8'), {
				'\\*': '',
				'\n\n': '\n',
				'KOMVitrineDescription': uLocalized('KOMVitrineDescription'),
			});
			browser.assert.OLSKTextContent(KOMVitrineContent, item.slice(0, 10), function (inputData) {
				return inputData.slice(0, 10);
			});
		});

		it('localizes KOM_VITRINE_ANKI_URL', function () {
			browser.assert.element(`a[href="${ process.env.KOM_VITRINE_ANKI_URL }"]`);
		});

		it('localizes KOMGuideRoute', function() {
			browser.assert.element(`a[href="${ OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()) }"]`);
		});

		it('localizes KOMVitrineContentAppButton', function () {
			browser.assert.text(KOMVitrineContentAppButton, uLocalized('OLSKWordingOpenApp'));
		});

		it('localizes KOMVitrineFeaturesHeading', function () {
			browser.assert.text(KOMVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes KOMVitrineVideoHeading', function () {
			browser.assert.text(KOMVitrineVideoHeading, uLocalized('OLSKWordingVideo'));
		});

		it('localizes KOMVitrineSupportHeading', function () {
			browser.assert.text(KOMVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes KOMVitrineSupportBlurb', function () {
			browser.assert.text(KOMVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('KOMVitrineContentAppButton', function test_KOMVitrineContentAppButton () {

			it('classes OLSKDecorPress', function () {
				browser.assert.hasClass(KOMVitrineContentAppButton, 'OLSKDecorPress');
			});
			
			it('classes OLSKDecorPressCall', function () {
				browser.assert.hasClass(KOMVitrineContentAppButton, 'OLSKDecorPressCall');
			});
			
			it('sets href', function () {
				browser.assert.attribute(KOMVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-review/controller.js').OLSKControllerRoutes().shift()));
			});
		
		});

	});

});
