import KOMSharedLogic from '../../../_shared/KOMSharedLogic/main.js';

const mod = {

	KOMReviewGeneralColorScheme() {
		return [
			'#252525',
			'#525252',
			'#737373',
			'#969696',
			'#bdbdbd',
			'#d9d9d9',
			'#f7f7f7',
		];
	},

	KOMReviewGeneralColorUnseen () {
		return mod.KOMReviewGeneralColorScheme()[0];
	},

	KOMReviewGeneralColorRelearning () {
		return mod.KOMReviewGeneralColorScheme()[1];
	},

	KOMReviewGeneralColorDeveloping () {
		return mod.KOMReviewGeneralColorScheme()[2];
	},

	KOMReviewGeneralColorMature () {
		return mod.KOMReviewGeneralColorScheme()[3];
	},

	KOMReviewGeneralColorSuspended () {
		return mod.KOMReviewGeneralColorScheme()[4];
	},

	KOMReviewGeneralTableDays() {
		return 7;
	},

	KOMReviewGeneralUpcomingDates() {
		return Array.from(Array(mod.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() + 1000 * 60 * 60 * 24 * i));
		});
	},

	KOMReviewGeneralUpcomingFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return false;
			}
			
			if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingDueDate) < KOMSharedLogic.KOMSharedGroupingDay(new Date())) {
				return false;
			}

			if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingDueDate) >= KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() + 1000 * 60 * 60 * 24 * mod.KOMReviewGeneralTableDays()))) {
				return false;
			}

			return true;
		});
	},

	KOMReviewGeneralUpcomingGroupByDate(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			coll[KOMSharedLogic.KOMSharedGroupingDay(item.KOMSpacingDueDate)] = (coll[KOMSharedLogic.KOMSharedGroupingDay(item.KOMSpacingDueDate)] || []).concat(item);

			return coll;
		}, {});
	},

	KOMReviewGeneralHistoricalDates() {
		return Array.from(Array(mod.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
		});
	},

	KOMReviewGeneralHistoricalFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return false;
			}

			return e.KOMSpacingChronicles.filter(function (e) {
				if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) > KOMSharedLogic.KOMSharedGroupingDay(new Date())) {
					return false;
				}

				if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) < KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * mod.KOMReviewGeneralTableDays()))) {
					return false;
				}

				return true;
			}).length;
		});
	},

	KOMReviewGeneralHistoricalGroupByDate(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			item.KOMSpacingChronicles.forEach(function (e) {
				coll[KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate)] = (coll[KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate)] || []).concat(item);
			});

			return coll;
		}, {});
	},

	KOMReviewGeneralHistoricalTotalMilliseconds(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			return coll + (item.KOMChronicleResponseDate - item.KOMChronicleDrawDate);
		}, 0);
	},

};

export default mod;
