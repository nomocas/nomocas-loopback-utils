'use strict';
/**
 * Delete property in object
 */
var utils = require('nomocas-utils/lib/object-utils');
module.exports = function(Model) {
	Model.deleteproperty = function(id, path) {
		return Model.findById(id)
			.then(function(obj) {
				utils.deleteProp(obj, path);
				return obj.save();
			})
			.then(function(obj) {
				return true;
			});
	};

	Model.remoteMethod(
		'deleteproperty', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where delete property',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path of the property to delete',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if property has been deleted',
				required: true
			}
		}
	);
};
