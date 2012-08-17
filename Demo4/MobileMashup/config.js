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
	};		var GetTerminalInput1 = new GetTerminalInput('song ', 'song ', 'string', 'text', 'Time');
		mashup.push(GetTerminalInput1);

		var GetTerminalInput2 = new GetTerminalInput('artist', 'artist', 'string', 'text', 'Cher');
		mashup.push(GetTerminalInput2);

		var Invoke3 = new Invoke('invoke2', 'LyricWiki', 'getLyric', ['string','string'], [['artist','${artist}'],['song','${song }']], ['string','string','string','string'], ['url','artistO','lyrics','songO']);
		mashup.push(Invoke3);

		var Invoke4 = new Invoke('invoke3', 'Lastfm', 'getArtistInfo', ['string'], [['artist','${invoke2.artistO}']], ['string','string','string','string','string'], ['largeImage','url','name','megaImage','summary']);
		mashup.push(Invoke4);

	}
};