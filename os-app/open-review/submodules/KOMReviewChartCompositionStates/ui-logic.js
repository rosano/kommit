const mod = {

	KOMReviewChartCompositionStatesIsValid(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (typeof inputData.KOMReviewChartCompositionStatesTotal !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionStatesDeveloping !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionStatesMature !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionStatesSuspended !== 'number') {
			return false;
		}

		return true;
	},

};

export default mod;
