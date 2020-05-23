const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewDetailLanguageCode_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailLanguageCodeItem: JSON.stringify({
				KOMDeckName: 'alfa',
			}),
			KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
		});
	});

	describe('KOMReviewDetailLanguageCodeFieldOptionPlaceholder', function test_KOMReviewDetailLanguageCodeFieldOptionPlaceholder () {
		
		it('sets value', function () {
			browser.assert.attribute(KOMReviewDetailLanguageCodeFieldOptionPlaceholder, 'value', '');
		});

	});

	describe('KOMReviewDetailLanguageCodeFieldOptionDefault', function test_KOMReviewDetailLanguageCodeFieldOptionDefault () {
		
		it('sets value', function () {
			browser.assert.attribute(KOMReviewDetailLanguageCodeFieldOptionDefault, 'value', 'DEFAULT_LANGUAGE');
		});

	});

	describe('KOMReviewDetailLanguageCodeField', function test_KOMReviewDetailLanguageCodeField () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailLanguageCodeItem: JSON.stringify({
					KOMDeckName: 'alfa',
					KOMDeckFrontLanguageCode: 'DEFAULT_LANGUAGE',
				}),
				KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
			});
		});
		
		it('binds KOMReviewDetailLanguageCodeItemProperty', function () {
			browser.assert.input(KOMReviewDetailLanguageCodeField, 'DEFAULT_LANGUAGE');
		});

	});

});
