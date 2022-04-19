import React, { useState, useEffect } from "react";
import "./favouritePage.css";
import { useStateValue } from "../Reducer/StateProvider";
import CocktailList from "../CocktailList/CocktailList.js";
import { getAuth } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";

function FavouritePage() {
  const [{ user }, dispatch] = useStateValue();
  const [favouriteList, setFavouriteList] = useState(null);
  let favouriteCocktails = null;

  useEffect(() => {
    async function loadDb() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFavouriteList(userData.favouriteList);
      } else {
        console.log(`No Document named: ${user.uid}`);
      }
    }
    loadDb();
  }, []);

  if (favouriteList && favouriteList.length > 0) {
    favouriteCocktails = (
      <CocktailList
        cocktail={favouriteList}
        class="cocktailList-search-result"
      />
    );
  } else {
    favouriteCocktails = <h2>LOADING...</h2>;
  }
  return <div>{favouriteCocktails}</div>;
}
export default FavouritePage;
