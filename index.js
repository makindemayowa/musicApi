console.log ("You can only select genre id's from [Techno : '8', DownTempo : '3', Drum n Bass : '4', Rock : '61', House : '7'] ");
var request = require("request");
var prompt = require('prompt');
var chalk = require('chalk');
var error = chalk.bold.red;
var properties = [
  {
    name: 'Genre_selected', 
    validator: /^\d+$/,
    warning: error('Genre Id can only be a number')
  }
];
prompt.start();
prompt.get(properties, function (err, result) {
	if (err) { 
		return onErr(err); 
	}
request({
    headers: {
      'Authorization': 'Bearer ' + 'E8D3917C-EE93-4B11-912B-1DF5D6DB7B4E'
    },
    uri: 'http://api.internetdj.com/media_list',
    method: 'GET',
    // qs: {
    // 	genreId: parseInt(result.Genre_selected)
    // }
  }, function (err, res, body) {
    body = JSON.parse(body);
    var blue = chalk.blue.bold;
    var media = body.media;
    // console.log(media[1]);
    for (var i = 0; i < media.length; i++) {
    	// console.log(media[i])
    	if (media[i].genre_id == result.Genre_selected) {
    		console.log(blue("MEDIA TITLE:\t\t\t\t") 			+ media[i].media_title);
    		console.log(blue("GENRE NAME: \t\t\t\t") 			+ media[i].genre_name);
    		console.log(blue("ARTIST NAME: \t\t\t\t") 		+ media[i].artist_name);
			console.log(blue("STREAMING URL: \t\t\t\t") 		+ media[i].media_url);
			console.log("\n\n\n\n");
    	}	
    };
  });
});