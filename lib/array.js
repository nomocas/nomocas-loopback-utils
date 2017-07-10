'use strict';

var utils = require('nomocas-utils/lib/object-utils');
module.exports = function(Model, restrictedPath) {
	// TODO  : use itemsTypes


	function getArray(obj, path) {
		var arr = utils.getProp(obj, path);
		if (!arr) {
			arr = [];
			utils.setProp(obj, path, arr);
		}
		if (!arr.push)
			throw new Error('pushitem : path give something that\'s not an array : ' + path);
		return arr;
	}


	/**
	 * Push item
	 */

	Model.pushitem = function(id, path, data) {
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				getArray(obj, path).push(data);
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'pushitem', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where push item',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the object where push item',
				required: true
			}, {
				arg: 'data',
				type: 'object',
				description: 'the data object to push to path',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if item has been pushed',
				required: true
			}
		}
	);


	/**
	 * Swap items in array
	 */

	Model.swapitems = function(id, path, index1, index2) {
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				var arr = getArray(obj, path),
					tmp = arr[index1];
				arr[index1] = arr[index2];
				arr[index2] = tmp;
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'swapitems', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where swap items',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the object where swap items',
				required: true
			}, {
				arg: 'index1',
				type: 'number',
				description: 'the first item\'s index to swap',
				required: true
			}, {
				arg: 'index2',
				type: 'number',
				description: 'the second item\'s index to swap',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if items has been swapped',
				required: true
			}
		}
	);


	/**
	 * Insert items at specififed index in array
	 */

	Model.insertitem = function(id, path, data, index) {
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				[].splice.call(getArray(obj, path), index, 0, data);
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'insertitem', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where insert item',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the object where insert item',
				required: true
			}, {
				arg: 'data',
				type: 'object',
				description: 'the item to insert',
				required: true
			}, {
				arg: 'index',
				type: 'number',
				description: 'the item\'s index to insert',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if items has been inserted',
				required: true
			}
		}
	);

	/**
	 * Displace item in array
	 */

	Model.displaceitem = function(id, path, fromIndex, toIndex) {
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				var arr = getArray(obj, path);
				arr = [].slice.call(arr);
				var item = arr[fromIndex];
				arr.splice(fromIndex, 1);
				arr.splice(toIndex, 0, item);
				utils.setProp(obj, path, arr);
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'displaceitem', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where displace item',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the array where displace item',
				required: true
			}, {
				arg: 'fromIndex',
				type: 'number',
				description: 'the initial index in the array where is item',
				required: true
			}, {
				arg: 'toIndex',
				type: 'number',
				description: 'the final index in the array where place item',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if item has been displaced',
				required: true
			}
		}
	);


	Model.removeitem = function(id, path, index) {
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				var arr = getArray(obj, path);
				arr = [].slice.call(arr);
				arr.splice(index, 1);
				utils.setProp(obj, path, arr);
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'removeitem', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where displace item',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path in the array where displace item',
				required: true
			}, {
				arg: 'index',
				type: 'number',
				description: 'the index in the array to remove',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if item has been deleted',
				required: true
			}
		}
	);

	Model.updateitem = function(id, path, index, data) {
		console.log('array.update item init : ', id, path, index, data);
		path = restrictedPath || path;
		return Model.findById(id)
			.then(function(obj) {
				console.log('array.update item : ', obj, id, path, index, data);
				var arr = [].slice.call(getArray(obj, path));
				arr[index] = Object.assign(arr[index], data);
				utils.setProp(obj, path, arr);
				return obj.save();
			})
			.then(function() {
				return true;
			});
	};

	Model.remoteMethod(
		'updateitem', {
			accepts: [{
				arg: 'id',
				type: 'string',
				description: 'the id of the object where displace item',
				required: true
			}, {
				arg: 'path',
				type: 'string',
				description: 'the path to the array where displace item',
				required: true
			}, {
				arg: 'index',
				type: 'number',
				description: 'the index in the array to remove',
				required: true
			}, {
				arg: 'data',
				type: 'object',
				description: 'the data to apply on item',
				required: true
			}],
			returns: {
				arg: 'done',
				type: 'boolean',
				description: 'true if item has been deleted',
				required: true
			}
		}
	);
};

