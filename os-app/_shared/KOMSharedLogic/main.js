const mod = {

	KOMSharedColorScheme() {
		return [
			'#252525',
			'#636363',
			'#969696',
			'#cccccc',
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

	KOMSharedColorRetired () {
		return mod.KOMSharedColorScheme()[4];
	},

};

export default mod;
