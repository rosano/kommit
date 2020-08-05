const mod = {

	KOMReviewLogicDayGrouping(inputData) {
		if (!(inputData instanceof Date) || Number.isNaN(inputData.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		return (new Date(inputData.valueOf() - (inputData.getTimezoneOffset() / 60 + 4) * 1000 * 60 * 60)).toJSON().slice(0, 10);
	},

};

export default mod;
