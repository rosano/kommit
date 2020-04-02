export const KOMDeckModelErrorsFor = function(inputData, options = {}) {
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

	return Object.entries(errors).length ? errors : null;
};

export const KOMDeckModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.KOMDeckCreationDate) {
		inputData.KOMDeckCreationDate = inputData.KOMDeckCreationDate.toISOString();
	}

	if (inputData.KOMDeckModificationDate) {
		inputData.KOMDeckModificationDate = inputData.KOMDeckModificationDate.toISOString();
	}

	return inputData;
};

export const KOMDeckModelPostJSONParse = function(inputData) {
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
};
