import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
import KOMPlayLogic from '../../../sub-play/ui-logic.js';

const mod = {

	KOMReviewDetailFiguresTotalCards (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const counted = {};

		return inputData.reduce(function (coll, item) {
			const id = KOMSpacingModel.KOMSpacingModelIdentifier(item.KOMSpacingID);

			if (counted[id]) {
				return coll;
			}

			counted[id] = true;

			return coll + 1;
		}, 0);
	},

	KOMReviewDetailFiguresTotalMilliseconds (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item.KOMSpacingChronicles.length) {
				return coll;
			}

			return coll + item.KOMSpacingChronicles.filter(function (e) {
				return KOMPlayLogic.KOMPlayDayGrouping(e.KOMChronicleResponseDate) === KOMPlayLogic.KOMPlayDayGrouping(new Date());
			}).reduce(function (responseTime, e) {
				return responseTime + (e.KOMChronicleResponseDate - e.KOMChronicleDrawDate)
			}, 0);
		}, 0);
	},

	KOMReviewDetailFiguresMinutes (inputData) {
		if (typeof inputData !== 'number') {
			throw new Error('KOMErrorInputNotValid');
		}

		return Math.round(inputData / 1000 / 60 * 10) / 10;
	},

};

export default mod;
