selector = function () {
	// Private things o.o
	var _selectedElement = {};

	// state
	var _isSelectorRunning = false;

	var _start = function () {
		_isSelectorRunning = true;
	};
	var _stop = function () {
		_isSelectorRunning = false;
	};
	var _isRunning = function () {
		return _isSelectorRunning;
	};

	// Styles
	var _SELECTOR_CLASS = " highlight";
	var _createSelectorStyleSheet = function () {
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".highlight { outline: 4px solid #07C !important; }";
		document.body.appendChild(css);
	};

	var init = function () {
		_createSelectorStyleSheet();
		_addMouseOverListener();
		_start();
	};

	var _addMouseOverListener = function () {
		document.body.addEventListener("mouseover", function (e) {
			if (!_isRunning())
				return;

			e.stopPropagation();

			if (_canAddEventsToTarget(e.target))
				_addEventsToTarget(e.target);

			if (_canAddClassToTarget(e.target, _SELECTOR_CLASS))
				_addClassToTarget(e.target, _SELECTOR_CLASS);
		});
	};

	//--
	var _canAddEventsToTarget = function (target) {
		return !_targetHasClass(target, _SELECTOR_CLASS);
	};
	var _addEventsToTarget = function (target) {
		target.addEventListener("click", _clickEvent);
		target.addEventListener("mouseout", _mouseoutEvent);
	};
	var _canAddClassToTarget = function (target, classToAdd) {
		return !_targetHasClass(target, classToAdd);
	};
	var _targetHasClass = function (target, className) {
		return target.className.indexOf(className) >= 0;
	};
	var _addClassToTarget = function (target, classToAdd) {
		target.className += classToAdd === undefined ? "" : classToAdd;
	};

	//-- --
	var _mouseoutEvent = function (e) {
		_clearTarget(e.target);
	};
	var _clickEvent = function (e) {
		if (!_isRunning())
			return;

		e.stopPropagation();
		e.preventDefault();

		_selectTarget(e.target);
		_clearTarget(e.target);
		_stop();
	};
	
	//-- -- --
	var _selectTarget = function (target) {
		_selectedElement = target;
	};
	var _clearTarget = function (target) {
		_removeEventsFromTarget(target);
		_removeClassFromTarget(target, _SELECTOR_CLASS);
	};

	//-- -- -- --
	var _removeEventsFromTarget = function (target) {
		target.removeEventListener("click", _clickEvent);
		target.removeEventListener("mouseout", _mouseoutEvent);
	};
	var _removeClassFromTarget = function (target, classToRemove) {		
		target.className = target.className.replace(new RegExp(classToRemove + "\\b", "g"), "");
	};

	var createSelectorObject = function () {
		init();
		return {
			start: function () {
				_start();
			},
			isRunning: function () {
				return _isRunning();
			},
			stop: function () {
				_stop();
			},

			getElement: function () {
				return _selectedElement;
			}
		}
	}
	
	return createSelectorObject();
}
();
