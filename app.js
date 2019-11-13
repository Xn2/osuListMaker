const axios = require('axios');
const fs = require('fs');
const iohook = require('iohook');
const sheets = require('google-spreadsheet');
const config = require('./config.json');
const creds = require('./googleapicreds.json');

const doc = new sheets(config.spreadsheetid);
let sheet;

const asciitext = fs.readFileSync('ascii.txt').toString();

function startup() {
	console.log(asciitext);
	console.log('\nReady !');
	iohook.start();
}

function getCurrentBeatmapData(cb) {
	const mapid = parseInt(fs.readFileSync('C:\\Program Files (x86)\\StreamCompanion\\Files\\map_id.txt').toString());
	axios({
		url: `https://osu.ppy.sh/api/get_beatmaps?k=${config.osuapikey}&b=${mapid}`,
		method: 'get'
	}).then((response) => {
		console.log(response.data);
		return cb(response.data);
	});
}

function writeNewRow(mapdata) {
	doc.useServiceAccountAuth(creds, () => {
		doc.getInfo(function(err, info) {
			console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
			sheet = info.worksheets[0];
			console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);

			sheet.getRows((err, rows) => {
				console.log(rows);
			});

			sheet.addRow(
				{
					name: mapdata.title,
					artist: mapdata.artist,
					diff: mapdata.version,
					creator: mapdata.creator,
					sr: mapdata.difficultyrating.substring(0, 4),
					lien: 'https://osu.ppy.sh/b/' + mapdata.beatmap_id,
					osudirect: 'osu://dl/' + mapdata.beatmapset_id
				},
				(err, row) => {
					if (err) {
						throw new Error(err);
					}
					console.log(`Added "${mapdata.artist} - ${mapdata.title}" to the list.`);
				}
			);
		});
	});
}

iohook.on('keypress', (key) => {
	if (key.ctrlKey && key.rawcode == 76) {
		getCurrentBeatmapData((mapdata) => {
			writeNewRow(mapdata[0]);
		});
	}
});

startup();
