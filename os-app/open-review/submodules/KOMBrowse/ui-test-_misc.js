import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function () {
	return {
		KOMCardID: 'alfa',
		KOMCardQuestion: 'bravo',
		KOMCardAnswer: 'charlie',
	};
};

describe('KOMBrowse_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('classes OLSKMobileViewInactive', function () {
		browser.assert.hasNoClass('.KOMBrowseList', 'OLSKMobileViewInactive');
		browser.assert.hasClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
	});

	it('sets KOMBrowseListItemSelected', function () {
		browser.assert.elements('.OLSKResultsListItemSelected', 0);
	});

	it.skip('focuses KOMBrowseListFilterField', function() {
		browser.assert.hasFocus('.KOMBrowseListFilterField');
	});

	context('KOMBrowseItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseItemSelected: JSON.stringify(uItem()),
			});
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasClass('.KOMBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasNoClass('.KOMBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets KOMBrowseListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it.skip('focuses KOMBrowseInfoFormQuestionField', function() {
			browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
		});
	
	});
	
	context('close', function test_close () {

		before(function () {
			browser.assert.text('#TestKOMBrowseListDispatchClose', '0');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		it('sends KOMBrowseListDispatchClose', function () {
			browser.assert.text('#TestKOMBrowseListDispatchClose', '1');
		});

	});

	context('back', function test_back () {

		before(function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchBack', '0');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarBackButton');
		});

		it('sends KOMBrowseInfoDispatchBack', function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchBack', '1');
		});

	});

	context('arrow', function test_arrow () {

		before(function () {
			browser.assert.text('#TestKOMBrowseListDispatchArrow', '0');
		});

		before(function () {
			return browser.focus('.KOMBrowseListFilterField');
		});

		before(function() {
			browser.assert.hasClass('.KOMBrowseList', 'KOMBrowseListFocused');
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it.skip('sends KOMBrowseListDispatchArrow', function () {
			browser.assert.text('#TestKOMBrowseListDispatchArrow', '1');
		});

	});

	context('tab', function test_tab () {
		
		context('master focused', function () {

			before(function() {
				browser.assert.hasFocus('.KOMBrowseListFilterField');
			});

			before(function() {
				browser.assert.hasClass('.KOMBrowseList', 'KOMBrowseListFocused');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('classes KOMBrowseListFocused', function() {
				browser.assert.hasNoClass('.KOMBrowseList', 'KOMBrowseListFocused');
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
			
			context('name field focused', function () {

				before(function() {
					browser.assert.hasFocus('.KOMBrowseInfoFormQuestionField');
				});

				before(function() {
					browser.assert.hasNoClass('.KOMBrowseList', 'KOMBrowseListFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses KOMBrowseListFilterField', function() {
					browser.assert.hasFocus('.KOMBrowseListFilterField');
				});

				it('classes KOMBrowseListFocused', function() {
					browser.assert.hasClass('.KOMBrowseList', 'KOMBrowseListFocused');
				});
			
			});
			
			context('master focused', function () {

				before(function() {
					browser.assert.hasFocus('.KOMBrowseListFilterField');
				});

				before(function() {
					browser.assert.hasClass('.KOMBrowseList', 'KOMBrowseListFocused');
				});
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('classes KOMBrowseListFocused', function() {
					browser.assert.hasNoClass('.KOMBrowseList', 'KOMBrowseListFocused');
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
			browser.fill('.KOMBrowseListFilterField', 'alfa');
		});

		before(function () {
			browser.assert.input('.KOMBrowseListFilterField', 'alfa');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});
		
		it('focuses KOMBrowseListFilterField', function() {
			deepEqual(browser.activeElement, browser.query('.KOMBrowseListFilterField'));
		});
		
		it('clears KOMBrowseListFilterText', function() {
			browser.assert.input('.KOMBrowseListFilterField', '');
		});

	});

	context('click', function test_click () {
		
		before(function () {
			browser.assert.text('#TestKOMBrowseListDispatchClick', '0');
		});

		before(function () {
			return browser.click('.KOMBrowseListItem');
		});

		it('sends KOMBrowseListDispatchClick', function () {
			browser.assert.text('#TestKOMBrowseListDispatchClick', '1');
		});

	});

	context('filter', function test_filter () {

		before(function () {
			browser.assert.text('#TestKOMBrowseListDispatchFilter', '1');
		});

		before(function () {
			browser.fill('.KOMBrowseListFilterField', 'alfa');
		});

		it('sends KOMBrowseListDispatchFilter', function () {
			browser.assert.text('#TestKOMBrowseListDispatchFilter', '2');
		});

	});

	context('selection', function test_selection () {
		
		context('arrow', function () {

			before(function () {
				return browser.focus('.KOMBrowseInfoFormQuestionField');
			});

			// before(function () {
			// 	browser.assert.text('#TestKOMBrowseListDispatchArrow', '1');
			// });

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it.skip('sends KOMBrowseListDispatchArrow', function () {
				browser.assert.text('#TestKOMBrowseListDispatchArrow', '1');
			});
		
		});

	});

	context('edit', function test_edit () {

		before(function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormQuestionField', 'echo');
		});

		it('sends KOMBrowseInfoDispatchUpdate', function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '2');
		});

	});

});
