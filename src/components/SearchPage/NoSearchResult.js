import React, { useState, useEffect } from "react";
import CocktailList from "../CocktailList/CocktailList.js";
import "./NoSearchResult.css";
import { useStateValue } from "../Reducer/StateProvider";
function NoSearchResult(props) {
  const [{ searchText, searchBtnCount }] = useStateValue();
  const [gifImgUrl, setGifImgUrl] = useState("");
  const [cocktail, setCocktail] = useState({
    image: "",
    name: "",
    ingredients: [],
    glass: "",
    Instruction: "",
    category: "",
    id: "",
  });

  const getDataFromAPI = props.getDataFromAPI;
  const getCocktailInfo = props.getCocktailInfo;

  const lookingForGifUrl =
    `https://api.giphy.com/v1/gifs/random?` +
    `api_key=kJ68eSnr74nFdRH0lw4cw4VGAzOpajnB&tag` +
    `=looking+for&rating=g`;
  const randomCocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  let randomCocktail = null;

  useEffect(() => {
    getDataFromAPI(lookingForGifUrl).then((data) => {
      if (!data) {
        console.log("There is no result from Gif API.");
        return false;
      }
      setGifImgUrl(data.data.images.original.url);
    });

    getDataFromAPI(randomCocktailUrl).then((data) => {
      const drinks = data.drinks;
      if (!drinks) {
        console.log("There is no result from cocktail API.");
        return false;
      }
      const cocktailInfo = getCocktailInfo(drinks);
      setCocktail(cocktailInfo);
    });
  }, [searchBtnCount]);

  if (cocktail[0]?.name) {
    randomCocktail = (
      <CocktailList
        cocktail={cocktail}
        dispatchFavouriteList={props.dispatchFavouriteList}
      />
    );
  }

  return (
    <div className="no-result-main">
      <div className="no-result-information">
        <img
          className="no-result-gif"
          src={gifImgUrl}
          alt="Looking for cocktail"
        />
        <div className="no-result-information-text">
          <h2>Oops!</h2>
          <p>{`There is no result for "${searchText}".`}</p>
          <p>I'm feeling sad too.</p>
        </div>
      </div>
      <div className="no-result-try-random">
        <p>Here's a random one for you!</p>
      </div>
      <div className="no-result-random">{randomCocktail}</div>
    </div>
  );
}
export default NoSearchResult;
