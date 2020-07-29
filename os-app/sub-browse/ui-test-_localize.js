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

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowse_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
			});
		});		

		context('select', function test_select() {

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCreateButton');
			});

			it('localizes KOMReviewLauncherItemDebugCard', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugCard', uLocalized('KOMReviewLauncherItemDebugCardText'));
			});

		});

	});

});
