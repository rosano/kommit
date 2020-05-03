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

		if (typeof inputData.KOMCardQuestion !== 'string') {
			errors.KOMCardQuestion = [
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

		if (inputData.KOMCardReviewDueDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMCardReviewDueDate instanceof Date) || Number.isNaN(inputData.KOMCardReviewDueDate.getTime())) {
				errors.KOMCardReviewDueDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMCardReviewIsLearning !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardReviewIsLearning !== 'boolean') {
				errors.KOMCardReviewIsLearning = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardReviewIsReadyToGraduate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardReviewIsReadyToGraduate !== 'boolean') {
				errors.KOMCardReviewIsReadyToGraduate = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardReviewInterval !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardReviewInterval !== 'number') {
				errors.KOMCardReviewInterval = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.KOMCardReviewMultiplier !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardReviewMultiplier !== 'number') {
				errors.KOMCardReviewMultiplier = [
					'KOMErrorNotNumber',
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

	KOMCardModelIsUnseen (inputData) {
		if (mod.KOMCardModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMCardReviewIsLearning) {
			return false;
		}

		if (inputData.KOMCardReviewInterval) {
			return false;
		}

		return true;
	},

	KOMCardModelIsLearning (inputData) {
		if (mod.KOMCardModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !!inputData.KOMCardReviewIsLearning;
	},

	KOMCardModelIsReviewing (inputData) {
		if (mod.KOMCardModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMCardReviewIsLearning) {
			return false;
		}

		return !!inputData.KOMCardReviewInterval;
	},

	KOMCardModelSpacingIdentifier (inputData) {
		if (inputData.indexOf('-') === -1) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').shift();
	},

	KOMCardModelSpacingLabel (inputData) {
		if (inputData.indexOf('-') === -1) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').pop();
	},

	KOMCardModelSpacingLabelForward () {
		return 'forward';
	},

	KOMCardModelSpacingLabelBackward () {
		return 'backward';
	},

	KOMCardModelSpacingErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		var errors = {};

		if (typeof inputData.KOMCardSpacingID !== 'string') {
			errors.KOMCardSpacingID = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMCardSpacingID.indexOf('-') === -1) {
			errors.KOMCardSpacingID = [
				'KOMErrorNotSeparated',
			];
		} else if (!mod.KOMCardModelSpacingIdentifier(inputData.KOMCardSpacingID)) {
			errors.KOMCardSpacingID = [
				'KOMErrorNotFilled',
			];
		} else if ([mod.KOMCardModelSpacingLabelForward(), mod.KOMCardModelSpacingLabelBackward()].indexOf(mod.KOMCardModelSpacingLabel(inputData.KOMCardSpacingID)) === -1) {
			errors.KOMCardSpacingID = [
				'KOMErrorNotLabelled',
			];
		}

		if (inputData.KOMCardSpacingDueDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMCardSpacingDueDate instanceof Date) || Number.isNaN(inputData.KOMCardSpacingDueDate.getTime())) {
				errors.KOMCardSpacingDueDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMCardSpacingIsLearning !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardSpacingIsLearning !== 'boolean') {
				errors.KOMCardSpacingIsLearning = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardSpacingIsReadyToGraduate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardSpacingIsReadyToGraduate !== 'boolean') {
				errors.KOMCardSpacingIsReadyToGraduate = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMCardSpacingInterval !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardSpacingInterval !== 'number') {
				errors.KOMCardSpacingInterval = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.KOMCardSpacingMultiplier !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMCardSpacingMultiplier !== 'number') {
				errors.KOMCardSpacingMultiplier = [
					'KOMErrorNotNumber',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMCardModelSpacingPreJSONSchemaValidate (inputData) {
		if (inputData.KOMCardSpacingDueDate) {
			inputData.KOMCardSpacingDueDate = inputData.KOMCardSpacingDueDate.toISOString();
		}

		return inputData;
	},

	KOMCardModelSpacingPostJSONParse (inputData) {
		if (!inputData) {
			return inputData;
		}

		if (inputData.KOMCardSpacingDueDate) {
			inputData.KOMCardSpacingDueDate = new Date(inputData.KOMCardSpacingDueDate);
		}

		return inputData;
	},

};

export default mod;
