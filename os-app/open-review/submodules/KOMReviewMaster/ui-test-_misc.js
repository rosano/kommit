const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewMaster_Misc', function () {

	describe('KOMReviewMasterCreateButton', function test_KOMReviewMasterCreateButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			before(function() {
				return browser.OLSKPromptSync(function () {
					browser.pressButton(KOMReviewMasterCreateButton);
				});
			});
			
			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchCreate', '0');
				browser.assert.text('#TestKOMReviewMasterDispatchCreateData', 'undefined');
			});
			
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

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		const uFlatten = function (inputData) {
			return [].concat.apply([], inputData);
		};

		const item = {
			KOMDeckID: 'alfa',
			KOMDeckName: 'bravo',
			$KOMDeckSpacings: uFlatten(Array.from(new Array(2)).map(function (e, i) {
				return [true, false].map(function (forward) {
					return {
						KOMSpacingID: (i + 1).toString() + '-' + (forward ? 'forward' : 'backward'),
						KOMSpacingDueDate: i ? new Date() : undefined,
						$KOMSpacingCard: {
							KOMCardID: (i + 1).toString(),
							KOMCardQuestion: (i + 1).toString(),
							KOMCardAnswer: 'charlie',
							KOMCardHint: 'delta',
							KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
							KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
						},
					};
				});
			})),
		};
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterListItems: JSON.stringify([item]),
			});
		});
		
		it('sets role', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'role', 'button');
		});

		it('sets aria-label', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'aria-label', 'bravo');
		});

		it('sets tabindex', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'tabindex', '0');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '0');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', 'undefined');
			});
			
			before(function () {
				return browser.click(KOMReviewMasterListItem);
			});

			it('sends KOMReviewMasterDispatchSelect', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '1');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', JSON.stringify(item));
			});
		
		});

		context('Enter', function () {
			
			before(function () {
				return browser.query(KOMReviewMasterListItem).focus();
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it.skip('sends KOMReviewMasterDispatchSelect', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '2');
			});
		
		});
		
	});

	describe('KOMReviewMasterListItemName', function test_KOMReviewMasterListItemName() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemName, 'bravo');
		});

	});

	describe('KOMReviewMasterListItemReviewValue', function test_KOMReviewMasterListItemReviewValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemReviewValue, '1');
		});

	});

	describe('KOMReviewMasterListItemUnseenValue', function test_KOMReviewMasterListItemUnseenValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemUnseenValue, '1');
		});

	});

});
