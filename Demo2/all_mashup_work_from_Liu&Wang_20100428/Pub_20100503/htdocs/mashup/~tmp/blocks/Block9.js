function (svc) {
    
    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {

		var contacts = [];

		contacts.push ({
			"nick_name":	"嘴巴",
			"first_name":	"Hidden",
			"last_name":	"Lau",
			"phone_number":	"13588162881",
			"image":		"",
			"description":	"...",
			"email" : "islandsolo@gmail.com"
		});
		contacts.push ({
			"nick_name":	"小猫喝牛奶",
			"first_name":	"Victor",
			"last_name":	"Guo",
			"phone_number":	"13560358487",
			"image":		""
		});
		contacts.push ({
			"first_name":	"Davy",
			"last_name":	"Han",
			"phone_number":	"13075629187",
			"image":		""
		});
		contacts.push ({
			"nick_name":	"茶女王",
			"first_name":	"Maggie",
			"last_name":	"Zhu",
			"phone_number":	"13600534530",
			"image":		""
		});
		contacts.push ({
			"first_name":	"Farfalle",
			"last_name":	"Lee",
			"phone_number":	"15121013846",
			"image":		""
		})
		contacts.push ({
			"nick_name":	"式微│",
			"first_name":	"Isoda",
			"last_name":	"Green",
			"phone_number":	"13821701806",
			"image":		"",
			"email" : ""
		})
		;
		
		
		var key;
		
		for (key in contacts) {
			contacts[key].title = contacts[key].first_name + ' ' + contacts[key].last_name;
		}

		svc.output = contacts;
		
		svc.notifyOutputReady();
        
    };
}
