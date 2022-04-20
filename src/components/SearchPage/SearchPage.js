import React, { useState, useEffect } from "react";
import CocktailList from "../CocktailList/CocktailList.js";
import { useStateValue } from "../Reducer/StateProvider";
import NoSearchResult from "./NoSearchResult";
import { useNavigate } from "react-router-dom";

//Build Search page content.
function SearchPage() {
  const [{ searchText, searchBtnCount }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [cocktail, setCocktail] = useState([
    {
      image: "",
      name: "",
      ingredients: [],
      glass: "",
      description: "",
      category: "",
      id: "",
    },
  ]);
  const cocktailBasicApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
  const cocktailRandomApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  const url = new URL(document.location);
  const urlKeyWords = url.search.replace(/[?=q]/gi, "").replace(/[+]/gi, " ");
  const searchTextForAPI = urlKeyWords
    ? "search.php?s=" + urlKeyWords
    : "search.php?s=" + searchText;
  let cocktailApiUrl = "";

  //Determine search content by search text and url key word.
  if (!searchText && !urlKeyWords) {
  } else if (
    searchText?.toLowerCase() === "random" ||
    urlKeyWords?.toLowerCase() === "random"
  ) {
    cocktailApiUrl = cocktailRandomApiUrl;
  } else {
    cocktailApiUrl = cocktailBasicApiUrl + searchTextForAPI;
  }
  let searchResult = "";

  //Get data by search text from header component.
  //Get data when page first loaded and every time search button is clicked.
  useEffect(() => {
    getDataFromAPI(cocktailApiUrl).then((data) => {
      const drinks = data?.drinks;
      if (!drinks) {
        console.log("There is no result from cocktail API.");
        setCocktail(null);
        return false;
      }
      const cocktailInfo = getCocktailInfo(drinks);
      setCocktail(cocktailInfo);
    });
    return () => {
      setCocktail({
        image: "",
        name: "",
        ingredients: [],
        glass: "",
        description: "",
        category: "",
        id: "",
      });
    };
  }, [searchBtnCount]);

  //Fetch api data.
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

  //Adjust data to remain useful information.
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

  //Rebuild url by add cocktail name in url.
  useEffect(() => {
    if (urlKeyWords?.toLowerCase() === "random" && cocktail[0]?.name) {
      const newUrl = cocktail[0].name.replace(/ /gi, "+");
      if (newUrl) {
        dispatch({
          type: "SEARCH_TEXT",
          item: {
            text: "",
          },
        });
        navigate(`/searchPage/search?q=${newUrl}`);
      }
    }
  }, [cocktail]);

  if (!cocktail) {
    searchResult = (
      <NoSearchResult
        getDataFromAPI={getDataFromAPI}
        getCocktailInfo={getCocktailInfo}
      />
    );
  } else {
    searchResult = (
      <CocktailList cocktail={cocktail} class="cocktailList-search-result" />
    );
  }

  return <div>{searchResult}</div>;
}
export default SearchPage;
