const { throws, deepEqual, notDeepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

const kTesting = {
	StubStateObjectValid () {
		return {
			KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
			KOMPlayStateCardsQueue: [],
			KOMPlayStateCardsWait: [],
		};
	},
	StubResponseObjectValid () {
		return {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			KOMPlayResponseDate: new Date(),
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

	it('returns false if KOMPlayStateCardsQueue not array', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsQueue: null,
		})), false);
	});

	it('returns false if KOMPlayStateCardsWait not array', function() {
		deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsWait: null,
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

describe('KOMPlayResponseStepToLearn', function test_KOMPlayResponseStepToLearn() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseStepToLearn(), 1000 * 60);
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

	it('returns false if KOMPlayResponseType not date', function() {
		deepEqual(mainModule.KOMPlayResponseIsValid(Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: new Date('alfa'),
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMPlayResponseIsValid(kTesting.StubResponseObjectValid()), true);
	});

});

describe('KOMPlayRespond', function test_KOMPlayRespond() {

	const uState = function (inputData = []) {
		return Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsQueue: [].concat(inputData),
		})
	};
	
	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMPlayRespond({}, kTesting.StubResponseObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMPlayRespond(uState(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns param2', function() {
		const state = uState(kTesting.StubCardObjectValid());
		deepEqual(mainModule.KOMPlayRespond(state, kTesting.StubResponseObjectValid()) === state, true);
	});

	context('new_and_Again', function () {
		
		it('updates card', function() {
			const card = kTesting.StubCardObjectValid();
			const response = Object.assign(kTesting.StubResponseObjectValid(), {
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			});

			mainModule.KOMPlayRespond(uState(card), response);

			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate + mainModule.KOMPlayResponseStepToLearn()),
			}));
		});
		
		it('updates state', function() {
			const card = kTesting.StubCardObjectValid();
			deepEqual(mainModule.KOMPlayRespond(uState(card), Object.assign(kTesting.StubResponseObjectValid(), {
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			})), Object.assign(uState(), {
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('new_and_Hard', function () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate + mainModule.KOMPlayResponseStepToLearn()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

});
