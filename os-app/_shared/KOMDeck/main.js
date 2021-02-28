import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {
	
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

	KOMDeckModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMDeckID !== 'string') {
			errors.KOMDeckID = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMDeckID.trim() === '') {
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

		return Object.entries(errors).length ? errors : null;
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'KOMDeck',
	ZDRSchemaDispatchValidate: mod.KOMDeckModelErrorsFor,
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
			return Promise.all((await _this.App.ZDRStoragePaths(mod.KOMDeckDirectory() + '/')).map(async function (e) {
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(await _this.App.ZDRStorageReadObject(mod.KOMDeckDirectory() + '/' + e + 'main'));
			}));
		},

		async KOMDeckDelete (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (mod.KOMDeckModelErrorsFor(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			await Promise.all((await this.App.ZDRStoragePathsRecursive(mod.KOMDeckFolderPath(inputData))).map(this.App.ZDRStorageDelete));

			return inputData;
		},

	},
});
