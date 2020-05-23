const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewDetailLanguageCode_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailLanguageCodeItem: JSON.stringify({
				KOMDeckName: 'alfa',
			}),
			KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
			KOMReviewDetailLanguageCodeOptions: JSON.stringify(['alfa']),
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
		
		it('sets value', function () {
			browser.assert.input(KOMReviewDetailLanguageCodeField, '');
		});

		it('sets tabindex', function () {
			browser.assert.attribute(KOMReviewDetailLanguageCodeField, 'tabindex', null);
		});

		it('binds KOMReviewDetailLanguageCodeOptions', function () {
			browser.assert.text('option[value=alfa]', 'alfa');
		});

		context('KOMReviewDetailLanguageCodeItemProperty', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMReviewDetailLanguageCodeItem: JSON.stringify({
						KOMDeckName: 'alfa',
						KOMDeckFrontLanguageCode: 'DEFAULT_LANGUAGE',
					}),
					KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
					KOMReviewDetailLanguageCodeOptions: JSON.stringify([]),
				});
			});

			it('sets value', function () {
				browser.assert.input(KOMReviewDetailLanguageCodeField, 'DEFAULT_LANGUAGE');
			});

			it('sets tabindex', function () {
				browser.assert.attribute(KOMReviewDetailLanguageCodeField, 'tabindex', '-1');
			});
		
		});

	});

});
