const mod = {

	KOMSettingModelErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.KOMSettingKey !== 'string') {
			errors.KOMSettingKey = [
				'KOMErrorNotString',
			];
		} else if (!inputData.KOMSettingKey.trim()) {
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

	KOMSettingDirectory () {
		return 'kom_settings';
	},

	KOMSettingPath (inputData) {
		return `${ mod.KOMSettingDirectory() }/${ inputData.KOMSettingKey }`;
	},

	KOMSettingStub (inputData) {
		return {
			KOMSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'KOMSetting',
	ZDRSchemaDispatchValidate: mod.KOMSettingModelErrors,
	ZDRSchemaPath: mod.KOMSettingPath,
	ZDRSchemaStub: mod.KOMSettingStub,
	ZDRSchemaMethods: {
		
		async KOMSettingList () {
			return Object.values(await this.App.KOMSetting.ZDRModelListObjects());
		},

	},
});
