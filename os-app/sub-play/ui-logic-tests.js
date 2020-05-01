const { throws, deepEqual, notDeepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

const kTesting = {
	StubStateObjectValid () {
		return {
			KOMPlayStateCardsQueue: [],
			KOMPlayStateCardsWait: [],
		};
	},
	StubResponseObjectValid () {
		return {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
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

	context('KOMPlayStateCardCurrent', function () {

		it('returns false if not valid', function() {
			deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
				KOMPlayStateCardCurrent: {},
			})), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
				KOMPlayStateCardCurrent: null,
			})), true);
		});
	
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

describe('KOMPlayResponseIntervalAgain', function test_KOMPlayResponseIntervalAgain() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalAgain(), 1000 * 50);
	});

});

describe('KOMPlayResponseIntervalLearn1', function test_KOMPlayResponseIntervalLearn1() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalLearn1(), 1000 * 60);
	});

});

describe('KOMPlayResponseIntervalLearn2', function test_KOMPlayResponseIntervalLearn2() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalLearn2(), 1000 * 60 * 10);
	});

});

describe('KOMPlayResponseIntervalGraduateDefault', function test_KOMPlayResponseIntervalGraduateDefault() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalGraduateDefault(), 1);
	});

});

describe('KOMPlayResponseIntervalGraduateEasy', function test_KOMPlayResponseIntervalGraduateEasy() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalGraduateEasy(), 4);
	});

});

describe('KOMPlayResponseMultiplierDefault', function test_KOMPlayResponseMultiplierDefault() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierDefault(), 2.5);
	});

});

describe('KOMPlayResponseMultiplierMin', function test_KOMPlayResponseMultiplierMin() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierMin(), 1.3);
	});

});

describe('KOMPlayResponseMultiplierHard', function test_KOMPlayResponseMultiplierHard() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierHard(), 1.2);
	});

});

describe('KOMPlayResponseMultiplierSummandFail', function test_KOMPlayResponseMultiplierSummandFail() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierSummandFail(), -0.2);
	});

});

describe('KOMPlayResponseMultiplierSummandGood', function test_KOMPlayResponseMultiplierSummandGood() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierSummandGood(), 0);
	});

});

describe('KOMPlayResponseMultiplierSummandHard', function test_KOMPlayResponseMultiplierSummandHard() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierSummandHard(), -0.15);
	});

});

describe('KOMPlayResponseMultiplierSummandEasy', function test_KOMPlayResponseMultiplierSummandEasy() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierSummandEasy(), 0.15);
	});

});

describe('KOMPlayResponseMultiplierMultiplicandEasy', function test_KOMPlayResponseMultiplierMultiplicandEasy() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseMultiplierMultiplicandEasy(), 1.3);
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

	const uState = function (param1, param2 = []) {
		return Object.assign(kTesting.StubStateObjectValid(), {
			KOMPlayStateCardsQueue: [].concat(param2),
			KOMPlayStateCardCurrent: param1,
		});
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

	context('KOMPlayStateCardCurrent', function () {
		
		it('sets to null if no cards', function () {
			deepEqual(mainModule.KOMPlayRespond(uState(kTesting.StubCardObjectValid()), kTesting.StubResponseObjectValid()), Object.assign(uState(), {
				KOMPlayStateCardCurrent: null,
			}));
		});

		it('sets to first in queue', function () {
			const card = kTesting.StubCardObjectValid();
			deepEqual(mainModule.KOMPlayRespond(uState(kTesting.StubCardObjectValid(), card), kTesting.StubResponseObjectValid()).KOMPlayStateCardCurrent === card, true);
		});
	
	});

	context('KOMPlayStateCardsWait', function () {

		const uWait = function (inputData) {
			return Object.assign(uState(kTesting.StubCardObjectValid(), [kTesting.StubCardObjectValid()]), {
				KOMPlayStateCardsWait: [Object.assign(kTesting.StubCardObjectValid(), {
					KOMCardReviewDueDate: new Date(Date.now() + inputData),
				})],
			});
		};
		
		it('moves to queue if overdue', function () {
			const state = uWait(-1000);
			const queue = state.KOMPlayStateCardsQueue.slice();
			const first = state.KOMPlayStateCardsWait.slice()[0];
			deepEqual(mainModule.KOMPlayRespond(state, kTesting.StubResponseObjectValid()), Object.assign(uWait(-1000), {
				KOMPlayStateCardCurrent: first,
				KOMPlayStateCardsQueue: queue,
				KOMPlayStateCardsWait: [],
			}));
		});
		
		it('moves to queue if no other cards', function () {
			const state = Object.assign(uWait(1000), {
				KOMPlayStateCardsQueue: [],
			});
			const wait = (state.KOMPlayStateCardsWait = state.KOMPlayStateCardsWait.concat(state.KOMPlayStateCardsWait.slice())).slice();
			deepEqual(mainModule.KOMPlayRespond(state, kTesting.StubResponseObjectValid()), Object.assign(uWait(1000), {
				KOMPlayStateCardCurrent: wait[0],
				KOMPlayStateCardsQueue: wait.slice(1),
				KOMPlayStateCardsWait: [],
			}));
		});
		
		it('does nothing', function () {
			const state = uWait(1000);
			const first = state.KOMPlayStateCardsQueue[0];
			deepEqual(mainModule.KOMPlayRespond(state, kTesting.StubResponseObjectValid()), Object.assign(uWait(1000), {
				KOMPlayStateCardCurrent: first,
				KOMPlayStateCardsQueue: [],
			}));
		});

	});

	context('unseen_and_Again', function test_unseen_and_Again () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalAgain()),
				KOMCardReviewIsLearning: true,
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('unseen_and_Hard', function test_unseen_and_Hard () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalLearn1()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('unseen_and_Good', function test_unseen_and_Good () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalLearn1()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('unseen_and_Easy', function test_unseen_and_Easy () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mainModule.KOMPlayResponseIntervalGraduateEasy()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, uState());
		});
	
	});

	context('learning_and_Again', function test_learning_and_Again () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalAgain()),
				KOMCardReviewIsLearning: true,
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('learning_and_Hard', function test_learning_and_Hard () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
				KOMCardReviewIsReadyToGraduate: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalLearn2()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('learning_and_Good', function test_learning_and_Good () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewIsLearning: true,
				KOMCardReviewIsReadyToGraduate: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalLearn2()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('learning_and_Easy', function test_learning_and_Easy () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mainModule.KOMPlayResponseIntervalGraduateEasy()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
			}));
		});
	
	});

	context('graduate_Hard', function test_graduate_Hard () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateDefault(),
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mainModule.KOMPlayResponseIntervalGraduateDefault()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
			}));
		});
	
	});

	context('graduate_Good', function test_graduate_Good () {
		
		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsWait.pop();

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateDefault(),
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mainModule.KOMPlayResponseIntervalGraduateDefault()),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
			}));
		});
	
	});

	context('reviewing_and_Again', function test_reviewing_and_Again () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = card;

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			}));	
		});
		
		it('updates card', function() {
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandFail(),
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + mainModule.KOMPlayResponseIntervalAgain()),
				KOMCardReviewIsLearning: true,
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [card],
			}));
		});
	
	});

	context('reviewing_and_Hard', function test_reviewing_and_Hard () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = card;

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
			}));	
		});
		
		it('updates card', function() {
			const interval = mainModule.KOMPlayResponseIntervalGraduateEasy() * mainModule.KOMPlayResponseMultiplierHard();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandHard(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [],
			}));
		});
	
	});

	context('reviewing_and_Good', function test_reviewing_and_Good () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = card;

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
			}));	
		});
		
		it('updates card', function() {
			const interval = mainModule.KOMPlayResponseIntervalGraduateEasy() * mainModule.KOMPlayResponseMultiplierDefault();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandGood(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [],
			}));
		});
	
	});

	context('reviewing_and_Easy', function test_reviewing_and_Easy () {

		const card = kTesting.StubCardObjectValid();
		const state = uState(card, [kTesting.StubCardObjectValid()]);
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mainModule.KOMPlayRespond(state, response);
		});
		
		before(function () {
			state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardCurrent);
			state.KOMPlayStateCardCurrent = card;

			mainModule.KOMPlayRespond(state, Object.assign(response, {
				KOMPlayResponseDate: state.KOMPlayStateCardCurrent.KOMCardReviewDueDate,
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
			}));	
		});
		
		it('updates card', function() {
			const interval = mainModule.KOMPlayResponseIntervalGraduateEasy() * mainModule.KOMPlayResponseMultiplierDefault();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandEasy(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
		it('updates state', function() {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCardCurrent: kTesting.StubCardObjectValid(),
				KOMPlayStateCardsWait: [],
			}));
		});
	
	});

});
