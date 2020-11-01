const mod = {

	KOMDeckModelErrorsFor(inputData, options = {}) {
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

		if (inputData.KOMDeckRetireAfterMonths !== undefined) {
			const error = (function() {
				if (typeof inputData.KOMDeckRetireAfterMonths !== 'number') {
					return [
						'KOMErrorNotNumber',
					];
				}

				if (parseInt(inputData.KOMDeckRetireAfterMonths) !== inputData.KOMDeckRetireAfterMonths) {
					return [
						'KOMErrorNotInteger',
					];
				}

				if (inputData.KOMDeckRetireAfterMonths < 0) {
					return [
						'KOMErrorNotValid',
					];
				}
			})();

			if (error) {
				errors.KOMDeckRetireAfterMonths = error;
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

export default mod;
