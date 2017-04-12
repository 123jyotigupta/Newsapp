exports.getListOfNews = function(callback) {

	var url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss";
	try {
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				callback(this.responseText);
			}
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	} catch(e) {
		callback(e);
	}
};
