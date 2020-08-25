import KOMCardModel from '../KOMCard/model.js';
import KOMSharedLogic from '../../_shared/KOMSharedLogic/main.js';

const mod = {

	KOMSpacingModelIdentifier(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.includes('-')) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').shift();
	},

	KOMSpacingModelLabel(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.includes('-')) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').pop();
	},

	KOMSpacingModelLabelForward() {
		return 'forward';
	},

	KOMSpacingModelLabelBackward() {
		return 'backward';
	},

	KOMSpacingModelErrorsFor(inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMSpacingID !== 'string') {
			errors.KOMSpacingID = [
				'KOMErrorNotString',
			];
		} else if (!inputData.KOMSpacingID.includes('-')) {
			errors.KOMSpacingID = [
				'KOMErrorNotSeparated',
			];
		} else if (!mod.KOMSpacingModelIdentifier(inputData.KOMSpacingID)) {
			errors.KOMSpacingID = [
				'KOMErrorNotFilled',
			];
		} else if (![mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward()].includes(mod.KOMSpacingModelLabel(inputData.KOMSpacingID))) {
			errors.KOMSpacingID = [
				'KOMErrorNotLabelled',
			];
		}

		if (!Array.isArray(inputData.KOMSpacingChronicles)) {
			errors.KOMSpacingChronicles = [
				'KOMErrorNotArray',
			];
		}

		if (inputData.KOMSpacingDrawDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMSpacingDrawDate instanceof Date) || Number.isNaN(inputData.KOMSpacingDrawDate.getTime())) {
				errors.KOMSpacingDrawDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMSpacingFlipDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMSpacingFlipDate instanceof Date) || Number.isNaN(inputData.KOMSpacingFlipDate.getTime())) {
				errors.KOMSpacingFlipDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMSpacingDueDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMSpacingDueDate instanceof Date) || Number.isNaN(inputData.KOMSpacingDueDate.getTime())) {
				errors.KOMSpacingDueDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMSpacingIsLearning !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingIsLearning !== 'boolean') {
				errors.KOMSpacingIsLearning = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMSpacingInterval !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingInterval !== 'number') {
				errors.KOMSpacingInterval = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.KOMSpacingMultiplier !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingMultiplier !== 'number') {
				errors.KOMSpacingMultiplier = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.$KOMSpacingCard !== undefined) {
			if (KOMCardModel.KOMCardModelErrorsFor(inputData.$KOMSpacingCard)) {
				errors.$KOMSpacingCard = [
					'KOMErrorNotValid',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMSpacingModelIsBackward(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMSpacingModelLabel(inputData.KOMSpacingID) === mod.KOMSpacingModelLabelBackward();
	},

	KOMSpacingModelIsUnseen(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !inputData.KOMSpacingDueDate;
	},

	KOMSpacingModelIsLearning(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !!inputData.KOMSpacingIsLearning;
	},

	KOMSpacingModelIsReviewing(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMSpacingIsLearning) {
			return false;
		}

		return !!inputData.KOMSpacingInterval;
	},

	KOMSpacingModelMatureThreshold() {
		return 21;
	},

	KOMSpacingModelIsDeveloping(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.KOMSpacingInterval) {
			return false;
		}

		return inputData.KOMSpacingInterval < mod.KOMSpacingModelMatureThreshold();
	},

	KOMSpacingModelIsMature(inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.KOMSpacingInterval) {
			return false;
		}

		return inputData.KOMSpacingInterval >= mod.KOMSpacingModelMatureThreshold();
	},

	KOMSpacingModelFilterUnique(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		let cards = [];
		return inputData.filter(function (e, i, coll) {
			const id = mod.KOMSpacingModelIdentifier(e.KOMSpacingID);

			if (cards.includes(id)) {
				return false;
			}

			cards.push(id);

			return true;
		});
	},

	KOMSpacingModelGroupByStatus(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			coll.KOMSpacingGroupingTotal.push(item);

			if ((item.$KOMSpacingCard || {}).KOMCardIsSuspended) {
				coll.KOMSpacingGroupingSuspended.push(item);
				
				return coll;
			}

			if (mod.KOMSpacingModelIsUnseen(item)) {
				coll.KOMSpacingGroupingUnseen.push(item);
			}

			if (mod.KOMSpacingModelIsDeveloping(item)) {
				coll.KOMSpacingGroupingDeveloping.push(item);
			}

			if (mod.KOMSpacingModelIsMature(item)) {
				coll.KOMSpacingGroupingMature.push(item);
			}
			
			return coll;
		}, {
			KOMSpacingGroupingTotal: [],
			KOMSpacingGroupingUnseen: [],
			KOMSpacingGroupingDeveloping: [],
			KOMSpacingGroupingMature: [],
			KOMSpacingGroupingSuspended: [],
		});
	},

	KOMSpacingModelGroupChroniclesByStatus(param1, param2) {
		if (!Array.isArray(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!param2.match(/\d\d\d\d-\d\d-\d\d/)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return param1.reduce(function (coll, item) {
			const chronicles = item.KOMSpacingChronicles.filter(function (e) {
				return KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) === param2;
			});

			if (chronicles.includes(item.KOMSpacingChronicles[0])) {
				const match = chronicles.find((e) => e.KOMChronicleInterval);
				coll.KOMChronicleGroupingLearning.push(...chronicles.splice(0, match ? chronicles.indexOf(match) : chronicles.length));
			}

			coll.KOMChronicleGroupingDeveloping.push(...chronicles.filter(function (e) {
				return e.KOMChronicleInterval < mod.KOMSpacingModelMatureThreshold();
			}));

			coll.KOMChronicleGroupingMature.push(...chronicles.filter(function (e) {
				return e.KOMChronicleInterval >= mod.KOMSpacingModelMatureThreshold();
			}));

			coll.KOMChronicleGroupingRelearning.push(...chronicles.filter(function (e) {
				return !e.KOMChronicleInterval;
			}));

			return coll;
		}, {
			KOMChronicleGroupingLearning: [],
			KOMChronicleGroupingRelearning: [],
			KOMChronicleGroupingDeveloping: [],
			KOMChronicleGroupingMature: [],
		});
	},

};

export default mod;
