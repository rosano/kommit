import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	KOM_DataModule(inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('kommit', options)(inputData);
	},

};

export default mod;
