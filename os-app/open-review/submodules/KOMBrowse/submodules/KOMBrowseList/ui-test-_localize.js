import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowseList_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});
	
		it('localizes KOMBrowseListFilterField', function () {
			browser.assert.attribute(KOMBrowseListFilterField, 'placeholder', uLocalized('KOMBrowseListFilterFieldText'));
		});
	
		it('localizes KOMBrowseListCreateButton', function () {
			browser.assert.attribute(KOMBrowseListCreateButton, 'title', uLocalized('KOMBrowseListCreateButtonText'));
		});

	});

});
