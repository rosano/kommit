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

		if (typeof inputData.KOMCardRear !== 'string') {
			errors.KOMCardRear = [
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

		return Object.entries(errors).length ? errors : null;
	},

	KOMCardModelAudioFields () {
		return [
			'KOMCardFrontAudio',
		];
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
