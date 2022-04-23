![Next Drink Logo](./src/assets/images/Logo/Logo.png)

`Make your choice easier!`

![first view gif](./src/assets/images/readme/first-view.gif)

## About
This is a website to help people who worry about what they should drink.
Can easily get a random cocktail if haven't decide what to drink.
Or, if choice has been diceided, it is able to check detail about the drink before it's served.\
Now is available on [My Page](https://yellowd54321.github.io/).

## API Data
[TheCocktailDB](https://www.thecocktaildb.com/api.php)

## content

### Random Cocktail
Simplely click on the `Dice` icon to get a random cocktail!\
Alternatively type `random` in the search bar to search a random one.

### Already know cocktail name?
Search cocktail by name to see what it looks like and read detail which includes ingredients.

### Favourite List
Save your favourite cocktail or just record what you drink.
To do this, have to log in frist.

### Account
Using Firebase authentication to create account.\
Using Fisebase firestore to save data (favourite list) in database.

### Apple-like Effect
Reference from [Apple Airpods pro](https://www.apple.com/airpods-pro/).\
Change images and CSS effect when window is scrolling up or down.

## Skills
- Firebase
    - Authentication - To sign up account and sign in/out.
    - Firestore - To soter data like favourite list.
- React Hooks
    - useState - To re-render page.
    - useEffect - To determine the timing some data should be re-rendered.
    - useRef - To get information of nodes.
    - useReduce/useContext - To save data so it can be used by all components.
- Fetch API
    - [TheCocktailDB](https://www.thecocktaildb.com/api.php) - For cocktail data.
    - [Giphy](https://giphy.com/) - For gif that shows when search result can't be found.

## Murmur
This is the very first website I finished.
Got so many fun during process. Lots of unknow issues too.
- Unable to got API data.
- Unable to create account by firebase.
- Some cool CSS effects, like sketch image in single cocktail page were too hard to be finished.
- Page not re-rendered.
- Page re-rendered infinity.
- Loading speed was too slow because of image size.
- etc.

Was thinking about aborting the apple-like effect as it might be too difficult for me, a website starter.\
I'm glad i didn't give up. The effect is so beautiful.

Hopefully everything is working well.