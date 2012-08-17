import Qt 4.7

Image {
	id: image
	onStatusChanged: {
		if(status == Image.Ready){
			myConsole.log += "\nmmmmmmm\n";
			var d = new Date();
			var t = d.getTime();
			myConsole.log += "e: " + t + "\n";
		}
	}
}