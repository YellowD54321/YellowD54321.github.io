import "./productPage.css";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../Reducer/StateProvider";
import { useNavigate } from "react-router-dom";

//Build single cocktail page content.
function ProductPage() {
  const [{ cocktailInfo }, dispatch] = useStateValue();
  const navigate = useNavigate();
  let cocktail = {};
  const url = new URL(document.location);
  const urlKeyWords = url.search.replace(/[?=q]/gi, "").replace(/[+]/gi, " ");
  const searchTextForAPI =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + urlKeyWords;

  //Fetch API data.
  const getDataFromAPI = async (ApiUrl) => {
    try {
      const url = ApiUrl;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error happens from cocktail API:");
      console.error(err);
    }
  };

  cocktail = cocktailInfo;

  //Fetch data from api.
  useEffect(() => {
    if (!cocktailInfo?.name) {
      console.log("cocktailInfo?.name is false");
      getDataFromAPI(searchTextForAPI).then((data) => {
        const drinks = data?.drinks;
        if (!drinks) {
          console.log("There is no result from cocktail API.");
          return false;
        }
        const cocktailInfoFromAPI = getCocktailInfo(drinks);
        const result = cocktailInfoFromAPI.filter(
          (drink) => drink.name.toLowerCase() === urlKeyWords.toLowerCase()
        )[0];
        dispatch({
          type: "COCKTAIL_INFO",
          item: {
            cocktailInfo: result,
          },
        });
      });
    }
  }, []);

  //Adjust api data.
  //Only remain data which are useful.
  const getCocktailInfo = (drinks) => {
    let reslut = [];
    for (let i = 0; i < drinks.length; i++) {
      let ingredients = [];
      reslut[i] = {
        image: drinks[i].strDrinkThumb,
        name: drinks[i].strDrink,
        ingredients: (() => {
          for (let j = 1; j <= 15; j++) {
            const ingredientName = "strIngredient" + j.toString();
            const ingredientAmount = "strMeasure" + j.toString();
            if (!drinks[i][ingredientName]) break;
            ingredients.push({
              name: drinks[i][ingredientName],
              amount: drinks[i][ingredientAmount],
            });
          }
          return ingredients;
        })(),
        glass: drinks[i].strGlass,
        description: drinks[i].strInstructions,
        category: drinks[i].strCategory,
        id: drinks[i].idDrink,
      };
    }
    return reslut;
  };

  if (!cocktail?.name) {
    return null;
  }

  //Set a second image as ground image to make it as sketch type.
  const imgBackgroundStyle = {
    backgroundImage: `url(${cocktail?.image}), url(${cocktail?.image})`,
    backgroundSize: "cover",
    backgroundBlendMode: "difference",
    backgroundPosition:
      "calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px)",
    filter: "brightness(2) invert(1) grayscale(1)",
    boxShadow: "inset 0 0 0 1px black",
  };

  //DOM of ingredients.
  const allIngredients = () => {
    let ingredients = cocktail?.ingredients;
    const ingredientList = ingredients.map((ingredient, index) => {
      return (
        <p key={index} className="product-ingredient">
          {ingredient.name}: {ingredient.amount}
        </p>
      );
    });
    return (
      <div className="product-ingredients">
        <p className="product-ingredients-title">ingredients</p>
        {ingredientList}
      </div>
    );
  };

  return (
    <div className="product-body">
      <h2 className="product-name">{cocktail?.name}</h2>
      <div className="product-main">
        <div className="product-font-region">
          <p className="product-description">{cocktail?.description}</p>
          {allIngredients()}
        </div>
        <div className="product-image-region">
          <div
            className="product-image-pencil-background"
            style={imgBackgroundStyle}
          >
            <img
              className="product-image-pencil"
              src={cocktail?.image}
              alt="Cocktail"
            />
          </div>
          <img
            className="product-image-color"
            src={cocktail?.image}
            alt="Cocktail"
          />
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
