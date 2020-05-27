import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	KOM_DataModule (inputData) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('kommit')(inputData);
	},

};

export default mod;
