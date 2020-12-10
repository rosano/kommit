const { throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

const offset = (function (inputData) {
	return inputData < 10 ? `0${ inputData }` : inputData;
})((new Date()).getTimezoneOffset() / 60);

describe('KOMSharedGroupingDay', function test_KOMSharedGroupingDay() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSharedGroupingDay(new Date('alfa'));
		}, /KOMErrorInputNotValid/);
	});

	it('returns day in current timezone', function () {
		deepEqual(mod.KOMSharedGroupingDay(new Date(`2020-05-02T12:00:00-${ offset }:00`)), '2020-05-02');
	});

	it('previous day if before 4am', function () {
		const date = new Date(`2020-05-02T03:59:00-${ offset }:00`);
		deepEqual(mod.KOMSharedGroupingDay(date), '2020-05-01');
	});

	it('same day if 4am', function () {
		const date = new Date(`2020-05-02T04:00:00-${ offset }:00`);
		deepEqual(mod.KOMSharedGroupingDay(date), '2020-05-02');
	});

});

describe('KOMSharedColorScheme', function test_KOMSharedColorScheme() {

	it('returns array', function () {
		deepEqual(mod.KOMSharedColorScheme(), [
			'#252525',
			'#636363',
			'#969696',
			'#cccccc',
			'#f7f7f7',
			]);
	});

});

describe('KOMSharedColorUnseen', function test_KOMSharedColorUnseen() {

	it('returns string', function () {
		deepEqual(mod.KOMSharedColorUnseen(), mod.KOMSharedColorScheme()[0]);
	});

});

describe('KOMSharedColorRelearning', function test_KOMSharedColorRelearning() {

	it('returns string', function () {
		deepEqual(mod.KOMSharedColorRelearning(), mod.KOMSharedColorScheme()[1]);
	});

});

describe('KOMSharedColorDeveloping', function test_KOMSharedColorDeveloping() {

	it('returns string', function () {
		deepEqual(mod.KOMSharedColorDeveloping(), mod.KOMSharedColorScheme()[2]);
	});

});

describe('KOMSharedColorMature', function test_KOMSharedColorMature() {

	it('returns string', function () {
		deepEqual(mod.KOMSharedColorMature(), mod.KOMSharedColorScheme()[3]);
	});

});

describe('KOMSharedColorRetired', function test_KOMSharedColorRetired() {

	it('returns string', function () {
		deepEqual(mod.KOMSharedColorRetired(), mod.KOMSharedColorScheme()[4]);
	});

});
