# walden

walden is an app that displays, for a given ISBN, bookshops that have the
corresponding book available in stock on a map with geolocation.

Book availability informations are updated once a day from french independant
bookstores portal [Place des libraires](https://www.placedeslibraires.fr/).

[Try it](https://walden.app)

# Todo list

## Must have

- Change name
- Have some kind of spinner on map while searching
- Handle errors in front & back ends
- Handle fetching errors
- Google Analytics
- Add welcome message
- Wait for Google Maps to load before loading app
- Prefill search input when url param changes

## Nice to have

- Tooltips
- Add API response date in Redis cache
- Show numbers of bookstores results after search
- Regroup map markers into clusters
- Increase map markers z-index on hover
- "Call" and "Directions" buttons
- React components test
- PropTypes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environnement variables

Some environnement variables are mandatory to run this project.
You can [define them in an .env file](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env).

- `REACT_APP_GMAPS_API_KEY`: [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- `REDIS_URL`: Redis connection url (used for caching)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
