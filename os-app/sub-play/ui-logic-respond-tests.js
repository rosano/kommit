const { throws, deepEqual, strictEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const KOMSpacing = require('../_shared/KOMSpacing/main.js').default;

const uRepeat = function (param1, param2) {
	return Array.from(new Array(param1)).map(param2);
};

describe('KOMPlayRespond', function test_KOMPlayRespond() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMPlayRespond({}, StubChronicleObjectPrepared());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not prepared', function () {
		throws(function () {
			mod.KOMPlayRespond(StubStateObjectValid(), StubChronicleObjectValid2({
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns param1', function () {
		const item = StubStateObjectValid({
			KOMPlayStateCurrent: uSpacingUnseen(),
		})
		strictEqual(mod.KOMPlayRespond(item, StubChronicleObjectPrepared()), item);
	});

	context('param2', function () {

		const KOMPlayStateCurrent = uSpacingUnseen();
		const chronicle = StubChronicleObjectPrepared();

		before(function () {
			mod.KOMPlayRespond(StubStateObjectValid({
				KOMPlayStateCurrent,
			}), chronicle);
		});

		it('adds to KOMSpacingChronicles', function () {
			deepEqual(KOMPlayStateCurrent.KOMSpacingChronicles[0] === chronicle, true);
		});

	});

	context('KOMPlayStateCurrentPair', function () {

		const KOMPlayStateCurrent = StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward());
		const KOMPlayStateCurrentPair = StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward());
		const state = StubStateObjectValid({
			KOMPlayStatePairingIsEnabled: true,
			KOMPlayStateCurrent,
			KOMPlayStateCurrentPair,
		});

		before(function () {
			mod.KOMPlayRespond(state, StubChronicleObjectPrepared({
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(KOMPlayStateCurrentPair, Object.assign(Object.assign({}, KOMPlayStateCurrent), {
				KOMSpacingID: KOMPlayStateCurrentPair.KOMSpacingID,
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStatePairingIsEnabled: true,
				KOMPlayStateCurrent: undefined,
				KOMPlayStateCurrentPair: undefined,
				KOMPlayStateQueue: [KOMPlayStateCurrent, KOMPlayStateCurrentPair],
				KOMPlayStateHistory: [[KOMPlayStateCurrent, KOMPlayStateCurrentPair]],
			}));
		});

	});

	context('KOMPlayStateWait', function () {

		const uStateWait = function (inputData) {
			return StubStateObjectValid({
				KOMPlayStateCurrent: uSpacingUnseen(),
				KOMPlayStateQueue: [uSpacingUnseen()],
				KOMPlayStateWait: [uSpacingUnseen({
					KOMSpacingDueDate: new Date(StubChronicleObjectValid2().KOMChronicleResponseDate.valueOf() + inputData),
				})],
			});
		};

		it('moves to queue if overdue', function () {
			const state = uStateWait(-1000);
			const current = state.KOMPlayStateCurrent;
			const queue = state.KOMPlayStateQueue.slice();
			const wait = state.KOMPlayStateWait.slice();
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectPrepared()), Object.assign(uStateWait(-1000), {
				KOMPlayStateCurrent: state.KOMPlayStateCurrent,
				KOMPlayStateQueue: wait.concat(queue),
				KOMPlayStateWait: [],
				KOMPlayStateHistory: [[current]],
			}));
		});

		it('moves to queue if queue empty', function () {
			const state = Object.assign(uStateWait(1000), {
				KOMPlayStateQueue: [],
			});
			const current = state.KOMPlayStateCurrent;
			const wait = (state.KOMPlayStateWait = state.KOMPlayStateWait.concat(state.KOMPlayStateWait.slice())).slice();
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectPrepared()), Object.assign(uStateWait(1000), {
				KOMPlayStateCurrent: state.KOMPlayStateCurrent,
				KOMPlayStateQueue: wait,
				KOMPlayStateWait: [],
				KOMPlayStateHistory: [[current]],
			}));
		});

		it('does nothing', function () {
			const state = uStateWait(1000);
			const current = state.KOMPlayStateCurrent;
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectValid2()), Object.assign(uStateWait(1000), {
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateHistory: [[current]],
			}));
		});

	});

	context('KOMPlayStateShouldRandomizeDueDates', function () {

		const uIntervals = function (param1, param2 = 0) {
			return uRepeat(10, function () {
				const date = new Date();
				const spacing = uSpacingUnseen();
				const state = StubStateObjectValid({
					KOMPlayStateCurrent: spacing,
					KOMPlayStateShouldRandomizeDueDates: true,
				});
				const chronicle = StubChronicleObjectPrepared({
					KOMChronicleResponseDate: date,
					KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
				});

				mod.KOMPlayRespond(state, chronicle);

				chronicle.KOMChronicleResponseType = mod.KOMPlayResponseTypeGood();

				for (var i = 0; i < param1; i++) {
					state.KOMPlayStateCurrent = spacing;
					mod.KOMPlayRespond(state, chronicle);
				}

				return Math.abs(spacing.KOMSpacingInterval - param2);
			});
		};

		it('randomizes KOMSpacingInterval', function () {
			deepEqual(uIntervals(1).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

		context('review_1', function () {

			const baseInterval = 10;

			it('deviates over 30 seconds', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60 * 60) < 30;
				}), []);
			});

			it('deviates under 3 hours', function () {
				deepEqual(uIntervals(1, baseInterval).filter(function (e) {
					return (e * 24) > 3;
				}), []);
			});

		});

		context('review_2', function () {

			const baseInterval = 25;

			it.skip('deviates over 2 minutes', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60) < 2;
				}), []);
			});

			it('deviates under 2 days', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return e > 2;
				}), []);
			});

		});

		context('review_3', function () {

			const baseInterval = 62.5;

			it('deviates over 3 hours', function () {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e * 24 < 3;
				}), []);
			});

			it('deviates under 4 days', function () {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e > 4;
				}), []);
			});

		});

	});

	['Again', 'Hard', 'Good'].forEach(function (response) {

		const KOMChronicleResponseType = {
			Again: mod.KOMPlayResponseTypeAgain(),
			Hard: mod.KOMPlayResponseTypeHard(),
			Good: mod.KOMPlayResponseTypeGood(),
		}[response];

		context('unseen_' + response, function test_unseen() {

			const spacing = uSpacingUnseen();
			const state = StubStateObjectValid({
				KOMPlayStateCurrent: spacing,
				KOMPlayStateQueue: [uSpacingUnseen()],
			});
			const chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseType,
			});

			before(function () {
				mod.KOMPlayRespond(state, chronicle);
			});

			it('updates spacing', function () {
				deepEqual(spacing, uSpacingUnseen({
					KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + {
						Again: mod.KOMPlayResponseIntervalAgain(),
						Hard: mod.KOMPlayResponseIntervalLearn(),
						Good: mod.KOMPlayResponseIntervalLearn(),
					}[response]),
					KOMSpacingIsLearning: true,
					KOMSpacingChronicles: [StubChronicleObjectPrepared({
						KOMChronicleResponseType,
						KOMChronicleDueDate: spacing.KOMSpacingDueDate,
						KOMChronicleIsLearning: true,
					})],
				}));
			});

			it('updates state', function () {
				deepEqual(state, StubStateObjectValid({
					KOMPlayStateCurrent: undefined,
					KOMPlayStateQueue: state.KOMPlayStateQueue,
					KOMPlayStateWait: [spacing],
					KOMPlayStateHistory: [[spacing]],
				}));
			});

		});
		
	});

	context('unseen_and_Easy', function test_unseen_and_Easy() {

		const spacing = uSpacingUnseen();
		const state = StubStateObjectValid({
			KOMPlayStateCurrent: spacing,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mod.KOMPlayResponseIntervalGraduateEasy()),
				KOMSpacingChronicles: [StubChronicleObjectPrepared({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateHistory: [[spacing]],
			}));
		});

	});

	context('learning_and_Again', function test_learning_and_Again() {

		const spacing = uSpacingUnseen();
		const state = StubStateObjectValid({
			KOMPlayStateCurrent: spacing,
			KOMPlayStateQueue: [uSpacingUnseen()],
		});
		let chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(StubChronicleObjectPrepared(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));

		});

		it('updates spacing', function () {
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateWait: [spacing],
				KOMPlayStateHistory: [[spacing], [spacing]],
			}));
		});

	});

	context('learning_after_Again', function test_learning_after_Again() {

		const spacing = uSpacingUnseen();
		const state = StubStateObjectValid({
			KOMPlayStateCurrent: spacing,
			KOMPlayStateQueue: [uSpacingUnseen()],
		});
		let chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(StubChronicleObjectPrepared(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateWait: [spacing],
				KOMPlayStateHistory: [[spacing], [spacing]],
			}));
		});

	});


	['Hard', 'Good'].forEach(function (response) {

		const KOMChronicleResponseType = {
			Hard: mod.KOMPlayResponseTypeHard(),
			Good: mod.KOMPlayResponseTypeGood(),
			Easy: mod.KOMPlayResponseTypeEasy(),
		}[response];

		context('graduate_' + response, function test_graduate() {
			
			const spacing = uSpacingUnseen();
			const state = StubStateObjectValid({
				KOMPlayStateCurrent: spacing,
				KOMPlayStateQueue: [uSpacingUnseen()],
			});
			let chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseType,
			});
			const events = [];

			before(function () {
				mod.KOMPlayRespond(state, chronicle);

				events.push(StubChronicleObjectPrepared(chronicle));
			});

			before(function () {
				state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
				state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

				mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
					KOMChronicleResponseType,
					KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				}));
			});

			it('updates spacing', function () {
				deepEqual(spacing, uSpacingUnseen({
					KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateDefault(),
					KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
					KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mod.KOMPlayResponseIntervalGraduateDefault()),
					KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
						KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
						KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
						KOMChronicleDueDate: spacing.KOMSpacingDueDate,
						KOMChronicleInterval: spacing.KOMSpacingInterval,
						KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
					})),
				}));
			});

			it('updates state', function () {
				deepEqual(state, StubStateObjectValid({
					KOMPlayStateCurrent: undefined,
					KOMPlayStateQueue: state.KOMPlayStateQueue,
					KOMPlayStateHistory: [[spacing], [spacing]],
				}));
			});
		
		});
			
	});

	context('graduate_Fail', function test_graduate_Fail() {

		const spacing = uSpacingUnseen();
		const state = StubStateObjectValid({
			KOMPlayStateCurrent: spacing,
			KOMPlayStateQueue: [uSpacingUnseen()],
		});
		let chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(StubChronicleObjectPrepared(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateWait: [spacing],
				KOMPlayStateHistory: [[spacing], [spacing]],
			}));
		});

	});

	context('reviewing_and_Again', function test_reviewing_and_Again() {

		const spacing = uSpacingUnseen();
		const state = StubStateObjectValid({
			KOMPlayStateCurrent: spacing,
			KOMPlayStateQueue: [uSpacingUnseen()],
		});
		let chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(StubChronicleObjectPrepared(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = spacing;

			mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandFail(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: undefined,
				KOMPlayStateQueue: state.KOMPlayStateQueue,
				KOMPlayStateWait: [spacing],
				KOMPlayStateHistory: [[spacing], [spacing]],
			}));
		});

	});

	context('reviewing_and_', function test_reviewing_and_() {

		['Hard', 'Good', 'Easy'].forEach(function (response) {

			context(response, function () {
				
				const spacing = uSpacingUnseen();
				const state = StubStateObjectValid({
					KOMPlayStateCurrent: spacing,
					KOMPlayStateQueue: [uSpacingUnseen()],
				});
				let chronicle = StubChronicleObjectPrepared({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
				});
				const events = [];

				before(function () {
					mod.KOMPlayRespond(state, chronicle);

					events.push(StubChronicleObjectPrepared(chronicle));
				});

				before(function () {
					state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
					state.KOMPlayStateCurrent = spacing;

					mod.KOMPlayRespond(state, chronicle = StubChronicleObjectPrepared({
						KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
						KOMChronicleResponseType: {
							Hard: mod.KOMPlayResponseTypeHard(),
							Good: mod.KOMPlayResponseTypeGood(),
							Easy: mod.KOMPlayResponseTypeEasy(),
						}[response],
					}));
				});

				it('updates spacing', function () {
					const interval = mod.KOMPlayResponseIntervalGraduateEasy() * {
						Hard: mod.KOMPlayResponseMultiplierHard(),
						Good: mod.KOMPlayResponseMultiplierDefault(),
						Easy: mod.KOMPlayResponseMultiplierDefault(),
					}[response] * {
						Hard: 1,
						Good: 1,
						Easy: mod.KOMPlayResponseMultiplierMultiplicandEasy(),
					}[response];
					deepEqual(spacing, uSpacingUnseen({
						KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + {
							Hard: mod.KOMPlayResponseMultiplierSummandHard(),
							Good: mod.KOMPlayResponseMultiplierSummandGood(),
							Easy: mod.KOMPlayResponseMultiplierSummandEasy(),
						}[response],
						KOMSpacingInterval: interval,
						KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
						KOMSpacingChronicles: events.concat(StubChronicleObjectPrepared({
							KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
							KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
							KOMChronicleDueDate: spacing.KOMSpacingDueDate,
							KOMChronicleInterval: spacing.KOMSpacingInterval,
							KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
						})),
					}));
				});

				it('updates state', function () {
					deepEqual(state, StubStateObjectValid({
						KOMPlayStateCurrent: undefined,
						KOMPlayStateQueue: state.KOMPlayStateQueue,
						KOMPlayStateWait: [],
						KOMPlayStateHistory: [[spacing], [spacing]],
					}));
				});
			
			});
			
		});

	});

	context('overdue_and_', function test_overdue_and_() {

		['Hard', 'Good', 'Easy'].forEach(function (response) {

			context(response, function () {
				
				const date = new Date();
				const spacing = uSpacingUnseen({
					KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
					KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
					KOMSpacingDueDate: date,
				});
				const chronicle = StubChronicleObjectPrepared({
					KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
					KOMChronicleResponseType: {
						Hard: mod.KOMPlayResponseTypeHard(),
						Good: mod.KOMPlayResponseTypeGood(),
						Easy: mod.KOMPlayResponseTypeEasy(),
					}[response],
				});

				before(function () {
					mod.KOMPlayRespond(StubStateObjectValid({
						KOMPlayStateCurrent: spacing,
					}), chronicle);
				});

				it('updates spacing', function () {
					const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / {
						Hard: mod.KOMPlayResponseIntervalOverdueDivisorHard(),
						Good: mod.KOMPlayResponseIntervalOverdueDivisorGood(),
						Easy: mod.KOMPlayResponseIntervalOverdueDivisorEasy(),
					}[response]) * {
						Hard: mod.KOMPlayResponseMultiplierHard(),
						Good: mod.KOMPlayResponseMultiplierDefault(),
						Easy: mod.KOMPlayResponseMultiplierDefault(),
					}[response] * {
						Hard: 1,
						Good: 1,
						Easy: mod.KOMPlayResponseMultiplierMultiplicandEasy(),
					}[response];
					deepEqual(spacing, uSpacingUnseen({
						KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + {
						Hard: mod.KOMPlayResponseMultiplierSummandHard(),
						Good: mod.KOMPlayResponseMultiplierSummandGood(),
						Easy: mod.KOMPlayResponseMultiplierSummandEasy(),
					}[response],
						KOMSpacingInterval: interval,
						KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
						KOMSpacingChronicles: [StubChronicleObjectPrepared({
							KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
							KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
							KOMChronicleDueDate: spacing.KOMSpacingDueDate,
							KOMChronicleInterval: spacing.KOMSpacingInterval,
							KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
						})],
					}));
				});
			
			});
			
		});

	});

	context('minimum_multiplier', function test_minimum_multiplier() {

		const date = new Date();
		const spacing = uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierMin(),
			KOMSpacingDueDate: date,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(StubStateObjectValid({
				KOMPlayStateCurrent: spacing,
			}), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard()) * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, uSpacingUnseen({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierMin(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: [StubChronicleObjectPrepared({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

	});

});