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

### ESLint
`./node_modules/.bin/eslint src/**/*`

Or Atom ESLint plugin.

### Factory modules
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar): Compile SASS.
* [npm-run-all](https://github.com/mysticatea/npm-run-all): Run in parallel npm scripts.
* [eslint](https://github.com/eslint/eslint): Check JS code.

### App modules
* [react-input-range](https://github.com/davidchin/react-input-range): Used in TemperatureInput component to select a range of temperature.
* [react-modal](https://github.com/reactjs/react-modal): Used in About component to display a modal.
* [react-transition-group](https://github.com/reactjs/react-transition-group): Used in App component to add CSS transition between routes.
* [immutability-helper](https://github.com/kolodny/immutability-helper): Used in setState() to mutate a copy of the state without changing the original one.
* [object-path](https://github.com/mariocasciaro/object-path): Use in ImmutabilityUtils to get property value from path.

### TODO
* Google Analytics
* Merge to master


### Next version
* i18n
* Add favicon
* Optimize fetching init.json
* Display error message when init.json not available
* Avoid duplicated code in App
* Display more info with large screens
* Add Summary component
* Add filters on matches list
* Give more error details (use Redirect?)
* Find a place to store const url http://www.cwb.gov.tw/V7/symbol/weather/gif/day/...
* Add select all button
* Avoid displaying error message on Matches after clicking Try againP
* Automatically add version from package.json in About component
* Customize router animation for home/matches pages (if possible)
* Flow/TypeScript?
* Redux! (to avoid cancelable promise?)
* Progressive web app
* CI
* Use OpenStreetMap?
* Include map inside the page?
* Taiwan map loader?
* SVG map?
* Server-side rendering?


## Hosting
* [DigitalOcean](https://try.digitalocean.com/cloud-hosting/)
* [Google Clound](https://cloud.google.com/nodejs/)
