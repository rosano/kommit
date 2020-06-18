import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMReviewToday = new RollupStart({
	target: document.body,
	props: Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewTodaySpacings'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
				if (!e.KOMSpacingChronicles.length) {
					return e;
				}

				return Object.assign(e, {
					KOMSpacingChronicles: e.KOMSpacingChronicles.map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse),
				});
			})
		}

		return e;
	}))),
});

export default KOMReviewToday;
