const mod = {

	KOMVitrineRouteGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!(inputData.KOM_VITRINE_ANKI_URL || '').trim()) {
			return new Error('KOM_VITRINE_ANKI_URL not defined');
		}
	},

};

Object.assign(exports, mod);
