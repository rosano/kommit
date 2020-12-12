const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('KOMFeatureList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	uLocalized('KOMFeatureListArray').forEach(function (e, i) {

		describe('KOMFeatureListItemIdentity', function test_KOMFeatureListItemIdentity () {
			
			it('sets src', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'src', [
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureTTS.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureRecord.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureTags.svg',
						'/_shared/__external/OLSKUIAssets/_OLSKSharedFeatureIO.svg',
					][i]);
			});
			
			it('sets role', function () {
				browser.assert.attribute(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemIcon`, 'role', 'presentation');
			});

		});
		
	});

});
