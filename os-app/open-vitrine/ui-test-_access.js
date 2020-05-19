import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	KOMVitrine: '.KOMVitrine',
	
	KOMVitrineIdentity: '.KOMVitrineIdentity',
	KOMVitrineIdentityLogo: '.KOMVitrineIdentityLogo',
	KOMVitrineIdentityName: '.KOMVitrineIdentityName',

	KOMVitrineContent: '.KOMVitrineContent',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows KOMVitrine', function() {
		browser.assert.elements(KOMVitrine, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows KOMVitrineIdentity', function() {
		browser.assert.elements(KOMVitrineIdentity, 1);
	});
	
	it('shows KOMVitrineIdentityLogo', function() {
		browser.assert.elements(KOMVitrineIdentityLogo, 1);
	});
	
	it('shows KOMVitrineIdentityName', function() {
		browser.assert.elements(KOMVitrineIdentityName, 1);
	});
	
	it('shows KOMVitrineContent', function() {
		browser.assert.elements(KOMVitrineContent, 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
