const mod = {

	KOMReviewChartElementHorizontalStackedBarWidth() {
		return 100;
	},

	KOMReviewChartElementHorizontalStackedBarHeight() {
		return 10;
	},

	KOMReviewChartElementHorizontalStackedBarScaleHorizontal(param1, param2, param3) {
		if (typeof param1 !== 'function') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!param2.length) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (typeof param3 !== 'undefined') {
			if (typeof param3 !== 'number') {
				throw new Error('KOMErrorInputNotValid');
			}
		}

		return param1()
			.range([0, mod.KOMReviewChartElementHorizontalStackedBarWidth()])
			.domain([0, param3 || param2.reduce(function (coll, item) {
				return coll + item;
			}, 0)]);
	},

	KOMReviewChartElementHorizontalStackedBarScaleColor(param1, param2, param3) {
		if (typeof param1 !== 'function') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param3)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (param3.length < 3) {
			throw new Error('KOMErrorInputNotValid');
		}

		return param1()
			.domain(param3)
			.range(param2[param3.length].slice().reverse())
			.unknown('red');
	},

};

export default mod;
