/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "042bbb5c65e6a9450fc3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-base64/base64.mjs":
/*!*******************************************!*\
  !*** ./node_modules/js-base64/base64.mjs ***!
  \*******************************************/
/*! exports provided: version, VERSION, atob, atobPolyfill, btoa, btoaPolyfill, fromBase64, toBase64, utob, encode, encodeURI, encodeURL, btou, decode, isValid, fromUint8Array, toUint8Array, extendString, extendUint8Array, extendBuiltins, Base64 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atob", function() { return _atob; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atobPolyfill", function() { return atobPolyfill; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btoa", function() { return _btoa; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btoaPolyfill", function() { return btoaPolyfill; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromBase64", function() { return decode; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBase64", function() { return encode; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utob", function() { return utob; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeURI", function() { return encodeURI; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeURL", function() { return encodeURI; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btou", function() { return btou; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromUint8Array", function() { return fromUint8Array; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint8Array", function() { return toUint8Array; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendString", function() { return extendString; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendUint8Array", function() { return extendUint8Array; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendBuiltins", function() { return extendBuiltins; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return gBase64; });
  /**
   *  base64.ts
   *
   *  Licensed under the BSD 3-Clause License.
   *    http://opensource.org/licenses/BSD-3-Clause
   *
   *  References:
   *    http://en.wikipedia.org/wiki/Base64
   *
   * @author Dan Kogai (https://github.com/dankogai)
   */
  const version = '3.6.0';
  /**
   * @deprecated use lowercase `version`.
   */
  const VERSION = version;
  const _hasatob = typeof atob === 'function';
  const _hasbtoa = typeof btoa === 'function';
  const _hasBuffer = typeof Buffer === 'function';
  const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
  const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
  const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const b64chs = [...b64ch];
  const b64tab = ((a) => {
      let tab = {};
      a.forEach((c, i) => tab[c] = i);
      return tab;
  })(b64chs);
  const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  const _fromCC = String.fromCharCode.bind(String);
  const _U8Afrom = typeof Uint8Array.from === 'function'
      ? Uint8Array.from.bind(Uint8Array)
      : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  const _mkUriSafe = (src) => src
      .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
      .replace(/=+$/m, '');
  const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
  /**
   * polyfill version of `btoa`
   */
  const btoaPolyfill = (bin) => {
      // console.log('polyfilled');
      let u32, c0, c1, c2, asc = '';
      const pad = bin.length % 3;
      for (let i = 0; i < bin.length;) {
          if ((c0 = bin.charCodeAt(i++)) > 255 ||
              (c1 = bin.charCodeAt(i++)) > 255 ||
              (c2 = bin.charCodeAt(i++)) > 255)
              throw new TypeError('invalid character found');
          u32 = (c0 << 16) | (c1 << 8) | c2;
          asc += b64chs[u32 >> 18 & 63]
              + b64chs[u32 >> 12 & 63]
              + b64chs[u32 >> 6 & 63]
              + b64chs[u32 & 63];
      }
      return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  /**
   * does what `window.btoa` of web browsers do.
   * @param {String} bin binary string
   * @returns {string} Base64-encoded string
   */
  const _btoa = _hasbtoa ? (bin) => btoa(bin)
      : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
          : btoaPolyfill;
  const _fromUint8Array = _hasBuffer
      ? (u8a) => Buffer.from(u8a).toString('base64')
      : (u8a) => {
          // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
          const maxargs = 0x1000;
          let strs = [];
          for (let i = 0, l = u8a.length; i < l; i += maxargs) {
              strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
          }
          return _btoa(strs.join(''));
      };
  /**
   * converts a Uint8Array to a Base64 string.
   * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
   * @returns {string} Base64 string
   */
  const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const utob = (src: string) => unescape(encodeURIComponent(src));
  // reverting good old fationed regexp
  const cb_utob = (c) => {
      if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 0x80 ? c
              : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                  + _fromCC(0x80 | (cc & 0x3f)))
                  : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                      + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                      + _fromCC(0x80 | (cc & 0x3f)));
      }
      else {
          var cc = 0x10000
              + (c.charCodeAt(0) - 0xD800) * 0x400
              + (c.charCodeAt(1) - 0xDC00);
          return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
              + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
              + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
              + _fromCC(0x80 | (cc & 0x3f)));
      }
  };
  const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-8 string
   * @returns {string} UTF-16 string
   */
  const utob = (u) => u.replace(re_utob, cb_utob);
  //
  const _encode = _hasBuffer
      ? (s) => Buffer.from(s, 'utf8').toString('base64')
      : _TE
          ? (s) => _fromUint8Array(_TE.encode(s))
          : (s) => _btoa(utob(s));
  /**
   * converts a UTF-8-encoded string to a Base64 string.
   * @param {boolean} [urlsafe] if `true` make the result URL-safe
   * @returns {string} Base64 string
   */
  const encode = (src, urlsafe = false) => urlsafe
      ? _mkUriSafe(_encode(src))
      : _encode(src);
  /**
   * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
   * @returns {string} Base64 string
   */
  const encodeURI = (src) => encode(src, true);
  // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const btou = (src: string) => decodeURIComponent(escape(src));
  // reverting good old fationed regexp
  const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  const cb_btou = (cccc) => {
      switch (cccc.length) {
          case 4:
              var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                  | ((0x3f & cccc.charCodeAt(1)) << 12)
                  | ((0x3f & cccc.charCodeAt(2)) << 6)
                  | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
              return (_fromCC((offset >>> 10) + 0xD800)
                  + _fromCC((offset & 0x3FF) + 0xDC00));
          case 3:
              return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                  | ((0x3f & cccc.charCodeAt(1)) << 6)
                  | (0x3f & cccc.charCodeAt(2)));
          default:
              return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                  | (0x3f & cccc.charCodeAt(1)));
      }
  };
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-16 string
   * @returns {string} UTF-8 string
   */
  const btou = (b) => b.replace(re_btou, cb_btou);
  /**
   * polyfill version of `atob`
   */
  const atobPolyfill = (asc) => {
      // console.log('polyfilled');
      asc = asc.replace(/\s+/g, '');
      if (!b64re.test(asc))
          throw new TypeError('malformed base64.');
      asc += '=='.slice(2 - (asc.length & 3));
      let u24, bin = '', r1, r2;
      for (let i = 0; i < asc.length;) {
          u24 = b64tab[asc.charAt(i++)] << 18
              | b64tab[asc.charAt(i++)] << 12
              | (r1 = b64tab[asc.charAt(i++)]) << 6
              | (r2 = b64tab[asc.charAt(i++)]);
          bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
              : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                  : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
      }
      return bin;
  };
  /**
   * does what `window.atob` of web browsers do.
   * @param {String} asc Base64-encoded string
   * @returns {string} binary string
   */
  const _atob = _hasatob ? (asc) => atob(_tidyB64(asc))
      : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
          : atobPolyfill;
  //
  const _toUint8Array = _hasBuffer
      ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
      : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));
  /**
   * converts a Base64 string to a Uint8Array.
   */
  const toUint8Array = (a) => _toUint8Array(_unURI(a));
  //
  const _decode = _hasBuffer
      ? (a) => Buffer.from(a, 'base64').toString('utf8')
      : _TD
          ? (a) => _TD.decode(_toUint8Array(a))
          : (a) => btou(_atob(a));
  const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
  /**
   * converts a Base64 string to a UTF-8 string.
   * @param {String} src Base64 string.  Both normal and URL-safe are supported
   * @returns {string} UTF-8 string
   */
  const decode = (src) => _decode(_unURI(src));
  /**
   * check if a value is a valid Base64 string
   * @param {String} src a value to check
    */
  const isValid = (src) => {
      if (typeof src !== 'string')
          return false;
      const s = src.replace(/\s+/g, '').replace(/=+$/, '');
      return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
  };
  //
  const _noEnum = (v) => {
      return {
          value: v, enumerable: false, writable: true, configurable: true
      };
  };
  /**
   * extend String.prototype with relevant methods
   */
  const extendString = function () {
      const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
      _add('fromBase64', function () { return decode(this); });
      _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
      _add('toBase64URI', function () { return encode(this, true); });
      _add('toBase64URL', function () { return encode(this, true); });
      _add('toUint8Array', function () { return toUint8Array(this); });
  };
  /**
   * extend Uint8Array.prototype with relevant methods
   */
  const extendUint8Array = function () {
      const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
      _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
      _add('toBase64URI', function () { return fromUint8Array(this, true); });
      _add('toBase64URL', function () { return fromUint8Array(this, true); });
  };
  /**
   * extend Builtin prototypes with relevant methods
   */
  const extendBuiltins = () => {
      extendString();
      extendUint8Array();
  };
  const gBase64 = {
      version: version,
      VERSION: VERSION,
      atob: _atob,
      atobPolyfill: atobPolyfill,
      btoa: _btoa,
      btoaPolyfill: btoaPolyfill,
      fromBase64: decode,
      toBase64: encode,
      encode: encode,
      encodeURI: encodeURI,
      encodeURL: encodeURI,
      utob: utob,
      btou: btou,
      decode: decode,
      isValid: isValid,
      fromUint8Array: fromUint8Array,
      toUint8Array: toUint8Array,
      extendString: extendString,
      extendUint8Array: extendUint8Array,
      extendBuiltins: extendBuiltins,
  };
  // makecjs:CUT //
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // and finally,
  
  
  
  /***/ }),
  
  /***/ "./node_modules/whatwg-fetch/fetch.js":
  /*!********************************************!*\
    !*** ./node_modules/whatwg-fetch/fetch.js ***!
    \********************************************/
  /*! exports provided: Headers, Request, Response, DOMException, fetch */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
  var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global)
  
  var support = {
    searchParams: 'URLSearchParams' in global,
    iterable: 'Symbol' in global && 'iterator' in Symbol,
    blob:
      'FileReader' in global &&
      'Blob' in global &&
      (function() {
        try {
          new Blob()
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in global,
    arrayBuffer: 'ArrayBuffer' in global
  }
  
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }
  
  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]
  
    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      }
  }
  
  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }
  
  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }
  
  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }
  
    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }
  
    return iterator
  }
  
  function Headers(headers) {
    this.map = {}
  
    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }
  
  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue + ', ' + value : value
  }
  
  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }
  
  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }
  
  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }
  
  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }
  
  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }
  
  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) {
      items.push(name)
    })
    return iteratorFor(items)
  }
  
  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) {
      items.push(value)
    })
    return iteratorFor(items)
  }
  
  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) {
      items.push([name, value])
    })
    return iteratorFor(items)
  }
  
  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }
  
  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }
  
  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }
  
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }
  
  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }
  
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)
  
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }
  
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }
  
  function Body() {
    this.bodyUsed = false
  
    this._initBody = function(body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      this.bodyUsed = this.bodyUsed
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        this._bodyText = body = Object.prototype.toString.call(body)
      }
  
      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }
  
    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }
  
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }
  
      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this)
          if (isConsumed) {
            return isConsumed
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            )
          } else {
            return Promise.resolve(this._bodyArrayBuffer)
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }
  
    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }
  
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }
  
    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }
  
    this.json = function() {
      return this.text().then(JSON.parse)
    }
  
    return this
  }
  
  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
  
  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return methods.indexOf(upcased) > -1 ? upcased : method
  }
  
  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }
  
    options = options || {}
    var body = options.body
  
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      this.signal = input.signal
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }
  
    this.credentials = options.credentials || this.credentials || 'same-origin'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.signal = options.signal || this.signal
    this.referrer = null
  
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  
    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
        }
      }
    }
  }
  
  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  }
  
  function decode(body) {
    var form = new FormData()
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=')
          var name = split.shift().replace(/\+/g, ' ')
          var value = split.join('=').replace(/\+/g, ' ')
          form.append(decodeURIComponent(name), decodeURIComponent(value))
        }
      })
    return form
  }
  
  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders
      .split('\r')
      .map(function(header) {
        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
      })
      .forEach(function(line) {
        var parts = line.split(':')
        var key = parts.shift().trim()
        if (key) {
          var value = parts.join(':').trim()
          headers.append(key, value)
        }
      })
    return headers
  }
  
  Body.call(Request.prototype)
  
  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }
    if (!options) {
      options = {}
    }
  
    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : ''
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }
  
  Body.call(Response.prototype)
  
  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }
  
  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }
  
  var redirectStatuses = [301, 302, 303, 307, 308]
  
  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }
  
    return new Response(null, {status: status, headers: {location: url}})
  }
  
  var DOMException = global.DOMException
  try {
    new DOMException()
  } catch (err) {
    DOMException = function(message, name) {
      this.message = message
      this.name = name
      var error = Error(message)
      this.stack = error.stack
    }
    DOMException.prototype = Object.create(Error.prototype)
    DOMException.prototype.constructor = DOMException
  }
  
  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
  
      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'))
      }
  
      var xhr = new XMLHttpRequest()
  
      function abortXhr() {
        xhr.abort()
      }
  
      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        setTimeout(function() {
          resolve(new Response(body, options))
        }, 0)
      }
  
      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'))
        }, 0)
      }
  
      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'))
        }, 0)
      }
  
      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException('Aborted', 'AbortError'))
        }, 0)
      }
  
      function fixUrl(url) {
        try {
          return url === '' && global.location.href ? global.location.href : url
        } catch (e) {
          return url
        }
      }
  
      xhr.open(request.method, fixUrl(request.url), true)
  
      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }
  
      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob'
        } else if (
          support.arrayBuffer &&
          request.headers.get('Content-Type') &&
          request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
        ) {
          xhr.responseType = 'arraybuffer'
        }
      }
  
      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
        })
      } else {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value)
        })
      }
  
      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr)
  
        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr)
          }
        }
      }
  
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  
  fetch.polyfill = true
  
  if (!global.fetch) {
    global.fetch = fetch
    global.Headers = Headers
    global.Request = Request
    global.Response = Response
  }
  
  
  /***/ }),
  
  /***/ "./src/errors/ajax.ts":
  /*!****************************!*\
    !*** ./src/errors/ajax.ts ***!
    \****************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  
  
  
  var AjaxErrors = /** @class */ (function (_super) {
      __extends(AjaxErrors, _super);
      function AjaxErrors() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      // get http error info
      AjaxErrors.prototype.handleError = function (options) {
          var _this = this;
          if (!window.XMLHttpRequest) {
              return;
          }
          var xhrSend = XMLHttpRequest.prototype.send;
          var xhrEvent = function (event) {
              try {
                  if (event && event.currentTarget && (event.currentTarget.status >= 400 || event.currentTarget.status === 0)) {
                      _this.logInfo = {
                          uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                          service: options.service,
                          serviceVersion: options.serviceVersion,
                          pagePath: options.pagePath,
                          category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].AJAX_ERROR,
                          grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                          errorUrl: event.target.responseURL,
                          message: event.target.response,
                          collector: options.collector,
                          stack: event.type + ':' + event.target.response,
                      };
                      _this.traceInfo();
                  }
              }
              catch (error) {
                  console.log(error);
              }
          };
          XMLHttpRequest.prototype.send = function () {
              if (this.addEventListener) {
                  this.addEventListener('error', xhrEvent);
                  this.addEventListener('abort', xhrEvent);
                  this.addEventListener('timeout', xhrEvent);
              }
              else {
                  var stateChange_1 = this.onreadystatechange;
                  this.onreadystatechange = function (event) {
                      stateChange_1.apply(this, arguments);
                      if (this.readyState === 4) {
                          xhrEvent(event);
                      }
                  };
              }
              return xhrSend.apply(this, arguments);
          };
      };
      return AjaxErrors;
  }(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
  /* harmony default export */ __webpack_exports__["default"] = (new AjaxErrors());
  
  
  /***/ }),
  
  /***/ "./src/errors/index.ts":
  /*!*****************************!*\
    !*** ./src/errors/index.ts ***!
    \*****************************/
  /*! exports provided: JSErrors, PromiseErrors, AjaxErrors, ResourceErrors, VueErrors */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js */ "./src/errors/js.ts");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSErrors", function() { return _js__WEBPACK_IMPORTED_MODULE_0__["default"]; });
  
  /* harmony import */ var _promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promise */ "./src/errors/promise.ts");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromiseErrors", function() { return _promise__WEBPACK_IMPORTED_MODULE_1__["default"]; });
  
  /* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax */ "./src/errors/ajax.ts");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxErrors", function() { return _ajax__WEBPACK_IMPORTED_MODULE_2__["default"]; });
  
  /* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resource */ "./src/errors/resource.ts");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceErrors", function() { return _resource__WEBPACK_IMPORTED_MODULE_3__["default"]; });
  
  /* harmony import */ var _vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vue */ "./src/errors/vue.ts");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueErrors", function() { return _vue__WEBPACK_IMPORTED_MODULE_4__["default"]; });
  
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  
  
  
  
  
  
  
  /***/ }),
  
  /***/ "./src/errors/js.ts":
  /*!**************************!*\
    !*** ./src/errors/js.ts ***!
    \**************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  
  
  
  var JSErrors = /** @class */ (function (_super) {
      __extends(JSErrors, _super);
      function JSErrors() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      JSErrors.prototype.handleErrors = function (options) {
          var _this = this;
          window.onerror = function (message, url, line, col, error) {
              _this.logInfo = {
                  uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                  service: options.service,
                  serviceVersion: options.serviceVersion,
                  pagePath: options.pagePath,
                  category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].JS_ERROR,
                  grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                  errorUrl: url,
                  line: line,
                  col: col,
                  message: message,
                  collector: options.collector,
                  stack: error.stack,
              };
              _this.traceInfo();
          };
      };
      return JSErrors;
  }(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
  /* harmony default export */ __webpack_exports__["default"] = (new JSErrors());
  
  
  /***/ }),
  
  /***/ "./src/errors/promise.ts":
  /*!*******************************!*\
    !*** ./src/errors/promise.ts ***!
    \*******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  
  
  
  var PromiseErrors = /** @class */ (function (_super) {
      __extends(PromiseErrors, _super);
      function PromiseErrors() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      PromiseErrors.prototype.handleErrors = function (options) {
          var _this = this;
          window.addEventListener('unhandledrejection', function (event) {
              try {
                  var url = '';
                  if (!event || !event.reason) {
                      return;
                  }
                  if (event.reason.config && event.reason.config.url) {
                      url = event.reason.config.url;
                  }
                  _this.logInfo = {
                      uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                      service: options.service,
                      serviceVersion: options.serviceVersion,
                      pagePath: options.pagePath,
                      category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].PROMISE_ERROR,
                      grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                      errorUrl: url || location.href,
                      message: event.reason.message,
                      stack: event.reason.stack,
                      collector: options.collector,
                  };
                  _this.traceInfo();
              }
              catch (error) {
                  console.log(error);
              }
          });
      };
      return PromiseErrors;
  }(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
  /* harmony default export */ __webpack_exports__["default"] = (new PromiseErrors());
  
  
  /***/ }),
  
  /***/ "./src/errors/resource.ts":
  /*!********************************!*\
    !*** ./src/errors/resource.ts ***!
    \********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  
  
  
  var ResourceErrors = /** @class */ (function (_super) {
      __extends(ResourceErrors, _super);
      function ResourceErrors() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ResourceErrors.prototype.handleErrors = function (options) {
          var _this = this;
          window.addEventListener('error', function (event) {
              try {
                  if (!event) {
                      return;
                  }
                  var target = event.target || event.srcElement;
                  var isElementTarget = target instanceof HTMLScriptElement ||
                      target instanceof HTMLLinkElement ||
                      target instanceof HTMLImageElement;
                  if (!isElementTarget) {
                      // return js error
                      return;
                  }
                  _this.logInfo = {
                      uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                      service: options.service,
                      serviceVersion: options.serviceVersion,
                      pagePath: options.pagePath,
                      category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].RESOURCE_ERROR,
                      grade: target.tagName === 'IMG' ? _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].WARNING : _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                      errorUrl: target.src || target.href || location.href,
                      message: "load " + target.tagName + " resource error",
                      collector: options.collector,
                      stack: "load " + target.tagName + " resource error",
                  };
                  _this.traceInfo();
              }
              catch (error) {
                  throw error;
              }
          });
      };
      return ResourceErrors;
  }(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
  /* harmony default export */ __webpack_exports__["default"] = (new ResourceErrors());
  
  
  /***/ }),
  
  /***/ "./src/errors/vue.ts":
  /*!***************************!*\
    !*** ./src/errors/vue.ts ***!
    \***************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  
  
  
  var VueErrors = /** @class */ (function (_super) {
      __extends(VueErrors, _super);
      function VueErrors() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      VueErrors.prototype.handleErrors = function (options, Vue) {
          var _this = this;
          Vue.config.errorHandler = function (error, vm, info) {
              try {
                  _this.logInfo = {
                      uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                      service: options.service,
                      serviceVersion: options.serviceVersion,
                      pagePath: options.pagePath,
                      category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].VUE_ERROR,
                      grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                      errorUrl: location.href,
                      message: info,
                      collector: options.collector,
                      stack: error.stack,
                  };
                  _this.traceInfo();
              }
              catch (error) {
                  throw error;
              }
          };
      };
      return VueErrors;
  }(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
  /* harmony default export */ __webpack_exports__["default"] = (new VueErrors());
  
  
  /***/ }),
  
  /***/ "./src/index.ts":
  /*!**********************!*\
    !*** ./src/index.ts ***!
    \**********************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ "./src/monitor.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  window.ClientMonitor = _monitor__WEBPACK_IMPORTED_MODULE_0__["default"];
  /* harmony default export */ __webpack_exports__["default"] = (_monitor__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  
  /***/ }),
  
  /***/ "./src/interceptors/fetch.js":
  /*!***********************************!*\
    !*** ./src/interceptors/fetch.js ***!
    \***********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return windowFetch; });
  /* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  
  function windowFetch() {
    window.fetch = whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__["fetch"];
  }
  
  
  /***/ }),
  
  /***/ "./src/interceptors/xhr.ts":
  /*!*********************************!*\
    !*** ./src/interceptors/xhr.ts ***!
    \*********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return xhrInterceptor; });
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function xhrInterceptor() {
      var originalXHR = window.XMLHttpRequest;
      var xhrSend = XMLHttpRequest.prototype.send;
      var xhrOpen = XMLHttpRequest.prototype.open;
      originalXHR.getRequestConfig = [];
      function ajaxEventTrigger(event) {
          var ajaxEvent = new CustomEvent(event, { detail: this });
          window.dispatchEvent(ajaxEvent);
      }
      function customizedXHR() {
          var liveXHR = new originalXHR();
          liveXHR.addEventListener('readystatechange', function () {
              ajaxEventTrigger.call(this, 'xhrReadyStateChange');
          }, false);
          liveXHR.open = function (method, url, async, username, password) {
              this.getRequestConfig = arguments;
              return xhrOpen.apply(this, arguments);
          };
          liveXHR.send = function (body) {
              return xhrSend.apply(this, arguments);
          };
          return liveXHR;
      }
      window.XMLHttpRequest = customizedXHR;
  }
  
  
  /***/ }),
  
  /***/ "./src/monitor.ts":
  /*!************************!*\
    !*** ./src/monitor.ts ***!
    \************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _errors_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/index */ "./src/errors/index.ts");
  /* harmony import */ var _performance_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performance/index */ "./src/performance/index.ts");
  /* harmony import */ var _trace_segment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trace/segment */ "./src/trace/segment.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  
  
  
  var ClientMonitor = {
      customOptions: {
          collector: location.origin,
          jsErrors: true,
          apiErrors: true,
          resourceErrors: true,
          autoTracePerf: true,
          useFmp: false,
          enableSPA: false,
          traceSDKInternal: false,
          detailMode: true,
      },
      register: function (configs) {
          this.customOptions = __assign(__assign({}, this.customOptions), configs);
          this.errors(this.customOptions);
          if (!this.customOptions.enableSPA) {
              this.performance(this.customOptions);
          }
          Object(_trace_segment__WEBPACK_IMPORTED_MODULE_2__["default"])(this.customOptions);
      },
      performance: function (configs) {
          // trace and report perf data and pv to serve when page loaded
          if (document.readyState === 'complete') {
              _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
          }
          else {
              window.addEventListener('load', function () {
                  _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
              }, false);
          }
          if (this.customOptions.enableSPA) {
              // hash router
              window.addEventListener('hashchange', function () {
                  _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
              }, false);
          }
      },
      errors: function (options) {
          var service = options.service, pagePath = options.pagePath, serviceVersion = options.serviceVersion, collector = options.collector;
          if (options.jsErrors) {
              _errors_index__WEBPACK_IMPORTED_MODULE_0__["JSErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
              _errors_index__WEBPACK_IMPORTED_MODULE_0__["PromiseErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
              if (options.vue) {
                  _errors_index__WEBPACK_IMPORTED_MODULE_0__["VueErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector }, options.vue);
              }
          }
          if (options.apiErrors) {
              _errors_index__WEBPACK_IMPORTED_MODULE_0__["AjaxErrors"].handleError({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
          }
          if (options.resourceErrors) {
              _errors_index__WEBPACK_IMPORTED_MODULE_0__["ResourceErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
          }
      },
      setPerformance: function (configs) {
          // history router
          this.customOptions = __assign(__assign({}, this.customOptions), configs);
          this.performance(this.customOptions);
      },
  };
  /* harmony default export */ __webpack_exports__["default"] = (ClientMonitor);
  
  
  /***/ }),
  
  /***/ "./src/performance/fmp.ts":
  /*!********************************!*\
    !*** ./src/performance/fmp.ts ***!
    \********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var getStyle = function (element, attr) {
      if (window.getComputedStyle) {
          return window.getComputedStyle(element, null)[attr];
      }
      else {
          return element.currentStyle[attr];
      }
  };
  // element weight for calculate score
  var ELE_WEIGHT;
  (function (ELE_WEIGHT) {
      ELE_WEIGHT[ELE_WEIGHT["SVG"] = 2] = "SVG";
      ELE_WEIGHT[ELE_WEIGHT["IMG"] = 2] = "IMG";
      ELE_WEIGHT[ELE_WEIGHT["CANVAS"] = 4] = "CANVAS";
      ELE_WEIGHT[ELE_WEIGHT["OBJECT"] = 4] = "OBJECT";
      ELE_WEIGHT[ELE_WEIGHT["EMBED"] = 4] = "EMBED";
      ELE_WEIGHT[ELE_WEIGHT["VIDEO"] = 4] = "VIDEO";
  })(ELE_WEIGHT || (ELE_WEIGHT = {}));
  var START_TIME = performance.now();
  var IGNORE_TAG_SET = ['SCRIPT', 'STYLE', 'META', 'HEAD', 'LINK'];
  var LIMIT = 3000;
  var WW = window.innerWidth;
  var WH = window.innerHeight;
  var DELAY = 500; // fmp retry interval
  var FMPTiming = /** @class */ (function () {
      function FMPTiming() {
          this.fmpTime = 0;
          this.statusCollector = []; // nodes change time
          this.flag = true;
          this.observer = null;
          this.callbackCount = 0;
          this.entries = {};
          if (!performance || !performance.getEntries) {
              console.log('your browser do not support performance.getEntries');
              return;
          }
          this.initObserver();
      }
      FMPTiming.prototype.getFirstSnapShot = function () {
          var time = performance.now();
          var $body = document.body;
          if ($body) {
              this.setTag($body, this.callbackCount);
          }
          this.statusCollector.push({
              time: time,
          });
      };
      FMPTiming.prototype.initObserver = function () {
          var _this = this;
          this.getFirstSnapShot();
          this.observer = new MutationObserver(function () {
              _this.callbackCount += 1;
              var time = performance.now();
              var $body = document.body;
              if ($body) {
                  _this.setTag($body, _this.callbackCount);
              }
              _this.statusCollector.push({
                  time: time,
              });
          });
          // observe all child nodes
          this.observer.observe(document, {
              childList: true,
              subtree: true,
          });
          // calculate score when page loaded
          if (document.readyState === 'complete') {
              this.calculateFinalScore();
          }
          else {
              window.addEventListener('load', function () {
                  _this.calculateFinalScore();
              }, false);
          }
      };
      FMPTiming.prototype.calculateFinalScore = function () {
          var _this = this;
          if (MutationEvent && this.flag) {
              if (this.checkNeedCancel(START_TIME)) {
                  // cancel observer for dom change
                  this.observer.disconnect();
                  this.flag = false;
                  var res = this.getTreeScore(document.body);
                  var tp = null;
                  for (var _i = 0, _a = res.dpss; _i < _a.length; _i++) {
                      var item = _a[_i];
                      if (tp && tp.st) {
                          if (tp.st < item.st) {
                              tp = item;
                          }
                      }
                      else {
                          tp = item;
                      }
                  }
                  // Get all of soures load time
                  performance.getEntries().forEach(function (item) {
                      _this.entries[item.name] = item.responseEnd;
                  });
                  if (!tp) {
                      return false;
                  }
                  var resultEls = this.filterResult(tp.els);
                  var fmpTiming = this.getFmpTime(resultEls);
                  this.fmpTime = fmpTiming;
              }
              else {
                  setTimeout(function () {
                      _this.calculateFinalScore();
                  }, DELAY);
              }
          }
      };
      FMPTiming.prototype.getFmpTime = function (resultEls) {
          var rt = 0;
          for (var _i = 0, resultEls_1 = resultEls; _i < resultEls_1.length; _i++) {
              var item = resultEls_1[_i];
              var time = 0;
              if (item.weight === 1) {
                  var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                  time = this.statusCollector[index].time;
              }
              else if (item.weight === 2) {
                  if (item.ele.tagName === 'IMG') {
                      time = this.entries[item.ele.src];
                  }
                  else if (item.ele.tagName === 'SVG') {
                      var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                      time = this.statusCollector[index].time;
                  }
                  else {
                      var match = getStyle(item.ele, 'background-image').match(/url\(\"(.*?)\"\)/);
                      var url = void 0;
                      if (match && match[1]) {
                          url = match[1];
                      }
                      if (!url.includes('http')) {
                          url = location.protocol + match[1];
                      }
                      time = this.entries[url];
                  }
              }
              else if (item.weight === 4) {
                  if (item.ele.tagName === 'CANVAS') {
                      var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                      time = this.statusCollector[index] && this.statusCollector[index].time;
                  }
                  else if (item.ele.tagName === 'VIDEO') {
                      time = this.entries[item.ele.src];
                      if (!time) {
                          time = this.entries[item.ele.poster];
                      }
                  }
              }
              if (typeof time !== 'number') {
                  time = 0;
              }
              if (rt < time) {
                  rt = time;
              }
          }
          return rt;
      };
      /**
       * The nodes with the highest score in the visible area are collected and the average value is taken,
       * and the low score ones are eliminated
       */
      FMPTiming.prototype.filterResult = function (els) {
          if (els.length === 1) {
              return els;
          }
          var sum = 0;
          els.forEach(function (item) {
              sum += item.st;
          });
          var avg = sum / els.length;
          return els.filter(function (item) {
              return item.st > avg;
          });
      };
      FMPTiming.prototype.checkNeedCancel = function (start) {
          var time = performance.now() - start;
          var lastCalTime = this.statusCollector.length > 0 ? this.statusCollector[this.statusCollector.length - 1].time : 0;
          return time > LIMIT || time - lastCalTime > 1000;
      };
      FMPTiming.prototype.getTreeScore = function (node) {
          if (!node) {
              return {};
          }
          var dpss = [];
          var children = node.children;
          for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
              var child = children_1[_i];
              // Only calculate marked elements
              if (!child.getAttribute('fmp_c')) {
                  continue;
              }
              var s = this.getTreeScore(child);
              if (s.st) {
                  dpss.push(s);
              }
          }
          return this.calcaulteGrades(node, dpss);
      };
      FMPTiming.prototype.calcaulteGrades = function (ele, dpss) {
          var _a = ele.getBoundingClientRect(), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
          var isInViewPort = true;
          if (WH < top || WW < left) {
              isInViewPort = false;
          }
          var sdp = 0;
          dpss.forEach(function (item) {
              sdp += item.st;
          });
          var weight = Number(ELE_WEIGHT[ele.tagName]) || 1;
          // If there is a common element of the background image, it is calculated according to the picture
          if (weight === 1 &&
              getStyle(ele, 'background-image') &&
              getStyle(ele, 'background-image') !== 'initial' &&
              getStyle(ele, 'background-image') !== 'none') {
              weight = ELE_WEIGHT.IMG;
          }
          // score = the area of element
          var st = isInViewPort ? width * height * weight : 0;
          var els = [{ ele: ele, st: st, weight: weight }];
          var root = ele;
          // The percentage of the current element in the viewport
          var areaPercent = this.calculateAreaParent(ele);
          // If the sum of the child's weights is greater than the parent's true weight
          if (sdp > st * areaPercent || areaPercent === 0) {
              st = sdp;
              els = [];
              for (var _i = 0, dpss_1 = dpss; _i < dpss_1.length; _i++) {
                  var item = dpss_1[_i];
                  els = els.concat(item.els);
              }
          }
          return {
              dpss: dpss,
              st: st,
              els: els,
              root: root,
          };
      };
      FMPTiming.prototype.calculateAreaParent = function (ele) {
          var _a = ele.getBoundingClientRect(), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom, width = _a.width, height = _a.height;
          var winLeft = 0;
          var winTop = 0;
          var winRight = WW;
          var winBottom = WH;
          var overlapX = right - left + (winRight - winLeft) - (Math.max(right, winRight) - Math.min(left, winLeft));
          var overlapY = bottom - top + (winBottom - winTop) - (Math.max(bottom, winBottom) - Math.min(top, winTop));
          if (overlapX <= 0 || overlapY <= 0) {
              return 0;
          }
          return (overlapX * overlapY) / (width * height);
      };
      // Depth first traversal to mark nodes
      FMPTiming.prototype.setTag = function (target, callbackCount) {
          var tagName = target.tagName;
          if (IGNORE_TAG_SET.indexOf(tagName) === -1) {
              var $children = target.children;
              if ($children && $children.length > 0) {
                  for (var i = $children.length - 1; i >= 0; i--) {
                      var $child = $children[i];
                      var hasSetTag = $child.getAttribute('fmp_c') !== null;
                      // If it is not marked, whether the marking condition is met is detected
                      if (!hasSetTag) {
                          var _a = $child.getBoundingClientRect(), left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
                          if (WH < top_1 || WW < left || width === 0 || height === 0) {
                              continue;
                          }
                          $child.setAttribute('fmp_c', "" + callbackCount);
                      }
                      this.setTag($child, callbackCount);
                  }
              }
          }
      };
      return FMPTiming;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (FMPTiming);
  
  
  /***/ }),
  
  /***/ "./src/performance/index.ts":
  /*!**********************************!*\
    !*** ./src/performance/index.ts ***!
    \**********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _services_report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/report */ "./src/services/report.ts");
  /* harmony import */ var _perf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perf */ "./src/performance/perf.ts");
  /* harmony import */ var _fmp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fmp */ "./src/performance/fmp.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  
  
  
  var TracePerf = /** @class */ (function () {
      function TracePerf() {
          this.perfConfig = {
              perfDetail: {},
          };
      }
      TracePerf.prototype.recordPerf = function (options) {
          return __awaiter(this, void 0, void 0, function () {
              var fmp, _a;
              var _this = this;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          fmp = { fmpTime: undefined };
                          if (!options.autoTracePerf) return [3 /*break*/, 3];
                          _a = this.perfConfig;
                          return [4 /*yield*/, new _perf__WEBPACK_IMPORTED_MODULE_1__["default"]().getPerfTiming()];
                      case 1:
                          _a.perfDetail = _b.sent();
                          if (!options.useFmp) return [3 /*break*/, 3];
                          return [4 /*yield*/, new _fmp__WEBPACK_IMPORTED_MODULE_2__["default"]()];
                      case 2:
                          fmp = _b.sent();
                          _b.label = 3;
                      case 3:
                          // auto report pv and perf data
                          setTimeout(function () {
                              var perfDetail = options.autoTracePerf
                                  ? __assign(__assign({}, _this.perfConfig.perfDetail), { fmpTime: options.useFmp ? parseInt(String(fmp.fmpTime), 10) : undefined }) : undefined;
                              var perfInfo = __assign(__assign({}, perfDetail), { pagePath: options.pagePath, serviceVersion: options.serviceVersion, service: options.service });
                              new _services_report__WEBPACK_IMPORTED_MODULE_0__["default"]('PERF', options.collector).sendByXhr(perfInfo);
                              // clear perf data
                              _this.clearPerf();
                          }, 30000);
                          return [2 /*return*/];
                  }
              });
          });
      };
      TracePerf.prototype.clearPerf = function () {
          if (!(window.performance && window.performance.clearResourceTimings)) {
              return;
          }
          window.performance.clearResourceTimings();
          this.perfConfig = {
              perfDetail: {},
          };
      };
      return TracePerf;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (new TracePerf());
  
  
  /***/ }),
  
  /***/ "./src/performance/perf.ts":
  /*!*********************************!*\
    !*** ./src/performance/perf.ts ***!
    \*********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var PagePerf = /** @class */ (function () {
      function PagePerf() {
      }
      PagePerf.prototype.getPerfTiming = function () {
          try {
              if (!window.performance || !window.performance.timing) {
                  console.log('your browser do not support performance');
                  return;
              }
              var timing = window.performance.timing;
              var redirectTime = 0;
              if (timing.navigationStart !== undefined) {
                  redirectTime = parseInt(String(timing.fetchStart - timing.navigationStart), 10);
              }
              else if (timing.redirectEnd !== undefined) {
                  redirectTime = parseInt(String(timing.redirectEnd - timing.redirectStart), 10);
              }
              else {
                  redirectTime = 0;
              }
              return {
                  redirectTime: redirectTime,
                  dnsTime: parseInt(String(timing.domainLookupEnd - timing.domainLookupStart), 10),
                  ttfbTime: parseInt(String(timing.responseStart - timing.requestStart), 10),
                  tcpTime: parseInt(String(timing.connectEnd - timing.connectStart), 10),
                  transTime: parseInt(String(timing.responseEnd - timing.responseStart), 10),
                  domAnalysisTime: parseInt(String(timing.domInteractive - timing.responseEnd), 10),
                  fptTime: parseInt(String(timing.responseEnd - timing.fetchStart), 10),
                  domReadyTime: parseInt(String(timing.domContentLoadedEventEnd - timing.fetchStart), 10),
                  loadPageTime: parseInt(String(timing.loadEventStart - timing.fetchStart), 10),
                  // Synchronous load resources in the page
                  resTime: parseInt(String(timing.loadEventStart - timing.domContentLoadedEventEnd), 10),
                  // Only valid for HTTPS
                  sslTime: location.protocol === 'https:' && timing.secureConnectionStart > 0
                      ? parseInt(String(timing.connectEnd - timing.secureConnectionStart), 10)
                      : undefined,
                  ttlTime: parseInt(String(timing.domInteractive - timing.fetchStart), 10),
                  firstPackTime: parseInt(String(timing.responseStart - timing.domainLookupStart), 10),
                  fmpTime: 0,
              };
          }
          catch (e) {
              throw e;
          }
      };
      return PagePerf;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (PagePerf);
  
  
  /***/ }),
  
  /***/ "./src/services/base.ts":
  /*!******************************!*\
    !*** ./src/services/base.ts ***!
    \******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/services/task.ts");
  /* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/services/constant.ts");
  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  
  var jsErrorPv = false;
  var Base = /** @class */ (function () {
      function Base() {
          this.logInfo = {
              uniqueId: '',
              service: '',
              serviceVersion: '',
              pagePath: '',
              category: _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].UNKNOWN_ERROR,
              grade: _constant__WEBPACK_IMPORTED_MODULE_1__["GradeTypeEnum"].INFO,
              errorUrl: '',
              line: 0,
              col: 0,
              message: '',
              firstReportedError: false,
              collector: '',
          };
      }
      Base.prototype.traceInfo = function () {
          // mark js error pv
          if (!jsErrorPv && this.logInfo.category === _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].JS_ERROR) {
              jsErrorPv = true;
              this.logInfo.firstReportedError = true;
          }
          this.handleRecordError();
          setTimeout(function () {
              _task__WEBPACK_IMPORTED_MODULE_0__["default"].fireTasks();
          }, 100);
      };
      Base.prototype.handleRecordError = function () {
          try {
              if (!this.logInfo.message) {
                  return;
              }
              var errorInfo = this.handleErrorInfo();
              _task__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(errorInfo);
          }
          catch (error) {
              throw error;
          }
      };
      Base.prototype.handleErrorInfo = function () {
          var message = "error category:" + this.logInfo.category + "\r\n log info:" + this.logInfo.message + "\r\n\n      error url: " + this.logInfo.errorUrl + "\r\n ";
          switch (this.logInfo.category) {
              case _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].JS_ERROR:
                  message += "error line number: " + this.logInfo.line + "\r\n error col number:" + this.logInfo.col + "\r\n";
                  break;
              default:
                  message;
                  break;
          }
          var recordInfo = __assign(__assign({}, this.logInfo), { message: message });
          return recordInfo;
      };
      return Base;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (Base);
  
  
  /***/ }),
  
  /***/ "./src/services/constant.ts":
  /*!**********************************!*\
    !*** ./src/services/constant.ts ***!
    \**********************************/
  /*! exports provided: ErrorsCategory, GradeTypeEnum, ReportTypes, SpanLayer, SpanType, ReadyStatus, ComponentId, ServiceTag */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorsCategory", function() { return ErrorsCategory; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeTypeEnum", function() { return GradeTypeEnum; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportTypes", function() { return ReportTypes; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpanLayer", function() { return SpanLayer; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpanType", function() { return SpanType; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadyStatus", function() { return ReadyStatus; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentId", function() { return ComponentId; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceTag", function() { return ServiceTag; });
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var ErrorsCategory;
  (function (ErrorsCategory) {
      ErrorsCategory["AJAX_ERROR"] = "ajax";
      ErrorsCategory["RESOURCE_ERROR"] = "resource";
      ErrorsCategory["VUE_ERROR"] = "vue";
      ErrorsCategory["PROMISE_ERROR"] = "promise";
      ErrorsCategory["JS_ERROR"] = "js";
      ErrorsCategory["UNKNOWN_ERROR"] = "unknown";
  })(ErrorsCategory || (ErrorsCategory = {}));
  var GradeTypeEnum;
  (function (GradeTypeEnum) {
      GradeTypeEnum["INFO"] = "Info";
      GradeTypeEnum["WARNING"] = "Warning";
      GradeTypeEnum["ERROR"] = "Error";
  })(GradeTypeEnum || (GradeTypeEnum = {}));
  var ReportTypes;
  (function (ReportTypes) {
      ReportTypes["ERROR"] = "/browser/errorLog";
      ReportTypes["ERRORS"] = "/browser/errorLogs";
      ReportTypes["PERF"] = "/browser/perfData";
      ReportTypes["SEGMENT"] = "/v3/segment";
      ReportTypes["SEGMENTS"] = "/v3/segments";
  })(ReportTypes || (ReportTypes = {}));
  var SpanLayer = 'Http';
  var SpanType = 'Exit';
  var ReadyStatus;
  (function (ReadyStatus) {
      ReadyStatus[ReadyStatus["OPENED"] = 1] = "OPENED";
      ReadyStatus[ReadyStatus["DONE"] = 4] = "DONE";
  })(ReadyStatus || (ReadyStatus = {}));
  var ComponentId = 10001; // ajax
  var ServiceTag = '<browser>';
  
  
  /***/ }),
  
  /***/ "./src/services/report.ts":
  /*!********************************!*\
    !*** ./src/services/report.ts ***!
    \********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/services/constant.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  var Report = /** @class */ (function () {
      function Report(type, collector) {
          this.url = '';
          if (type === 'ERROR') {
              this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].ERROR;
          }
          else if (type === 'ERRORS') {
              this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].ERRORS;
          }
          else if (type === 'SEGMENT') {
              this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].SEGMENT;
          }
          else if (type === 'SEGMENTS') {
              this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].SEGMENTS;
          }
          else if (type === 'PERF') {
              this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].PERF;
          }
      }
      Report.prototype.sendByFetch = function (data) {
          delete data.collector;
          if (!this.url) {
              return;
          }
          var sendRequest = new Request(this.url, { method: 'POST', body: JSON.stringify(data) });
          fetch(sendRequest)
              .then(function (response) {
              if (response.status >= 400 || response.status === 0) {
                  throw new Error('Something went wrong on api server!');
              }
          })
              .catch(function (error) {
              console.error(error);
          });
      };
      Report.prototype.sendByXhr = function (data) {
          delete data.collector;
          if (!this.url) {
              return;
          }
          var xhr = new XMLHttpRequest();
          xhr.open('post', this.url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status < 400) {
                  console.log('Report successfully');
              }
          };
          xhr.send(JSON.stringify(data));
      };
      return Report;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (Report);
  
  
  /***/ }),
  
  /***/ "./src/services/task.ts":
  /*!******************************!*\
    !*** ./src/services/task.ts ***!
    \******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./report */ "./src/services/report.ts");
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  var TaskQueue = /** @class */ (function () {
      function TaskQueue() {
          this.queues = [];
      }
      TaskQueue.prototype.addTask = function (data) {
          this.queues.push({ data: data });
      };
      TaskQueue.prototype.fireTasks = function () {
          if (!this.queues || !this.queues.length) {
              return;
          }
          var item = this.queues[0];
          new _report__WEBPACK_IMPORTED_MODULE_0__["default"]('ERROR', item.data.collector).sendByXhr(item.data);
          this.queues.splice(0, 1);
          this.fireTasks();
      };
      return TaskQueue;
  }());
  /* harmony default export */ __webpack_exports__["default"] = (new TaskQueue());
  
  
  /***/ }),
  
  /***/ "./src/services/uuid.ts":
  /*!******************************!*\
    !*** ./src/services/uuid.ts ***!
    \******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uuid; });
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          /* tslint:disable */
          var r = (Math.random() * 16) | 0;
          /* tslint:disable */
          var v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
      });
  }
  
  
  /***/ }),
  
  /***/ "./src/trace/segment.ts":
  /*!******************************!*\
    !*** ./src/trace/segment.ts ***!
    \******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return traceSegment; });
  /* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.mjs");
  /* harmony import */ var _interceptors_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interceptors/xhr */ "./src/interceptors/xhr.ts");
  /* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
  /* harmony import */ var _services_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/report */ "./src/services/report.ts");
  /* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
  /* harmony import */ var _interceptors_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../interceptors/fetch */ "./src/interceptors/fetch.js");
  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  /**
   * Licensed to the Apache Software Foundation (ASF) under one or more
   * contributor license agreements.  See the NOTICE file distributed with
   * this work for additional information regarding copyright ownership.
   * The ASF licenses this file to You under the Apache License, Version 2.0
   * (the "License"); you may not use this file except in compliance with
   * the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  
  
  
  
  
  
  function traceSegment(options) {
      var segments = [];
      var segCollector = [];
      // inject interceptor
      Object(_interceptors_xhr__WEBPACK_IMPORTED_MODULE_1__["default"])();
      Object(_interceptors_fetch__WEBPACK_IMPORTED_MODULE_5__["default"])();
      window.addEventListener('xhrReadyStateChange', function (event) {
          var segment = {
              traceId: '',
              service: options.service + _services_constant__WEBPACK_IMPORTED_MODULE_4__["ServiceTag"],
              spans: [],
              serviceInstance: options.serviceVersion,
              traceSegmentId: '',
          };
          var xhrState = event.detail.readyState;
          var config = event.detail.getRequestConfig;
          var url = {};
          if (config[1].startsWith('http://') || config[1].startsWith('https://') || config[1].startsWith('//')) {
              url = new URL(config[1]);
          }
          else {
              url = new URL(window.location.href);
              url.pathname = config[1];
          }
          if ([_services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].ERROR, _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].PERF, _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].SEGMENTS].includes(url.pathname) &&
              !options.traceSDKInternal) {
              return;
          }
          // The values of xhrState are from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
          if (xhrState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].OPENED) {
              var traceId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
              var traceSegmentId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
              segCollector.push({
                  event: event.detail,
                  startTime: new Date().getTime(),
                  traceId: traceId,
                  traceSegmentId: traceSegmentId,
              });
              var traceIdStr = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(traceId));
              var segmentId = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(traceSegmentId));
              var service = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(segment.service));
              var instance = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(segment.serviceInstance));
              var endpoint = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(options.pagePath));
              var peer = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(url.host));
              var index = segment.spans.length;
              var values = 1 + "-" + traceIdStr + "-" + segmentId + "-" + index + "-" + service + "-" + instance + "-" + endpoint + "-" + peer;
              event.detail.setRequestHeader('sw8', values);
          }
          if (xhrState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].DONE) {
              var endTime = new Date().getTime();
              for (var i = 0; i < segCollector.length; i++) {
                  if (segCollector[i].event.readyState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].DONE) {
                      var url_1 = {};
                      if (segCollector[i].event.status) {
                          url_1 = new URL(segCollector[i].event.responseURL);
                      }
                      var exitSpan = {
                          operationName: options.pagePath,
                          startTime: segCollector[i].startTime,
                          endTime: endTime,
                          spanId: segment.spans.length,
                          spanLayer: _services_constant__WEBPACK_IMPORTED_MODULE_4__["SpanLayer"],
                          spanType: _services_constant__WEBPACK_IMPORTED_MODULE_4__["SpanType"],
                          isError: event.detail.status === 0 || event.detail.status >= 400 ? true : false,
                          parentSpanId: segment.spans.length - 1,
                          componentId: _services_constant__WEBPACK_IMPORTED_MODULE_4__["ComponentId"],
                          peer: url_1.host,
                          tags: options.detailMode
                              ? [
                                  {
                                      key: 'http.method',
                                      value: config[0],
                                  },
                                  {
                                      key: 'url',
                                      value: segCollector[i].event.responseURL,
                                  },
                              ]
                              : undefined,
                      };
                      segment = __assign(__assign({}, segment), { traceId: segCollector[i].traceId, traceSegmentId: segCollector[i].traceSegmentId });
                      segment.spans.push(exitSpan);
                      segCollector.splice(i, 1);
                  }
              }
              segments.push(segment);
          }
      });
      window.onbeforeunload = function (e) {
          if (!segments.length) {
              return;
          }
          new _services_report__WEBPACK_IMPORTED_MODULE_3__["default"]('SEGMENTS', options.collector).sendByXhr(segments);
      };
      //report per 5min
      setInterval(function () {
          if (!segments.length) {
              return;
          }
          new _services_report__WEBPACK_IMPORTED_MODULE_3__["default"]('SEGMENTS', options.collector).sendByXhr(segments);
          segments = [];
      }, 300000);
  }
  
  
  /***/ })
  
  /******/ });
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzLWJhc2U2NC9iYXNlNjQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9hamF4LnRzIiwid2VicGFjazovLy8uL3NyYy9lcnJvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9qcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3JzL3Byb21pc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9yZXNvdXJjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3JzL3Z1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL3hoci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9uaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyZm9ybWFuY2UvZm1wLnRzIiwid2VicGFjazovLy8uL3NyYy9wZXJmb3JtYW5jZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyZm9ybWFuY2UvcGVyZi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvY29uc3RhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL3JlcG9ydC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvdGFzay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvdXVpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhY2Uvc2VnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0I7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztR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UzdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JELE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDYixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMDQyYmJiNWM2NWU2YTk0NTBmYzNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXgudHNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8qKlxuICogIGJhc2U2NC50c1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQlNEIDMtQ2xhdXNlIExpY2Vuc2UuXG4gKiAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKlxuICogIFJlZmVyZW5jZXM6XG4gKiAgICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NFxuICpcbiAqIEBhdXRob3IgRGFuIEtvZ2FpIChodHRwczovL2dpdGh1Yi5jb20vZGFua29nYWkpXG4gKi9cbmNvbnN0IHZlcnNpb24gPSAnMy42LjAnO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgbG93ZXJjYXNlIGB2ZXJzaW9uYC5cbiAqL1xuY29uc3QgVkVSU0lPTiA9IHZlcnNpb247XG5jb25zdCBfaGFzYXRvYiA9IHR5cGVvZiBhdG9iID09PSAnZnVuY3Rpb24nO1xuY29uc3QgX2hhc2J0b2EgPSB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IF9oYXNCdWZmZXIgPSB0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nO1xuY29uc3QgX1REID0gdHlwZW9mIFRleHREZWNvZGVyID09PSAnZnVuY3Rpb24nID8gbmV3IFRleHREZWNvZGVyKCkgOiB1bmRlZmluZWQ7XG5jb25zdCBfVEUgPSB0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBuZXcgVGV4dEVuY29kZXIoKSA6IHVuZGVmaW5lZDtcbmNvbnN0IGI2NGNoID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcbmNvbnN0IGI2NGNocyA9IFsuLi5iNjRjaF07XG5jb25zdCBiNjR0YWIgPSAoKGEpID0+IHtcbiAgICBsZXQgdGFiID0ge307XG4gICAgYS5mb3JFYWNoKChjLCBpKSA9PiB0YWJbY10gPSBpKTtcbiAgICByZXR1cm4gdGFiO1xufSkoYjY0Y2hzKTtcbmNvbnN0IGI2NHJlID0gL14oPzpbQS1aYS16XFxkK1xcL117NH0pKj8oPzpbQS1aYS16XFxkK1xcL117Mn0oPzo9PSk/fFtBLVphLXpcXGQrXFwvXXszfT0/KT8kLztcbmNvbnN0IF9mcm9tQ0MgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmJpbmQoU3RyaW5nKTtcbmNvbnN0IF9VOEFmcm9tID0gdHlwZW9mIFVpbnQ4QXJyYXkuZnJvbSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gVWludDhBcnJheS5mcm9tLmJpbmQoVWludDhBcnJheSlcbiAgICA6IChpdCwgZm4gPSAoeCkgPT4geCkgPT4gbmV3IFVpbnQ4QXJyYXkoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaXQsIDApLm1hcChmbikpO1xuY29uc3QgX21rVXJpU2FmZSA9IChzcmMpID0+IHNyY1xuICAgIC5yZXBsYWNlKC9bK1xcL10vZywgKG0wKSA9PiBtMCA9PSAnKycgPyAnLScgOiAnXycpXG4gICAgLnJlcGxhY2UoLz0rJC9tLCAnJyk7XG5jb25zdCBfdGlkeUI2NCA9IChzKSA9PiBzLnJlcGxhY2UoL1teQS1aYS16MC05XFwrXFwvXS9nLCAnJyk7XG4vKipcbiAqIHBvbHlmaWxsIHZlcnNpb24gb2YgYGJ0b2FgXG4gKi9cbmNvbnN0IGJ0b2FQb2x5ZmlsbCA9IChiaW4pID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygncG9seWZpbGxlZCcpO1xuICAgIGxldCB1MzIsIGMwLCBjMSwgYzIsIGFzYyA9ICcnO1xuICAgIGNvbnN0IHBhZCA9IGJpbi5sZW5ndGggJSAzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluLmxlbmd0aDspIHtcbiAgICAgICAgaWYgKChjMCA9IGJpbi5jaGFyQ29kZUF0KGkrKykpID4gMjU1IHx8XG4gICAgICAgICAgICAoYzEgPSBiaW4uY2hhckNvZGVBdChpKyspKSA+IDI1NSB8fFxuICAgICAgICAgICAgKGMyID0gYmluLmNoYXJDb2RlQXQoaSsrKSkgPiAyNTUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIGNoYXJhY3RlciBmb3VuZCcpO1xuICAgICAgICB1MzIgPSAoYzAgPDwgMTYpIHwgKGMxIDw8IDgpIHwgYzI7XG4gICAgICAgIGFzYyArPSBiNjRjaHNbdTMyID4+IDE4ICYgNjNdXG4gICAgICAgICAgICArIGI2NGNoc1t1MzIgPj4gMTIgJiA2M11cbiAgICAgICAgICAgICsgYjY0Y2hzW3UzMiA+PiA2ICYgNjNdXG4gICAgICAgICAgICArIGI2NGNoc1t1MzIgJiA2M107XG4gICAgfVxuICAgIHJldHVybiBwYWQgPyBhc2Muc2xpY2UoMCwgcGFkIC0gMykgKyBcIj09PVwiLnN1YnN0cmluZyhwYWQpIDogYXNjO1xufTtcbi8qKlxuICogZG9lcyB3aGF0IGB3aW5kb3cuYnRvYWAgb2Ygd2ViIGJyb3dzZXJzIGRvLlxuICogQHBhcmFtIHtTdHJpbmd9IGJpbiBiaW5hcnkgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQtZW5jb2RlZCBzdHJpbmdcbiAqL1xuY29uc3QgX2J0b2EgPSBfaGFzYnRvYSA/IChiaW4pID0+IGJ0b2EoYmluKVxuICAgIDogX2hhc0J1ZmZlciA/IChiaW4pID0+IEJ1ZmZlci5mcm9tKGJpbiwgJ2JpbmFyeScpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgICAgICA6IGJ0b2FQb2x5ZmlsbDtcbmNvbnN0IF9mcm9tVWludDhBcnJheSA9IF9oYXNCdWZmZXJcbiAgICA/ICh1OGEpID0+IEJ1ZmZlci5mcm9tKHU4YSkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgOiAodThhKSA9PiB7XG4gICAgICAgIC8vIGNmLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjcxMDAwMS9ob3ctdG8tY29udmVydC11aW50OC1hcnJheS10by1iYXNlNjQtZW5jb2RlZC1zdHJpbmcvMTI3MTMzMjYjMTI3MTMzMjZcbiAgICAgICAgY29uc3QgbWF4YXJncyA9IDB4MTAwMDtcbiAgICAgICAgbGV0IHN0cnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1OGEubGVuZ3RoOyBpIDwgbDsgaSArPSBtYXhhcmdzKSB7XG4gICAgICAgICAgICBzdHJzLnB1c2goX2Zyb21DQy5hcHBseShudWxsLCB1OGEuc3ViYXJyYXkoaSwgaSArIG1heGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9idG9hKHN0cnMuam9pbignJykpO1xuICAgIH07XG4vKipcbiAqIGNvbnZlcnRzIGEgVWludDhBcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1cmxzYWZlXSBVUkwtYW5kLWZpbGVuYW1lLXNhZmUgYSBsYSBSRkM0NjQ4IMKnNVxuICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IHN0cmluZ1xuICovXG5jb25zdCBmcm9tVWludDhBcnJheSA9ICh1OGEsIHVybHNhZmUgPSBmYWxzZSkgPT4gdXJsc2FmZSA/IF9ta1VyaVNhZmUoX2Zyb21VaW50OEFycmF5KHU4YSkpIDogX2Zyb21VaW50OEFycmF5KHU4YSk7XG4vLyBUaGlzIHRyaWNrIGlzIGZvdW5kIGJyb2tlbiBodHRwczovL2dpdGh1Yi5jb20vZGFua29nYWkvanMtYmFzZTY0L2lzc3Vlcy8xMzBcbi8vIGNvbnN0IHV0b2IgPSAoc3JjOiBzdHJpbmcpID0+IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzcmMpKTtcbi8vIHJldmVydGluZyBnb29kIG9sZCBmYXRpb25lZCByZWdleHBcbmNvbnN0IGNiX3V0b2IgPSAoYykgPT4ge1xuICAgIGlmIChjLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdmFyIGNjID0gYy5jaGFyQ29kZUF0KDApO1xuICAgICAgICByZXR1cm4gY2MgPCAweDgwID8gY1xuICAgICAgICAgICAgOiBjYyA8IDB4ODAwID8gKF9mcm9tQ0MoMHhjMCB8IChjYyA+Pj4gNikpXG4gICAgICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoY2MgJiAweDNmKSkpXG4gICAgICAgICAgICAgICAgOiAoX2Zyb21DQygweGUwIHwgKChjYyA+Pj4gMTIpICYgMHgwZikpXG4gICAgICAgICAgICAgICAgICAgICsgX2Zyb21DQygweDgwIHwgKChjYyA+Pj4gNikgJiAweDNmKSlcbiAgICAgICAgICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoY2MgJiAweDNmKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGNjID0gMHgxMDAwMFxuICAgICAgICAgICAgKyAoYy5jaGFyQ29kZUF0KDApIC0gMHhEODAwKSAqIDB4NDAwXG4gICAgICAgICAgICArIChjLmNoYXJDb2RlQXQoMSkgLSAweERDMDApO1xuICAgICAgICByZXR1cm4gKF9mcm9tQ0MoMHhmMCB8ICgoY2MgPj4+IDE4KSAmIDB4MDcpKVxuICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoKGNjID4+PiAxMikgJiAweDNmKSlcbiAgICAgICAgICAgICsgX2Zyb21DQygweDgwIHwgKChjYyA+Pj4gNikgJiAweDNmKSlcbiAgICAgICAgICAgICsgX2Zyb21DQygweDgwIHwgKGNjICYgMHgzZikpKTtcbiAgICB9XG59O1xuY29uc3QgcmVfdXRvYiA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZGXXxbXlxceDAwLVxceDdGXS9nO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBzaG91bGQgaGF2ZSBiZWVuIGludGVybmFsIHVzZSBvbmx5LlxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyBVVEYtOCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVURi0xNiBzdHJpbmdcbiAqL1xuY29uc3QgdXRvYiA9ICh1KSA9PiB1LnJlcGxhY2UocmVfdXRvYiwgY2JfdXRvYik7XG4vL1xuY29uc3QgX2VuY29kZSA9IF9oYXNCdWZmZXJcbiAgICA/IChzKSA9PiBCdWZmZXIuZnJvbShzLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgIDogX1RFXG4gICAgICAgID8gKHMpID0+IF9mcm9tVWludDhBcnJheShfVEUuZW5jb2RlKHMpKVxuICAgICAgICA6IChzKSA9PiBfYnRvYSh1dG9iKHMpKTtcbi8qKlxuICogY29udmVydHMgYSBVVEYtOC1lbmNvZGVkIHN0cmluZyB0byBhIEJhc2U2NCBzdHJpbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1cmxzYWZlXSBpZiBgdHJ1ZWAgbWFrZSB0aGUgcmVzdWx0IFVSTC1zYWZlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgc3RyaW5nXG4gKi9cbmNvbnN0IGVuY29kZSA9IChzcmMsIHVybHNhZmUgPSBmYWxzZSkgPT4gdXJsc2FmZVxuICAgID8gX21rVXJpU2FmZShfZW5jb2RlKHNyYykpXG4gICAgOiBfZW5jb2RlKHNyYyk7XG4vKipcbiAqIGNvbnZlcnRzIGEgVVRGLTgtZW5jb2RlZCBzdHJpbmcgdG8gVVJMLXNhZmUgQmFzZTY0IFJGQzQ2NDggwqc1LlxuICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IHN0cmluZ1xuICovXG5jb25zdCBlbmNvZGVVUkkgPSAoc3JjKSA9PiBlbmNvZGUoc3JjLCB0cnVlKTtcbi8vIFRoaXMgdHJpY2sgaXMgZm91bmQgYnJva2VuIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5rb2dhaS9qcy1iYXNlNjQvaXNzdWVzLzEzMFxuLy8gY29uc3QgYnRvdSA9IChzcmM6IHN0cmluZykgPT4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShzcmMpKTtcbi8vIHJldmVydGluZyBnb29kIG9sZCBmYXRpb25lZCByZWdleHBcbmNvbnN0IHJlX2J0b3UgPSAvW1xceEMwLVxceERGXVtcXHg4MC1cXHhCRl18W1xceEUwLVxceEVGXVtcXHg4MC1cXHhCRl17Mn18W1xceEYwLVxceEY3XVtcXHg4MC1cXHhCRl17M30vZztcbmNvbnN0IGNiX2J0b3UgPSAoY2NjYykgPT4ge1xuICAgIHN3aXRjaCAoY2NjYy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgdmFyIGNwID0gKCgweDA3ICYgY2NjYy5jaGFyQ29kZUF0KDApKSA8PCAxOClcbiAgICAgICAgICAgICAgICB8ICgoMHgzZiAmIGNjY2MuY2hhckNvZGVBdCgxKSkgPDwgMTIpXG4gICAgICAgICAgICAgICAgfCAoKDB4M2YgJiBjY2NjLmNoYXJDb2RlQXQoMikpIDw8IDYpXG4gICAgICAgICAgICAgICAgfCAoMHgzZiAmIGNjY2MuY2hhckNvZGVBdCgzKSksIG9mZnNldCA9IGNwIC0gMHgxMDAwMDtcbiAgICAgICAgICAgIHJldHVybiAoX2Zyb21DQygob2Zmc2V0ID4+PiAxMCkgKyAweEQ4MDApXG4gICAgICAgICAgICAgICAgKyBfZnJvbUNDKChvZmZzZXQgJiAweDNGRikgKyAweERDMDApKTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIF9mcm9tQ0MoKCgweDBmICYgY2NjYy5jaGFyQ29kZUF0KDApKSA8PCAxMilcbiAgICAgICAgICAgICAgICB8ICgoMHgzZiAmIGNjY2MuY2hhckNvZGVBdCgxKSkgPDwgNilcbiAgICAgICAgICAgICAgICB8ICgweDNmICYgY2NjYy5jaGFyQ29kZUF0KDIpKSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gX2Zyb21DQygoKDB4MWYgJiBjY2NjLmNoYXJDb2RlQXQoMCkpIDw8IDYpXG4gICAgICAgICAgICAgICAgfCAoMHgzZiAmIGNjY2MuY2hhckNvZGVBdCgxKSkpO1xuICAgIH1cbn07XG4vKipcbiAqIEBkZXByZWNhdGVkIHNob3VsZCBoYXZlIGJlZW4gaW50ZXJuYWwgdXNlIG9ubHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIFVURi0xNiBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVURi04IHN0cmluZ1xuICovXG5jb25zdCBidG91ID0gKGIpID0+IGIucmVwbGFjZShyZV9idG91LCBjYl9idG91KTtcbi8qKlxuICogcG9seWZpbGwgdmVyc2lvbiBvZiBgYXRvYmBcbiAqL1xuY29uc3QgYXRvYlBvbHlmaWxsID0gKGFzYykgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdwb2x5ZmlsbGVkJyk7XG4gICAgYXNjID0gYXNjLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgIGlmICghYjY0cmUudGVzdChhc2MpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYWxmb3JtZWQgYmFzZTY0LicpO1xuICAgIGFzYyArPSAnPT0nLnNsaWNlKDIgLSAoYXNjLmxlbmd0aCAmIDMpKTtcbiAgICBsZXQgdTI0LCBiaW4gPSAnJywgcjEsIHIyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNjLmxlbmd0aDspIHtcbiAgICAgICAgdTI0ID0gYjY0dGFiW2FzYy5jaGFyQXQoaSsrKV0gPDwgMThcbiAgICAgICAgICAgIHwgYjY0dGFiW2FzYy5jaGFyQXQoaSsrKV0gPDwgMTJcbiAgICAgICAgICAgIHwgKHIxID0gYjY0dGFiW2FzYy5jaGFyQXQoaSsrKV0pIDw8IDZcbiAgICAgICAgICAgIHwgKHIyID0gYjY0dGFiW2FzYy5jaGFyQXQoaSsrKV0pO1xuICAgICAgICBiaW4gKz0gcjEgPT09IDY0ID8gX2Zyb21DQyh1MjQgPj4gMTYgJiAyNTUpXG4gICAgICAgICAgICA6IHIyID09PSA2NCA/IF9mcm9tQ0ModTI0ID4+IDE2ICYgMjU1LCB1MjQgPj4gOCAmIDI1NSlcbiAgICAgICAgICAgICAgICA6IF9mcm9tQ0ModTI0ID4+IDE2ICYgMjU1LCB1MjQgPj4gOCAmIDI1NSwgdTI0ICYgMjU1KTtcbiAgICB9XG4gICAgcmV0dXJuIGJpbjtcbn07XG4vKipcbiAqIGRvZXMgd2hhdCBgd2luZG93LmF0b2JgIG9mIHdlYiBicm93c2VycyBkby5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhc2MgQmFzZTY0LWVuY29kZWQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBiaW5hcnkgc3RyaW5nXG4gKi9cbmNvbnN0IF9hdG9iID0gX2hhc2F0b2IgPyAoYXNjKSA9PiBhdG9iKF90aWR5QjY0KGFzYykpXG4gICAgOiBfaGFzQnVmZmVyID8gKGFzYykgPT4gQnVmZmVyLmZyb20oYXNjLCAnYmFzZTY0JykudG9TdHJpbmcoJ2JpbmFyeScpXG4gICAgICAgIDogYXRvYlBvbHlmaWxsO1xuLy9cbmNvbnN0IF90b1VpbnQ4QXJyYXkgPSBfaGFzQnVmZmVyXG4gICAgPyAoYSkgPT4gX1U4QWZyb20oQnVmZmVyLmZyb20oYSwgJ2Jhc2U2NCcpKVxuICAgIDogKGEpID0+IF9VOEFmcm9tKF9hdG9iKGEpLCBjID0+IGMuY2hhckNvZGVBdCgwKSk7XG4vKipcbiAqIGNvbnZlcnRzIGEgQmFzZTY0IHN0cmluZyB0byBhIFVpbnQ4QXJyYXkuXG4gKi9cbmNvbnN0IHRvVWludDhBcnJheSA9IChhKSA9PiBfdG9VaW50OEFycmF5KF91blVSSShhKSk7XG4vL1xuY29uc3QgX2RlY29kZSA9IF9oYXNCdWZmZXJcbiAgICA/IChhKSA9PiBCdWZmZXIuZnJvbShhLCAnYmFzZTY0JykudG9TdHJpbmcoJ3V0ZjgnKVxuICAgIDogX1REXG4gICAgICAgID8gKGEpID0+IF9URC5kZWNvZGUoX3RvVWludDhBcnJheShhKSlcbiAgICAgICAgOiAoYSkgPT4gYnRvdShfYXRvYihhKSk7XG5jb25zdCBfdW5VUkkgPSAoYSkgPT4gX3RpZHlCNjQoYS5yZXBsYWNlKC9bLV9dL2csIChtMCkgPT4gbTAgPT0gJy0nID8gJysnIDogJy8nKSk7XG4vKipcbiAqIGNvbnZlcnRzIGEgQmFzZTY0IHN0cmluZyB0byBhIFVURi04IHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmMgQmFzZTY0IHN0cmluZy4gIEJvdGggbm9ybWFsIGFuZCBVUkwtc2FmZSBhcmUgc3VwcG9ydGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVVEYtOCBzdHJpbmdcbiAqL1xuY29uc3QgZGVjb2RlID0gKHNyYykgPT4gX2RlY29kZShfdW5VUkkoc3JjKSk7XG4vKipcbiAqIGNoZWNrIGlmIGEgdmFsdWUgaXMgYSB2YWxpZCBCYXNlNjQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3JjIGEgdmFsdWUgdG8gY2hlY2tcbiAgKi9cbmNvbnN0IGlzVmFsaWQgPSAoc3JjKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzcmMgIT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgcyA9IHNyYy5yZXBsYWNlKC9cXHMrL2csICcnKS5yZXBsYWNlKC89KyQvLCAnJyk7XG4gICAgcmV0dXJuICEvW15cXHMwLTlhLXpBLVpcXCsvXS8udGVzdChzKSB8fCAhL1teXFxzMC05YS16QS1aXFwtX10vLnRlc3Qocyk7XG59O1xuLy9cbmNvbnN0IF9ub0VudW0gPSAodikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2LCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH07XG59O1xuLyoqXG4gKiBleHRlbmQgU3RyaW5nLnByb3RvdHlwZSB3aXRoIHJlbGV2YW50IG1ldGhvZHNcbiAqL1xuY29uc3QgZXh0ZW5kU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IF9hZGQgPSAobmFtZSwgYm9keSkgPT4gT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsIG5hbWUsIF9ub0VudW0oYm9keSkpO1xuICAgIF9hZGQoJ2Zyb21CYXNlNjQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWNvZGUodGhpcyk7IH0pO1xuICAgIF9hZGQoJ3RvQmFzZTY0JywgZnVuY3Rpb24gKHVybHNhZmUpIHsgcmV0dXJuIGVuY29kZSh0aGlzLCB1cmxzYWZlKTsgfSk7XG4gICAgX2FkZCgndG9CYXNlNjRVUkknLCBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmNvZGUodGhpcywgdHJ1ZSk7IH0pO1xuICAgIF9hZGQoJ3RvQmFzZTY0VVJMJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5jb2RlKHRoaXMsIHRydWUpOyB9KTtcbiAgICBfYWRkKCd0b1VpbnQ4QXJyYXknLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0b1VpbnQ4QXJyYXkodGhpcyk7IH0pO1xufTtcbi8qKlxuICogZXh0ZW5kIFVpbnQ4QXJyYXkucHJvdG90eXBlIHdpdGggcmVsZXZhbnQgbWV0aG9kc1xuICovXG5jb25zdCBleHRlbmRVaW50OEFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IF9hZGQgPSAobmFtZSwgYm9keSkgPT4gT2JqZWN0LmRlZmluZVByb3BlcnR5KFVpbnQ4QXJyYXkucHJvdG90eXBlLCBuYW1lLCBfbm9FbnVtKGJvZHkpKTtcbiAgICBfYWRkKCd0b0Jhc2U2NCcsIGZ1bmN0aW9uICh1cmxzYWZlKSB7IHJldHVybiBmcm9tVWludDhBcnJheSh0aGlzLCB1cmxzYWZlKTsgfSk7XG4gICAgX2FkZCgndG9CYXNlNjRVUkknLCBmdW5jdGlvbiAoKSB7IHJldHVybiBmcm9tVWludDhBcnJheSh0aGlzLCB0cnVlKTsgfSk7XG4gICAgX2FkZCgndG9CYXNlNjRVUkwnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBmcm9tVWludDhBcnJheSh0aGlzLCB0cnVlKTsgfSk7XG59O1xuLyoqXG4gKiBleHRlbmQgQnVpbHRpbiBwcm90b3R5cGVzIHdpdGggcmVsZXZhbnQgbWV0aG9kc1xuICovXG5jb25zdCBleHRlbmRCdWlsdGlucyA9ICgpID0+IHtcbiAgICBleHRlbmRTdHJpbmcoKTtcbiAgICBleHRlbmRVaW50OEFycmF5KCk7XG59O1xuY29uc3QgZ0Jhc2U2NCA9IHtcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgIFZFUlNJT046IFZFUlNJT04sXG4gICAgYXRvYjogX2F0b2IsXG4gICAgYXRvYlBvbHlmaWxsOiBhdG9iUG9seWZpbGwsXG4gICAgYnRvYTogX2J0b2EsXG4gICAgYnRvYVBvbHlmaWxsOiBidG9hUG9seWZpbGwsXG4gICAgZnJvbUJhc2U2NDogZGVjb2RlLFxuICAgIHRvQmFzZTY0OiBlbmNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgZW5jb2RlVVJJOiBlbmNvZGVVUkksXG4gICAgZW5jb2RlVVJMOiBlbmNvZGVVUkksXG4gICAgdXRvYjogdXRvYixcbiAgICBidG91OiBidG91LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGlzVmFsaWQ6IGlzVmFsaWQsXG4gICAgZnJvbVVpbnQ4QXJyYXk6IGZyb21VaW50OEFycmF5LFxuICAgIHRvVWludDhBcnJheTogdG9VaW50OEFycmF5LFxuICAgIGV4dGVuZFN0cmluZzogZXh0ZW5kU3RyaW5nLFxuICAgIGV4dGVuZFVpbnQ4QXJyYXk6IGV4dGVuZFVpbnQ4QXJyYXksXG4gICAgZXh0ZW5kQnVpbHRpbnM6IGV4dGVuZEJ1aWx0aW5zLFxufTtcbi8vIG1ha2VjanM6Q1VUIC8vXG5leHBvcnQgeyB2ZXJzaW9uIH07XG5leHBvcnQgeyBWRVJTSU9OIH07XG5leHBvcnQgeyBfYXRvYiBhcyBhdG9iIH07XG5leHBvcnQgeyBhdG9iUG9seWZpbGwgfTtcbmV4cG9ydCB7IF9idG9hIGFzIGJ0b2EgfTtcbmV4cG9ydCB7IGJ0b2FQb2x5ZmlsbCB9O1xuZXhwb3J0IHsgZGVjb2RlIGFzIGZyb21CYXNlNjQgfTtcbmV4cG9ydCB7IGVuY29kZSBhcyB0b0Jhc2U2NCB9O1xuZXhwb3J0IHsgdXRvYiB9O1xuZXhwb3J0IHsgZW5jb2RlIH07XG5leHBvcnQgeyBlbmNvZGVVUkkgfTtcbmV4cG9ydCB7IGVuY29kZVVSSSBhcyBlbmNvZGVVUkwgfTtcbmV4cG9ydCB7IGJ0b3UgfTtcbmV4cG9ydCB7IGRlY29kZSB9O1xuZXhwb3J0IHsgaXNWYWxpZCB9O1xuZXhwb3J0IHsgZnJvbVVpbnQ4QXJyYXkgfTtcbmV4cG9ydCB7IHRvVWludDhBcnJheSB9O1xuZXhwb3J0IHsgZXh0ZW5kU3RyaW5nIH07XG5leHBvcnQgeyBleHRlbmRVaW50OEFycmF5IH07XG5leHBvcnQgeyBleHRlbmRCdWlsdGlucyB9O1xuLy8gYW5kIGZpbmFsbHksXG5leHBvcnQgeyBnQmFzZTY0IGFzIEJhc2U2NCB9O1xuIiwidmFyIGdsb2JhbCA9XG4gICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmKSB8fFxuICAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsKVxuXG52YXIgc3VwcG9ydCA9IHtcbiAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwsXG4gIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBnbG9iYWwgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gIGJsb2I6XG4gICAgJ0ZpbGVSZWFkZXInIGluIGdsb2JhbCAmJlxuICAgICdCbG9iJyBpbiBnbG9iYWwgJiZcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIGdsb2JhbCxcbiAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gZ2xvYmFsXG59XG5cbmZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxufVxuXG5pZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgXVxuXG4gIHZhciBpc0FycmF5QnVmZmVyVmlldyA9XG4gICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICB9XG4gIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+IV0vaS50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICB9XG4gIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbmZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gIHZhciBpdGVyYXRvciA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGl0ZXJhdG9yXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdGhpcy5tYXAgPSB7fVxuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgIH0sIHRoaXMpXG4gIH1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlICsgJywgJyArIHZhbHVlIDogdmFsdWVcbn1cblxuSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgfVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChuYW1lKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbmlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG59XG5cbmZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gIH1cbiAgYm9keS5ib2R5VXNlZCA9IHRydWVcbn1cblxuZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgIH1cbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gIH1cbiAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICB9IGVsc2Uge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBCb2R5KCkge1xuICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAvKlxuICAgICAgZmV0Y2gtbW9jayB3cmFwcyB0aGUgUmVzcG9uc2Ugb2JqZWN0IGluIGFuIEVTNiBQcm94eSB0b1xuICAgICAgcHJvdmlkZSB1c2VmdWwgdGVzdCBoYXJuZXNzIGZlYXR1cmVzIHN1Y2ggYXMgZmx1c2guIEhvd2V2ZXIsIG9uXG4gICAgICBFUzUgYnJvd3NlcnMgd2l0aG91dCBmZXRjaCBvciBQcm94eSBzdXBwb3J0IHBvbGx5ZmlsbHMgbXVzdCBiZSB1c2VkO1xuICAgICAgdGhlIHByb3h5LXBvbGx5ZmlsbCBpcyB1bmFibGUgdG8gcHJveHkgYW4gYXR0cmlidXRlIHVubGVzcyBpdCBleGlzdHNcbiAgICAgIG9uIHRoZSBvYmplY3QgYmVmb3JlIHRoZSBQcm94eSBpcyBjcmVhdGVkLiBUaGlzIGNoYW5nZSBlbnN1cmVzXG4gICAgICBSZXNwb25zZS5ib2R5VXNlZCBleGlzdHMgb24gdGhlIGluc3RhbmNlLCB3aGlsZSBtYWludGFpbmluZyB0aGVcbiAgICAgIHNlbWFudGljIG9mIHNldHRpbmcgUmVxdWVzdC5ib2R5VXNlZCBpbiB0aGUgY29uc3RydWN0b3IgYmVmb3JlXG4gICAgICBfaW5pdEJvZHkgaXMgY2FsbGVkLlxuICAgICovXG4gICAgdGhpcy5ib2R5VXNlZCA9IHRoaXMuYm9keVVzZWRcbiAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSlcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdmFyIGlzQ29uc3VtZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAoaXNDb25zdW1lZCkge1xuICAgICAgICAgIHJldHVybiBpc0NvbnN1bWVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5idWZmZXIuc2xpY2UoXG4gICAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlT2Zmc2V0LFxuICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZU9mZnNldCArIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3RlZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxudmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcXVlc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgIH1cbiAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICB0aGlzLnNpZ25hbCA9IGlucHV0LnNpZ25hbFxuICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICB9XG5cbiAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nXG4gIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgfVxuICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gIHRoaXMuc2lnbmFsID0gb3B0aW9ucy5zaWduYWwgfHwgdGhpcy5zaWduYWxcbiAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICB9XG4gIHRoaXMuX2luaXRCb2R5KGJvZHkpXG5cbiAgaWYgKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSB7XG4gICAgaWYgKG9wdGlvbnMuY2FjaGUgPT09ICduby1zdG9yZScgfHwgb3B0aW9ucy5jYWNoZSA9PT0gJ25vLWNhY2hlJykge1xuICAgICAgLy8gU2VhcmNoIGZvciBhICdfJyBwYXJhbWV0ZXIgaW4gdGhlIHF1ZXJ5IHN0cmluZ1xuICAgICAgdmFyIHJlUGFyYW1TZWFyY2ggPSAvKFs/Jl0pXz1bXiZdKi9cbiAgICAgIGlmIChyZVBhcmFtU2VhcmNoLnRlc3QodGhpcy51cmwpKSB7XG4gICAgICAgIC8vIElmIGl0IGFscmVhZHkgZXhpc3RzIHRoZW4gc2V0IHRoZSB2YWx1ZSB3aXRoIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5yZXBsYWNlKHJlUGFyYW1TZWFyY2gsICckMV89JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBhIG5ldyAnXycgcGFyYW1ldGVyIHRvIHRoZSBlbmQgd2l0aCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHZhciByZVF1ZXJ5U3RyaW5nID0gL1xcPy9cbiAgICAgICAgdGhpcy51cmwgKz0gKHJlUXVlcnlTdHJpbmcudGVzdCh0aGlzLnVybCkgPyAnJicgOiAnPycpICsgJ189JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxufVxuXG5mdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gIGJvZHlcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KCcmJylcbiAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIGZvcm1cbn1cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgdmFyIHByZVByb2Nlc3NlZEhlYWRlcnMgPSByYXdIZWFkZXJzLnJlcGxhY2UoL1xccj9cXG5bXFx0IF0rL2csICcgJylcbiAgLy8gQXZvaWRpbmcgc3BsaXQgdmlhIHJlZ2V4IHRvIHdvcmsgYXJvdW5kIGEgY29tbW9uIElFMTEgYnVnIHdpdGggdGhlIGNvcmUtanMgMy42LjAgcmVnZXggcG9seWZpbGxcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvNzQ4XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy83NTFcbiAgcHJlUHJvY2Vzc2VkSGVhZGVyc1xuICAgIC5zcGxpdCgnXFxyJylcbiAgICAubWFwKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgcmV0dXJuIGhlYWRlci5pbmRleE9mKCdcXG4nKSA9PT0gMCA/IGhlYWRlci5zdWJzdHIoMSwgaGVhZGVyLmxlbmd0aCkgOiBoZWFkZXJcbiAgICB9KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICByZXR1cm4gaGVhZGVyc1xufVxuXG5Cb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzXG4gIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnJ1xuICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG59XG5cbkJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cblJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICB1cmw6IHRoaXMudXJsXG4gIH0pXG59XG5cblJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gIHJldHVybiByZXNwb25zZVxufVxuXG52YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG59XG5cbmV4cG9ydCB2YXIgRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvblxudHJ5IHtcbiAgbmV3IERPTUV4Y2VwdGlvbigpXG59IGNhdGNoIChlcnIpIHtcbiAgRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSlcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxuICBET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01FeGNlcHRpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICB9XG4gICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhVcmwodXJsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdXJsID09PSAnJyAmJiBnbG9iYWwubG9jYXRpb24uaHJlZiA/IGdsb2JhbC5sb2NhdGlvbi5ocmVmIDogdXJsXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgZml4VXJsKHJlcXVlc3QudXJsKSwgdHJ1ZSlcblxuICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIpIHtcbiAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc3VwcG9ydC5hcnJheUJ1ZmZlciAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbml0ICYmIHR5cGVvZiBpbml0LmhlYWRlcnMgPT09ICdvYmplY3QnICYmICEoaW5pdC5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIG5vcm1hbGl6ZVZhbHVlKGluaXQuaGVhZGVyc1tuYW1lXSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gIH0pXG59XG5cbmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxuXG5pZiAoIWdsb2JhbC5mZXRjaCkge1xuICBnbG9iYWwuZmV0Y2ggPSBmZXRjaFxuICBnbG9iYWwuSGVhZGVycyA9IEhlYWRlcnNcbiAgZ2xvYmFsLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIGdsb2JhbC5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9iYXNlJztcbmltcG9ydCB7IEdyYWRlVHlwZUVudW0sIEVycm9yc0NhdGVnb3J5IH0gZnJvbSAnLi4vc2VydmljZXMvY29uc3RhbnQnO1xuXG5jbGFzcyBBamF4RXJyb3JzIGV4dGVuZHMgQmFzZSB7XG4gIC8vIGdldCBodHRwIGVycm9yIGluZm9cbiAgcHVibGljIGhhbmRsZUVycm9yKG9wdGlvbnM6IHsgc2VydmljZTogc3RyaW5nOyBzZXJ2aWNlVmVyc2lvbjogc3RyaW5nOyBwYWdlUGF0aDogc3RyaW5nOyBjb2xsZWN0b3I6IHN0cmluZyB9KSB7XG4gICAgaWYgKCF3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeGhyU2VuZCA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kO1xuICAgIGNvbnN0IHhockV2ZW50ID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5jdXJyZW50VGFyZ2V0ICYmIChldmVudC5jdXJyZW50VGFyZ2V0LnN0YXR1cyA+PSA0MDAgfHwgZXZlbnQuY3VycmVudFRhcmdldC5zdGF0dXMgPT09IDApKSB7XG4gICAgICAgICAgdGhpcy5sb2dJbmZvID0ge1xuICAgICAgICAgICAgdW5pcXVlSWQ6IHV1aWQoKSxcbiAgICAgICAgICAgIHNlcnZpY2U6IG9wdGlvbnMuc2VydmljZSxcbiAgICAgICAgICAgIHNlcnZpY2VWZXJzaW9uOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgICAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuQUpBWF9FUlJPUixcbiAgICAgICAgICAgIGdyYWRlOiBHcmFkZVR5cGVFbnVtLkVSUk9SLFxuICAgICAgICAgICAgZXJyb3JVcmw6IGV2ZW50LnRhcmdldC5yZXNwb25zZVVSTCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50LnRhcmdldC5yZXNwb25zZSxcbiAgICAgICAgICAgIGNvbGxlY3Rvcjogb3B0aW9ucy5jb2xsZWN0b3IsXG4gICAgICAgICAgICBzdGFjazogZXZlbnQudHlwZSArICc6JyArIGV2ZW50LnRhcmdldC5yZXNwb25zZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMudHJhY2VJbmZvKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB4aHJFdmVudCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCB4aHJFdmVudCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndGltZW91dCcsIHhockV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN0YXRlQ2hhbmdlID0gdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgICBzdGF0ZUNoYW5nZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHhockV2ZW50KGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geGhyU2VuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFqYXhFcnJvcnMoKTtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgSlNFcnJvcnMgZnJvbSAnLi9qcyc7XG5pbXBvcnQgUHJvbWlzZUVycm9ycyBmcm9tICcuL3Byb21pc2UnO1xuaW1wb3J0IEFqYXhFcnJvcnMgZnJvbSAnLi9hamF4JztcbmltcG9ydCBSZXNvdXJjZUVycm9ycyBmcm9tICcuL3Jlc291cmNlJztcbmltcG9ydCBWdWVFcnJvcnMgZnJvbSAnLi92dWUnO1xuXG5leHBvcnQge1xuICBKU0Vycm9ycywgUHJvbWlzZUVycm9ycywgQWpheEVycm9ycywgUmVzb3VyY2VFcnJvcnMsIFZ1ZUVycm9ycyxcbn07XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9iYXNlJztcbmltcG9ydCB7IEdyYWRlVHlwZUVudW0sIEVycm9yc0NhdGVnb3J5IH0gZnJvbSAnLi4vc2VydmljZXMvY29uc3RhbnQnO1xuY2xhc3MgSlNFcnJvcnMgZXh0ZW5kcyBCYXNlIHtcbiAgcHVibGljIGhhbmRsZUVycm9ycyhvcHRpb25zOiB7IHNlcnZpY2U6IHN0cmluZzsgc2VydmljZVZlcnNpb246IHN0cmluZzsgcGFnZVBhdGg6IHN0cmluZzsgY29sbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHdpbmRvdy5vbmVycm9yID0gKG1lc3NhZ2UsIHVybCwgbGluZSwgY29sLCBlcnJvcikgPT4ge1xuICAgICAgdGhpcy5sb2dJbmZvID0ge1xuICAgICAgICB1bmlxdWVJZDogdXVpZCgpLFxuICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICAgIHNlcnZpY2VWZXJzaW9uOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgICBwYWdlUGF0aDogb3B0aW9ucy5wYWdlUGF0aCxcbiAgICAgICAgY2F0ZWdvcnk6IEVycm9yc0NhdGVnb3J5LkpTX0VSUk9SLFxuICAgICAgICBncmFkZTogR3JhZGVUeXBlRW51bS5FUlJPUixcbiAgICAgICAgZXJyb3JVcmw6IHVybCxcbiAgICAgICAgbGluZSxcbiAgICAgICAgY29sLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBjb2xsZWN0b3I6IG9wdGlvbnMuY29sbGVjdG9yLFxuICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2ssXG4gICAgICB9O1xuICAgICAgdGhpcy50cmFjZUluZm8oKTtcbiAgICB9O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgSlNFcnJvcnMoKTtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgdXVpZCBmcm9tICcuLi9zZXJ2aWNlcy91dWlkJztcbmltcG9ydCBCYXNlIGZyb20gJy4uL3NlcnZpY2VzL2Jhc2UnO1xuaW1wb3J0IHsgR3JhZGVUeXBlRW51bSwgRXJyb3JzQ2F0ZWdvcnkgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb25zdGFudCc7XG5cbmNsYXNzIFByb21pc2VFcnJvcnMgZXh0ZW5kcyBCYXNlIHtcbiAgcHVibGljIGhhbmRsZUVycm9ycyhvcHRpb25zOiB7IHNlcnZpY2U6IHN0cmluZzsgc2VydmljZVZlcnNpb246IHN0cmluZzsgcGFnZVBhdGg6IHN0cmluZzsgY29sbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgICAgaWYgKCFldmVudCB8fCAhZXZlbnQucmVhc29uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5yZWFzb24uY29uZmlnICYmIGV2ZW50LnJlYXNvbi5jb25maWcudXJsKSB7XG4gICAgICAgICAgdXJsID0gZXZlbnQucmVhc29uLmNvbmZpZy51cmw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dJbmZvID0ge1xuICAgICAgICAgIHVuaXF1ZUlkOiB1dWlkKCksXG4gICAgICAgICAgc2VydmljZTogb3B0aW9ucy5zZXJ2aWNlLFxuICAgICAgICAgIHNlcnZpY2VWZXJzaW9uOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgICAgIHBhZ2VQYXRoOiBvcHRpb25zLnBhZ2VQYXRoLFxuICAgICAgICAgIGNhdGVnb3J5OiBFcnJvcnNDYXRlZ29yeS5QUk9NSVNFX0VSUk9SLFxuICAgICAgICAgIGdyYWRlOiBHcmFkZVR5cGVFbnVtLkVSUk9SLFxuICAgICAgICAgIGVycm9yVXJsOiB1cmwgfHwgbG9jYXRpb24uaHJlZixcbiAgICAgICAgICBtZXNzYWdlOiBldmVudC5yZWFzb24ubWVzc2FnZSxcbiAgICAgICAgICBzdGFjazogZXZlbnQucmVhc29uLnN0YWNrLFxuICAgICAgICAgIGNvbGxlY3Rvcjogb3B0aW9ucy5jb2xsZWN0b3IsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhY2VJbmZvKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBQcm9taXNlRXJyb3JzKCk7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9iYXNlJztcbmltcG9ydCB7IEdyYWRlVHlwZUVudW0sIEVycm9yc0NhdGVnb3J5IH0gZnJvbSAnLi4vc2VydmljZXMvY29uc3RhbnQnO1xuXG5jbGFzcyBSZXNvdXJjZUVycm9ycyBleHRlbmRzIEJhc2Uge1xuICBwdWJsaWMgaGFuZGxlRXJyb3JzKG9wdGlvbnM6IHsgc2VydmljZTogc3RyaW5nOyBwYWdlUGF0aDogc3RyaW5nOyBzZXJ2aWNlVmVyc2lvbjogc3RyaW5nOyBjb2xsZWN0b3I6IHN0cmluZyB9KSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2ZW50KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhcmdldDogYW55ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlzRWxlbWVudFRhcmdldCA9XG4gICAgICAgICAgdGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNjcmlwdEVsZW1lbnQgfHxcbiAgICAgICAgICB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MTGlua0VsZW1lbnQgfHxcbiAgICAgICAgICB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50O1xuXG4gICAgICAgIGlmICghaXNFbGVtZW50VGFyZ2V0KSB7XG4gICAgICAgICAgLy8gcmV0dXJuIGpzIGVycm9yXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nSW5mbyA9IHtcbiAgICAgICAgICB1bmlxdWVJZDogdXVpZCgpLFxuICAgICAgICAgIHNlcnZpY2U6IG9wdGlvbnMuc2VydmljZSxcbiAgICAgICAgICBzZXJ2aWNlVmVyc2lvbjogb3B0aW9ucy5zZXJ2aWNlVmVyc2lvbixcbiAgICAgICAgICBwYWdlUGF0aDogb3B0aW9ucy5wYWdlUGF0aCxcbiAgICAgICAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuUkVTT1VSQ0VfRVJST1IsXG4gICAgICAgICAgZ3JhZGU6IHRhcmdldC50YWdOYW1lID09PSAnSU1HJyA/IEdyYWRlVHlwZUVudW0uV0FSTklORyA6IEdyYWRlVHlwZUVudW0uRVJST1IsXG4gICAgICAgICAgZXJyb3JVcmw6IHRhcmdldC5zcmMgfHwgdGFyZ2V0LmhyZWYgfHwgbG9jYXRpb24uaHJlZixcbiAgICAgICAgICBtZXNzYWdlOiBgbG9hZCAke3RhcmdldC50YWdOYW1lfSByZXNvdXJjZSBlcnJvcmAsXG4gICAgICAgICAgY29sbGVjdG9yOiBvcHRpb25zLmNvbGxlY3RvcixcbiAgICAgICAgICBzdGFjazogYGxvYWQgJHt0YXJnZXQudGFnTmFtZX0gcmVzb3VyY2UgZXJyb3JgLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNlSW5mbygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXNvdXJjZUVycm9ycygpO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB1dWlkIGZyb20gJy4uL3NlcnZpY2VzL3V1aWQnO1xuaW1wb3J0IEJhc2UgZnJvbSAnLi4vc2VydmljZXMvYmFzZSc7XG5pbXBvcnQgeyBHcmFkZVR5cGVFbnVtLCBFcnJvcnNDYXRlZ29yeSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnN0YW50JztcblxuY2xhc3MgVnVlRXJyb3JzIGV4dGVuZHMgQmFzZSB7XG4gIHB1YmxpYyBoYW5kbGVFcnJvcnMoXG4gICAgb3B0aW9uczogeyBzZXJ2aWNlOiBzdHJpbmc7IHBhZ2VQYXRoOiBzdHJpbmc7IHNlcnZpY2VWZXJzaW9uOiBzdHJpbmc7IGNvbGxlY3Rvcjogc3RyaW5nIH0sXG4gICAgVnVlOiBhbnksXG4gICkge1xuICAgIFZ1ZS5jb25maWcuZXJyb3JIYW5kbGVyID0gKGVycm9yOiBFcnJvciwgdm06IGFueSwgaW5mbzogc3RyaW5nKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmxvZ0luZm8gPSB7XG4gICAgICAgICAgdW5pcXVlSWQ6IHV1aWQoKSxcbiAgICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICAgICAgc2VydmljZVZlcnNpb246IG9wdGlvbnMuc2VydmljZVZlcnNpb24sXG4gICAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgICAgY2F0ZWdvcnk6IEVycm9yc0NhdGVnb3J5LlZVRV9FUlJPUixcbiAgICAgICAgICBncmFkZTogR3JhZGVUeXBlRW51bS5FUlJPUixcbiAgICAgICAgICBlcnJvclVybDogbG9jYXRpb24uaHJlZixcbiAgICAgICAgICBtZXNzYWdlOiBpbmZvLFxuICAgICAgICAgIGNvbGxlY3Rvcjogb3B0aW9ucy5jb2xsZWN0b3IsXG4gICAgICAgICAgc3RhY2s6IGVycm9yLnN0YWNrLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNlSW5mbygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVlRXJyb3JzKCk7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IENsaWVudE1vbml0b3IgZnJvbSAnLi9tb25pdG9yJztcblxuKHdpbmRvdyBhcyBhbnkpLkNsaWVudE1vbml0b3IgPSBDbGllbnRNb25pdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnRNb25pdG9yO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IGZldGNoIH0gZnJvbSAnd2hhdHdnLWZldGNoJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd0ZldGNoKCkge1xuICB3aW5kb3cuZmV0Y2ggPSBmZXRjaDtcbn1cbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB4aHJJbnRlcmNlcHRvcigpIHtcbiAgY29uc3Qgb3JpZ2luYWxYSFIgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgYXMgYW55O1xuICBjb25zdCB4aHJTZW5kID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQ7XG4gIGNvbnN0IHhock9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcblxuICBvcmlnaW5hbFhIUi5nZXRSZXF1ZXN0Q29uZmlnID0gW107XG5cbiAgZnVuY3Rpb24gYWpheEV2ZW50VHJpZ2dlcihldmVudDogc3RyaW5nKSB7XG4gICAgY29uc3QgYWpheEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7IGRldGFpbDogdGhpcyB9KTtcblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGFqYXhFdmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBjdXN0b21pemVkWEhSKCkge1xuICAgIGNvbnN0IGxpdmVYSFIgPSBuZXcgb3JpZ2luYWxYSFIoKTtcblxuICAgIGxpdmVYSFIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZWFkeXN0YXRlY2hhbmdlJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWpheEV2ZW50VHJpZ2dlci5jYWxsKHRoaXMsICd4aHJSZWFkeVN0YXRlQ2hhbmdlJyk7XG4gICAgICB9LFxuICAgICAgZmFsc2UsXG4gICAgKTtcblxuICAgIGxpdmVYSFIub3BlbiA9IGZ1bmN0aW9uIChcbiAgICAgIG1ldGhvZDogc3RyaW5nLFxuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICBhc3luYzogYm9vbGVhbixcbiAgICAgIHVzZXJuYW1lPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgIHBhc3N3b3JkPzogc3RyaW5nIHwgbnVsbCxcbiAgICApIHtcbiAgICAgIHRoaXMuZ2V0UmVxdWVzdENvbmZpZyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHhock9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIGxpdmVYSFIuc2VuZCA9IGZ1bmN0aW9uIChib2R5PzogRG9jdW1lbnQgfCBCb2R5SW5pdCB8IG51bGwpIHtcbiAgICAgIHJldHVybiB4aHJTZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiBsaXZlWEhSO1xuICB9XG4gICh3aW5kb3cgYXMgYW55KS5YTUxIdHRwUmVxdWVzdCA9IGN1c3RvbWl6ZWRYSFI7XG59XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgQ3VzdG9tT3B0aW9uc1R5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEpTRXJyb3JzLCBQcm9taXNlRXJyb3JzLCBBamF4RXJyb3JzLCBSZXNvdXJjZUVycm9ycywgVnVlRXJyb3JzIH0gZnJvbSAnLi9lcnJvcnMvaW5kZXgnO1xuaW1wb3J0IHRyYWNlUGVyZiBmcm9tICcuL3BlcmZvcm1hbmNlL2luZGV4JztcbmltcG9ydCB0cmFjZVNlZ21lbnQgZnJvbSAnLi90cmFjZS9zZWdtZW50JztcblxuY29uc3QgQ2xpZW50TW9uaXRvciA9IHtcbiAgY3VzdG9tT3B0aW9uczoge1xuICAgIGNvbGxlY3RvcjogbG9jYXRpb24ub3JpZ2luLCAvLyByZXBvcnQgc2VydmVcbiAgICBqc0Vycm9yczogdHJ1ZSwgLy8gdnVlLCBqcyBhbmQgcHJvbWlzZSBlcnJvcnNcbiAgICBhcGlFcnJvcnM6IHRydWUsXG4gICAgcmVzb3VyY2VFcnJvcnM6IHRydWUsXG4gICAgYXV0b1RyYWNlUGVyZjogdHJ1ZSwgLy8gdHJhY2UgcGVyZm9ybWFuY2UgZGV0YWlsXG4gICAgdXNlRm1wOiBmYWxzZSwgLy8gdXNlIGZpcnN0IG1lYW5pbmdmdWwgcGFpbnRcbiAgICBlbmFibGVTUEE6IGZhbHNlLFxuICAgIHRyYWNlU0RLSW50ZXJuYWw6IGZhbHNlLFxuICAgIGRldGFpbE1vZGU6IHRydWUsXG4gIH0gYXMgQ3VzdG9tT3B0aW9uc1R5cGUsXG5cbiAgcmVnaXN0ZXIoY29uZmlnczogQ3VzdG9tT3B0aW9uc1R5cGUpIHtcbiAgICB0aGlzLmN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXG4gICAgICAuLi5jb25maWdzLFxuICAgIH07XG4gICAgdGhpcy5lcnJvcnModGhpcy5jdXN0b21PcHRpb25zKTtcbiAgICBpZiAoIXRoaXMuY3VzdG9tT3B0aW9ucy5lbmFibGVTUEEpIHtcbiAgICAgIHRoaXMucGVyZm9ybWFuY2UodGhpcy5jdXN0b21PcHRpb25zKTtcbiAgICB9XG5cbiAgICB0cmFjZVNlZ21lbnQodGhpcy5jdXN0b21PcHRpb25zKTtcbiAgfSxcbiAgcGVyZm9ybWFuY2UoY29uZmlnczogYW55KSB7XG4gICAgLy8gdHJhY2UgYW5kIHJlcG9ydCBwZXJmIGRhdGEgYW5kIHB2IHRvIHNlcnZlIHdoZW4gcGFnZSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgdHJhY2VQZXJmLnJlY29yZFBlcmYoY29uZmlncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnbG9hZCcsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0cmFjZVBlcmYucmVjb3JkUGVyZihjb25maWdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXN0b21PcHRpb25zLmVuYWJsZVNQQSkge1xuICAgICAgLy8gaGFzaCByb3V0ZXJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnaGFzaGNoYW5nZScsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0cmFjZVBlcmYucmVjb3JkUGVyZihjb25maWdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgZXJyb3JzKG9wdGlvbnM6IEN1c3RvbU9wdGlvbnNUeXBlKSB7XG4gICAgY29uc3QgeyBzZXJ2aWNlLCBwYWdlUGF0aCwgc2VydmljZVZlcnNpb24sIGNvbGxlY3RvciB9ID0gb3B0aW9ucztcblxuICAgIGlmIChvcHRpb25zLmpzRXJyb3JzKSB7XG4gICAgICBKU0Vycm9ycy5oYW5kbGVFcnJvcnMoeyBzZXJ2aWNlLCBwYWdlUGF0aCwgc2VydmljZVZlcnNpb24sIGNvbGxlY3RvciB9KTtcbiAgICAgIFByb21pc2VFcnJvcnMuaGFuZGxlRXJyb3JzKHsgc2VydmljZSwgcGFnZVBhdGgsIHNlcnZpY2VWZXJzaW9uLCBjb2xsZWN0b3IgfSk7XG4gICAgICBpZiAob3B0aW9ucy52dWUpIHtcbiAgICAgICAgVnVlRXJyb3JzLmhhbmRsZUVycm9ycyh7IHNlcnZpY2UsIHBhZ2VQYXRoLCBzZXJ2aWNlVmVyc2lvbiwgY29sbGVjdG9yIH0sIG9wdGlvbnMudnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYXBpRXJyb3JzKSB7XG4gICAgICBBamF4RXJyb3JzLmhhbmRsZUVycm9yKHsgc2VydmljZSwgcGFnZVBhdGgsIHNlcnZpY2VWZXJzaW9uLCBjb2xsZWN0b3IgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnJlc291cmNlRXJyb3JzKSB7XG4gICAgICBSZXNvdXJjZUVycm9ycy5oYW5kbGVFcnJvcnMoeyBzZXJ2aWNlLCBwYWdlUGF0aCwgc2VydmljZVZlcnNpb24sIGNvbGxlY3RvciB9KTtcbiAgICB9XG4gIH0sXG4gIHNldFBlcmZvcm1hbmNlKGNvbmZpZ3M6IEN1c3RvbU9wdGlvbnNUeXBlKSB7XG4gICAgLy8gaGlzdG9yeSByb3V0ZXJcbiAgICB0aGlzLmN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXG4gICAgICAuLi5jb25maWdzLFxuICAgIH07XG4gICAgdGhpcy5wZXJmb3JtYW5jZSh0aGlzLmN1c3RvbU9wdGlvbnMpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50TW9uaXRvcjtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgSUNhbFNjb3JlLCBFbGVtZW50TGlzdCB9IGZyb20gJy4vdHlwZSc7XG5cbmNvbnN0IGdldFN0eWxlID0gKGVsZW1lbnQ6IEVsZW1lbnQgfCBhbnksIGF0dHI6IGFueSkgPT4ge1xuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbClbYXR0cl07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY3VycmVudFN0eWxlW2F0dHJdO1xuICB9XG59O1xuLy8gZWxlbWVudCB3ZWlnaHQgZm9yIGNhbGN1bGF0ZSBzY29yZVxuZW51bSBFTEVfV0VJR0hUIHtcbiAgU1ZHID0gMixcbiAgSU1HID0gMixcbiAgQ0FOVkFTID0gNCxcbiAgT0JKRUNUID0gNCxcbiAgRU1CRUQgPSA0LFxuICBWSURFTyA9IDQsXG59XG5cbmNvbnN0IFNUQVJUX1RJTUU6IG51bWJlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuY29uc3QgSUdOT1JFX1RBR19TRVQ6IHN0cmluZ1tdID0gWydTQ1JJUFQnLCAnU1RZTEUnLCAnTUVUQScsICdIRUFEJywgJ0xJTksnXTtcbmNvbnN0IExJTUlUOiBudW1iZXIgPSAzMDAwO1xuY29uc3QgV1c6IG51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgV0g6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IERFTEFZOiBudW1iZXIgPSA1MDA7IC8vIGZtcCByZXRyeSBpbnRlcnZhbFxuXG5jbGFzcyBGTVBUaW1pbmcge1xuICBwdWJsaWMgZm1wVGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBzdGF0dXNDb2xsZWN0b3I6IEFycmF5PHsgdGltZTogbnVtYmVyIH0+ID0gW107IC8vIG5vZGVzIGNoYW5nZSB0aW1lXG4gIHByaXZhdGUgZmxhZzogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgPSBudWxsO1xuICBwcml2YXRlIGNhbGxiYWNrQ291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgZW50cmllczogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKCFwZXJmb3JtYW5jZSB8fCAhcGVyZm9ybWFuY2UuZ2V0RW50cmllcykge1xuICAgICAgY29uc29sZS5sb2coJ3lvdXIgYnJvd3NlciBkbyBub3Qgc3VwcG9ydCBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaW5pdE9ic2VydmVyKCk7XG4gIH1cbiAgcHJpdmF0ZSBnZXRGaXJzdFNuYXBTaG90KCkge1xuICAgIGNvbnN0IHRpbWU6IG51bWJlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0ICRib2R5OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgaWYgKCRib2R5KSB7XG4gICAgICB0aGlzLnNldFRhZygkYm9keSwgdGhpcy5jYWxsYmFja0NvdW50KTtcbiAgICB9XG4gICAgdGhpcy5zdGF0dXNDb2xsZWN0b3IucHVzaCh7XG4gICAgICB0aW1lLFxuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdE9ic2VydmVyKCkge1xuICAgIHRoaXMuZ2V0Rmlyc3RTbmFwU2hvdCgpO1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICB0aGlzLmNhbGxiYWNrQ291bnQgKz0gMTtcbiAgICAgIGNvbnN0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGNvbnN0ICRib2R5OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICBpZiAoJGJvZHkpIHtcbiAgICAgICAgdGhpcy5zZXRUYWcoJGJvZHksIHRoaXMuY2FsbGJhY2tDb3VudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXR1c0NvbGxlY3Rvci5wdXNoKHtcbiAgICAgICAgdGltZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIG9ic2VydmUgYWxsIGNoaWxkIG5vZGVzXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xuICAgIC8vIGNhbGN1bGF0ZSBzY29yZSB3aGVuIHBhZ2UgbG9hZGVkXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRmluYWxTY29yZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2xvYWQnLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVGaW5hbFNjb3JlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjYWxjdWxhdGVGaW5hbFNjb3JlKCkge1xuICAgIGlmIChNdXRhdGlvbkV2ZW50ICYmIHRoaXMuZmxhZykge1xuICAgICAgaWYgKHRoaXMuY2hlY2tOZWVkQ2FuY2VsKFNUQVJUX1RJTUUpKSB7XG4gICAgICAgIC8vIGNhbmNlbCBvYnNlcnZlciBmb3IgZG9tIGNoYW5nZVxuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5mbGFnID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuZ2V0VHJlZVNjb3JlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICBsZXQgdHA6IElDYWxTY29yZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZXMuZHBzcykge1xuICAgICAgICAgIGlmICh0cCAmJiB0cC5zdCkge1xuICAgICAgICAgICAgaWYgKHRwLnN0IDwgaXRlbS5zdCkge1xuICAgICAgICAgICAgICB0cCA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRwID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IGFsbCBvZiBzb3VyZXMgbG9hZCB0aW1lXG4gICAgICAgIHBlcmZvcm1hbmNlLmdldEVudHJpZXMoKS5mb3JFYWNoKChpdGVtOiBQZXJmb3JtYW5jZVJlc291cmNlVGltaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbnRyaWVzW2l0ZW0ubmFtZV0gPSBpdGVtLnJlc3BvbnNlRW5kO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0cCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHRFbHM6IEVsZW1lbnRMaXN0ID0gdGhpcy5maWx0ZXJSZXN1bHQodHAuZWxzKTtcbiAgICAgICAgY29uc3QgZm1wVGltaW5nOiBudW1iZXIgPSB0aGlzLmdldEZtcFRpbWUocmVzdWx0RWxzKTtcbiAgICAgICAgdGhpcy5mbXBUaW1lID0gZm1wVGltaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVGaW5hbFNjb3JlKCk7XG4gICAgICAgIH0sIERFTEFZKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBnZXRGbXBUaW1lKHJlc3VsdEVsczogRWxlbWVudExpc3QpOiBudW1iZXIge1xuICAgIGxldCBydCA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHJlc3VsdEVscykge1xuICAgICAgbGV0IHRpbWU6IG51bWJlciA9IDA7XG4gICAgICBpZiAoaXRlbS53ZWlnaHQgPT09IDEpIHtcbiAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHBhcnNlSW50KGl0ZW0uZWxlLmdldEF0dHJpYnV0ZSgnZm1wX2MnKSwgMTApO1xuICAgICAgICB0aW1lID0gdGhpcy5zdGF0dXNDb2xsZWN0b3JbaW5kZXhdLnRpbWU7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ud2VpZ2h0ID09PSAyKSB7XG4gICAgICAgIGlmIChpdGVtLmVsZS50YWdOYW1lID09PSAnSU1HJykge1xuICAgICAgICAgIHRpbWUgPSB0aGlzLmVudHJpZXNbKGl0ZW0uZWxlIGFzIEhUTUxJbWFnZUVsZW1lbnQpLnNyY107XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5lbGUudGFnTmFtZSA9PT0gJ1NWRycpIHtcbiAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFyc2VJbnQoaXRlbS5lbGUuZ2V0QXR0cmlidXRlKCdmbXBfYycpLCAxMCk7XG4gICAgICAgICAgdGltZSA9IHRoaXMuc3RhdHVzQ29sbGVjdG9yW2luZGV4XS50aW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG1hdGNoID0gZ2V0U3R5bGUoaXRlbS5lbGUsICdiYWNrZ3JvdW5kLWltYWdlJykubWF0Y2goL3VybFxcKFxcXCIoLio/KVxcXCJcXCkvKTtcbiAgICAgICAgICBsZXQgdXJsOiBzdHJpbmc7XG4gICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICAgICAgICB1cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF1cmwuaW5jbHVkZXMoJ2h0dHAnKSkge1xuICAgICAgICAgICAgdXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBtYXRjaFsxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGltZSA9IHRoaXMuZW50cmllc1t1cmxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ud2VpZ2h0ID09PSA0KSB7XG4gICAgICAgIGlmIChpdGVtLmVsZS50YWdOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwYXJzZUludChpdGVtLmVsZS5nZXRBdHRyaWJ1dGUoJ2ZtcF9jJyksIDEwKTtcbiAgICAgICAgICB0aW1lID0gdGhpcy5zdGF0dXNDb2xsZWN0b3JbaW5kZXhdICYmIHRoaXMuc3RhdHVzQ29sbGVjdG9yW2luZGV4XS50aW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZWxlLnRhZ05hbWUgPT09ICdWSURFTycpIHtcbiAgICAgICAgICB0aW1lID0gdGhpcy5lbnRyaWVzWyhpdGVtLmVsZSBhcyBIVE1MVmlkZW9FbGVtZW50KS5zcmNdO1xuICAgICAgICAgIGlmICghdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IHRoaXMuZW50cmllc1soaXRlbS5lbGUgYXMgSFRNTFZpZGVvRWxlbWVudCkucG9zdGVyXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGltZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocnQgPCB0aW1lKSB7XG4gICAgICAgIHJ0ID0gdGltZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ0O1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbm9kZXMgd2l0aCB0aGUgaGlnaGVzdCBzY29yZSBpbiB0aGUgdmlzaWJsZSBhcmVhIGFyZSBjb2xsZWN0ZWQgYW5kIHRoZSBhdmVyYWdlIHZhbHVlIGlzIHRha2VuLFxuICAgKiBhbmQgdGhlIGxvdyBzY29yZSBvbmVzIGFyZSBlbGltaW5hdGVkXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclJlc3VsdChlbHM6IEVsZW1lbnRMaXN0KTogRWxlbWVudExpc3Qge1xuICAgIGlmIChlbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gZWxzO1xuICAgIH1cbiAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xuICAgIGVscy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIHN1bSArPSBpdGVtLnN0O1xuICAgIH0pO1xuICAgIGNvbnN0IGF2ZzogbnVtYmVyID0gc3VtIC8gZWxzLmxlbmd0aDtcbiAgICByZXR1cm4gZWxzLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5zdCA+IGF2ZztcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGNoZWNrTmVlZENhbmNlbChzdGFydDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdGltZTogbnVtYmVyID0gcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydDtcbiAgICBjb25zdCBsYXN0Q2FsVGltZTogbnVtYmVyID1cbiAgICAgIHRoaXMuc3RhdHVzQ29sbGVjdG9yLmxlbmd0aCA+IDAgPyB0aGlzLnN0YXR1c0NvbGxlY3Rvclt0aGlzLnN0YXR1c0NvbGxlY3Rvci5sZW5ndGggLSAxXS50aW1lIDogMDtcbiAgICByZXR1cm4gdGltZSA+IExJTUlUIHx8IHRpbWUgLSBsYXN0Q2FsVGltZSA+IDEwMDA7XG4gIH1cbiAgcHJpdmF0ZSBnZXRUcmVlU2NvcmUobm9kZTogRWxlbWVudCk6IElDYWxTY29yZSB8IGFueSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGNvbnN0IGRwc3MgPSBbXTtcbiAgICBjb25zdCBjaGlsZHJlbjogYW55ID0gbm9kZS5jaGlsZHJlbjtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAvLyBPbmx5IGNhbGN1bGF0ZSBtYXJrZWQgZWxlbWVudHNcbiAgICAgIGlmICghY2hpbGQuZ2V0QXR0cmlidXRlKCdmbXBfYycpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0VHJlZVNjb3JlKGNoaWxkKTtcbiAgICAgIGlmIChzLnN0KSB7XG4gICAgICAgIGRwc3MucHVzaChzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jYWxjYXVsdGVHcmFkZXMobm9kZSwgZHBzcyk7XG4gIH1cbiAgcHJpdmF0ZSBjYWxjYXVsdGVHcmFkZXMoZWxlOiBFbGVtZW50LCBkcHNzOiBJQ2FsU2NvcmVbXSk6IElDYWxTY29yZSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgaXNJblZpZXdQb3J0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoV0ggPCB0b3AgfHwgV1cgPCBsZWZ0KSB7XG4gICAgICBpc0luVmlld1BvcnQgPSBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHNkcDogbnVtYmVyID0gMDtcbiAgICBkcHNzLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgc2RwICs9IGl0ZW0uc3Q7XG4gICAgfSk7XG4gICAgbGV0IHdlaWdodDogbnVtYmVyID0gTnVtYmVyKEVMRV9XRUlHSFRbZWxlLnRhZ05hbWUgYXMgYW55XSkgfHwgMTtcbiAgICAvLyBJZiB0aGVyZSBpcyBhIGNvbW1vbiBlbGVtZW50IG9mIHRoZSBiYWNrZ3JvdW5kIGltYWdlLCBpdCBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgcGljdHVyZVxuICAgIGlmIChcbiAgICAgIHdlaWdodCA9PT0gMSAmJlxuICAgICAgZ2V0U3R5bGUoZWxlLCAnYmFja2dyb3VuZC1pbWFnZScpICYmXG4gICAgICBnZXRTdHlsZShlbGUsICdiYWNrZ3JvdW5kLWltYWdlJykgIT09ICdpbml0aWFsJyAmJlxuICAgICAgZ2V0U3R5bGUoZWxlLCAnYmFja2dyb3VuZC1pbWFnZScpICE9PSAnbm9uZSdcbiAgICApIHtcbiAgICAgIHdlaWdodCA9IEVMRV9XRUlHSFQuSU1HO1xuICAgIH1cbiAgICAvLyBzY29yZSA9IHRoZSBhcmVhIG9mIGVsZW1lbnRcbiAgICBsZXQgc3Q6IG51bWJlciA9IGlzSW5WaWV3UG9ydCA/IHdpZHRoICogaGVpZ2h0ICogd2VpZ2h0IDogMDtcbiAgICBsZXQgZWxzID0gW3sgZWxlLCBzdCwgd2VpZ2h0IH1dO1xuICAgIGNvbnN0IHJvb3QgPSBlbGU7XG4gICAgLy8gVGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgdmlld3BvcnRcbiAgICBjb25zdCBhcmVhUGVyY2VudCA9IHRoaXMuY2FsY3VsYXRlQXJlYVBhcmVudChlbGUpO1xuICAgIC8vIElmIHRoZSBzdW0gb2YgdGhlIGNoaWxkJ3Mgd2VpZ2h0cyBpcyBncmVhdGVyIHRoYW4gdGhlIHBhcmVudCdzIHRydWUgd2VpZ2h0XG4gICAgaWYgKHNkcCA+IHN0ICogYXJlYVBlcmNlbnQgfHwgYXJlYVBlcmNlbnQgPT09IDApIHtcbiAgICAgIHN0ID0gc2RwO1xuICAgICAgZWxzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZHBzcykge1xuICAgICAgICBlbHMgPSBlbHMuY29uY2F0KGl0ZW0uZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGRwc3MsXG4gICAgICBzdCxcbiAgICAgIGVscyxcbiAgICAgIHJvb3QsXG4gICAgfTtcbiAgfVxuICBwcml2YXRlIGNhbGN1bGF0ZUFyZWFQYXJlbnQoZWxlOiBFbGVtZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpbkxlZnQ6IG51bWJlciA9IDA7XG4gICAgY29uc3Qgd2luVG9wOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IHdpblJpZ2h0OiBudW1iZXIgPSBXVztcbiAgICBjb25zdCB3aW5Cb3R0b206IG51bWJlciA9IFdIO1xuICAgIGNvbnN0IG92ZXJsYXBYID0gcmlnaHQgLSBsZWZ0ICsgKHdpblJpZ2h0IC0gd2luTGVmdCkgLSAoTWF0aC5tYXgocmlnaHQsIHdpblJpZ2h0KSAtIE1hdGgubWluKGxlZnQsIHdpbkxlZnQpKTtcbiAgICBjb25zdCBvdmVybGFwWSA9IGJvdHRvbSAtIHRvcCArICh3aW5Cb3R0b20gLSB3aW5Ub3ApIC0gKE1hdGgubWF4KGJvdHRvbSwgd2luQm90dG9tKSAtIE1hdGgubWluKHRvcCwgd2luVG9wKSk7XG5cbiAgICBpZiAob3ZlcmxhcFggPD0gMCB8fCBvdmVybGFwWSA8PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIChvdmVybGFwWCAqIG92ZXJsYXBZKSAvICh3aWR0aCAqIGhlaWdodCk7XG4gIH1cbiAgLy8gRGVwdGggZmlyc3QgdHJhdmVyc2FsIHRvIG1hcmsgbm9kZXNcbiAgcHJpdmF0ZSBzZXRUYWcodGFyZ2V0OiBFbGVtZW50LCBjYWxsYmFja0NvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB0YWdOYW1lOiBzdHJpbmcgPSB0YXJnZXQudGFnTmFtZTtcbiAgICBpZiAoSUdOT1JFX1RBR19TRVQuaW5kZXhPZih0YWdOYW1lKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0ICRjaGlsZHJlbjogSFRNTENvbGxlY3Rpb24gPSB0YXJnZXQuY2hpbGRyZW47XG4gICAgICBpZiAoJGNoaWxkcmVuICYmICRjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAkY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBjb25zdCAkY2hpbGQ6IEVsZW1lbnQgPSAkY2hpbGRyZW5baV07XG4gICAgICAgICAgY29uc3QgaGFzU2V0VGFnID0gJGNoaWxkLmdldEF0dHJpYnV0ZSgnZm1wX2MnKSAhPT0gbnVsbDtcbiAgICAgICAgICAvLyBJZiBpdCBpcyBub3QgbWFya2VkLCB3aGV0aGVyIHRoZSBtYXJraW5nIGNvbmRpdGlvbiBpcyBtZXQgaXMgZGV0ZWN0ZWRcbiAgICAgICAgICBpZiAoIWhhc1NldFRhZykge1xuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9ICRjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChXSCA8IHRvcCB8fCBXVyA8IGxlZnQgfHwgd2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGNoaWxkLnNldEF0dHJpYnV0ZSgnZm1wX2MnLCBgJHtjYWxsYmFja0NvdW50fWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldFRhZygkY2hpbGQsIGNhbGxiYWNrQ291bnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZNUFRpbWluZztcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBDdXN0b21PcHRpb25zVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi4vc2VydmljZXMvcmVwb3J0JztcbmltcG9ydCBwYWdlUGVyZiBmcm9tICcuL3BlcmYnO1xuaW1wb3J0IEZNUCBmcm9tICcuL2ZtcCc7XG5pbXBvcnQgeyBJUGVyZkRldGFpbCB9IGZyb20gJy4vdHlwZSc7XG5cbmNsYXNzIFRyYWNlUGVyZiB7XG4gIHByaXZhdGUgcGVyZkNvbmZpZyA9IHtcbiAgICBwZXJmRGV0YWlsOiB7fSxcbiAgfSBhcyB7IHBlcmZEZXRhaWw6IElQZXJmRGV0YWlsIH07XG5cbiAgcHVibGljIGFzeW5jIHJlY29yZFBlcmYob3B0aW9uczogQ3VzdG9tT3B0aW9uc1R5cGUpIHtcbiAgICBsZXQgZm1wOiB7IGZtcFRpbWU6IG51bWJlciB8IHVuZGVmaW5lZCB9ID0geyBmbXBUaW1lOiB1bmRlZmluZWQgfTtcbiAgICBpZiAob3B0aW9ucy5hdXRvVHJhY2VQZXJmKSB7XG4gICAgICB0aGlzLnBlcmZDb25maWcucGVyZkRldGFpbCA9IGF3YWl0IG5ldyBwYWdlUGVyZigpLmdldFBlcmZUaW1pbmcoKTtcbiAgICAgIGlmIChvcHRpb25zLnVzZUZtcCkge1xuICAgICAgICBmbXAgPSBhd2FpdCBuZXcgRk1QKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGF1dG8gcmVwb3J0IHB2IGFuZCBwZXJmIGRhdGFcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHBlcmZEZXRhaWwgPSBvcHRpb25zLmF1dG9UcmFjZVBlcmZcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAuLi50aGlzLnBlcmZDb25maWcucGVyZkRldGFpbCxcbiAgICAgICAgICAgIGZtcFRpbWU6IG9wdGlvbnMudXNlRm1wID8gcGFyc2VJbnQoU3RyaW5nKGZtcC5mbXBUaW1lKSwgMTApIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBwZXJmSW5mbyA9IHtcbiAgICAgICAgLi4ucGVyZkRldGFpbCxcbiAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgIHNlcnZpY2VWZXJzaW9uOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICB9O1xuICAgICAgbmV3IFJlcG9ydCgnUEVSRicsIG9wdGlvbnMuY29sbGVjdG9yKS5zZW5kQnlYaHIocGVyZkluZm8pO1xuICAgICAgLy8gY2xlYXIgcGVyZiBkYXRhXG4gICAgICB0aGlzLmNsZWFyUGVyZigpO1xuICAgIH0sIDMwMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJQZXJmKCkge1xuICAgIGlmICghKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5jbGVhclJlc291cmNlVGltaW5ncygpO1xuICAgIHRoaXMucGVyZkNvbmZpZyA9IHtcbiAgICAgIHBlcmZEZXRhaWw6IHt9LFxuICAgIH0gYXMgeyBwZXJmRGV0YWlsOiBJUGVyZkRldGFpbCB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBUcmFjZVBlcmYoKTtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgSVBlcmZEZXRhaWwgfSBmcm9tICcuL3R5cGUnO1xuY2xhc3MgUGFnZVBlcmYge1xuICBwdWJsaWMgZ2V0UGVyZlRpbWluZygpOiBJUGVyZkRldGFpbCB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghd2luZG93LnBlcmZvcm1hbmNlIHx8ICF3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBvcnQgcGVyZm9ybWFuY2UnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgeyB0aW1pbmcgfSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICAgIGxldCByZWRpcmVjdFRpbWUgPSAwO1xuXG4gICAgICBpZiAodGltaW5nLm5hdmlnYXRpb25TdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZGlyZWN0VGltZSA9IHBhcnNlSW50KFN0cmluZyh0aW1pbmcuZmV0Y2hTdGFydCAtIHRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpLCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKHRpbWluZy5yZWRpcmVjdEVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZGlyZWN0VGltZSA9IHBhcnNlSW50KFN0cmluZyh0aW1pbmcucmVkaXJlY3RFbmQgLSB0aW1pbmcucmVkaXJlY3RTdGFydCksIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZGlyZWN0VGltZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlZGlyZWN0VGltZSxcbiAgICAgICAgZG5zVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5kb21haW5Mb29rdXBFbmQgLSB0aW1pbmcuZG9tYWluTG9va3VwU3RhcnQpLCAxMCksXG4gICAgICAgIHR0ZmJUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLnJlc3BvbnNlU3RhcnQgLSB0aW1pbmcucmVxdWVzdFN0YXJ0KSwgMTApLCAvLyBUaW1lIHRvIEZpcnN0IEJ5dGVcbiAgICAgICAgdGNwVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5jb25uZWN0RW5kIC0gdGltaW5nLmNvbm5lY3RTdGFydCksIDEwKSxcbiAgICAgICAgdHJhbnNUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLnJlc3BvbnNlRW5kIC0gdGltaW5nLnJlc3BvbnNlU3RhcnQpLCAxMCksXG4gICAgICAgIGRvbUFuYWx5c2lzVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5kb21JbnRlcmFjdGl2ZSAtIHRpbWluZy5yZXNwb25zZUVuZCksIDEwKSxcbiAgICAgICAgZnB0VGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5yZXNwb25zZUVuZCAtIHRpbWluZy5mZXRjaFN0YXJ0KSwgMTApLCAvLyBGaXJzdCBQYWludCBUaW1lIG9yIEJsYW5rIFNjcmVlbiBUaW1lXG4gICAgICAgIGRvbVJlYWR5VGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5kb21Db250ZW50TG9hZGVkRXZlbnRFbmQgLSB0aW1pbmcuZmV0Y2hTdGFydCksIDEwKSxcbiAgICAgICAgbG9hZFBhZ2VUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmxvYWRFdmVudFN0YXJ0IC0gdGltaW5nLmZldGNoU3RhcnQpLCAxMCksIC8vIFBhZ2UgZnVsbCBsb2FkIHRpbWVcbiAgICAgICAgLy8gU3luY2hyb25vdXMgbG9hZCByZXNvdXJjZXMgaW4gdGhlIHBhZ2VcbiAgICAgICAgcmVzVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5sb2FkRXZlbnRTdGFydCAtIHRpbWluZy5kb21Db250ZW50TG9hZGVkRXZlbnRFbmQpLCAxMCksXG4gICAgICAgIC8vIE9ubHkgdmFsaWQgZm9yIEhUVFBTXG4gICAgICAgIHNzbFRpbWU6XG4gICAgICAgICAgbG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonICYmIHRpbWluZy5zZWN1cmVDb25uZWN0aW9uU3RhcnQgPiAwXG4gICAgICAgICAgICA/IHBhcnNlSW50KFN0cmluZyh0aW1pbmcuY29ubmVjdEVuZCAtIHRpbWluZy5zZWN1cmVDb25uZWN0aW9uU3RhcnQpLCAxMClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB0dGxUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmRvbUludGVyYWN0aXZlIC0gdGltaW5nLmZldGNoU3RhcnQpLCAxMCksIC8vIHRpbWUgdG8gaW50ZXJhY3RcbiAgICAgICAgZmlyc3RQYWNrVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5yZXNwb25zZVN0YXJ0IC0gdGltaW5nLmRvbWFpbkxvb2t1cFN0YXJ0KSwgMTApLCAvLyBmaXJzdCBwYWNrIHRpbWVcbiAgICAgICAgZm1wVGltZTogMCwgLy8gRmlyc3QgTWVhbmluZ2Z1bCBQYWludFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlUGVyZjtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcbmltcG9ydCB7IEVycm9yc0NhdGVnb3J5LCBHcmFkZVR5cGVFbnVtIH0gZnJvbSAnLi9jb25zdGFudCc7XG5pbXBvcnQgeyBFcnJvckluZm9GZWlsZHMsIFJlcG9ydEZpZWxkcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5sZXQganNFcnJvclB2ID0gZmFsc2U7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIHtcbiAgcHVibGljIGxvZ0luZm86IEVycm9ySW5mb0ZlaWxkcyAmIFJlcG9ydEZpZWxkcyAmIHsgY29sbGVjdG9yOiBzdHJpbmcgfSA9IHtcbiAgICB1bmlxdWVJZDogJycsXG4gICAgc2VydmljZTogJycsXG4gICAgc2VydmljZVZlcnNpb246ICcnLFxuICAgIHBhZ2VQYXRoOiAnJyxcbiAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuVU5LTk9XTl9FUlJPUixcbiAgICBncmFkZTogR3JhZGVUeXBlRW51bS5JTkZPLFxuICAgIGVycm9yVXJsOiAnJyxcbiAgICBsaW5lOiAwLFxuICAgIGNvbDogMCxcbiAgICBtZXNzYWdlOiAnJyxcbiAgICBmaXJzdFJlcG9ydGVkRXJyb3I6IGZhbHNlLFxuICAgIGNvbGxlY3RvcjogJycsXG4gIH07XG5cbiAgcHVibGljIHRyYWNlSW5mbygpIHtcbiAgICAvLyBtYXJrIGpzIGVycm9yIHB2XG4gICAgaWYgKCFqc0Vycm9yUHYgJiYgdGhpcy5sb2dJbmZvLmNhdGVnb3J5ID09PSBFcnJvcnNDYXRlZ29yeS5KU19FUlJPUikge1xuICAgICAganNFcnJvclB2ID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9nSW5mby5maXJzdFJlcG9ydGVkRXJyb3IgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZVJlY29yZEVycm9yKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBUYXNrLmZpcmVUYXNrcygpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlY29yZEVycm9yKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMubG9nSW5mby5tZXNzYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVycm9ySW5mbyA9IHRoaXMuaGFuZGxlRXJyb3JJbmZvKCk7XG5cbiAgICAgIFRhc2suYWRkVGFzayhlcnJvckluZm8pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9ySW5mbygpIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBlcnJvciBjYXRlZ29yeToke3RoaXMubG9nSW5mby5jYXRlZ29yeX1cXHJcXG4gbG9nIGluZm86JHt0aGlzLmxvZ0luZm8ubWVzc2FnZX1cXHJcXG5cbiAgICAgIGVycm9yIHVybDogJHt0aGlzLmxvZ0luZm8uZXJyb3JVcmx9XFxyXFxuIGA7XG5cbiAgICBzd2l0Y2ggKHRoaXMubG9nSW5mby5jYXRlZ29yeSkge1xuICAgICAgY2FzZSBFcnJvcnNDYXRlZ29yeS5KU19FUlJPUjpcbiAgICAgICAgbWVzc2FnZSArPSBgZXJyb3IgbGluZSBudW1iZXI6ICR7dGhpcy5sb2dJbmZvLmxpbmV9XFxyXFxuIGVycm9yIGNvbCBudW1iZXI6JHt0aGlzLmxvZ0luZm8uY29sfVxcclxcbmA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWVzc2FnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IHJlY29yZEluZm8gPSB7XG4gICAgICAuLi50aGlzLmxvZ0luZm8sXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gICAgcmV0dXJuIHJlY29yZEluZm87XG4gIH1cbn1cbiIsImltcG9ydCBSZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xuXG4vKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmV4cG9ydCBlbnVtIEVycm9yc0NhdGVnb3J5IHtcbiAgQUpBWF9FUlJPUiA9ICdhamF4JyxcbiAgUkVTT1VSQ0VfRVJST1IgPSAncmVzb3VyY2UnLFxuICBWVUVfRVJST1IgPSAndnVlJyxcbiAgUFJPTUlTRV9FUlJPUiA9ICdwcm9taXNlJyxcbiAgSlNfRVJST1IgPSAnanMnLFxuICBVTktOT1dOX0VSUk9SID0gJ3Vua25vd24nLFxufVxuZXhwb3J0IGVudW0gR3JhZGVUeXBlRW51bSB7XG4gIElORk8gPSAnSW5mbycsXG4gIFdBUk5JTkcgPSAnV2FybmluZycsXG4gIEVSUk9SID0gJ0Vycm9yJyxcbn1cbmV4cG9ydCBlbnVtIFJlcG9ydFR5cGVzIHtcbiAgRVJST1IgPSAnL2Jyb3dzZXIvZXJyb3JMb2cnLFxuICBFUlJPUlMgPSAnL2Jyb3dzZXIvZXJyb3JMb2dzJyxcbiAgUEVSRiA9ICcvYnJvd3Nlci9wZXJmRGF0YScsXG4gIFNFR01FTlQgPSAnL3YzL3NlZ21lbnQnLFxuICBTRUdNRU5UUyA9ICcvdjMvc2VnbWVudHMnLFxufVxuXG5leHBvcnQgY29uc3QgU3BhbkxheWVyID0gJ0h0dHAnO1xuZXhwb3J0IGNvbnN0IFNwYW5UeXBlID0gJ0V4aXQnO1xuZXhwb3J0IGVudW0gUmVhZHlTdGF0dXMge1xuICBPUEVORUQgPSAxLFxuICBET05FID0gNCxcbn1cbmV4cG9ydCBjb25zdCBDb21wb25lbnRJZCA9IDEwMDAxOyAvLyBhamF4XG5leHBvcnQgY29uc3QgU2VydmljZVRhZyA9ICc8YnJvd3Nlcj4nO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBSZXBvcnRUeXBlcyB9IGZyb20gJy4vY29uc3RhbnQnO1xuY2xhc3MgUmVwb3J0IHtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgY29sbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZSA9PT0gJ0VSUk9SJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5FUlJPUjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdFUlJPUlMnKSB7XG4gICAgICB0aGlzLnVybCA9IGNvbGxlY3RvciArIFJlcG9ydFR5cGVzLkVSUk9SUztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdTRUdNRU5UJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5TRUdNRU5UO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1NFR01FTlRTJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5TRUdNRU5UUztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdQRVJGJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5QRVJGO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZW5kQnlGZXRjaChkYXRhOiBhbnkpIHtcbiAgICBkZWxldGUgZGF0YS5jb2xsZWN0b3I7XG4gICAgaWYgKCF0aGlzLnVybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzZW5kUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHRoaXMudXJsLCB7IG1ldGhvZDogJ1BPU1QnLCBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSB9KTtcblxuICAgIGZldGNoKHNlbmRSZXF1ZXN0KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gNDAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgb24gYXBpIHNlcnZlciEnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kQnlYaHIoZGF0YTogYW55KSB7XG4gICAgZGVsZXRlIGRhdGEuY29sbGVjdG9yO1xuICAgIGlmICghdGhpcy51cmwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbigncG9zdCcsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlcG9ydCBzdWNjZXNzZnVsbHknKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0O1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgUmVwb3J0IGZyb20gJy4vcmVwb3J0JztcblxuY2xhc3MgVGFza1F1ZXVlIHtcbiAgcHJpdmF0ZSBxdWV1ZXM6IGFueVtdID0gW107XG5cbiAgcHVibGljIGFkZFRhc2soZGF0YTogYW55KSB7XG4gICAgdGhpcy5xdWV1ZXMucHVzaCh7IGRhdGEgfSk7XG4gIH1cblxuICBwdWJsaWMgZmlyZVRhc2tzKCkge1xuICAgIGlmICghdGhpcy5xdWV1ZXMgfHwgIXRoaXMucXVldWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gdGhpcy5xdWV1ZXNbMF07XG4gICAgbmV3IFJlcG9ydCgnRVJST1InLCBpdGVtLmRhdGEuY29sbGVjdG9yKS5zZW5kQnlYaHIoaXRlbS5kYXRhKTtcbiAgICB0aGlzLnF1ZXVlcy5zcGxpY2UoMCwgMSk7XG4gICAgdGhpcy5maXJlVGFza3MoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVGFza1F1ZXVlKCk7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDA7XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcblxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7IGVuY29kZSB9IGZyb20gJ2pzLWJhc2U2NCc7XG5pbXBvcnQgeGhySW50ZXJjZXB0b3IgZnJvbSAnLi4vaW50ZXJjZXB0b3JzL3hocic7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9zZXJ2aWNlcy91dWlkJztcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi4vc2VydmljZXMvcmVwb3J0JztcbmltcG9ydCB7IFNlZ21lbnRGZWlsZHMsIFNwYW5GZWlsZHMgfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHsgU3BhbkxheWVyLCBTcGFuVHlwZSwgUmVhZHlTdGF0dXMsIENvbXBvbmVudElkLCBTZXJ2aWNlVGFnLCBSZXBvcnRUeXBlcyB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnN0YW50JztcbmltcG9ydCB7IEN1c3RvbU9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHdpbmRvd0ZldGNoIGZyb20gJy4uL2ludGVyY2VwdG9ycy9mZXRjaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYWNlU2VnbWVudChvcHRpb25zOiBDdXN0b21PcHRpb25zVHlwZSkge1xuICBsZXQgc2VnbWVudHMgPSBbXSBhcyBTZWdtZW50RmVpbGRzW107XG4gIGNvbnN0IHNlZ0NvbGxlY3RvcjogeyBldmVudDogWE1MSHR0cFJlcXVlc3Q7IHN0YXJ0VGltZTogbnVtYmVyOyB0cmFjZUlkOiBzdHJpbmc7IHRyYWNlU2VnbWVudElkOiBzdHJpbmcgfVtdID0gW107XG4gIC8vIGluamVjdCBpbnRlcmNlcHRvclxuICB4aHJJbnRlcmNlcHRvcigpO1xuICB3aW5kb3dGZXRjaCgpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigneGhyUmVhZHlTdGF0ZUNoYW5nZScsIChldmVudDogQ3VzdG9tRXZlbnQ8WE1MSHR0cFJlcXVlc3QgJiB7IGdldFJlcXVlc3RDb25maWc6IGFueVtdIH0+KSA9PiB7XG4gICAgbGV0IHNlZ21lbnQgPSB7XG4gICAgICB0cmFjZUlkOiAnJyxcbiAgICAgIHNlcnZpY2U6IG9wdGlvbnMuc2VydmljZSArIFNlcnZpY2VUYWcsXG4gICAgICBzcGFuczogW10sXG4gICAgICBzZXJ2aWNlSW5zdGFuY2U6IG9wdGlvbnMuc2VydmljZVZlcnNpb24sXG4gICAgICB0cmFjZVNlZ21lbnRJZDogJycsXG4gICAgfSBhcyBTZWdtZW50RmVpbGRzO1xuICAgIGNvbnN0IHhoclN0YXRlID0gZXZlbnQuZGV0YWlsLnJlYWR5U3RhdGU7XG4gICAgY29uc3QgY29uZmlnID0gZXZlbnQuZGV0YWlsLmdldFJlcXVlc3RDb25maWc7XG4gICAgbGV0IHVybCA9IHt9IGFzIFVSTDtcbiAgICBpZiAoY29uZmlnWzFdLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKSB8fCBjb25maWdbMV0uc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSB8fCBjb25maWdbMV0uc3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgdXJsID0gbmV3IFVSTChjb25maWdbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHVybC5wYXRobmFtZSA9IGNvbmZpZ1sxXTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKFtSZXBvcnRUeXBlcy5FUlJPUiwgUmVwb3J0VHlwZXMuUEVSRiwgUmVwb3J0VHlwZXMuU0VHTUVOVFNdIGFzIHN0cmluZ1tdKS5pbmNsdWRlcyh1cmwucGF0aG5hbWUpICYmXG4gICAgICAhb3B0aW9ucy50cmFjZVNES0ludGVybmFsXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIHZhbHVlcyBvZiB4aHJTdGF0ZSBhcmUgZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvcmVhZHlTdGF0ZVxuICAgIGlmICh4aHJTdGF0ZSA9PT0gUmVhZHlTdGF0dXMuT1BFTkVEKSB7XG4gICAgICBjb25zdCB0cmFjZUlkID0gdXVpZCgpO1xuICAgICAgY29uc3QgdHJhY2VTZWdtZW50SWQgPSB1dWlkKCk7XG5cbiAgICAgIHNlZ0NvbGxlY3Rvci5wdXNoKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50LmRldGFpbCxcbiAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgdHJhY2VJZCxcbiAgICAgICAgdHJhY2VTZWdtZW50SWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdHJhY2VJZFN0ciA9IFN0cmluZyhlbmNvZGUodHJhY2VJZCkpO1xuICAgICAgY29uc3Qgc2VnbWVudElkID0gU3RyaW5nKGVuY29kZSh0cmFjZVNlZ21lbnRJZCkpO1xuICAgICAgY29uc3Qgc2VydmljZSA9IFN0cmluZyhlbmNvZGUoc2VnbWVudC5zZXJ2aWNlKSk7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IFN0cmluZyhlbmNvZGUoc2VnbWVudC5zZXJ2aWNlSW5zdGFuY2UpKTtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gU3RyaW5nKGVuY29kZShvcHRpb25zLnBhZ2VQYXRoKSk7XG4gICAgICBjb25zdCBwZWVyID0gU3RyaW5nKGVuY29kZSh1cmwuaG9zdCkpO1xuICAgICAgY29uc3QgaW5kZXggPSBzZWdtZW50LnNwYW5zLmxlbmd0aDtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGAkezF9LSR7dHJhY2VJZFN0cn0tJHtzZWdtZW50SWR9LSR7aW5kZXh9LSR7c2VydmljZX0tJHtpbnN0YW5jZX0tJHtlbmRwb2ludH0tJHtwZWVyfWA7XG5cbiAgICAgIGV2ZW50LmRldGFpbC5zZXRSZXF1ZXN0SGVhZGVyKCdzdzgnLCB2YWx1ZXMpO1xuICAgIH1cblxuICAgIGlmICh4aHJTdGF0ZSA9PT0gUmVhZHlTdGF0dXMuRE9ORSkge1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdDb2xsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlZ0NvbGxlY3RvcltpXS5ldmVudC5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXR1cy5ET05FKSB7XG4gICAgICAgICAgbGV0IHVybCA9IHt9IGFzIFVSTDtcbiAgICAgICAgICBpZiAoc2VnQ29sbGVjdG9yW2ldLmV2ZW50LnN0YXR1cykge1xuICAgICAgICAgICAgdXJsID0gbmV3IFVSTChzZWdDb2xsZWN0b3JbaV0uZXZlbnQucmVzcG9uc2VVUkwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBleGl0U3BhbjogU3BhbkZlaWxkcyA9IHtcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgICAgICBzdGFydFRpbWU6IHNlZ0NvbGxlY3RvcltpXS5zdGFydFRpbWUsXG4gICAgICAgICAgICBlbmRUaW1lLFxuICAgICAgICAgICAgc3BhbklkOiBzZWdtZW50LnNwYW5zLmxlbmd0aCxcbiAgICAgICAgICAgIHNwYW5MYXllcjogU3BhbkxheWVyLFxuICAgICAgICAgICAgc3BhblR5cGU6IFNwYW5UeXBlLFxuICAgICAgICAgICAgaXNFcnJvcjogZXZlbnQuZGV0YWlsLnN0YXR1cyA9PT0gMCB8fCBldmVudC5kZXRhaWwuc3RhdHVzID49IDQwMCA/IHRydWUgOiBmYWxzZSwgLy8gd2hlbiByZXF1ZXN0cyBmYWlsZWQsIHRoZSBzdGF0dXMgaXMgMFxuICAgICAgICAgICAgcGFyZW50U3BhbklkOiBzZWdtZW50LnNwYW5zLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICBjb21wb25lbnRJZDogQ29tcG9uZW50SWQsXG4gICAgICAgICAgICBwZWVyOiB1cmwuaG9zdCxcbiAgICAgICAgICAgIHRhZ3M6IG9wdGlvbnMuZGV0YWlsTW9kZVxuICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnaHR0cC5tZXRob2QnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY29uZmlnWzBdLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlZ0NvbGxlY3RvcltpXS5ldmVudC5yZXNwb25zZVVSTCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNlZ21lbnQgPSB7XG4gICAgICAgICAgICAuLi5zZWdtZW50LFxuICAgICAgICAgICAgdHJhY2VJZDogc2VnQ29sbGVjdG9yW2ldLnRyYWNlSWQsXG4gICAgICAgICAgICB0cmFjZVNlZ21lbnRJZDogc2VnQ29sbGVjdG9yW2ldLnRyYWNlU2VnbWVudElkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgc2VnbWVudC5zcGFucy5wdXNoKGV4aXRTcGFuKTtcbiAgICAgICAgICBzZWdDb2xsZWN0b3Iuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgIH1cbiAgfSk7XG4gIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uIChlOiBFdmVudCkge1xuICAgIGlmICghc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5ldyBSZXBvcnQoJ1NFR01FTlRTJywgb3B0aW9ucy5jb2xsZWN0b3IpLnNlbmRCeVhocihzZWdtZW50cyk7XG4gIH07XG4gIC8vcmVwb3J0IHBlciA1bWluXG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIXNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXcgUmVwb3J0KCdTRUdNRU5UUycsIG9wdGlvbnMuY29sbGVjdG9yKS5zZW5kQnlYaHIoc2VnbWVudHMpO1xuICAgIHNlZ21lbnRzID0gW107XG4gIH0sIDMwMDAwMCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9