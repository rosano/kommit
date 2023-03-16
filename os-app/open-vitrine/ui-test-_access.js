const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	KOMVitrine: '.KOMVitrine',
	
	KOMVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.KOMVitrineVideo iframe',

	KOMVitrineFeaturesHeading: '.KOMVitrineFeaturesHeading',

	KOMVitrineGuideButton: '.KOMVitrineGuideButton',

	KOMVitrineVideoHeading: '.KOMVitrineVideoHeading',
	KOMVitrineVideo1Heading: '.OLSKCommonVideoList .KOMVitrineVideo1Heading',
	KOMVitrineVideo1: '.OLSKCommonVideoList .OLSKCommonVideoListItem.KOMVitrineVideo1 iframe',
	
	KOMVitrineDeeperHeading: '.KOMVitrineDeeperHeading',
	KOMVitrineGlossary: '.KOMVitrineGlossary',
	KOMVitrineGlossaryHeading: '.KOMVitrineGlossaryHeading',
	KOMVitrineGlossaryFamilyLink: '.KOMVitrineGlossaryFamilyLink',
	KOMVitrineGlossaryFamilyBlurb: '.KOMVitrineGlossaryFamilyBlurb',
	KOMVitrineGlossaryFriendsLink: '.KOMVitrineGlossaryFriendsLink',
	KOMVitrineGlossaryFriendsBlurb: '.KOMVitrineGlossaryFriendsBlurb',
	KOMVitrineGlossaryPortugueseLink: '.KOMVitrineGlossaryPortugueseLink',
	KOMVitrineGlossaryPortugueseBlurb: '.KOMVitrineGlossaryPortugueseBlurb',

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

	it('shows KOMVitrineVideoHeading', function () {
		browser.assert.elements(KOMVitrineVideoHeading, 1);
	});

	it('shows KOMVitrineVideo1Heading', function () {
		browser.assert.elements(KOMVitrineVideo1Heading, 1);
	});

	it('shows KOMVitrineVideo1', function () {
		browser.assert.elements(KOMVitrineVideo1, 1);
	});

	it('shows KOMVitrineDeeperHeading', function () {
		browser.assert.elements(KOMVitrineDeeperHeading, 1);
	});

	it('shows KOMVitrineGlossary', function () {
		browser.assert.elements(KOMVitrineGlossary, 1);
	});

	it('shows KOMVitrineGlossaryHeading', function () {
		browser.assert.elements(KOMVitrineGlossaryHeading, 1);
	});

	it('shows KOMVitrineGlossaryFamilyLink', function () {
		browser.assert.elements(KOMVitrineGlossaryFamilyLink, 1);
	});

	it('shows KOMVitrineGlossaryFamilyBlurb', function () {
		browser.assert.elements(KOMVitrineGlossaryFamilyBlurb, 1);
	});

	it('shows KOMVitrineGlossaryFriendsLink', function () {
		browser.assert.elements(KOMVitrineGlossaryFriendsLink, 1);
	});

	it('shows KOMVitrineGlossaryFriendsBlurb', function () {
		browser.assert.elements(KOMVitrineGlossaryFriendsBlurb, 1);
	});

	it('shows KOMVitrineGlossaryPortugueseLink', function () {
		browser.assert.elements(KOMVitrineGlossaryPortugueseLink, 1);
	});

	it('shows KOMVitrineGlossaryPortugueseBlurb', function () {
		browser.assert.elements(KOMVitrineGlossaryPortugueseBlurb, 1);
	});

	it('shows ROCOGlossary', function () {
		browser.assert.elements('.ROCOGlossary', 1);
	});

	it('shows ROCOGlossaryHeading', function () {
		browser.assert.elements('.ROCOGlossaryHeading', 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows KOMVitrineSupportHeading', function () {
		browser.assert.elements(KOMVitrineSupportHeading, 1);
	});

	it('shows KOMVitrineSupportBlurb', function () {
		browser.assert.elements(KOMVitrineSupportBlurb, 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
