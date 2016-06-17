var utils = require('nomocas-utils/lib/object-utils');
module.exports = function(Model) {
	Model.patch = function(id, path, value) {
		return Model.findById(id)
			.then(function(obj) {
				utils.setProp(obj, path, value);
				return obj.save();
			})
			.then(function(obj) {
				return true;
			})
			.logError('patch failed');
	};

	Model.remoteMethod(
		'patch', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object to patch',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the object to patch',
				required: true
			}, {
				arg: 'value',
				type: 'any',
				description: 'the value to assign to path',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if patch has been applied',
				required: true
			}
		}
	);
}
