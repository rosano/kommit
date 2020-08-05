const mod = {

	KOMReviewChartElementDateBarTableRowIsValid(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (typeof inputData.KOMReviewChartElementDateBarTableRowDataKey !== 'string') {
			return false;
		}

		if (!Array.isArray(inputData.KOMReviewChartElementDateBarTableRowDataValues)) {
			return false;
		}

		if (!inputData.KOMReviewChartElementDateBarTableRowDataValues.length) {
			return false;
		}

		return true;
	},

};

export default mod;
