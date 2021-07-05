const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	KOMVitrine: '.KOMVitrine',
	
	KOMVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.KOMVitrineVideo iframe',

	KOMVitrineFeaturesHeading: '.KOMVitrineFeaturesHeading',

	KOMVitrineGuideButton: '.KOMVitrineGuideButton',

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

	it('shows OLSKCrown', function () {
		browser.assert.elements('.OLSKCrown', 1);
	});

	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows KOMVitrineVideo', function () {
		browser.assert.elements(KOMVitrineVideo, 1);
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

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows KOMVitrineGuideButton', function () {
		browser.assert.elements(KOMVitrineGuideButton, 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKJar', function () {
		browser.assert.elements('.OLSKJar', 1);
	});

	it('shows KOMVitrineSupportHeading', function () {
		browser.assert.elements(KOMVitrineSupportHeading, 1);
	});

	it('shows KOMVitrineSupportBlurb', function () {
		browser.assert.elements(KOMVitrineSupportBlurb, 1);
	});

	it('shows ROCOEphemerataLink', function () {
		browser.assert.elements('.ROCOEphemerataLink', 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
