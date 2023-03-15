const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Transport', function () {	

	const json = {};

	describe('OLSKTransportDispatchImportJSON', function test_OLSKTransportDispatchImportJSON() {

		const KOMDeckName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				const KOMDeckID = Math.random().toString();

				dialog.response = JSON.stringify({
					KOMDeck: [StubDeckObjectValid({
						KOMDeckName,
						KOMDeckID,
						$KOMDeckCards: [StubCardObjectValid({
							KOMCardDeckID: KOMDeckID,
							$KOMCardSpacingBackward: StubSpacingObjectValid({
								KOMSpacingDueDate: new Date(),
								KOMSpacingChronicles: [StubChronicleObjectValid()],
							}),
						}), StubCardObjectValid({
							KOMCardDeckID: KOMDeckID,
							KOMCardIsRetired: true,
							$KOMCardSpacingForward: StubSpacingObjectHistorical(),
							$KOMCardSpacingBackward: StubSpacingObjectHistorical(),
						})].map(function (card) {
							return ['$KOMCardSpacingForward', '$KOMCardSpacingBackward'].reduce(function (coll, item) {
								if (coll[item]) {
									coll[item].KOMSpacingID = [coll.KOMCardID, item === '$KOMCardSpacingForward' ? 'forward' : 'backward'].join('-');
								}
								
								return coll;
							}, card);
						}),
					})],
					KOMSetting: [StubSettingObjectValid()],
				});

				Object.assign(json, JSON.parse(dialog.response));

				return dialog;
			});
		});

		it('creates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', KOMDeckName);
		});

		it('creates spacing', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

		it('creates card', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionRetiredCardsValue', '1');
		});

	});

	describe('OLSKTransportDispatchExportInput', function test_OLSKTransportDispatchExportInput() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: json,
    	});
    });

	});

	describe('KOMReviewLauncherItemExportSelectedJSON', function test_KOMReviewLauncherItemExportSelectedJSON() {

		const KOMDeckName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = KOMDeckName;

				return dialog;
			});
		});

		before(function () { // #hotfix-invisible-until-assert
			return browser.wait({ element: '.KOMReviewMasterListItem' });
		});

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_AlertFakeExportSelectedSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();
    	const item = JSON.parse(response.OLSKDownloadData).KOMDeck.shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: {
    			KOMDeck: [StubDeckObjectValid(Object.assign(item, {
	    			KOMDeckName,
	    		}))],
	    		KOMSetting: [],
    		},
    	});
    });

	});

	describe('KOMReviewLauncherItemExportSelectedTXT', function test_KOMReviewLauncherItemExportSelectedTXT() {

		const KOMDeckName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = KOMDeckName;

				return dialog;
			});
		});

		before(function () { // #hotfix-invisible-until-assert
			return browser.wait({ element: '.KOMReviewMasterListItem' });
		});

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_AlertFakeExportSelectedPlaintext');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();
    	const item = response.OLSKDownloadData;

    	browser.assert.deepEqual(response, {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.txt`,
    		OLSKDownloadData: ``,
    	});
    });

	});

});
