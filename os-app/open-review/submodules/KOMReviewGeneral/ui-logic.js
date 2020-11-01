import KOMSharedLogic from '../../../_shared/KOMSharedLogic/main.js';

const mod = {

	KOMReviewGeneralTableDays() {
		return 7;
	},

	KOMReviewGeneralUpcomingColors() {
		return [
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			];
	},

	KOMReviewGeneralHistoricalColors() {
		return [
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			KOMSharedLogic.KOMSharedColorRelearning(),
			KOMSharedLogic.KOMSharedColorUnseen(),
			];
	},

	KOMReviewGeneralCollectionColors() {
		return [
			KOMSharedLogic.KOMSharedColorUnseen(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorRetired(),
			];
	},

};

export default mod;
