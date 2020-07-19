const mod = {

	KOMSharedDonateLinkGuard(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!(inputData.KOM_SHARED_DONATE_URL || '').trim()) {
			return new Error('KOM_SHARED_DONATE_URL not defined');
		}
	},

	KOMSharedGitHubLinkGuard(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!(inputData.KOM_SHARED_GITHUB_URL || '').trim()) {
			return new Error('KOM_SHARED_GITHUB_URL not defined');
		}
	},

};

Object.assign(exports, mod);
