const mod = {

	KOMSpacingModelIdentifier (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}
		
		if (inputData.indexOf('-') === -1) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').shift();
	},

	KOMSpacingModelLabel (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}
		
		if (inputData.indexOf('-') === -1) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.split('-').pop();
	},

	KOMSpacingModelLabelForward () {
		return 'forward';
	},

	KOMSpacingModelLabelBackward () {
		return 'backward';
	},

	KOMSpacingModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		var errors = {};

		if (typeof inputData.KOMSpacingID !== 'string') {
			errors.KOMSpacingID = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMSpacingID.indexOf('-') === -1) {
			errors.KOMSpacingID = [
				'KOMErrorNotSeparated',
			];
		} else if (!mod.KOMSpacingModelIdentifier(inputData.KOMSpacingID)) {
			errors.KOMSpacingID = [
				'KOMErrorNotFilled',
			];
		} else if ([mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward()].indexOf(mod.KOMSpacingModelLabel(inputData.KOMSpacingID)) === -1) {
			errors.KOMSpacingID = [
				'KOMErrorNotLabelled',
			];
		}

		if (inputData.KOMSpacingDueDate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (!(inputData.KOMSpacingDueDate instanceof Date) || Number.isNaN(inputData.KOMSpacingDueDate.getTime())) {
				errors.KOMSpacingDueDate = [
					'KOMErrorNotDate',
				];
			}
		}

		if (inputData.KOMSpacingIsLearning !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingIsLearning !== 'boolean') {
				errors.KOMSpacingIsLearning = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMSpacingIsReadyToGraduate !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingIsReadyToGraduate !== 'boolean') {
				errors.KOMSpacingIsReadyToGraduate = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMSpacingInterval !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingInterval !== 'number') {
				errors.KOMSpacingInterval = [
					'KOMErrorNotNumber',
				];
			}
		}

		if (inputData.KOMSpacingMultiplier !== undefined || options.KOMOptionValidateIfNotPresent) {
			if (typeof inputData.KOMSpacingMultiplier !== 'number') {
				errors.KOMSpacingMultiplier = [
					'KOMErrorNotNumber',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMSpacingModelIsBackward (inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMSpacingModelLabel(inputData.KOMSpacingID) === mod.KOMSpacingModelLabelBackward();
	},

	KOMSpacingModelPreJSONSchemaValidate (inputData) {
		if (inputData.KOMSpacingDueDate) {
			inputData.KOMSpacingDueDate = inputData.KOMSpacingDueDate.toISOString();
		}

		return inputData;
	},

	KOMSpacingModelPostJSONParse (inputData) {
		if (!inputData) {
			return inputData;
		}

		if (inputData.KOMSpacingDueDate) {
			inputData.KOMSpacingDueDate = new Date(inputData.KOMSpacingDueDate);
		}

		return inputData;
	},

};

export default mod;
