const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	KOMVitrine: '.KOMVitrine',
	
	KOMVitrineManifest: 'link[rel="manifest"]',

	KOMVitrineCrown: '.KOMVitrineCrown',
	KOMVitrineCrownIcon: '.KOMVitrineCrownIcon',
	KOMVitrineCrownName: '.KOMVitrineCrownName',

	KOMVitrineFeaturesHeading: '.KOMVitrineFeaturesHeading',

	KOMVitrineGuideButton: '.KOMVitrineGuideButton',

	KOMVitrineVideoHeading: '.KOMVitrineVideoHeading',
	KOMVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.KOMVitrineVideo iframe',

	KOMVitrineSupportHeading: '.KOMVitrineSupportHeading',
	KOMVitrineSupportBlurb: '.KOMVitrineSupportBlurb',
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

	it('shows KOMVitrineManifest', function () {
		browser.assert.elements(KOMVitrineManifest, 1);
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

	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
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

	it('shows KOMVitrineGuideButton', function () {
		browser.assert.elements(KOMVitrineGuideButton, 1);
	});

	it('shows KOMVitrineVideoHeading', function () {
		browser.assert.elements(KOMVitrineVideoHeading, 1);
	});

	it('shows KOMVitrineVideo', function () {
		browser.assert.elements(KOMVitrineVideo, 1);
	});

	it('shows KOMVitrineSupportHeading', function () {
		browser.assert.elements(KOMVitrineSupportHeading, 1);
	});

	it('shows KOMVitrineSupportBlurb', function () {
		browser.assert.elements(KOMVitrineSupportBlurb, 1);
	});

	it('shows ROCORootLink', function () {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
