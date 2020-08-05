import KOMReviewLogic from '../../logic.js';

const uGrouping = function (inputData) {
	return KOMReviewLogic.KOMReviewLogicDayGrouping(inputData);
};

const mod = {

	KOMReviewGeneralTableDays() {
		return 7;
	},

	KOMReviewGeneralUpcomingFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (uGrouping(e.KOMSpacingDueDate) < uGrouping(new Date())) {
				return false;
			}

			if (uGrouping(e.KOMSpacingDueDate) >= uGrouping(new Date(Date.now() + 1000 * 60 * 60 * 24 * mod.KOMReviewGeneralTableDays()))) {
				return false;
			}

			return true;
		});
	},

};

export default mod;
