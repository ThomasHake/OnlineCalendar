//OnlineCalendar()
function OnlineCalendar(id, calendarJsArguments){		//add options argument later
	var _this = this,
		_calendarJsFile = './Calendar.js/src/calendarjs.js',
		_default_CalendarJsArguments = {
			id: 'myCalendarJs',
			options:{ 
				exportEventsEnabled: false,
				manualEditingEnabled: false,
				showTimesInMainCalendarEvents: false,
			},
		},
		_document = null,
		_window = null,
		_initialized = false,
		_element_OnlineCalendar = null,
		_element_PasswordTab = null,
		_element_PasswordInput = null,
		_element_EditMode = null,
		_element_CalendarJs = null,
		_calendarInstance = null;

	function buildAuthenticationTab() {
		buildPasswordInputView();
		buildEditModeView();
		
		_initialized = true;
	}
	
	function buildPasswordInputView() {
		_element_PasswordTab = _document.createElement('form');
		_element_PasswordTab.className = 'authenticationTab'
		_element_OnlineCalendar.appendChild(_element_PasswordTab);
		
		_element_PasswordInput = _document.createElement('input');
		_element_PasswordInput.id = 'calendarPassword';
		_element_PasswordInput.type = 'password';
		_element_PasswordInput.placeholder = 'Password';
		_element_PasswordTab.appendChild(_element_PasswordInput);
		
		_element_PasswordButton = _document.createElement('button'); 
		_element_PasswordButton.type = 'submit';
		_element_PasswordButton.className = 'ib-circle-check';
		_element_PasswordTab.appendChild(_element_PasswordButton);
		
		_element_PasswordTab.addEventListener('submit', authenticate);
	}
		
	
	function buildEditModeView(){
		_element_EditMode = _document.createElement('div');
		_element_EditMode.className = 'editMode authenticationTab';
		_element_EditMode.innerHTML = 'edit mode';
		_element_OnlineCalendar.appendChild(_element_EditMode);
	}
	
	async function authenticate(event) {		//httpOnly cookie added by response
		event.preventDefault();
		const password = _document.getElementById('calendarPassword').value;
		await fetch('/authentication/authenticate', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify({
				password
			})
		})
		.then(res => res = res.json())
		.then((res) => {
			startEditMode();
			console.log(res)
			setTimeout(endEditMode, res.cookieMaxAge);
		})
		.catch(err => console.log(err));
	}	
	
	function startEditMode(){
		_element_PasswordTab.style.display = 'none';
		_element_EditMode.style.display = 'block';
		setEditOptions();
	}
	
	function setEditOptions(){
		_calendarInstance.setOptions({
			manualEditingEnabled: true,
			onEventAdded: addEvent,
			onEventRemoved: removeEvent,
			onEventUpdated: updateEvent,
		});
	}
	
	function endEditMode(){
		_element_PasswordTab.style.display = 'block';
		_element_EditMode.style.display = 'none';
		_calendarInstance.setOptions({
			manualEditingEnabled: false,
		});
	}
	
	function buildCalendarJs(calendarJsArguments){
		if(calendarJsArguments === undefined)
			calendarJsArguments = _default_CalendarJsArguments;
		
		_element_CalendarJs = _document.createElement( 'div' );
		_element_CalendarJs.id = calendarJsArguments.id;
		_element_OnlineCalendar.appendChild(_element_CalendarJs)
		
		import(_calendarJsFile)
		.then(({calendarJs}) => {
			_calendarInstance = new calendarJs(calendarJsArguments.id,
											   calendarJsArguments.options,
											   calendarJsArguments.searchOptions,
											   calendarJsArguments.startDateTime);
			getAllEvents(_calendarInstance);
		});
	}
	
	
	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Get/Add/Remove Events from Server 
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

	
	function getAllEvents(calendarInstance){
		fetch('/calendarjs/events/all', {'Accept': 'application/json'})
			.then((response) => response.json()) 
			.then((events) => calendarInstance.setEvents(events))
			.catch((err) => console.log(err));
	}

	function addEvent(event){
		fetch('/calendarjs/events', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		body: JSON.stringify(event)
		});
	};

	function removeEvent(event){
		fetch('/calendarjs/events', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				},
			body: JSON.stringify(event)
			});
	};

	function updateEvent(event){
		fetch('/calendarjs/events', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		body: JSON.stringify(event)
		});
	};

	/*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize OnlineCalendar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

	( function ( documentObject, windowObject ) {
		_document = documentObject;
        _window = windowObject;
		_elementID = id;
		
        if ( _elementID !== undefined ) {		//TODO beter validation?
			var element = _document.getElementById( _elementID );

			_element_OnlineCalendar = element;
        	_element_OnlineCalendar.innerHTML = "";
			
            buildAuthenticationTab();
			buildCalendarJs(calendarJsArguments);
		}
		
	} ) ( document, window );			
}

/*
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
* calendarJs
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function OnlineCalender(id, options, searchOptions, startDateTime){
	_element_Calendar = document.getElementById(id);
	
	_element_PasswordTab = document.createElement('form');
	_element_PasswordTab.id = id + 'AuthenticationTab';
	_element_Calendar.appendChild(_element_PasswordTab);
	
	_element_CalendarJs = document.createElement('div');
	_element_CalendarJs.id = id + 'Js';
	_element_Calendar.appendChild(_element_CalendarJs);
	
	var authenticationTab = new authenticationTabJs(_element_PasswordTab.id);
  
	import('./Calendar.js/src/calendarjs.js')
		.then(({calendarJs}) => {
			var calendarInstance = new calendarJs( 'myCalendarJs', options, searchOptions, startDateTime);
			getAllEvents(calendarInstance);
		});
}



/*
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
* authentication
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/