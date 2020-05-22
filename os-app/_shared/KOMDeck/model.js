const mod = {

	KOMDeckModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		var errors = {};

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

		if (inputData.KOMDeckIsForwardOnly !== undefined) {
			if (typeof inputData.KOMDeckIsForwardOnly !== 'boolean') {
				errors.KOMDeckIsForwardOnly = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckIsOralFront !== undefined) {
			if (typeof inputData.KOMDeckIsOralFront !== 'boolean') {
				errors.KOMDeckIsOralFront = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckIsOralRear !== undefined) {
			if (typeof inputData.KOMDeckIsOralRear !== 'boolean') {
				errors.KOMDeckIsOralRear = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMDeckFrontLanguageCode !== undefined) {
			if (typeof inputData.KOMDeckFrontLanguageCode !== 'string') {
				errors.KOMDeckFrontLanguageCode = [
					'KOMErrorNotString',
				];
			} else if (inputData.KOMDeckFrontLanguageCode.trim() === '') {
				errors.KOMDeckFrontLanguageCode = [
					'KOMErrorNotFilled',
				];
			}
		}

		if (inputData.KOMDeckRearLanguageCode !== undefined) {
			if (typeof inputData.KOMDeckRearLanguageCode !== 'string') {
				errors.KOMDeckRearLanguageCode = [
					'KOMErrorNotString',
				];
			} else if (inputData.KOMDeckRearLanguageCode.trim() === '') {
				errors.KOMDeckRearLanguageCode = [
					'KOMErrorNotFilled',
				];
			}
		}

		if (inputData.$KOMDeckCards !== undefined) {
			if (!Array.isArray(inputData.$KOMDeckCards)) {
				errors.$KOMDeckCards = [
					'KOMErrorNotArray',
				];
			}
		}

		if (inputData.$KOMDeckSpacings !== undefined) {
			if (!Array.isArray(inputData.$KOMDeckSpacings)) {
				errors.$KOMDeckSpacings = [
					'KOMErrorNotArray',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMDeckModelPreJSONSchemaValidate (inputData) {
		if (inputData.KOMDeckCreationDate) {
			inputData.KOMDeckCreationDate = inputData.KOMDeckCreationDate.toISOString();
		}

		if (inputData.KOMDeckModificationDate) {
			inputData.KOMDeckModificationDate = inputData.KOMDeckModificationDate.toISOString();
		}

		return inputData;
	},

	KOMDeckModelPostJSONParse (inputData) {
		if (!inputData) {
			return inputData;
		}

		if (inputData.KOMDeckCreationDate) {
			inputData.KOMDeckCreationDate = new Date(inputData.KOMDeckCreationDate);
		}

		if (inputData.KOMDeckModificationDate) {
			inputData.KOMDeckModificationDate = new Date(inputData.KOMDeckModificationDate);
		}

		return inputData;
	},

};

export default mod;
