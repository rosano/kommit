const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
			$KOMDeckCards: [],
		};
	},
};

describe('KOMBrowse_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
		});
	});
	
	it('classes OLSKViewport', function () {
		browser.assert.hasClass(KOMBrowse, 'OLSKViewport');
	});
	
	it('classes OLSKMobileViewInactive', function () {
		browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMobileViewInactive');
		browser.assert.hasClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
	});

	it('sets OLSKResultsListItemSelected', function () {
		browser.assert.elements('.OLSKResultsListItemSelected', 0);
	});

	it('focuses OLSKMasterListFilterField', function() {
		browser.assert.hasFocus('.OLSKMasterListFilterField');
	});    
    
  context('create', function test_create () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchCreate', '0');
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchCreateData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasClass('.KOMBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasNoClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets KOMBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focuses KOMBrowseInfoFormQuestionField', function() {
			browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
		});

		it('sends KOMBrowseDispatchCreate', function () {
			browser.assert.text('#TestKOMBrowseDispatchCreate', '1');
		});

		it('sends KOMBrowseDispatchCreateData', function () {
			browser.assert.text('#TestKOMBrowseDispatchCreateData', JSON.stringify([
				'KOMCardID',
				'KOMCardDeckID',
				'KOMCardCreationDate',
				'KOMCardModificationDate',
				'KOMCardQuestion',
				'KOMCardAnswer',
				'KOMCardHint',
				'@context',
				]));
		});

	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarBackButton');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets KOMBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('arrow', function test_arrow () { // #pendext

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('classes OLSKMasterListFocused', function() {
			browser.assert.hasClass('.KOMBrowseList', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets KOMBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('tab', function test_tab () {
		
		context('master focused', function () {

			before(function() {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

			before(function() {
				browser.assert.hasClass('.KOMBrowseList', 'OLSKMasterListFocused');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('classes OLSKMasterListFocused', function() {
				browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMasterListFocused');
			});

			it('focuses KOMBrowseInfoFormQuestionField', function() {
				browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
			});
		
		});
		
		context('master not focused', function () {

			before(function () {
				browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it.skip('focuses other field', function() {
				browser.assert.hasFocus('.KOMBrowseInfoFormAnswerField');
			});
		
		});

		context('shiftKey', function () {
			
			context.skip('other field focused', function () {

				before(function() {
					browser.assert.hasFocus('.KOMBrowseInfoFormAnswerField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses KOMBrowseInfoFormQuestionField', function() {
					browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
				});
			
			});
			
			context('first field focused', function () {

				before(function() {
					browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
				});

				before(function() {
					browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMasterListFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses OLSKMasterListFilterField', function() {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				it('classes OLSKMasterListFocused', function() {
					browser.assert.hasClass('.KOMBrowseList', 'OLSKMasterListFocused');
				});
			
			});
			
			context('master focused', function () {

				before(function() {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				before(function() {
					browser.assert.hasClass('.KOMBrowseList', 'OLSKMasterListFocused');
				});
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('classes OLSKMasterListFocused', function() {
					browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMasterListFocused');
				});

				it('focuses KOMBrowseInfoFormQuestionField', function() {
					browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
				});
			
			});
		
		});

	});

	context('escape', function test_escape () {

		before(function () {
			browser.fill('.KOMBrowseInfoFormQuestionField', 'alfa');
		});

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			return browser.click('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});
		
		it('focuses OLSKMasterListFilterField', function() {
			browser.assert.hasFocus('.OLSKMasterListFilterField')
		});
		
		it.skip('clears KOMBrowseListFilterText', function() {
			browser.assert.input('.OLSKMasterListFilterField', '');
		});

		context('filter_empty', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends KOMBrowseListDispatchClose', function () {
				browser.assert.text('#TestKOMBrowseListDispatchClose', '1');
			});
		
		});

	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click('.KOMBrowseListItem');
		});

		it('classes OLSKMasterListFocused', function() {
			browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasClass('.KOMBrowseList', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasNoClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets KOMBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focus KOMBrowseInfoFormQuestionField', function() {
			browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
		});

	});

	context('filter', function test_filter () {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormQuestionField', 'bravo');
		});

		context('no match', function () {
			
			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('filters all KOMBrowseListItem', function() {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});

			it('sets KOMBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});

		context('partial match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'a');
			});

			it('filters partial KOMBrowseListItem', function() {
				browser.assert.elements('.KOMBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets KOMBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('exact match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'bravo');
			});

			it('filters exact KOMBrowseListItem', function() {
				browser.assert.elements('.KOMBrowseListItem', 1);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets KOMBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('clear', function () {
			
			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('filters no KOMBrowseListItem', function() {
				browser.assert.elements('.KOMBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 0);
			});

			it('sets KOMBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('sorts KOMBrowseListItem', function () {
				browser.assert.text('.KOMBrowseListItemQuestion', 'bravoalfa');
			});
		
		});

	});

	context('selection', function test_selection () {
		
		before(function () {
			return browser.click('.KOMBrowseListItem');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.KOMBrowseInfoFormQuestionField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('sets no OLSKResultsListItemSelected', function () {
				browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
			});
		
		});

	});

	context('edit', function test_edit () {

		context('title', function () {
			
			it('sets KOMBrowseListItemQuestion', function () {
				browser.assert.text('.OLSKResultsListItemSelected .KOMBrowseListItemQuestion', 'bravo');
			});

		});

	});

	context('close', function test_close () {

		before(function () {
			browser.assert.text('#TestKOMBrowseListDispatchClose', '1');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		it('sends KOMBrowseListDispatchClose', function () {
			browser.assert.text('#TestKOMBrowseListDispatchClose', '2');
		});

	});

});
