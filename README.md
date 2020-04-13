# oeteM | Meteo

**[WIP]** A reverse weather forecast web application built with React.js

## Development

### Start

```
cd node-oetem
http-server .

cd oetem
npm start
```

### ESLint

`npm run eslint` or Atom ESLint plugin.

### Factory modules

* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar): Compile SASS.
* [npm-run-all](https://github.com/mysticatea/npm-run-all): Run in parallel npm scripts.
* [eslint](https://github.com/eslint/eslint): Check JS code.
* [babel-eslint](https://github.com/babel/babel-eslint): A wrapper for Babel's parser used for ESLint.
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React specific linting rules for ESLint.

### App modules

* [react-input-range](https://github.com/davidchin/react-input-range): Used in TemperatureInput component to select a range of temperature.
* [react-modal](https://github.com/reactjs/react-modal): Used in About component to display a modal.
* [react-transition-group](https://github.com/reactjs/react-transition-group): Used in App component to add CSS transition between routes.
* [react-ga](https://github.com/react-ga/react-ga): Used in App to track pages.
* [react-svg-map](https://github.com/VictorCazanave/react-svg-map): Use in Where component to display map of Taiwan.
* [immutability-helper](https://github.com/kolodny/immutability-helper): Used in setState() to mutate a copy of the state without changing the original one.
* [object-path](https://github.com/mariocasciaro/object-path): Use in ImmutabilityUtils to get property value from path.

### Next version

* i18n
* Handle files cache, expiration date...
* Optimize fetching init.json
* Display error message when init.json not available
* Store areas ids (instead of object) and use a global constant to get areas names
* Use env variables or global config for data url (find a place to store const url http://www.cwb.gov.tw/V7/symbol/weather/gif/day/...)
* Display more info with large screens
* Add Summary component
* Add filters on matches list
* Give more error details (use Redirect?)
* Add select all button
* Avoid displaying error message on Matches after clicking Try again
* Customize router animation for home/matches pages (if possible)
* Flow? Tool seems not ready yet: https://github.com/facebook/flow/issues/5874
* Redux (to avoid cancelable promise?)
* Progressive web app
* Improve GA (tracking events, searched data...)
* CI
* Rethink UI?
* Use OpenStreetMap?
* Include map inside the page?
* Server-side rendering?

## Deployment

`sudo sh deploy.sh`
