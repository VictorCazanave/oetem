# oeteM | Meteo
A React web application of reverse meteo.


## Development

### Start
```
cd node-oetem
http-server .

cd oetem
npm start
```

### ESLint
`./node_modules/.bin/eslint src/**/*` or Atom ESLint plugin.

### Factory modules
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar): Compile SASS.
* [npm-run-all](https://github.com/mysticatea/npm-run-all): Run in parallel npm scripts.
* [eslint](https://github.com/eslint/eslint): Check JS code.

### App modules
* [react-input-range](https://github.com/davidchin/react-input-range): Used in TemperatureInput component to select a range of temperature.
* [react-modal](https://github.com/reactjs/react-modal): Used in About component to display a modal.
* [react-transition-group](https://github.com/reactjs/react-transition-group): Used in App component to add CSS transition between routes.
* [react-ga](https://github.com/react-ga/react-ga): Used in App to track pages.
* [immutability-helper](https://github.com/kolodny/immutability-helper): Used in setState() to mutate a copy of the state without changing the original one.
* [object-path](https://github.com/mariocasciaro/object-path): Use in ImmutabilityUtils to get property value from path.

### Next version
* i18n
* Flow VS prop-types
* Flow/TypeScript?
* Update .eslintrc with https://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin
* Optimize fetching init.json
* Display error message when init.json not available
* Use env variables or global config for data url (find a place to store const url http://www.cwb.gov.tw/V7/symbol/weather/gif/day/...)
* Display more info with large screens
* Add Summary component
* Add filters on matches list
* Give more error details (use Redirect?)
* Add select all button
* Avoid displaying error message on Matches after clicking Try againP
* Automatically add version from package.json in About component
* Customize router animation for home/matches pages (if possible)
* Redux! (to avoid cancelable promise?)
* Progressive web app
* Improve GA (tracking events, searched data...)
* CI
* Use OpenStreetMap?
* Include map inside the page?
* Taiwan map loader?
* Server-side rendering?


## Deployment

`sudo sh deploy.sh`

Or manually:
* Get source code: `git clone`/`git pull`
* Install dependencies: `npm install`
* Build application: `npm run build`
* Copy application to server: `sudo cp -R ~/git/oetem/build/ /var/www/`
* Delete old version: `sudo rm -rf /var/www/oetem/`
* Rename new version: `sudo mv /var/www/build/ /var/www/oetem`
