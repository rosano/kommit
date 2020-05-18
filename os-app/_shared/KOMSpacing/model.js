import KOMCardModel from '../KOMCard/model.js'

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

		if (!Array.isArray(inputData.KOMSpacingChronicles)) {
			errors.KOMSpacingChronicles = [
				'KOMErrorNotArray',
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

		if (inputData.$KOMSpacingCard !== undefined) {
			if (KOMCardModel.KOMCardModelErrorsFor(inputData.$KOMSpacingCard)) {
				errors.$KOMSpacingCard = [
					'KOMErrorNotValid',
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

	KOMSpacingModelIsUnseen (inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !inputData.KOMSpacingDueDate;
	},

	KOMSpacingModelIsLearning (inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return !!inputData.KOMSpacingIsLearning;
	},

	KOMSpacingModelIsReviewing (inputData) {
		if (mod.KOMSpacingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (inputData.KOMSpacingIsLearning) {
			return false;
		}

		return !!inputData.KOMSpacingInterval;
	},

	KOMSpacingModelFilterUnique (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		let cards = [];
		return inputData.filter(function (e, i, coll) {
			if (cards.indexOf(e.$KOMSpacingCard) !== -1) {
				return false;
			}

			cards.push(e.$KOMSpacingCard);

			return true;
		});
	},

};

export default mod;
