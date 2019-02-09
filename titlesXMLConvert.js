let convert = require('xml-js'),
	fs = require('fs'),
	titles = []
fs.readFile('anime-titles.xml.gz', 'utf8', function(err, xml) {
	//var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
	//var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
	//console.log(result1, '\n', result2);

	let all_anime = JSON.parse(convert.xml2json(xml, {compact: true, spaces:0}))["animetitles"]["anime"]
	for(let i = 0; i < all_anime.length; i++) {
		let aid = parseInt(all_anime[i]['_attributes']['aid']),
			main_title = ""
		
		if(Array.isArray(all_anime[i].title)) {	
			for(let j = 0; j < all_anime[i].title.length; j++)
				if(all_anime[i].title[j]._attributes.type == "main")
					main_title = all_anime[i].title[j]._text
		} //else //29 titles don't have more than 1 title ... :) https://pastebin.com/mj9AKrcH
		  //	console.log(aid, all_anime[i].title._attributes.type, all_anime[i].title._attributes['xml:lang'], all_anime[i].title._text)
				
		titles.push([aid, main_title])
	}
	var file = fs.createWriteStream('title.json');
		file.write(JSON.stringify(titles));
		file.end();
})
