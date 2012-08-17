function (svc) {
    
	var uri = mmashupService('Contact.py/allContactsJSON?callback=?');


    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {

		$.getJSON (uri, null, function (rsp) {
			
			var contacts = [];
			
			$.each (rsp, function (key, contact) {
				
				var name;
				var phone_number = contact.mobile_number !== null ? contact.mobile_number : contact.phone_number;
				
				if (contact.first_name === null) {
					name = contact.last_name;
				}
				else if (contact.last_name === null) {
					name = contact.first_name
				}
				else {
					name = contact.first_name + ' ' + contact.last_name;
				}
				
				
				contacts.push({
					"title" : name,
					"first_name" : contact.first_name,
					"last_name" : contact.last_name,
					"phone_number" : phone_number,
					"email" : contact.email_address,
					"nick_name" : contact.second_name,
					"image" : null
				});
				
			});
			
			svc.output = contacts;
			svc.notifyOutputReady();
			
		});
		
    };
}