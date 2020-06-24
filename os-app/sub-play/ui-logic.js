import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const kIntervalAgainSeconds = 60;
const kIntervalLearnMinutes = 10;
const kIntervalDefaultDays = 1;
const kIntervalEasyDays = 4;
const kIntervalOverdueDivisorHard = 4;
const kIntervalOverdueDivisorGood = 2;
const kIntervalOverdueDivisorEasy = 1;
const kMultiplierDefault = 2.5;
const kMultiplierMin = 1.3;
const kMultiplierHard = 1.2;
const kMultiplierSummandFail = -0.2;
const kMultiplierSummandGood = 0;
const kMultiplierSummandHard = -0.15;
const kMultiplierSummandEasy = 0.15;
const kMultiplierMultiplicandEasy = 1.3;

const mod = {

	KOMPlayDayGrouping (inputData) {
		if (!(inputData instanceof Date) || Number.isNaN(inputData.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		return (new Date(inputData.valueOf() - (inputData.getTimezoneOffset() / 60 + 4) * 1000 * 60 * 60)).toJSON().slice(0, 10);
	},

	KOMPlaySort (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		let reviewAll = [];

		const reviewForward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsBackward(e) && e.KOMSpacingDueDate;
		}));

		reviewAll.push(...reviewForward);

		let reviewBackward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIsBackward(e) && e.KOMSpacingDueDate;
		}));

		let reviewTrialCount = 0;
		while (reviewForward.length && reviewBackward.length && KOMSpacingModel.KOMSpacingModelIdentifier(reviewForward.slice(-1).pop().KOMSpacingID) === KOMSpacingModel.KOMSpacingModelIdentifier(reviewBackward[0].KOMSpacingID) && reviewTrialCount < inputData.length) {
			reviewBackward = mod._KOMPlaySortShuffle(reviewBackward);

			reviewTrialCount++;
		}

		reviewAll.push(...reviewBackward);

		const unseenAll = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsBackward(e) && !e.KOMSpacingDueDate;
		}));

		let unseenBackward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIsBackward(e) && !e.KOMSpacingDueDate;
		}));

		let unseenTrialCount = 0;
		while (unseenAll.length && unseenBackward.length && KOMSpacingModel.KOMSpacingModelIdentifier(unseenAll.slice(-1).pop().KOMSpacingID) === KOMSpacingModel.KOMSpacingModelIdentifier(unseenBackward[0].KOMSpacingID) && unseenTrialCount < inputData.length) {
			unseenBackward = mod._KOMPlaySortShuffle(unseenBackward);

			unseenTrialCount++;
		}

		unseenAll.push(...unseenBackward);

		if (!reviewAll.length) {
			return unseenAll;
		}

		const lastIndex = reviewAll.length - 1;
		const width = Math.floor(reviewAll.length / (unseenAll.length + 1));

		return unseenAll.reduce(function (coll, item, index) {
			coll.splice(lastIndex - width * (index + 1), 0, item);
			
			return coll;
		}, reviewAll.reverse()).reverse();
	},

	//How to randomize (shuffle) a JavaScript array? - Stack Overflow https://stackoverflow.com/a/12646864
	_KOMPlaySortShuffle(inputData) {
		for (let i = inputData.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[inputData[i], inputData[j]] = [inputData[j], inputData[i]];
		}

		return inputData;
	},

	KOMPlayStateIsValid (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(inputData.KOMPlayStateQueue)) {
			return false;
		}

		if (!Array.isArray(inputData.KOMPlayStateWait)) {
			return false;
		}

		if (inputData.KOMPlayStateCurrent && KOMSpacingModel.KOMSpacingModelErrorsFor(inputData.KOMPlayStateCurrent)) {
			return false;
		}

		if (inputData.KOMPlayStateShouldRandomize !== undefined) {
			if (typeof inputData.KOMPlayStateShouldRandomize !== 'boolean') {
				return false;
			}
		}

		return true;
	},

	KOMPlayResponseTypeAgain () {
		return 'RESPONSE_AGAIN';
	},

	KOMPlayResponseTypeHard () {
		return 'RESPONSE_HARD';
	},

	KOMPlayResponseTypeGood () {
		return 'RESPONSE_GOOD';
	},

	KOMPlayResponseTypeEasy () {
		return 'RESPONSE_EASY';
	},

	KOMPlayResponseTypes () {
		return [
			mod.KOMPlayResponseTypeAgain(),
			mod.KOMPlayResponseTypeHard(),
			mod.KOMPlayResponseTypeGood(),
			mod.KOMPlayResponseTypeEasy(),
		];
	},

	KOMPlayResponseIntervalAgain () {
		return 1000 * kIntervalAgainSeconds;
	},

	KOMPlayResponseIntervalLearn () {
		return 1000 * 60 * kIntervalLearnMinutes;
	},

	KOMPlayResponseIntervalGraduateDefault () {
		return kIntervalDefaultDays;
	},

	KOMPlayResponseIntervalGraduateEasy () {
		return kIntervalEasyDays;
	},

	KOMPlayResponseIntervalOverdueDivisorHard () {
		return kIntervalOverdueDivisorHard;
	},

	KOMPlayResponseIntervalOverdueDivisorGood () {
		return kIntervalOverdueDivisorGood;
	},

	KOMPlayResponseIntervalOverdueDivisorEasy () {
		return kIntervalOverdueDivisorEasy;
	},

	KOMPlayResponseIntervalOverdueDays (spacing, chronicle) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(spacing)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMChronicleIsPrepared(chronicle)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!spacing.KOMSpacingInterval) {
			return 0;
		}

		const due = new Date(mod.KOMPlayDayGrouping(spacing.KOMSpacingDueDate)).valueOf();
		const date = new Date(mod.KOMPlayDayGrouping(chronicle.KOMChronicleResponseDate)).valueOf();

		if (date <= due) {
			return 0;
		}

		return (date - due) / 1000 / 60 / 60 / 24;
	},

	KOMPlayResponseIntervalOverdueBonus (spacing, chronicle) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(spacing)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMChronicleIsPrepared(chronicle)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const days = mod.KOMPlayResponseIntervalOverdueDays(spacing, chronicle);

		if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeHard()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorHard();
		}

		if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeGood()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorGood();
		}

		if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeEasy()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorEasy();
		}

		return 0;
	},

	KOMPlayResponseMultiplierDefault () {
		return kMultiplierDefault;
	},

	KOMPlayResponseMultiplierMin () {
		return kMultiplierMin;
	},

	KOMPlayResponseMultiplierHard () {
		return kMultiplierHard;
	},

	KOMPlayResponseMultiplierSummandFail () {
		return kMultiplierSummandFail;
	},

	KOMPlayResponseMultiplierSummandGood () {
		return kMultiplierSummandGood;
	},

	KOMPlayResponseMultiplierSummandHard () {
		return kMultiplierSummandHard;
	},

	KOMPlayResponseMultiplierSummandEasy () {
		return kMultiplierSummandEasy;
	},

	KOMPlayResponseMultiplierMultiplicandEasy () {
		return kMultiplierMultiplicandEasy;
	},

	KOMPlayRespond (state, chronicle) {
		if (!mod.KOMPlayStateIsValid(state)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMChronicleIsPrepared(chronicle)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const spacing = state.KOMPlayStateCurrent;

		Object.assign(spacing, (function update_spacing() {
			const lastResponseWasAgain = KOMSpacingModel.KOMSpacingModelIsLearning(spacing) && spacing.KOMSpacingChronicles.slice(-1).pop().KOMChronicleResponseType === mod.KOMPlayResponseTypeAgain();

			// GRADUATE
			if (!KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeEasy() || (KOMSpacingModel.KOMSpacingModelIsLearning(spacing) && chronicle.KOMChronicleResponseType !== mod.KOMPlayResponseTypeAgain() && !lastResponseWasAgain))) {
				delete spacing.KOMSpacingIsLearning;

				const interval = chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeEasy() ? mod.KOMPlayResponseIntervalGraduateEasy() : mod.KOMPlayResponseIntervalGraduateDefault();
				return {
					KOMSpacingInterval: interval,
					KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
					KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// REVIEW
			if (KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && chronicle.KOMChronicleResponseType !== mod.KOMPlayResponseTypeAgain()) {
				let interval = (spacing.KOMSpacingInterval + mod.KOMPlayResponseIntervalOverdueBonus(spacing, chronicle)) * (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeHard() ? mod.KOMPlayResponseMultiplierHard() : spacing.KOMSpacingMultiplier);

				if (state.KOMPlayStateShouldRandomize) {
					interval *= 1 + (Math.min(0.25, Math.random()) / 100 + 0.005) * (Math.random() > 0.5 ? -1 : 1);
				}

				if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeEasy()) {
					interval *= mod.KOMPlayResponseMultiplierMultiplicandEasy();
				}

				let multiplier = spacing.KOMSpacingMultiplier;

				if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeHard()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandHard();
				}

				if (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeEasy()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandEasy();
				}

				return {
					KOMSpacingInterval: interval,
					KOMSpacingMultiplier: Math.max(mod.KOMPlayResponseMultiplierMin(), multiplier),
					KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// LAPSE
			if (KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeAgain()) {
				delete spacing.KOMSpacingInterval;

				spacing.KOMSpacingMultiplier += mod.KOMPlayResponseMultiplierSummandFail();
			}

			// LEARN
			return {
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + (chronicle.KOMChronicleResponseType === mod.KOMPlayResponseTypeAgain() ? mod.KOMPlayResponseIntervalAgain() : mod.KOMPlayResponseIntervalLearn())),
			};
		})());

		spacing.KOMSpacingChronicles.push(Object.assign(chronicle, {
			KOMChronicleDueDate: spacing.KOMSpacingDueDate,
		}, spacing.KOMSpacingIsLearning ? {
			KOMChronicleIsLearning: true,
		} : {}, spacing.KOMSpacingIsLearning ? {} : {
			KOMChronicleInterval: spacing.KOMSpacingInterval,
			KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
		}));

		(function update_state() {
			if (KOMSpacingModel.KOMSpacingModelIsLearning(spacing)) {
				state.KOMPlayStateWait.push(spacing);
			}

			state.KOMPlayStateWait.filter(function (e) {
				if (!state.KOMPlayStateQueue.length) {
					return true;
				}

				return e.KOMSpacingDueDate < chronicle.KOMChronicleResponseDate;
			}).reverse().forEach(function (e) {
				state.KOMPlayStateQueue.unshift(state.KOMPlayStateWait.splice(state.KOMPlayStateWait.indexOf(e), 1).pop());
			});

			state.KOMPlayStateCurrent = state.KOMPlayStateQueue.shift();
		})();

		return state;
	},

	KOMChronicleIsPrepared (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!(inputData.KOMChronicleDrawDate instanceof Date) || Number.isNaN(inputData.KOMChronicleDrawDate.getTime())) {
			return false;
		}

		if (!(inputData.KOMChronicleFlipDate instanceof Date) || Number.isNaN(inputData.KOMChronicleFlipDate.getTime())) {
			return false;
		}

		if (!(inputData.KOMChronicleResponseDate instanceof Date) || Number.isNaN(inputData.KOMChronicleResponseDate.getTime())) {
			return false;
		}

		if (!mod.KOMPlayResponseTypes().includes(inputData.KOMChronicleResponseType)) {
			return false;
		}

		return true;
	},

	KOMChronicleIsValid (inputData) {
		if (!mod.KOMChronicleIsPrepared(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!(inputData.KOMChronicleDueDate instanceof Date) || Number.isNaN(inputData.KOMChronicleDueDate.getTime())) {
			return false;
		}

		if (inputData.KOMChronicleIsLearning !== undefined) {
			if (typeof inputData.KOMChronicleIsLearning !== 'boolean') {
				return false;
			}
		}

		if (inputData.KOMChronicleIsReadyToGraduate !== undefined) {
			if (typeof inputData.KOMChronicleIsReadyToGraduate !== 'boolean') {
				return false;
			}
		}

		if (inputData.KOMChronicleInterval !== undefined) {
			if (typeof inputData.KOMChronicleInterval !== 'number') {
				return false;
			}
		}

		if (inputData.KOMChronicleMultiplier !== undefined) {
			if (typeof inputData.KOMChronicleMultiplier !== 'number') {
				return false;
			}
		}

		if (inputData.KOMChronicleDidDrawMultipleTimes !== undefined) {
			if (typeof inputData.KOMChronicleDidDrawMultipleTimes !== 'boolean') {
				return false;
			}
		}

		if (inputData.KOMChronicleDidFlipMultipleTimes !== undefined) {
			if (typeof inputData.KOMChronicleDidFlipMultipleTimes !== 'boolean') {
				return false;
			}
		}

		return true;
	},

	KOMChronicleGenerateDraw (param1, param2) {
		if (!(param1 instanceof Date) || Number.isNaN(param1.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMSpacingModel.KOMSpacingModelErrorsFor(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return Object.assign({
			KOMChronicleDrawDate: param1,
		}, param2.KOMSpacingDrawDate && KOMSpacingModel.KOMSpacingModelIsReviewing(param2) && mod.KOMPlayDayGrouping(param1) === mod.KOMPlayDayGrouping(param2.KOMSpacingDrawDate) ? {
			KOMChronicleDidDrawMultipleTimes: true,
		} : {})
	},

	KOMChronicleGenerateFlip (param1, param2) {
		if (!(param1 instanceof Date) || Number.isNaN(param1.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMSpacingModel.KOMSpacingModelErrorsFor(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return Object.assign({
			KOMChronicleFlipDate: param1,
		}, param2.KOMSpacingFlipDate && KOMSpacingModel.KOMSpacingModelIsReviewing(param2) && mod.KOMPlayDayGrouping(param1) === mod.KOMPlayDayGrouping(param2.KOMSpacingFlipDate) ? {
			KOMChronicleDidFlipMultipleTimes: true,
		} : {})
	},

	KOMPlayUndo (inputData) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.KOMSpacingChronicles.length) {
			throw new Error('KOMErrorInputNotValid');
		}

		Object.keys(inputData).forEach(function (e) {
			if (['KOMSpacingID', 'KOMSpacingChronicles', 'KOMSpacingDrawDate', 'KOMSpacingFlipDate'].includes(e)) {
				return;
			}

			if (e[0] === '$') {
				return;
			}

			delete inputData[e];
		});

		inputData.KOMSpacingChronicles.pop();

		const item = inputData.KOMSpacingChronicles.slice(-1).pop();
		Object.keys(item || {}).forEach(function (e) {
			if (['KOMChronicleResponseDate', 'KOMChronicleResponseType'].includes(e)) {
				return;
			}

			inputData[e.replace('KOMChronicle', 'KOMSpacing')] = item[e];
		});

		return inputData;
	},

};

export default mod;
