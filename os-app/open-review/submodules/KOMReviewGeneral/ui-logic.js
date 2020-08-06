import KOMReviewLogic from '../../ui-logic.js';

const mod = {

	KOMReviewGeneralTableDays() {
		return 7;
	},

	KOMReviewGeneralGroup(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			coll[KOMReviewLogic.KOMReviewLogicDayGrouping(item.KOMSpacingDueDate)] = (coll[KOMReviewLogic.KOMReviewLogicDayGrouping(item.KOMSpacingDueDate)] || []).concat(item);

			return coll;
		}, {});
	},

	KOMReviewGeneralUpcomingFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (KOMReviewLogic.KOMReviewLogicDayGrouping(e.KOMSpacingDueDate) < KOMReviewLogic.KOMReviewLogicDayGrouping(new Date())) {
				return false;
			}

			if (KOMReviewLogic.KOMReviewLogicDayGrouping(e.KOMSpacingDueDate) >= KOMReviewLogic.KOMReviewLogicDayGrouping(new Date(Date.now() + 1000 * 60 * 60 * 24 * mod.KOMReviewGeneralTableDays()))) {
				return false;
			}

			return true;
		});
	},

};

export default mod;
