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

		it('localizes KOMVitrineIdentityName', function () {
			browser.assert.text(KOMVitrineIdentityName, uLocalized('KOMVitrineTitle'));
		});

		it('localizes KOMVitrineIdentityBlurb', function () {
			browser.assert.text(KOMVitrineIdentityBlurb, uLocalized('KOMVitrineDescription'));
		});

		it('localizes KOMVitrineContent', function () {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ OLSKRoutingLanguage }.md`), 'utf-8'), {
				'_': '',
				'\n\n': '\n',
				'KOMVitrineDescription': uLocalized('KOMVitrineDescription'),
			});
			browser.assert.OLSKTextContent(KOMVitrineContent, item.slice(0, 20), function (inputData) {
				return inputData.slice(0, 20);
			});
		});

		it('localizes KOM_VITRINE_ANKI_URL', function () {
			browser.assert.element(`a[href="${ process.env.KOM_VITRINE_ANKI_URL }"]`);
		});

		it('localizes LCHGuideRoute', function() {
			browser.assert.element(`a[href="${ OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()) }"]`);
		});

		it('localizes KOMVitrineContentAppButton', function () {
			browser.assert.text(KOMVitrineContentAppButton, uLocalized('KOMVitrineContentAppButtonText'));
		});

		it('localizes KOMVitrineVideoHeading', function () {
			browser.assert.text(KOMVitrineVideoHeading, uLocalized('KOMVitrineVideoHeadingText'));
		});

		context('KOMVitrineContentAppButton', function test_KOMVitrineContentAppButton () {

			it('classes OLSKCommonButton', function () {
				browser.assert.hasClass(KOMVitrineContentAppButton, 'OLSKCommonButton');
			});
			
			it('classes OLSKCommonButtonPrimary', function () {
				browser.assert.hasClass(KOMVitrineContentAppButton, 'OLSKCommonButtonPrimary');
			});
			
			it('sets href', function () {
				browser.assert.attribute(KOMVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-review/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage,
				}));
			});
		
		});

	});

});
