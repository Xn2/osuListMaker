# osu!ListMaker
Make beatmap lists directly in Google Sheets from inside osu!

## Setup
 - Install and run [osu!StreamCompanion](https://github.com/Piotrekol/StreamCompanion)
 - Create a new Output Pattern in StreamCompanion called `map_id` and containing `!mapid!`
 - Clone the repo
 - `npm install`
 - Get your osu! API key https://osu.ppy.sh/p/api
 - Paste it in `config.json`
 - Get your Google Sheets API Service account JSON key file 
 - Paste the contents of the JSON in `googleapicreds.json`
 - Create a new spreadsheet and copy its ID in `config.json`
 - Grant edit rights to your Google Sheets service account on the spreadsheet
 - The first row must be formatted like on [this spreadsheet](https://docs.google.com/spreadsheets/d/14zjQgnhPsmJpQqtsO8tNg_D4U3wc_DaH5c1XGS6wEUk)

## Usage
Hit CTRL + L in osu! to save the currently playing map to the spreadsheet, this even works in the song select menu.

## Compatibility
This program is currently for Windows only. Linux and Mac will NOT be supported, even in the future.
