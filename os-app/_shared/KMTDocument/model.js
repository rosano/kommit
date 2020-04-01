export const KMTDocumentModelErrorsFor = function(inputData, options = {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('KMTErrorInputNotValid');
	}

	var errors = {};

	if (typeof inputData.KMTDocumentID !== 'string') {
		errors.KMTDocumentID = [
			'KMTErrorNotString',
		];
	} else if (inputData.KMTDocumentID.trim() === '') {
		errors.KMTDocumentID = [
			'KMTErrorNotFilled',
		];
	}

	if (typeof inputData.KMTDocumentName !== 'string') {
		errors.KMTDocumentName = [
			'KMTErrorNotString',
		];
	}

	if (!(inputData.KMTDocumentCreationDate instanceof Date) || Number.isNaN(inputData.KMTDocumentCreationDate.getTime())) {
		errors.KMTDocumentCreationDate = [
			'KMTErrorNotDate',
		];
	}

	if (!(inputData.KMTDocumentModificationDate instanceof Date) || Number.isNaN(inputData.KMTDocumentModificationDate.getTime())) {
		errors.KMTDocumentModificationDate = [
			'KMTErrorNotDate',
		];
	}

	return Object.entries(errors).length ? errors : null;
};

export const KMTDocumentModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.KMTDocumentCreationDate) {
		inputData.KMTDocumentCreationDate = inputData.KMTDocumentCreationDate.toISOString();
	}

	if (inputData.KMTDocumentModificationDate) {
		inputData.KMTDocumentModificationDate = inputData.KMTDocumentModificationDate.toISOString();
	}

	return inputData;
};

export const KMTDocumentModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.KMTDocumentCreationDate) {
		inputData.KMTDocumentCreationDate = new Date(inputData.KMTDocumentCreationDate);
	}

	if (inputData.KMTDocumentModificationDate) {
		inputData.KMTDocumentModificationDate = new Date(inputData.KMTDocumentModificationDate);
	}

	return inputData;
};
