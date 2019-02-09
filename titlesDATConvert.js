var fs = require('fs');

let anime_titles = {}, titles = []
fs.readFile('anime-titles.dat.gz', 'utf8', function(err, contents) {
	let lines = contents.split("\n")
	for(let i = 3; i < lines.length; i++) {
		let line = lines[i].split("|"),
		     aid = parseInt(line[0])
		if(aid in anime_titles) {
			if(anime_titles[aid].indexOf(line[3]) === -1) {
				anime_titles[aid] += ","+line[3]
			}
		} else // if(!(aid in anime_titles))
			anime_titles[aid] = line[3]
	}
	
	for(let key in anime_titles)
		titles.push([parseInt(key), anime_titles[key]])
	
	var file = fs.createWriteStream('titles.json');
		file.write(JSON.stringify(titles));
		file.end();
});
