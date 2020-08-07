const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js').default;

const offset = (function (inputData) {
	return inputData < 10 ? `0${ inputData }` : inputData;
})((new Date()).getTimezoneOffset() / 60);

describe('KOMSharedGroupingDay', function test_KOMSharedGroupingDay() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSharedGroupingDay(new Date('alfa'));
		}, /KOMErrorInputNotValid/);
	});

	it('returns day in current timezone', function () {
		deepEqual(mainModule.KOMSharedGroupingDay(new Date(`2020-05-02T12:00:00-${ offset }:00`)), '2020-05-02');
	});

	it('previous day if before 4am', function () {
		const date = new Date(`2020-05-02T03:59:00-${ offset }:00`);
		deepEqual(mainModule.KOMSharedGroupingDay(date), '2020-05-01');
	});

	it('same day if 4am', function () {
		const date = new Date(`2020-05-02T04:00:00-${ offset }:00`);
		deepEqual(mainModule.KOMSharedGroupingDay(date), '2020-05-02');
	});

});

describe('KOMSharedColorScheme', function test_KOMSharedColorScheme() {

	it('returns array', function () {
		deepEqual(mainModule.KOMSharedColorScheme(), [
			'#252525',
			'#525252',
			'#737373',
			'#969696',
			'#bdbdbd',
			'#d9d9d9',
			'#f7f7f7',
			]);
	});

});

describe('KOMSharedColorUnseen', function test_KOMSharedColorUnseen() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSharedColorUnseen(), mainModule.KOMSharedColorScheme()[0]);
	});

});

describe('KOMSharedColorRelearning', function test_KOMSharedColorRelearning() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSharedColorRelearning(), mainModule.KOMSharedColorScheme()[1]);
	});

});

describe('KOMSharedColorDeveloping', function test_KOMSharedColorDeveloping() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSharedColorDeveloping(), mainModule.KOMSharedColorScheme()[2]);
	});

});

describe('KOMSharedColorMature', function test_KOMSharedColorMature() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSharedColorMature(), mainModule.KOMSharedColorScheme()[3]);
	});

});

describe('KOMSharedColorSuspended', function test_KOMSharedColorSuspended() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSharedColorSuspended(), mainModule.KOMSharedColorScheme()[4]);
	});

});


