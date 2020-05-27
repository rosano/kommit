import * as _OLSKRemoteStorage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = _OLSKRemoteStorage.default || _OLSKRemoteStorage;

const mod = {

	KOM_DataModule (inputData) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('kommit')(inputData);
	},

};

export default mod;
