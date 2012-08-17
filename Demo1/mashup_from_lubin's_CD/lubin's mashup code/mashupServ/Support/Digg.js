function DiggClass()
{
}

DiggClass.prototype.getStories = function(number)
{
	//debugger;
    return DiggClass.get_Stories('stories', number);
};

DiggClass.prototype.getUsers = function(number)
{
    return DiggClass.get_Users('users', number);
};

DiggClass.prototype.getUser = function(userName, number)
{
    return DiggClass.get_Users('user/' + userName, 1, userName + " is not a valid userName.")[0];
};

// -- internal functions
DiggClass.get_Stories = function(endpoint, number, errorMsg)
{
    var result = DiggClass.callEndpoint(endpoint, number, errorMsg);
    var stories = [];
    
    for(var i = 0; i < result.count; i++)
    {
        var story = result.stories[i];       
        var nStory = new DiggClass.Story();
        
        nStory.title = story.title;
        nStory.description = story.description;
        nStory.storyID = story.id;
        nStory.link = story.link;
        nStory.submitDate = story.submit_date;
        nStory.diggs = story.diggs;
        nStory.comments = story.comments;
        nStory.href = story.href;
        nStory.status = story.status;        
        nStory.user = story.user.name;
        nStory.userThumbnail = story.user.icon;
        nStory.topic = (story.topic ? story.topic.name : "");
        
        stories.push(nStory);
    }
    return stories;
};

DiggClass.get_Users = function(endpoint, number, errorMsg)
{
    var result = DiggClass.callEndpoint(endpoint, number, errorMsg);
    var users = [];
    
    for(var i = 0; i < result.count; i++)
    {
        var nUser = new DiggClass.User();
        var user = result.users[i];

        nUser.name = user.name;
        nUser.thumbnail = user.icon;
        nUser.registered = user.registered;
        nUser.profileViews = user.profileviews;
    
        users.push(nUser);
    }
    return users;
};

DiggClass.User = function()
{
    this.name = null;
    this.thumbnail = null;
    this.registered = null;
    this.profileViews = null;

    this.toString = function()
    {
        var str = "<br />" +
            "User name: " + this.name + "<br />" +
            "UserIcon: <a href='" + this.thumbnail + "' target='_blank' >Click Here</a><br />" +
            "UserReg: " + this.registered + "<br />" +
            "Profile Views: " + this.profileViews;
        return str;
    };
};


// call a digg endpoint with optional max number and custom error message
DiggClass.callEndpoint = function(endpoint, number, errorMsg)
{
    var apiUrl = 'http://services.digg.com/';
    var appKey = 'http://www.popfly.ms'; // digg doesn't have any particular appkey

    var reqUri = apiUrl + endpoint + "?appkey=" + appKey + "&type=json";
    if(number) reqUri += "&count=" + number;

 //   var response = environment.getHttpResponse(reqUri);

//    if ((response.status+"").charAt(0) != "2")
//    {
//        throw errorMsg || endpoint + " returned a status of " + response.status;
//    }
    
    var resultText =  environment.getText(reqUri);
    
    return eval('(' + resultText + ')');

//    return Sys.Serialization.JavaScriptSerializer.deserialize(response.responseText);
};

// -- data classes
DiggClass.Story = function()
{
    this.title = null;
    this.description = null;
    this.user = null;
    this.topic = null;
    this.storyID = null;
    this.link = null;
    this.submitDate = null;
    this.diggs = null;
    this.comments = null;
    this.href = null;
    this.status = null;

    this.toString = function()
    {
        var str = "<p>" +
            "Title: " + this.title + "<br />" +
            "Description: " + this.description + "<br />" +
            "User: " + this.user + "<br />" +
            "Topic: " + this.topic + "<br />" +
            "Story ID: " + this.storyID + "<br />" +
            "Link: <a href='" + this.link + "' target='_blank' >Click Here</a><br />" +
            "Submit Date: " + this.submitDate + "<br />" +
            "Diggs: " + this.diggs + "<br />" +
            "Comments: " + this.comments + "<br />" +
            "Href: <a href='" + this.href + "' target='_blank' >Click Here</a><br />" +
            "Status: " + this.status + "</p>";
        return str;
    };
};
