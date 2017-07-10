'use strict';
var promisify = require('es6-promisify');
module.exports = {
	deleteImageDescriptor: function(imagesModel, descriptor) {
		var removeFile = promisify(imagesModel.removeFile),
			promises = [];
		if (descriptor) {
			promises.push(removeFile(descriptor.container, descriptor.name)/* .logError('error while deleteing image : ', descriptor.container, descriptor.name) */);
			for (var i in descriptor.versions)
				if (i !== 'original')
					promises.push(removeFile(descriptor.container, i + '_' + descriptor.name)/* .logError('error while deleteing image : ', descriptor.container, i + '_' + descriptor.name) */);
		}
		return Promise.all(promises);
	}
};
