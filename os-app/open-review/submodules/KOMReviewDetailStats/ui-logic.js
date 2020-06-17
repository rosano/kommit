import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const mod = {

	KOMReviewDetailStatsTotalCards (inputData) {
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

};

export default mod;
