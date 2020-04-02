export const KOMDocumentModelErrorsFor = function(inputData, options = {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('KOMErrorInputNotValid');
	}

	var errors = {};

	if (typeof inputData.KOMDocumentID !== 'string') {
		errors.KOMDocumentID = [
			'KOMErrorNotString',
		];
	} else if (inputData.KOMDocumentID.trim() === '') {
		errors.KOMDocumentID = [
			'KOMErrorNotFilled',
		];
	}

	if (typeof inputData.KOMDocumentName !== 'string') {
		errors.KOMDocumentName = [
			'KOMErrorNotString',
		];
	}

	if (!(inputData.KOMDocumentCreationDate instanceof Date) || Number.isNaN(inputData.KOMDocumentCreationDate.getTime())) {
		errors.KOMDocumentCreationDate = [
			'KOMErrorNotDate',
		];
	}

	if (!(inputData.KOMDocumentModificationDate instanceof Date) || Number.isNaN(inputData.KOMDocumentModificationDate.getTime())) {
		errors.KOMDocumentModificationDate = [
			'KOMErrorNotDate',
		];
	}

	return Object.entries(errors).length ? errors : null;
};

export const KOMDocumentModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.KOMDocumentCreationDate) {
		inputData.KOMDocumentCreationDate = inputData.KOMDocumentCreationDate.toISOString();
	}

	if (inputData.KOMDocumentModificationDate) {
		inputData.KOMDocumentModificationDate = inputData.KOMDocumentModificationDate.toISOString();
	}

	return inputData;
};

export const KOMDocumentModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.KOMDocumentCreationDate) {
		inputData.KOMDocumentCreationDate = new Date(inputData.KOMDocumentCreationDate);
	}

	if (inputData.KOMDocumentModificationDate) {
		inputData.KOMDocumentModificationDate = new Date(inputData.KOMDocumentModificationDate);
	}

	return inputData;
};
