var fs = require('fs');

let anime_titles = {}, titles = []
fs.readFile('anime-titles.dat', 'utf8', function(err, contents) {
	let lines = contents.split("\n")
	for(let i = 3; i < lines.length; i++) {
		let line = lines[i].split("|")
		if(line[0] in anime_titles) {
			if(anime_titles[line[0]].indexOf(line[3]) === -1) {
				anime_titles[line[0]] += "|"+line[3]
			}
		} else
			anime_titles[line[0]] = line[3]
	}
	
	for(let key in anime_titles)
		titles.push([key, anime_titles[key]])
	
	var file = fs.createWriteStream('titles.json');
		file.write(JSON.stringify(titles));
		file.end();
});