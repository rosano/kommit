const mod = {

	KOMSettingModelErrorsFor (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMSettingKey !== 'string') {
			errors.KOMSettingKey = [
				'KOMErrorNotString',
			];
		} else if (inputData.KOMSettingKey.trim() === '') {
			errors.KOMSettingKey = [
				'KOMErrorNotFilled',
			];
		}

		if (typeof inputData.KOMSettingValue !== 'string') {
			errors.KOMSettingValue = [
				'KOMErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
