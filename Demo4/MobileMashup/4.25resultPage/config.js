Qt.include("model.js")

//description of home screen.
var config_items = [
    {
        name: "Flickr-SinaMicroBlog",
        shortDesc: "Micro blog with images",
        longDesc: "Search images from flickr and send the result to Sina Micro-blog.",
        userinputCtrls:[
            {
                text: "search text",
                type: "LABEL"
            },
            {
                text: "",
                type: "TEXTAREA",
            },
           {
                text: "number",
                type: "LABEL"
            },
            {
                text: "",
                type: "TEXTAREA",
            }
        ]
    },
    {
        name: "Location",
       shortDesc: "Publish Location",
        longDesc: "Get GPS location and publish it to Sina Weibo",
        userinputCtrls:[

        ]
   },
    {
        name: "Flickr",
        shortDesc: "Flickr picture",
        longDesc: "Get pictures from flickr.",
        userinputCtrls:[
            {
                text: "search text",
               type: "LABEL"
            },
            {
                text: "",
               type: "TEXTAREA",
            },
            {
               text: "number",
                type: "LABEL"
            },
            {
                text: "",
                type: "TEXTAREA",
            }
        ]
    },
    {
        name: "Sina Micro-Blog",
        shortDesc: "Update microblog status.",
        longDesc: "Update a status to Sina Microblog.",
        userinputCtrls:[
            {
                text: "Please input status:",
                type: "LABEL"
            },
            {
                text: "",
                type: "TEXTAREA",
            }
        ]
    }
];
var mashup = {
	id: 'mashup',
	context : null,
	process: null,
	push: addActivity,
	init: function() {
	this.context = {
		_temp: {type: null, value: null}
	};		var GetTerminalInput1 = new GetTerminalInput('temp', 'temp', 'string', 'text', 'Michael Jackson');
		mashup.push(GetTerminalInput1);

		var Invoke2 = new Invoke('invoke2', 'Flickr', 'getPhotos', ['','','','string',''], [['radius',''],['number',''],['lon',''],['search_text','${temp}'],['lat','']], ['string','string','string','string'], ['longitude','thumbnailUrl','latitude','title']);
		mashup.push(Invoke2);
		
		
	

	}
};
