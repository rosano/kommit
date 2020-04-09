import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;

export const KOMStorageClient = function (inputData) {
	let remoteStorage = new RemoteStorage(inputData);

	inputData.modules.forEach(function (e) {
		remoteStorage.access.claim(e.name, 'rw');

		remoteStorage.caching.enable(`/${ e.name }/`);
	});

	return remoteStorage;
};
