const { throws, deepEqual, notDeepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const uRepeat = function (param1, param2) {
	return Array.from(new Array(param1)).map(param2);
};

describe('KOMPlayRespond', function test_KOMPlayRespond() {

	const uState = function (KOMPlayStateCurrent, KOMPlayStateQueue = []) {
		return StubStateObjectValid({
			KOMPlayStateCurrent,
			KOMPlayStateQueue,
		});
	};

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
		const item = uState(StubSpacingObjectValid2());
		deepEqual(mod.KOMPlayRespond(item, StubChronicleObjectPrepared()) === item, true);
	});

	context('param2', function () {

		const spacing = StubSpacingObjectValid2();
		const chronicle = StubChronicleObjectPrepared();

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('adds to KOMSpacingChronicles', function () {
			deepEqual(spacing.KOMSpacingChronicles[0] === chronicle, true);
		});

	});

	context('KOMPlayStateCurrent', function () {

		it('sets to null if queue empty', function () {
			deepEqual(mod.KOMPlayRespond(uState(StubSpacingObjectValid2()), StubChronicleObjectPrepared()), StubStateObjectValid({
				KOMPlayStateCurrent: null,
			}));
		});

		it('sets to first in queue', function () {
			const item = StubSpacingObjectValid2();
			deepEqual(mod.KOMPlayRespond(uState(StubSpacingObjectValid2(), [item]), StubChronicleObjectPrepared()).KOMPlayStateCurrent === item, true);
		});

	});

	context('KOMPlayStateWait', function () {

		const uWait = function (inputData) {
			return Object.assign(uState(StubSpacingObjectValid2(), [StubSpacingObjectValid2()]), {
				KOMPlayStateWait: [StubSpacingObjectValid2({
					KOMSpacingDueDate: new Date(StubChronicleObjectValid2().KOMChronicleResponseDate.valueOf() + inputData),
				})],
			});
		};

		it('moves to queue if overdue', function () {
			const state = uWait(-1000);
			const queue = state.KOMPlayStateQueue.slice();
			const first = state.KOMPlayStateWait.slice()[0];
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectPrepared()), Object.assign(uWait(-1000), {
				KOMPlayStateCurrent: first,
				KOMPlayStateQueue: queue,
				KOMPlayStateWait: [],
			}));
		});

		it('moves to queue if queue empty', function () {
			const state = Object.assign(uWait(1000), {
				KOMPlayStateQueue: [],
			});
			const wait = (state.KOMPlayStateWait = state.KOMPlayStateWait.concat(state.KOMPlayStateWait.slice())).slice();
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectPrepared()), Object.assign(uWait(1000), {
				KOMPlayStateCurrent: wait[0],
				KOMPlayStateQueue: wait.slice(1),
				KOMPlayStateWait: [],
			}));
		});

		it('does nothing', function () {
			const state = uWait(1000);
			const first = state.KOMPlayStateQueue[0];
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectValid2()), Object.assign(uWait(1000), {
				KOMPlayStateCurrent: first,
				KOMPlayStateQueue: [],
			}));
		});

	});

	context('KOMPlayStateShouldRandomizeDueDates', function () {

		const uIntervals = function (param1, param2 = 0) {
			return uRepeat(10, function () {
				const date = new Date();
				const spacing = StubSpacingObjectValid2();
				const state = Object.assign(uState(spacing), {
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

	context('unseen_and_Again', function test_unseen_and_Again() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [StubChronicleObjectPrepared({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Hard', function test_unseen_and_Hard() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: [StubChronicleObjectPrepared({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Good', function test_unseen_and_Good() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: [StubChronicleObjectPrepared({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Easy', function test_unseen_and_Easy() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing);
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
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
			}));
		});

	});

	context('learning_and_Again', function test_learning_and_Again() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('learning_after_Again', function test_learning_after_Again() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('graduate_Hard', function test_graduate_Hard() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
		let chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
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
				KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
			}));
		});

	});

	context('graduate_Good', function test_graduate_Good() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
			}));
		});

	});

	context('graduate_Fail', function test_graduate_Fail() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('reviewing_and_Again', function test_reviewing_and_Again() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
			deepEqual(spacing, StubSpacingObjectValid2({
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('reviewing_and_Hard', function test_reviewing_and_Hard() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
				KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandHard(),
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('reviewing_and_Good', function test_reviewing_and_Good() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierDefault();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandGood(),
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('reviewing_and_Easy', function test_reviewing_and_Easy() {

		const spacing = StubSpacingObjectValid2();
		const state = uState(spacing, [StubSpacingObjectValid2()]);
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
				KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierDefault() * mod.KOMPlayResponseMultiplierMultiplicandEasy();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandEasy(),
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
				KOMPlayStateCurrent: StubSpacingObjectValid2(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('overdue_and_Hard', function test_overdue_and_Hard() {

		const date = new Date();
		const spacing = StubSpacingObjectValid2({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard()) * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandHard(),
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

	context('overdue_and_Good', function test_overdue_and_Good() {

		const date = new Date();
		const spacing = StubSpacingObjectValid2({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorGood()) * mod.KOMPlayResponseMultiplierDefault();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandGood(),
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

	context('overdue_and_Easy', function test_overdue_and_Easy() {

		const date = new Date();
		const spacing = StubSpacingObjectValid2({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorEasy()) * mod.KOMPlayResponseMultiplierDefault() * mod.KOMPlayResponseMultiplierMultiplicandEasy();
			deepEqual(spacing, StubSpacingObjectValid2({
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandEasy(),
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

	context('minimum_multiplier', function test_minimum_multiplier() {

		const date = new Date();
		const spacing = StubSpacingObjectValid2({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierMin(),
			KOMSpacingDueDate: date,
		});
		const chronicle = StubChronicleObjectPrepared({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard()) * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, StubSpacingObjectValid2({
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