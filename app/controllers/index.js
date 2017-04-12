/*get list of news from
 * URL: http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss
 */
function getNews() {
	var getNewList = require("getNews");
	getNewList.getListOfNews(initializeNews);
	$.container.open();
}

getNews();

/*Bind list of news to a tableview to display title, date and link for all news - ios and android
 * Every news link is clickable and take you to the news on the web.
 * */
function initializeNews(responseData) {
	try {
		console.log("Response: " + (responseData));
		var response = JSON.parse(responseData).items;
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var row = Titanium.UI.createTableViewRow({
				layout : 'vertical',
				top : 10,
				borderWidth : 2
			});

			var title = Titanium.UI.createLabel({
				text : response[i].title,
				font : {
					fontSize : 16,
					fontWeight : 'bold'
				},
				width : 'auto',
				textAlign : 'left',
				top : 10,
				left : 20,
			});

			var date = Titanium.UI.createLabel({
				text : response[i].pubDate,
				font : {
					fontSize : 16,
					fontWeight : 'bold'
				},
				width : 'auto',
				textAlign : 'left',
				top : 10,
				left : 20,
			});

			var attr = Ti.UI.createAttributedString({
				text : response[i].link,
				attributes : [{
					type : Titanium.UI.ATTRIBUTE_LINK,
					value : response[i].link,
					range : [0, response[i].link.length]
				}]
			});

			var link = Ti.UI.createLabel({
				attributedString : attr,
				font : {
					fontSize : 12,
					fontWeight : 'bold',
					fontColor : 'blue'
				},
				width : 'auto',
				textAlign : 'left',
				top : 2,
				left : 20,
				bottom : 10
			});
			if (Ti.Platform.osname == 'iphone') {
				link.height = "Ti.UI.SIZE";
			}
			link.addEventListener('link', function(e) {
				Ti.API.info('value' + JSON.stringify(e));
				Ti.Platform.openURL(e.url);
			});
			row.add(title);
			row.add(date);
			row.add(link);

			/*
			 * The hasChild flag is used to indicate to the user that clicking on the row displays more detailed information.
			 * Added className to the row to improve the rendering performance,
			 * as the iPhone will reuse the row template with every new data when rendering the table.
			 */
			if (Ti.Platform.name == 'ios') {
				row.hasChild = response[i].hasChild;
				row.className = 'list_row';
			}
			data.push(row);
		}

		$.listNewsView.setData(data);
	} catch(e) {
		alert("Error" + e.message);
	}
}

