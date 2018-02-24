# oeteM | Meteo
A React web application of reversed meteo.

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
* [react-transition-group](https://github.com/reactjs/react-transition-group): Used in App component to add CSS transition between routes.
* [whatwg-fetch](https://github.com/github/fetch): Used in App component to fetch data.

### TODO
* ~~Disable submit button when form not valid~~
* ~~Move nextPath prop in App~~
* Transform When/Where/What into dumb components
* Tablet/Desktop styles
* Buttons hover styles
* About modal
* i18n
* SVG map?

## Hosting
* [DigitalOcean](https://try.digitalocean.com/cloud-hosting/)
* [Google Clound](https://cloud.google.com/nodejs/)
