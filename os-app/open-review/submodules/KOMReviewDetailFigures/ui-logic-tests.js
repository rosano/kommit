const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;
const KOMPlayLogic = require('../../../sub-play/ui-logic.js').default;

const kTesting = {
	StubChronicleObjectValid (inputData) {
		return {
			KOMChronicleDrawDate: inputData,
			KOMChronicleFlipDate: inputData,
			KOMChronicleResponseDate: new Date(inputData.valueOf() + 10000),
			KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeEasy(),
			KOMChronicleDueDate: inputData,
		};
	},
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'alfa-forward',
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date()),
			],
		};
	},
};

describe('KOMReviewDetailFiguresTotalCards', function test_KOMReviewDetailFiguresTotalCards() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDetailFiguresTotalCards(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalCards([]), 0);
	});

	it('counts spacing object', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-forward',
		})]), 2);
	});

	it('counts siblings as one', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})]), 1);
	});

});

describe('KOMReviewDetailFiguresTotalMilliseconds', function test_KOMReviewDetailFiguresTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDetailFiguresTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalMilliseconds([]), 0);
	});

	it('counts time until response', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalMilliseconds([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalMilliseconds([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalMilliseconds([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date()),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		})]), 20000);
	});

	it('ignores chronicle from other days', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresTotalMilliseconds([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
			],			
		})]), 0);
	});

});

describe('KOMReviewDetailFiguresMinutes', function test_KOMReviewDetailFiguresMinutes() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewDetailFiguresMinutes('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresMinutes(60000), 1);
	});

	it('calculates fraction', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresMinutes(30000), 0.5);
	});

	it('rounds to first decimal', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresMinutes(15000), 0.3);
	});

});

describe('KOMReviewDetailFiguresReviewAccuracy', function test_KOMReviewDetailFiguresReviewAccuracy() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDetailFiguresReviewAccuracy(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([]), 0);
	});

	it('excludes if no KOMChronicleMultiplier', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if unseen today', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if not today', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
			Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
			],			
		})]), 0);
	});

	it('excludes if not first error', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				}),
			],			
		})]), 0);
	});

	it('calculates if correct', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		})]), 1);
	});

	it('calculates if not correct', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				})
			],			
		})]), 0);
	});

	it('calculates if multiple', function() {
		deepEqual(mainModule.KOMReviewDetailFiguresReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		}), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				})
			],			
		})]), 0.5);
	});

});
