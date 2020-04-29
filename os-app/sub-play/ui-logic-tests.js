const { throws, deepEqual, notDeepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

const kTesting = {
	StubStateObjectValid () {
		return {
			KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
			KOMPlayStateCardsAll: [],
			KOMPlayStateCardsAgain: [],
		};
	},
	StubResponseObjectValid () {
		return {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardQuestion: '',
			KOMCardAnswer: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
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

describe('KOMPlayStateIsValid', function test_KOMPlayStateIsValid() {
	
	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMPlayStateIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMPlayStateCardCurrent not valid', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardCurrent: {},
		})), false);
	});

	it('returns false if KOMPlayStateCardsAll not array', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsAll: null,
		})), false);
	});

	it('returns false if KOMPlayStateCardsAgain not array', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsAgain: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(kTesting.StubStateObjectValid()), true);
	});

});

describe('KOMPlayResponseTypeAgain', function test_KOMPlayResponseTypeAgain() {

	it('returns string', function () {
		deepEqual(mainModule.KOMPlayResponseTypeAgain(), 'kKOMPlayResponseTypeAgain')
	});

});

describe('KOMPlayResponseTypeHard', function test_KOMPlayResponseTypeHard() {

	it('returns string', function () {
		deepEqual(mainModule.KOMPlayResponseTypeHard(), 'kKOMPlayResponseTypeHard')
	});

});

describe('KOMPlayResponseTypeGood', function test_KOMPlayResponseTypeGood() {

	it('returns string', function () {
		deepEqual(mainModule.KOMPlayResponseTypeGood(), 'kKOMPlayResponseTypeGood')
	});

});

describe('KOMPlayResponseTypeEasy', function test_KOMPlayResponseTypeEasy() {

	it('returns string', function () {
		deepEqual(mainModule.KOMPlayResponseTypeEasy(), 'kKOMPlayResponseTypeEasy')
	});

});

describe('KOMPlayResponseTypes', function test_KOMPlayResponseTypes() {

	it('returns array', function () {
		deepEqual(mainModule.KOMPlayResponseTypes(), [
			mainModule.KOMPlayResponseTypeAgain(),
			mainModule.KOMPlayResponseTypeHard(),
			mainModule.KOMPlayResponseTypeGood(),
			mainModule.KOMPlayResponseTypeEasy(),
			])
	});

});

describe('KOMPlayResponseIsValid', function test_KOMPlayResponseIsValid() {
	
	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMPlayResponseIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMPlayResponseType not valid', function() {
		deepEqual(mainModule.KOMPlayResponseIsValid(Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: null,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMPlayResponseIsValid(kTesting.StubResponseObjectValid()), true);
	});

});

describe('KOMPlayRespond', function test_KOMPlayRespond() {

	const uState = function (inputData = []) {
		return Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsAll: [].concat(inputData),
		})
	};
	
	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMPlayRespond(kTesting.StubResponseObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMPlayRespond({}, uState());
		}, /KOMErrorInputNotValid/);
	});

	it('returns param2', function() {
		const item = uState(kTesting.StubCardObjectValid());
		deepEqual(mainModule.KOMPlayRespond(item, kTesting.StubResponseObjectValid()) === item, true);
	});

	context('new_and_again', function () {
		
		it('updates card', function() {
			const item = kTesting.StubCardObjectValid();

			mainModule.KOMPlayRespond(uState(item), Object.assign(kTesting.StubResponseObjectValid(), {
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			}));

			deepEqual(item, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
			}));
		});
		
		it('updates state', function() {
			const item = kTesting.StubCardObjectValid();
			deepEqual(mainModule.KOMPlayRespond(uState(item), Object.assign(kTesting.StubResponseObjectValid(), {
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			})), Object.assign(uState(), {
				KOMPlayStateCardsAgain: [item],
			}));
		});
	
	});

});
