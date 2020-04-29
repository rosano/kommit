const { throws, deepEqual, notDeepEqual } = require('assert');

const mainModule = require('./ui-logic.js');
const KOMCardModel = require('../_shared/KOMCard/model.js');

const kTesting = {
	StubStateObjectValid () {
		return {
			KOMPlayStateCardsAll: [],
			KOMPlayStateCardsAgain: [],
		};
	},
};

describe('KOMPlaySort', function test_KOMPlaySort() {
	
	const uItems = function (inputData = 4) {
		return Array.from(new Array(inputData)).map(function (e, i) {
			return {
				KOMCardID: (i + 1).toString(),
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

	const uNew = function (param1, param2) {
		return param1.map(function (e, i) {
			return Object.assign(e, {
				KOMCardReviewDueDate: i >= param2 ? new Date() : undefined,
			});
		});
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

		deepEqual(Array.from(new Array(10)).map(function (e) {
			return uSlug(mainModule.KOMPlaySort(items));
		}).filter(function (value, index, self) {
			return self.indexOf(value) === index;
		}).length > 1, true);
	});

	context('new_card_spacing', function () {
		
		it('spaces single', function() {
			deepEqual(mainModule.KOMPlaySort(uNew(uItems(10), 1)).map(function (e, i) {
				if (!e.KOMCardReviewDueDate) {
					return i;
				}
			}).join(''), '4');
		});
		
		it('spaces multiple', function() {
			deepEqual(mainModule.KOMPlaySort(uNew(uItems(10), 2)).map(function (e, i) {
				if (!e.KOMCardReviewDueDate) {
					return i;
				}
			}).join(''), '36');
		});

		it('randomizes new cards', function() {
			const items = uNew(uItems(20), 4);

			deepEqual(Array.from(new Array(10)).map(function (e) {
				return uSlug(mainModule.KOMPlaySort(items).filter(function (e) {
					return !e.KOMCardReviewDueDate;
				}));
			}).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});
	
	});

});

describe('KOMPlayStateErrors', function test_KOMPlayStateErrors() {
	
	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMPlayStateErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMPlayStateCardsAll not array', function() {
		deepEqual(mainModule.KOMPlayStateErrors(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsAll: null,
		})), false);
	});

	it('returns false if KOMPlayStateCardsAgain not array', function() {
		deepEqual(mainModule.KOMPlayStateErrors(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsAgain: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMPlayStateErrors(kTesting.StubStateObjectValid()), true);
	});

});
