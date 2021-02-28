import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

import KOMDeck from '../KOMDeck/main.js';

const mod = {

	KOMCardModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMCardID !== 'string') {
			errors.KOMCardID = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMCardID.trim() === '') {
			errors.KOMCardID = [
				'KOMErrorNotFilled',
			];
		}

		if (typeof inputData.KOMCardDeckID !== 'string') {
			errors.KOMCardDeckID = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMCardDeckID.trim() === '') {
			errors.KOMCardDeckID = [
				'KOMErrorNotFilled',
			];
		}

		if (typeof inputData.KOMCardFrontText !== 'string') {
			errors.KOMCardFrontText = [
				'KOMErrorNotString',
			];
		}

		if (typeof inputData.KOMCardRearText !== 'string') {
			errors.KOMCardRearText = [
				'KOMErrorNotString',
			];
		}

		if (!(inputData.KOMCardCreationDate instanceof Date) || Number.isNaN(inputData.KOMCardCreationDate.getTime())) {
			errors.KOMCardCreationDate = [
				'KOMErrorNotDate',
			];
		}

		if (!(inputData.KOMCardModificationDate instanceof Date) || Number.isNaN(inputData.KOMCardModificationDate.getTime())) {
			errors.KOMCardModificationDate = [
				'KOMErrorNotDate',
			];
		}

		if (inputData.KOMCardNotes !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardNotes !== 'string') {
				errors.KOMCardNotes = [
					'KOMErrorNotString',
				];
			}
		}

		if (inputData.KOMCardFrontAudio !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardFrontAudio !== 'boolean') {
				errors.KOMCardFrontAudio = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardRearAudio !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardRearAudio !== 'boolean') {
				errors.KOMCardRearAudio = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardTags !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!Array.isArray(inputData.KOMCardTags)) {
				errors.KOMCardTags = [
					'KOMErrorNotArray',
				];
			}
		}

		if (inputData.KOMCardIsRetired !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardIsRetired !== 'boolean') {
				errors.KOMCardIsRetired = [
					'KOMErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMCardModelAudioFields() {
		return [
			'KOMCardFrontAudio',
			'KOMCardRearAudio',
		];
	},

	KOMCardDirectory () {
		return 'kom_cards';
	},

	KOMCardFolderPath (inputData) {
		return [
			KOMDeck.KOMDeckFolderPath({
				KOMDeckID: inputData.KOMCardDeckID,
			}) + mod.KOMCardDirectory(),
			inputData.KOMCardCreationDate.toJSON().split('T').shift(),
			inputData.KOMCardID,
		].join('/') + '/';
	},

	KOMCardObjectPath (inputData) {
		return mod.KOMCardFolderPath(inputData) + 'main';
	},

	KOMCardStub (inputData) {
		const groups = (inputData.match(new RegExp(`\/(?<deck>[\\w\.]+)\/${ mod.KOMCardDirectory() }\/(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2})\/(?<card>[\\w\.]+)\/main`)) || {}).groups || {};

		return {
			KOMCardID: groups.card,
			KOMCardDeckID: groups.deck,
			KOMCardCreationDate: new Date(groups.date || Date.now()),
		};
	},

	KOMCardSideFront() {
		return 'front';
	},

	KOMCardSideRear() {
		return 'rear';
	},

	KOMCardSides() {
		return [
			mod.KOMCardSideFront(),
			mod.KOMCardSideRear(),
		];
	},

	KOMCardSide(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.includes('-')) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').pop();
	},

	KOMCardSideFolderPath(param1, param2) {
		if (mod.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMCardSides().includes(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMCardFolderPath(param1) + 'side-' + param2 + '/';
	},

	KOMCardSideAudioPath(param1, param2) {
		if (mod.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMCardSides().includes(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMCardSideFolderPath(param1, param2) + 'audio';
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'KOMCard',
	ZDRSchemaDispatchValidate: mod.KOMCardModelErrorsFor,
	ZDRSchemaPath: mod.KOMCardObjectPath,
	ZDRSchemaStub: mod.KOMCardStub,
	ZDRSchemaMethods: {
		
		KOMCardCreate (param1, param2) {
			if (typeof param1 !== 'object' || param1 === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (KOMDeck.KOMDeckModelErrorsFor(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			const KOMCardCreationDate = new Date();

			return this.App.KOMCard.ZDRModelWriteObject(Object.assign(param1, Object.assign({
				KOMCardID: uniqueID(),
				KOMCardDeckID: param2.KOMDeckID,
				KOMCardCreationDate,
				KOMCardModificationDate: KOMCardCreationDate,
			}, param1)));
		},

		KOMCardUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			return this.App.KOMCard.ZDRModelWriteObject(Object.assign(inputData, {
				KOMCardModificationDate: new Date(),
			}));
		},

		async KOMCardList (inputData) {
			if (KOMDeck.KOMDeckModelErrorsFor(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}
			
			const _this = this;

			return Promise.all((await _this.App.ZDRStoragePathsRecursive(KOMDeck.KOMDeckFolderPath(inputData) + mod.KOMCardDirectory())).filter(function (e) {
				return e === mod.KOMCardObjectPath(mod.KOMCardStub(e));
			}).map(async function (e) {
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(await _this.App.ZDRStorageReadObject(e));
			}));
		},

		async KOMCardDelete (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (mod.KOMCardModelErrorsFor(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			await Promise.all((await this.App.ZDRStoragePathsRecursive(mod.KOMCardFolderPath(inputData))).map(this.App.ZDRStorageDelete));

			return inputData;
		},

		async KOMCardAudioCapture (param1, param2, param3) {
			if (mod.KOMCardModelErrorsFor(param1)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!mod.KOMCardSides().includes(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!param3) {
				throw new Error('KOMErrorInputNotValid');
			}

			await this.App.ZDRStorageWriteFile(mod.KOMCardSideAudioPath(param1, param2), typeof global !== 'undefined' && global.ZDRTestingWrap ? param3 : await new Promise(function (res, rej) {
					const reader = new FileReader();

					reader.onload = function () {
						res(reader.result);
					};

					reader.readAsArrayBuffer(param1);
				}), param3.type);

			return Object.assign(param1, {
				[param2 === mod.KOMCardSideFront() ? 'KOMCardFrontAudio' : 'KOMCardRearAudio']: true,
			});
		},

		KOMCardAudioFetch (param1, param2) {
			if (mod.KOMCardModelErrorsFor(param1)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!mod.KOMCardSides().includes(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			return this.App.ZDRStorageReadFile(mod.KOMCardSideAudioPath(param1, param2)).then(function (file) {
				if (!file.data) {
					return null;
				}

				return new Blob([file.data], {
					type: file.contentType
				});
			});
		},

		async KOMCardAudioList (inputData) {
			if (mod.KOMCardModelErrorsFor(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			return mod.KOMCardModelAudioFields().reduce(function (coll, item) {
				if (!coll[item]) {
					delete coll[item];
				}

				return coll;
			}, {
				KOMCardFrontAudio: await this.App.KOMCard.KOMCardAudioFetch(inputData, mod.KOMCardSideFront()),
				KOMCardRearAudio: await this.App.KOMCard.KOMCardAudioFetch(inputData, mod.KOMCardSideRear()),
			});
		},

		async KOMCardAudioClear (param1, param2) {
			if (mod.KOMCardModelErrorsFor(param1)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!mod.KOMCardSides().includes(param2)) {
				throw new Error('KOMErrorInputNotValid');
			}

			await this.App.ZDRStorageDelete(mod.KOMCardSideAudioPath(param1, param2));

			delete param1[param2 === mod.KOMCardSideFront() ? 'KOMCardFrontAudio' : 'KOMCardRearAudio'];

			return param1;
		},

	},
});
