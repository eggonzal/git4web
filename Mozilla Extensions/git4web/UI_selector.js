selector = function () {
	// Private things o.o
	var DEBUG = false;
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

	// Init
	var init = function () {
		if(DEBUG) console.log('On init'); 
		_createSelectorStyleSheet();
		_addMouseOverListener();
		_start();
	};

	var _addMouseOverListener = function () {
		if(DEBUG) console.log('Adding mouseover listener'); 
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
		if (DEBUG) 
			console.log('Adding Events');
		
		_addClickEventToTarget(target);
		_addMouseoutEventToTarget(target);
	};
	var _canAddClassToTarget = function (target, classToAdd) {
		if(DEBUG) console.log('Can add class to target?' + _targetHasClass(target, classToAdd));
		return !_targetHasClass(target, classToAdd);
	};
	var _targetHasClass = function (target, className) {
		return target.className.indexOf(className) >= 0;
	};
	var _addClassToTarget = function (target, classToAdd) {
		if (target === undefined || target.className === undefined)
			return console.log('No target to add class name.');
		if (DEBUG) 
			console.log('Adding class to target');
		
		target.className += classToAdd === undefined ? "" : classToAdd;
	};
	
	//-- --
	var _addClickEventToTarget = function (target) {
		if (DEBUG) 
			console.log('Adding click event');
		
		target.addEventListener("click", _clickEvent);
	};
	var _addMouseoutEventToTarget = function (target) {
		if (DEBUG) 
			console.log('Adding mouse out event');
		
		target.addEventListener("mouseout", _mouseoutEvent);
	};

	//-- -- --
	var _mouseoutEvent = function (e) {
		if(DEBUG)
			console.log('On mouseout event');
		
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

	//-- -- -- --
	var _selectTarget = function (target) {
		_selectedElement = target;
	};
	var _clearTarget = function (target) {
		if(DEBUG) console.log('On Clear Target'); 
		_removeEventsFromTarget(target);
		_removeClassFromTarget(target, _SELECTOR_CLASS);
	};

	//-- -- -- -- --
	var _removeEventsFromTarget = function (target) {
		if(DEBUG) console.log('Removing Events from target'); 
		target.removeEventListener("click", _clickEvent);
		target.removeEventListener("mouseout", _mouseoutEvent);
	};
	var _removeClassFromTarget = function (target, classToRemove) {
		if(DEBUG) console.log('Removing class from target'); 
		if (target === undefined || target.className === undefined || target.className.replace === undefined)
			return console.log('No target to remove class name.');
		
		target.className = target.className.replace(new RegExp(classToRemove + "\\b", "g"), "");
	};

	var createSelectorObject = function () {
		if(DEBUG) console.log('On create object'); 
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
