import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKMoment from 'OLSKMoment';

import KOMCard from '../KOMCard/main.js';

const mod = {

	KOMSpacingIdentifier(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.includes('-')) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').shift();
	},

	KOMSpacingLabelForward() {
		return 'forward';
	},

	KOMSpacingLabelBackward() {
		return 'backward';
	},

	KOMSpacingLabel(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.includes('-')) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').pop();
	},

	KOMSpacingErrors (inputData, options = {}) {
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
		} else if (!mod.KOMSpacingIdentifier(inputData.KOMSpacingID)) {
			errors.KOMSpacingID = [
				'KOMErrorNotFilled',
			];
		} else if (![mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward()].includes(mod.KOMSpacingLabel(inputData.KOMSpacingID))) {
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

		if (inputData.KOMSpacingIsLapsing !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingIsLapsing !== 'boolean') {
				errors.KOMSpacingIsLapsing = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMSpacingLapseCount !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingLapseCount !== 'number') {
				errors.KOMSpacingLapseCount = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.$KOMSpacingCard !== undefined) {
			if (KOMCard.KOMCardErrors(inputData.$KOMSpacingCard)) {
				errors.$KOMSpacingCard = [
					'KOMErrorNotValid',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMSpacingPath (param1, param2) {
		return KOMCard.KOMCardFolderPath(param1.$KOMSpacingCard || param2) + 'spacing-' + mod.KOMSpacingLabel(param1.KOMSpacingID);
	},

	KOMSpacingStub (inputData) {
		const groups = (inputData.match(new RegExp(`\/(?<deck>[\\w\.]+)\/${ KOMCard.KOMCardDirectory() }\/(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2})\/(?<card>[\\w\.]+)\/spacing-(?<label>(${ mod.KOMSpacingLabelForward() }|${ mod.KOMSpacingLabelBackward() }))`)) || {}).groups || {};

		return {
			KOMSpacingID: [groups.card, groups.label].join('-'),
			$KOMSpacingCard: {
				KOMCardID: groups.card,
				KOMCardCreationDate: new Date(groups.date || Date.now()),
			},
		};
	},

	KOMSpacingIsBackward(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMSpacingLabel(inputData.KOMSpacingID) === mod.KOMSpacingLabelBackward();
	},

	KOMSpacingIsUnseen(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMSpacingIsLapsing) {
			return false;
		}

		if (mod.KOMSpacingIsLearning(inputData)) {
			return true;
		}

		return !inputData.KOMSpacingDueDate;
	},

	KOMSpacingIsLearning(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !!inputData.KOMSpacingIsLearning;
	},

	KOMSpacingIsReviewing(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMSpacingIsLearning) {
			return false;
		}

		return !!inputData.KOMSpacingInterval;
	},

	KOMSpacingMatureThreshold() {
		return 21;
	},

	KOMSpacingIsDeveloping(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.KOMSpacingInterval) {
			return false;
		}

		return inputData.KOMSpacingInterval < mod.KOMSpacingMatureThreshold();
	},

	KOMSpacingIsMature(inputData) {
		if (mod.KOMSpacingErrors(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.KOMSpacingInterval) {
			return false;
		}

		return inputData.KOMSpacingInterval >= mod.KOMSpacingMatureThreshold();
	},

	KOMSpacingFilterUnique(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		let cards = [];
		return inputData.filter(function (e, i, coll) {
			const id = mod.KOMSpacingIdentifier(e.KOMSpacingID);

			if (cards.includes(id)) {
				return false;
			}

			cards.push(id);

			return true;
		});
	},

	KOMSpacingByStatus(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			coll.KOMSpacingGroupingTotal.push(item);

			if ((item.$KOMSpacingCard || {}).KOMCardIsRetired) {
				coll.KOMSpacingGroupingRetired.push(item);
				
				return coll;
			}

			if (mod.KOMSpacingIsUnseen(item)) {
				coll.KOMSpacingGroupingUnseen.push(item);
			}

			if (mod.KOMSpacingIsDeveloping(item)) {
				coll.KOMSpacingGroupingDeveloping.push(item);
			}

			if (mod.KOMSpacingIsMature(item)) {
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

	KOMSpacingChroniclesByStatus(param1, param2) {
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
				return OLSKMoment.OLSKMomentPerceptionDay(e.KOMChronicleResponseDate) === param2;
			});

			if (chronicles.includes(item.KOMSpacingChronicles[0])) {
				const match = chronicles.find((e) => e.KOMChronicleInterval);
				coll.KOMChronicleGroupingLearning.push(...chronicles.splice(0, match ? chronicles.indexOf(match) : chronicles.length));
			}

			coll.KOMChronicleGroupingDeveloping.push(...chronicles.filter(function (e) {
				return e.KOMChronicleInterval < mod.KOMSpacingMatureThreshold();
			}));

			coll.KOMChronicleGroupingMature.push(...chronicles.filter(function (e) {
				return e.KOMChronicleInterval >= mod.KOMSpacingMatureThreshold();
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
	ZDRSchemaDispatchValidate: mod.KOMSpacingErrors,
	ZDRSchemaPath: mod.KOMSpacingPath,
	ZDRSchemaStub: mod.KOMSpacingStub,
	ZDRSchemaMethods: {

		KOMSpacingWrite (param1, param2) {
			if (typeof param1 !== 'object' || param1 === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (KOMCard.KOMCardErrors(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			return this.App.KOMSpacing.ZDRModelWriteObject(...arguments);
		},

		async KOMSpacingList(inputData) {
			if (KOMCard.KOMCardErrors(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			const result = await this.App.ZDRStorageListingObjects(KOMCard.KOMCardFolderPath(inputData));

			return {
				KOMCardSpacingForward: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(result['spacing-forward'] || {
					KOMSpacingID: [inputData.KOMCardID, mod.KOMSpacingLabelForward()].join('-'),
					KOMSpacingChronicles: [],
				}),
				KOMCardSpacingBackward: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(result['spacing-backward'] || {
					KOMSpacingID: [inputData.KOMCardID, mod.KOMSpacingLabelBackward()].join('-'),
					KOMSpacingChronicles: [],
				}),
			};
		},

		KOMSpacingIsBackward: mod.KOMSpacingIsBackward,

	},
});
