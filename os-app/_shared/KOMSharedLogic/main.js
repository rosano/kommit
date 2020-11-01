const mod = {

	KOMSharedGroupingDay(inputData) {
		if (!(inputData instanceof Date) || Number.isNaN(inputData.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		return (new Date(inputData.valueOf() - (inputData.getTimezoneOffset() / 60 + 4) * 1000 * 60 * 60)).toJSON().slice(0, 10);
	},

	KOMSharedColorScheme() {
		return [
			'#252525',
			'#636363',
			'#969696',
			'#bdbdbd',
			'#d9d9d9',
			'#f7f7f7',
		];
	},

	KOMSharedColorUnseen () {
		return mod.KOMSharedColorScheme()[0];
	},

	KOMSharedColorRelearning () {
		return mod.KOMSharedColorScheme()[1];
	},

	KOMSharedColorDeveloping () {
		return mod.KOMSharedColorScheme()[2];
	},

	KOMSharedColorMature () {
		return mod.KOMSharedColorScheme()[3];
	},

	KOMSharedColorSuspended () {
		return mod.KOMSharedColorScheme()[4];
	},

};

export default mod;
