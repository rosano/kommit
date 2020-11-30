const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMVitrine_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function () {
			browser.assert.text('title', uLocalized('KOMVitrineTitle'));
		});

		it('localizes description', function () {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('KOMVitrineDescription'));
		});

		it('localizes KOMVitrineIdentityName', function () {
			browser.assert.text(KOMVitrineIdentityName, uLocalized('KOMVitrineTitle'));
		});

		it('localizes KOMVitrineIdentityBlurb', function () {
			browser.assert.text(KOMVitrineIdentityBlurb, uLocalized('KOMVitrineDescription'));
		});

		it('localizes KOMVitrineContent', function () {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ languageCode }.md`), 'utf-8'), {
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

		it('localizes KOM_SHARED_GITHUB_URL', function () {
			browser.assert.element(`a[href="${ process.env.KOM_SHARED_GITHUB_URL }"]`);
		});

		it('localizes KOM_SHARED_DONATE_URL', function () {
			browser.assert.element(`a[href="${ process.env.KOM_SHARED_DONATE_URL }"]`);
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
					OLSKRoutingLanguage: languageCode,
				}));
			});
		
		});

	});

});
