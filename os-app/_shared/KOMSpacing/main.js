import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

import KOMDeck from '../KOMDeck/main.js';
import KOMCard from '../KOMCard/main.js';
import KOMSharedLogic from '../KOMSharedLogic/main.js';

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

	KOMSpacingModelLabelForward() {
		return 'forward';
	},

	KOMSpacingModelLabelBackward() {
		return 'backward';
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

	KOMSpacingModelErrorsFor (inputData, options = {}) {
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
			if (KOMCard.KOMCardModelErrorsFor(inputData.$KOMSpacingCard)) {
				errors.$KOMSpacingCard = [
					'KOMErrorNotValid',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMSpacingPath (param1, param2) {
		return KOMCard.KOMCardFolderPath(param2) + 'spacing-' + mod.KOMSpacingModelLabel(param1.KOMSpacingID);
	},

	KOMSpacingStub (inputData) {
		const groups = (inputData.match(new RegExp(`(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})\/(?<card>[\\w\.]+)\/spacing-(?<label>(${ mod.KOMSpacingModelLabelForward() }|${ mod.KOMSpacingModelLabelBackward() }))`)) || {}).groups || {};

		return {
			KOMSpacingID: [groups.card, groups.label].join('-'),
		};
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

			if ((item.$KOMSpacingCard || {}).KOMCardIsRetired) {
				coll.KOMSpacingGroupingRetired.push(item);
				
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
			KOMSpacingGroupingRetired: [],
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

export default Object.assign(mod, {
	ZDRSchemaKey: 'KOMSpacing',
	ZDRSchemaDispatchValidate: mod.KOMSpacingModelErrorsFor,
	ZDRSchemaPath: mod.KOMSpacingPath,
	ZDRSchemaStub: mod.KOMSpacingStub,
	ZDRSchemaMethods: {

		KOMSpacingWrite (param1, param2) {
			if (typeof param1 !== 'object' || param1 === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (KOMCard.KOMCardModelErrorsFor(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			return this.App.KOMSpacing.ZDRModelWriteObject(...arguments);
		},

		async KOMSpacingList(inputData) {
			if (KOMCard.KOMCardModelErrorsFor(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			const result = await this.App.ZDRStorageListObjects(KOMCard.KOMCardFolderPath(inputData));

			return {
				KOMCardSpacingForward: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(result['spacing-forward'] || {
					KOMSpacingID: [inputData.KOMCardID, mod.KOMSpacingModelLabelForward()].join('-'),
					KOMSpacingChronicles: [],
				}),
				KOMCardSpacingBackward: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(result['spacing-backward'] || {
					KOMSpacingID: [inputData.KOMCardID, mod.KOMSpacingModelLabelBackward()].join('-'),
					KOMSpacingChronicles: [],
				}),
			};
		},

	},
});
