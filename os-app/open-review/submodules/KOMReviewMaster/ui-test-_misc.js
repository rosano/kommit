const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewMaster_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('KOMReviewMasterToolbar', function test_KOMReviewMasterToolbar() {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKMobileViewHeader');
		});

	});

	describe('KOMReviewMasterCreateButton', function test_KOMReviewMasterCreateButton() {

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			context('response empty', function () {

				before(function () {
					return browser.OLSKPromptSync(function () {
						browser.pressButton(KOMReviewMasterCreateButton);
					});
				});

				it('does nothing', function () {
					browser.assert.text('#TestKOMReviewMasterDispatchCreate', '0');
					browser.assert.text('#TestKOMReviewMasterDispatchCreateData', 'undefined');
				});

			});

			context('response not empty', function () {

				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewMasterCreateButton);
					}, function (dialog) {
						dialog.response = 'alfa';

						return dialog;
					});
				});

				it('sends KOMReviewMasterDispatchCreate', function () {
					browser.assert.text('#TestKOMReviewMasterDispatchCreate', '1');
					browser.assert.text('#TestKOMReviewMasterDispatchCreateData', 'alfa');
				});

			});

		});

	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		const uFlatten = function (inputData) {
			return [].concat.apply([], inputData);
		};

		const item = {
			KOMDeckID: 'alfa',
			KOMDeckName: 'bravo',
			$KOMDeckSpacings: [],
			$KOMDeckTodayReviewCount: 1,
			$KOMDeckTodayUnseenCount: 2,
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([item]),
			});
		});

		it('sets KOMReviewMasterListItemName', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'bravo');
		});

		it('sets KOMReviewMasterListItemReviewCount', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

		it('sets KOMReviewMasterListItemUnseenCount', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '2');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '0');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', 'undefined');
			});

			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			it('sends KOMReviewMasterDispatchSelect', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '1');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', JSON.stringify(item));
			});

		});

	});

});
