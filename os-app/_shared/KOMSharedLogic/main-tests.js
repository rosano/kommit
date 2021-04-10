const { throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

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
