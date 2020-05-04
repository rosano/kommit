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
			KOMPlayResponseDate: new Date('2019-02-24T12:00:00Z'),
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
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
		};
	},
};

const offset = (function(inputData) {
	return inputData < 10 ? `0${ inputData }` : inputData;
})((new Date()).getTimezoneOffset() / 60);

describe('KOMPlayDayGrouping', function test_KOMPlayDayGrouping() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMPlayDayGrouping(new Date('alfa'));
		}, /KOMErrorInputNotValid/);
	});

	it('returns day in current timezone', function() {
		deepEqual(mainModule.KOMPlayDayGrouping(new Date(`2020-05-02T12:00:00-${ offset }:00`)), '2020-05-02');
	});

	it('previous day if before 4am', function() {
		const date = new Date(`2020-05-02T03:59:00-${ offset }:00`);
		deepEqual(mainModule.KOMPlayDayGrouping(date), '2020-05-01');
	});

	it('same day if 4am', function() {
		const date = new Date(`2020-05-02T04:00:00-${ offset }:00`);
		deepEqual(mainModule.KOMPlayDayGrouping(date), '2020-05-02');
	});

});

describe('KOMPlaySort', function test_KOMPlaySort() {
	
	const uItems = function (param1 = 4, param2 = false) {
		return Array.from(new Array(param1)).map(function (e, i) {
			return Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: (i + 1).toString() + 'forward',
			});
		}).concat(param2 ? Array.from(new Array(param1)).map(function (e, i) {
			return Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: (i + 1).toString() + 'backward',
			});
		}) : []);
	};

	const uSlug = function (inputData) {
		return inputData.map(function (e) {
			return e.KOMSpacingID;
		}).join('-');
	};

	const uNew = function (param1, param2) {
		return param1.map(function (e, i) {
			return Object.assign(e, {
				KOMSpacingDueDate: i >= param2 ? new Date() : undefined,
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

	context('unseen', function () {
		
		it('spaces single', function() {
			deepEqual(mainModule.KOMPlaySort(uNew(uItems(10), 1)).map(function (e, i) {
				if (!e.KOMSpacingDueDate) {
					return i;
				}
			}).join(''), '4');
		});
		
		it('spaces multiple', function() {
			deepEqual(mainModule.KOMPlaySort(uNew(uItems(10), 2)).map(function (e, i) {
				if (!e.KOMSpacingDueDate) {
					return i;
				}
			}).join(''), '36');
		});

		it('randomizes new cards', function() {
			const items = uNew(uItems(20), 4);

			deepEqual(Array.from(new Array(10)).map(function (e) {
				return uSlug(mainModule.KOMPlaySort(items).filter(function (e) {
					return !e.KOMSpacingDueDate;
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

	context('KOMPlayStateShouldRandomize', function () {
		
		it('returns false if not boolean', function() {
			deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
				KOMPlayStateShouldRandomize: null,
			})), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.KOMPlayStateIsValid(Object.assign(kTesting.StubStateObjectValid(), {
				KOMPlayStateShouldRandomize: true,
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

describe('KOMPlayResponseIntervalOverdueDivisorHard', function test_KOMPlayResponseIntervalOverdueDivisorHard() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDivisorHard(), 4);
	});

});

describe('KOMPlayResponseIntervalOverdueDivisorGood', function test_KOMPlayResponseIntervalOverdueDivisorGood() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDivisorGood(), 2);
	});

});

describe('KOMPlayResponseIntervalOverdueDivisorEasy', function test_KOMPlayResponseIntervalOverdueDivisorEasy() {

	it('returns number', function () {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDivisorEasy(), 1);
	});

});

describe('KOMPlayResponseIntervalOverdueDays', function test_KOMPlayResponseIntervalOverdueDays() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMPlayResponseIntervalOverdueDays({}, kTesting.StubResponseObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMPlayResponseIntervalOverdueDays(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0 if no KOMCardReviewInterval', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDays(kTesting.StubCardObjectValid(), kTesting.StubResponseObjectValid()), 0);
	});

	it('returns 0 if KOMCardReviewDueDate same day', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDays(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseDate: new Date(`2020-05-02T18:00:00-${ offset }:00`),
		})), 0);
	});

	it('returns days if KOMCardReviewDueDate past', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueDays(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseDate: new Date(`2020-05-12T18:00:00-${ offset }:00`),
		})), 10);
	});

});

describe('KOMPlayResponseIntervalOverdueBonus', function test_KOMPlayResponseIntervalOverdueBonus() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMPlayResponseIntervalOverdueBonus({}, kTesting.StubResponseObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMPlayResponseIntervalOverdueBonus(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
			KOMPlayResponseDate: new Date(`2020-05-12T18:00:00-${ offset }:00`),
		})), 0);
	});

	it('adjusts if Hard', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
			KOMPlayResponseDate: new Date(`2020-05-12T18:00:00-${ offset }:00`),
		})), 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorHard());
	});

	it('adjusts if Good', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
			KOMPlayResponseDate: new Date(`2020-05-12T18:00:00-${ offset }:00`),
		})), 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorGood());
	});

	it('adjusts if Easy', function() {
		deepEqual(mainModule.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewDueDate: new Date(`2020-05-02T12:00:00-${ offset }:00`),
		}), Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
			KOMPlayResponseDate: new Date(`2020-05-12T18:00:00-${ offset }:00`),
		})), 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorEasy());
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
					KOMCardReviewDueDate: new Date(kTesting.StubResponseObjectValid().KOMPlayResponseDate.valueOf() + inputData),
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

	context('KOMPlayStateShouldRandomize', function () {

		const uIntervals = function (param1, param2 = 0) {
			return Array.from(new Array(10)).map(function () {
				const date = new Date();
				const card = kTesting.StubCardObjectValid();
				const state = Object.assign(uState(card), {
					KOMPlayStateShouldRandomize: true,
				});
				const response = Object.assign(kTesting.StubResponseObjectValid(), {
					KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
					KOMPlayResponseDate: date,
				});

				mainModule.KOMPlayRespond(state, response);

				response.KOMPlayResponseType = mainModule.KOMPlayResponseTypeGood();

				for (var i = 0; i < param1; i++) {
					state.KOMPlayStateCardCurrent = card;
					mainModule.KOMPlayRespond(state, response);
				};

				return Math.abs(card.KOMCardReviewInterval - param2);
			});
		};

		it('randomizes KOMCardReviewInterval', function() {
			deepEqual(uIntervals(1).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

		context('review_1', function () {

			const baseInterval = 10;

			it('deviates over 30 seconds', function() {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60 * 60) < 30;
				}), []);
			});

			it('deviates under 3 hours', function() {
				deepEqual(uIntervals(1, baseInterval).filter(function (e) {
					return (e * 24) > 3;
				}), []);
			});
		
		});

		context('review_2', function () {

			const baseInterval = 25;

			it.skip('deviates over 2 minutes', function() {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60) < 2;
				}), []);
			});
			
			it('deviates under 2 days', function() {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return e > 2;
				}), []);
			});
		
		});

		context('review_3', function () {

			const baseInterval = 62.5;

			it('deviates over 3 hours', function() {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e * 24 < 3;
				}), []);
			});
			
			it('deviates under 4 days', function() {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e > 4;
				}), []);
			});
		
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

	context('graduate_Fail', function test_graduate_Fail () {
		
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
				KOMPlayResponseType: mainModule.KOMPlayResponseTypeAgain(),
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
			const interval = mainModule.KOMPlayResponseIntervalGraduateEasy() * mainModule.KOMPlayResponseMultiplierDefault() * mainModule.KOMPlayResponseMultiplierMultiplicandEasy();
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

	context('overdue_and_Hard', function test_overdue_and_Hard () {

		const date = new Date();
		const card = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
			KOMCardReviewDueDate: date,
		});
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
			KOMPlayResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
		});

		before(function () {
			mainModule.KOMPlayRespond(uState(card), response);	
		});
		
		it('updates card', function() {
			const interval = (mainModule.KOMPlayResponseIntervalGraduateEasy() + 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorHard()) * mainModule.KOMPlayResponseMultiplierHard();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandHard(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
	});

	context('overdue_and_Good', function test_overdue_and_Good () {

		const date = new Date();
		const card = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
			KOMCardReviewDueDate: date,
		});
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeGood(),
			KOMPlayResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
		});

		before(function () {
			mainModule.KOMPlayRespond(uState(card), response);	
		});
		
		it('updates card', function() {
			const interval = (mainModule.KOMPlayResponseIntervalGraduateEasy() + 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorGood()) * mainModule.KOMPlayResponseMultiplierDefault();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandGood(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
	});

	context('overdue_and_Easy', function test_overdue_and_Easy () {

		const date = new Date();
		const card = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault(),
			KOMCardReviewDueDate: date,
		});
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeEasy(),
			KOMPlayResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
		});

		before(function () {
			mainModule.KOMPlayRespond(uState(card), response);	
		});
		
		it('updates card', function() {
			const interval = (mainModule.KOMPlayResponseIntervalGraduateEasy() + 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorEasy()) * mainModule.KOMPlayResponseMultiplierDefault() * mainModule.KOMPlayResponseMultiplierMultiplicandEasy();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierDefault() + mainModule.KOMPlayResponseMultiplierSummandEasy(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
	});

	context('minimum_multiplier', function test_minimum_multiplier () {

		const date = new Date();
		const card = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardReviewInterval: mainModule.KOMPlayResponseIntervalGraduateEasy(),
			KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierMin(),
			KOMCardReviewDueDate: date,
		});
		const response = Object.assign(kTesting.StubResponseObjectValid(), {
			KOMPlayResponseType: mainModule.KOMPlayResponseTypeHard(),
			KOMPlayResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
		});

		before(function () {
			mainModule.KOMPlayRespond(uState(card), response);	
		});
		
		it('updates card', function() {
			const interval = (mainModule.KOMPlayResponseIntervalGraduateEasy() + 10 / mainModule.KOMPlayResponseIntervalOverdueDivisorHard()) * mainModule.KOMPlayResponseMultiplierHard();
			deepEqual(card, Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardReviewMultiplier: mainModule.KOMPlayResponseMultiplierMin(),
				KOMCardReviewInterval: interval,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
			}));
		});
		
	});

});
