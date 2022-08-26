

/*
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
* calendarJs
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function makeCalendarJs(id, options, searchOptions, startDateTime){
	_element_Calendar = document.getElementById(id);
	
	_element_AuthenticationTab = document.createElement('form');
	_element_AuthenticationTab.id = 'authenticationTab';
	_element_Calendar.appendChild(_element_AuthenticationTab);
	
	_element_CalendarJs = document.createElement('div');
	_element_CalendarJs.id = 'myCalendarJs'
	_element_Calendar.appendChild(_element_CalendarJs);
	
	var authenticationTab = new authentication('authenticationTab');
  
	import('./Calendar.js/src/calendarjs.js')
		.then(({calendarJs}) => {
			var calendarInstance = new calendarJs( 'myCalendarJs', options, searchOptions, startDateTime);
			fetch('/calendarjs/events/all')
				.then((response) => response.json())
				.then((events) => {
					console.log(events);
					calendarInstance.setEvents(events)})
				.catch((err) => console.log(err));
		});
}


function setAllEvents(calendarInstance){		//combine with new calenderjs using import system?
	fetch('/calendarjs/events/all')
		.then((response) => response.json()) 
		.then((events) => calendarInstance.setEvents(events))
		.catch((err) => console.log(err));
}

function addEvent(event){
	fetch('/calendarjs/events', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(event)
	});
}

function removeEvent(event){
	fetch('/calendarjs/events', {method: 'DELETE',
      		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      		},
      		body: JSON.stringify(event)
    	});
}

function updateEvent(event){
	fetch('/calendarjs/events', {method: 'PUT',
      		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      		},
      		body: JSON.stringify(event)
    	});
}

/*
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
* authentication
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function authentication( id ){
	_this = this,
	_document = null,
	_window = null,
	_token = '',
	_initialized = false,
	_element_AuthenticationTab = null,
	_element_PasswordInput = null,
	_element_EditMode = null;

	function build() {
		buildPasswordInputView();
		buildEditModeView();
		
		_initialized = true;
	}
	
	function buildPasswordInputView() {
		_element_PasswordInput = _document.createElement( 'input' );
		_element_PasswordInput.id = 'calendarPassword';
		_element_PasswordInput.type = 'password';
		_element_PasswordInput.placeholder = 'Password';
		_element_AuthenticationTab.appendChild(_element_PasswordInput);
		
		_element_PasswordButton = _document.createElement( 'button' ); 
		_element_PasswordButton.type = 'submit';
		_element_PasswordButton.classList.add('ib-circle-check');
		_element_AuthenticationTab.appendChild(_element_PasswordButton);
		
		_element_AuthenticationTab.addEventListener('submit', authenticate);
	}
		
	async function authenticate(event) {						//async? await fetch?
		event.preventDefault();
		const password = _document.getElementById('calendarPassword').value;
		const result = await fetch('/authentication/authenticate', {
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
			_token = res.token;
			console.log('token: ', _token);  
		})
		.catch(err => console.log(err));
		return result;
	}	

	function buildEditModeView(){
		_element_EditMode = _document.createElement( 'div' );
		_element_EditMode.id = 'editMode';
		_element_EditMode.innerHTML = 'edit mode';
		_element_AuthenticationTab.appendChild(_element_EditMode);
	}

	( function ( documentObject, windowObject ) {
		_document = documentObject;
        _window = windowObject;
		
		_element_AuthenticationTab = _document.getElementById( id );
		_element_AuthenticationTab.classList.add('AuthenticationTab');
		_element_AuthenticationTab.innerHTML = '';			//for if already defined?

        if ( _element_AuthenticationTab !== undefined ) {		//more and beter validation?
            build();
		}
	}) ( document, window );		
	
}
