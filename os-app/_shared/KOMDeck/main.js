import { ulid } from 'ulid';
const uniqueID = ulid;
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	KOMDeckErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMDeckID !== 'string') {
			errors.KOMDeckID = [
				'KOMErrorNotString',
			];
		} else if (!inputData.KOMDeckID.trim()) {
			errors.KOMDeckID = [
				'KOMErrorNotFilled',
			];
		}

		if (typeof inputData.KOMDeckName !== 'string') {
			errors.KOMDeckName = [
				'KOMErrorNotString',
			];
		}

		if (!(inputData.KOMDeckCreationDate instanceof Date) || Number.isNaN(inputData.KOMDeckCreationDate.getTime())) {
			errors.KOMDeckCreationDate = [
				'KOMErrorNotDate',
			];
		}

		if (!(inputData.KOMDeckModificationDate instanceof Date) || Number.isNaN(inputData.KOMDeckModificationDate.getTime())) {
			errors.KOMDeckModificationDate = [
				'KOMErrorNotDate',
			];
		}

		if (inputData.KOMDeckAudioIsEnabled !== undefined) {
			if (typeof inputData.KOMDeckAudioIsEnabled !== 'boolean') {
				errors.KOMDeckAudioIsEnabled = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckFrontSpeechIsEnabled !== undefined) {
			if (typeof inputData.KOMDeckFrontSpeechIsEnabled !== 'boolean') {
				errors.KOMDeckFrontSpeechIsEnabled = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckRearSpeechIsEnabled !== undefined) {
			if (typeof inputData.KOMDeckRearSpeechIsEnabled !== 'boolean') {
				errors.KOMDeckRearSpeechIsEnabled = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckFrontLanguageCode !== undefined) {
			if (typeof inputData.KOMDeckFrontLanguageCode !== 'string') {
				errors.KOMDeckFrontLanguageCode = [
					'KOMErrorNotString',
				];
			}
		}

		if (inputData.KOMDeckRearLanguageCode !== undefined) {
			if (typeof inputData.KOMDeckRearLanguageCode !== 'string') {
				errors.KOMDeckRearLanguageCode = [
					'KOMErrorNotString',
				];
			}
		}

		if (inputData.KOMDeckRetireCardsMonths !== undefined) {
			const error = (function() {
				if (typeof inputData.KOMDeckRetireCardsMonths !== 'number') {
					return [
						'KOMErrorNotNumber',
					];
				}

				if (parseInt(inputData.KOMDeckRetireCardsMonths) !== inputData.KOMDeckRetireCardsMonths) {
					return [
						'KOMErrorNotInteger',
					];
				}

				if (inputData.KOMDeckRetireCardsMonths < 0) {
					return [
						'KOMErrorNotValid',
					];
				}
			})();

			if (error) {
				errors.KOMDeckRetireCardsMonths = error;
			};
		}

		if (inputData.KOMDeckIsForwardOnly !== undefined) {
			if (typeof inputData.KOMDeckIsForwardOnly !== 'boolean') {
				errors.KOMDeckIsForwardOnly = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckPairingIsEnabled !== undefined) {
			if (typeof inputData.KOMDeckPairingIsEnabled !== 'boolean') {
				errors.KOMDeckPairingIsEnabled = [
					'KOMErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},
	
	KOMDeckDirectory () {
		return 'kom_decks';
	},

	KOMDeckFolderPath (inputData) {
		return `${ mod.KOMDeckDirectory() }/${ inputData.KOMDeckID }/`;
	},

	KOMDeckObjectPath (inputData) {
		return mod.KOMDeckFolderPath(inputData) + 'main';
	},

	KOMDeckStub (inputData) {
		return {
			KOMDeckID: inputData.split('/main').shift().split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'KOMDeck',
	ZDRSchemaDispatchValidate: mod.KOMDeckErrors,
	ZDRSchemaPath: mod.KOMDeckObjectPath,
	ZDRSchemaStub: mod.KOMDeckStub,
	ZDRSchemaMethods: {
		
		KOMDeckCreate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			const KOMDeckCreationDate = new Date();

			return this.App.KOMDeck.ZDRModelWriteObject(Object.assign(inputData, Object.assign({
				KOMDeckID: uniqueID(),
				KOMDeckCreationDate,
				KOMDeckModificationDate: KOMDeckCreationDate,
			}, inputData)));
		},

		KOMDeckUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			return this.App.KOMDeck.ZDRModelWriteObject(Object.assign(inputData, {
				KOMDeckModificationDate: new Date(),
			}));
		},

		async KOMDeckList () {
			const _this = this;
			return (await Promise.all((await _this.App.ZDRStoragePaths(mod.KOMDeckDirectory())).map(function (e) {
				return _this.App.ZDRStorageReadObject(mod.KOMDeckDirectory() + '/' + e + 'main');
			}))).filter(function (e) {
				return !!e;
			}).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);
		},

		async KOMDeckDelete (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (mod.KOMDeckErrors(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			await this.App.ZDRStorageDeleteFolderRecursive(mod.KOMDeckFolderPath(inputData));

			return inputData;
		},

		async KOMDeckObjectsMap (param1, param2 = false) {
			if (mod.KOMDeckErrors(param1)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (typeof param2 !== 'boolean') {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			const $KOMDeckCards = await _this.App.KOMCard.KOMCardList(param1);
			const spacingEntries = Object.fromEntries((await Promise.all($KOMDeckCards.map(async function (e) {
				return [e.KOMCardID, Object.values(await _this.App.KOMSpacing.KOMSpacingList(e))];
			}))));

			return {
				$KOMDeckCards,
				$KOMDeckSpacings: [].concat(...(param2 ? $KOMDeckCards.filter(function (e) {
					return ![e.KOMCardFrontText, e.KOMCardRearText].join(',').includes('???');
				}) : $KOMDeckCards).map(function ($KOMSpacingCard) {
					return (spacingEntries[$KOMSpacingCard.KOMCardID] || []).map(function (e) {
						return Object.assign(e, {
							$KOMSpacingCard,
						});
					});
				})).filter(function (e) {
					return param1.KOMDeckIsForwardOnly && _this.App.KOMSpacing.KOMSpacingIsBackward(e) ? false : true;
				}),
			};
		},

	},
});
