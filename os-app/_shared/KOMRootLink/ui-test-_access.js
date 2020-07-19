Object.entries({
	KOMRootLink: '.KOMRootLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	describe(`KOMRootLink_Access-${ kDefaultRoute.OLSKRouteSignature }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('shows KOMRootLink', function () {
			browser.assert.elements(KOMRootLink, 1);
		});

		it('shows OLSKRootLink', function () {
			browser.assert.elements('.OLSKRootLink', 1);
		});

	});

});
