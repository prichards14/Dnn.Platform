import util from "../utils";

function mapPackageInformation(extensionBeingUpdated) {
    return extensionBeingUpdated;
    // return {
    //     Name: extensionBeingUpdated.name,
    //     FriendlyName: extensionBeingUpdated.friendlyName,
    //     Description: extensionBeingUpdated.description,
    //     Version: extensionBeingUpdated.version,
    //     Owner: extensionBeingUpdated.owner,
    //     Url: extensionBeingUpdated.url,
    //     Organization: extensionBeingUpdated.organization,
    //     Email: extensionBeingUpdated.email,
    //     License: extensionBeingUpdated.license,
    //     ReleaseNotes: extensionBeingUpdated.releaseNotes
    // };
}

function serializeQueryStringParameters(obj) {
    let s = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            s.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return s.join("&");
}
class ExtensionService {
    getServiceFramework(controller) {
        let sf = util.utilities.sf;

        sf.moduleRoot = "PersonaBar/AdminHost";
        sf.controller = controller;

        return sf;
    }
    getInstalledPackages(type, callback) {
        const sf = this.getServiceFramework("Extensions");
        sf.get("GetInstalledPackages?packageType=" + type, {}, callback);
    }
    getAvailablePackages(type, callback) {
        const sf = this.getServiceFramework("Extensions");
        sf.get("GetAvailablePackages?packageType=" + type, {}, callback);
    }
    getPackageTypes(callback) {
        const sf = this.getServiceFramework("Extensions");
        sf.get("GetPackageTypes", {}, callback);
    }
    getAvailablePackageTypes(callback) {
        const sf = this.getServiceFramework("Extensions");
        sf.get("GetAvailablePackageTypes", {}, callback);
    }
    updateExtension(extensionBeingUpdated, callback) {
        const sf = this.getServiceFramework("Extensions");
        const payload = {
            id: extensionBeingUpdated.packageId,
            settings: mapPackageInformation(extensionBeingUpdated)
        };
        sf.post("SavePackageSettings", payload, callback);
    }
    downloadPackage(Type, Name, callback) {
        const sf = this.getServiceFramework("Extensions");
        const payload = {
            Type,
            Name
        };
        sf.post("DownloadPackage", payload, callback);
    }
    deletePackage(packageId, callback) {
        const sf = this.getServiceFramework("Extensions");
        sf.post("DeletePackage", { id: packageId }, callback);
    }
    parsePackage(file, callback, errorCallback) {
        const sf = this.getServiceFramework("Extensions");

        let formData = new FormData();
        formData.append("POSTFILE", file);


        sf.postfile("ParsePackage", formData, callback, errorCallback);
    }
    installPackage(file, callback) {
        const sf = this.getServiceFramework("Extensions");

        let formData = new FormData();
        formData.append("POSTFILE", file);

        sf.postfile("InstallPackage", formData, callback);
    }
    createNewModule(payload, callback, errorCallback) {
        const sf = this.getServiceFramework("Extensions");

        sf.post("CreateModule", payload, callback, errorCallback);
    }
    getPackageSettings(parameters, callback, errorCallback) {
        const sf = this.getServiceFramework("Extensions");

        sf.get("GetPackageSettings?" + serializeQueryStringParameters(parameters), {}, callback, errorCallback);
    }
}
const extensionService = new ExtensionService();
export default extensionService;