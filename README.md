# oeteM | Meteo
A React web application of reverse meteo.

## Development

### Start
```
cd node-oetem
http-server ./outputData

cd oetem
npm start
```

### Factory modules
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar): Compile SASS.
* [npm-run-all](https://github.com/mysticatea/npm-run-all): Run in parallel npm scripts.

### App modules
* [immutability-helper](https://github.com/kolodny/immutability-helper): Used in setState() to mutate a copy of the state without changing the original one.
* [react-input-range](https://github.com/davidchin/react-input-range): Used in TemperatureInput component to select a range of temperature.
* [react-modal](https://github.com/reactjs/react-modal): Used in About component to display a modal.
* [react-transition-group](https://github.com/reactjs/react-transition-group): Used in App component to add CSS transition between routes.
* [whatwg-fetch](https://github.com/github/fetch): Used in App component to fetch data.

### TODO
* Handle nicely Match icons (hover, sprite/svg...)
* ~~Avoid duplicate code in App component~~
* ~~Clean utils~~
* Customize router animation for home/matches pages
* Add waiting spinner
* ~~Handle invalid/incomplete data~~
* Remove commented code in Matches
* Accessibility
* i18n
* Google Analytics


### Next version
* Do parallel fetch()
* Display more info with large screens
* Add Summary component
* Add filters on matches list
* Give more error details (use Redirect?)
* Progressive web app
* Use OpenStreetMap?
* Include map inside the page?
* Taiwan map loader?
* SVG map?
* Server-side rendering?


## Hosting
* [DigitalOcean](https://try.digitalocean.com/cloud-hosting/)
* [Google Clound](https://cloud.google.com/nodejs/)
