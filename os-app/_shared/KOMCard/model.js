const mod = {

	KOMCardModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		var errors = {};

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

		if (typeof inputData.KOMCardFront !== 'string') {
			errors.KOMCardFront = [
				'KOMErrorNotString',
			];
		}

		if (typeof inputData.KOMCardAnswer !== 'string') {
			errors.KOMCardAnswer = [
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

		if (inputData.KOMCardHint !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardHint !== 'string') {
				errors.KOMCardHint = [
					'KOMErrorNotString',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMCardModelPreJSONSchemaValidate (inputData) {
		if (inputData.KOMCardCreationDate) {
			inputData.KOMCardCreationDate = inputData.KOMCardCreationDate.toISOString();
		}

		if (inputData.KOMCardModificationDate) {
			inputData.KOMCardModificationDate = inputData.KOMCardModificationDate.toISOString();
		}

		return inputData;
	},

	KOMCardModelPostJSONParse (inputData) {
		if (!inputData) {
			return inputData;
		}

		if (inputData.KOMCardCreationDate) {
			inputData.KOMCardCreationDate = new Date(inputData.KOMCardCreationDate);
		}

		if (inputData.KOMCardModificationDate) {
			inputData.KOMCardModificationDate = new Date(inputData.KOMCardModificationDate);
		}

		return inputData;
	},

};

export default mod;
