const { throws, deepEqual, notDeepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('KOMPlaySort', function test_KOMPlaySort() {
	
	const uItems = function () {
		return ['alfa', 'bravo', 'charlie', 'delta'].map(function (e) {
			return {
				KOMCardID: e,
				KOMCardQuestion: '',
				KOMCardAnswer: '',
				KOMCardCreationDate: new Date(),
				KOMCardModificationDate: new Date(),
			};
		});
	};

	const uSlug = function (inputData) {
		return inputData.map(function (e) {
			return e.KOMCardID;
		}).join('-');
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMPlaySort(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(Array.isArray(mainModule.KOMPlaySort(uItems())), true);
	});

	it('creates copy', function() {
		const items = uItems();
		deepEqual(mainModule.KOMPlaySort(items) === items, false);
	});

	it('randomizes', function() {
		const items = uItems();

		const length = 10;
		deepEqual(Array.from(new Array(length)).map(function (e) {
			return uSlug(mainModule.KOMPlaySort(items));
		}).filter(function (value, index, self) {
			return self.indexOf(value) < index;
		}).length < length, true);
	});

});
