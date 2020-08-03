const mod = {

	KOMReviewNormalizeBarWidth() {
		return 100;
	},

	KOMReviewNormalizeBarScaleX(param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!param2.length) {
			throw new Error('KOMErrorInputNotValid');
		}

		return param1()
			.range([0, mod.KOMReviewNormalizeBarWidth()])
			.domain([0, param2.reduce(function (coll, item) {
				return coll + item;
			}, 0)]);
	},

};

export default mod;
