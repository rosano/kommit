const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	KOMVitrine: '.KOMVitrine',

	KOMVitrineCrown: '.KOMVitrineCrown',
	KOMVitrineCrownIcon: '.KOMVitrineCrownIcon',
	KOMVitrineCrownName: '.KOMVitrineCrownName',
	KOMVitrineCrownBlurb: '.KOMVitrineCrownBlurb',

	KOMVitrineContent: '.KOMVitrineContent',
	KOMVitrineContentAppButton: '.KOMVitrineContentAppButton',

	KOMVitrineFeaturesHeading: '.KOMVitrineFeaturesHeading',

	KOMVitrineVideoHeading: '.KOMVitrineVideoHeading',
	KOMVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.KOMVitrineVideo iframe',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMVitrine_Access', function () {

	before(function () {
		return browser.visit(kDefaultRoutePath);
	});

	it('shows KOMVitrine', function () {
		browser.assert.elements(KOMVitrine, 1);
	});

	it('shows OLSKLanguageSwitcher', function () {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});

	it('shows KOMVitrineCrown', function () {
		browser.assert.elements(KOMVitrineCrown, 1);
	});

	it('shows KOMVitrineCrownIcon', function () {
		browser.assert.elements(KOMVitrineCrownIcon, 1);
	});

	it('shows KOMVitrineCrownName', function () {
		browser.assert.elements(KOMVitrineCrownName, 1);
	});

	it('shows KOMVitrineCrownBlurb', function () {
		browser.assert.elements(KOMVitrineCrownBlurb, 1);
	});

	it('shows OLSKCommonWhatIsIt', function() {
		browser.assert.elements('.OLSKCommonWhatIsIt', 1);
	});

	it('shows KOMVitrineContent', function () {
		browser.assert.elements(KOMVitrineContent, 1);
	});

	it('shows KOMVitrineContentAppButton', function () {
		browser.assert.elements(KOMVitrineContentAppButton, 1);
	});

	it('shows KOMVitrineFeaturesHeading', function () {
		browser.assert.elements(KOMVitrineFeaturesHeading, 1);
	});

	it('shows KOMFeatureList', function () {
		browser.assert.elements('.KOMFeatureList', 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows KOMVitrineVideoHeading', function () {
		browser.assert.elements(KOMVitrineVideoHeading, 1);
	});

	it('shows KOMVitrineVideo', function () {
		browser.assert.elements(KOMVitrineVideo, 1);
	});

	it('shows ROCORootLink', function () {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
