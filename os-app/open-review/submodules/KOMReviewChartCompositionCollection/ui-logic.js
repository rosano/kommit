const mod = {

	KOMReviewChartCompositionCollectionIsValid(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (typeof inputData.KOMReviewChartCompositionCollectionTotal !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionCollectionUnseen !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionCollectionDeveloping !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionCollectionMature !== 'number') {
			return false;
		}

		if (typeof inputData.KOMReviewChartCompositionCollectionSuspended !== 'number') {
			return false;
		}

		return true;
	},

};

export default mod;
