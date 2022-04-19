import React, { useState, useEffect } from "react";
import { useStateValue } from "../Reducer/StateProvider";
import { db } from "../../firebase.js";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./cocktailList.css";
import myFavouriteIcon from "../../assets/images/icons/myfavourite-icon.png";
import notMyFavouriteIcon from "../../assets/images/icons/notMyfavourite-icon.png";

function CocktailList(props) {
  const cocktails = props.cocktail;
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [favouriteList, setFavouriteList] = useState([]);

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

  const eachCocktail = cocktails.map((cocktail, index) => {
    const favouriteIcon = isFavourite(cocktail.id)
      ? myFavouriteIcon
      : notMyFavouriteIcon;
    return (
      <div className="cocktailList-region" key={index}>
        <h2 className="cocktailList-cocktail-name">{cocktail.name}</h2>
        <div className="cocktailList-img-region">
          <img
            className="cocktailList-favourite-img"
            src={favouriteIcon}
            alt="Favourite Icon"
            style={{ display: user ? "block" : "none" }}
            onClick={() => switchFavourite(cocktail)}
          />
          <img
            className="cocktailList-cocktail-img"
            src={cocktail.image}
            alt=""
            onClick={() => chooseCocktailByClick(cocktail)}
          />
        </div>
      </div>
    );
  });

  async function writeDb(favouriteList) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        favouriteList: favouriteList,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function switchFavourite(cocktail) {
    const cocktailId = cocktail.id;
    let newFavouriteList = [];
    if (isFavourite(cocktailId)) {
      newFavouriteList = favouriteList.filter((ele) => ele.id !== cocktailId);
    } else {
      newFavouriteList = [...favouriteList];
      newFavouriteList.push({
        id: cocktailId,
        name: cocktail.name,
        description: cocktail.description,
        image: cocktail.image,
        ingredients: cocktail.ingredients,
      });
    }
    setFavouriteList(newFavouriteList);
    writeDb(newFavouriteList);
  }

  function isFavourite(cocktailId) {
    return favouriteList.some((ele) => ele.id === cocktailId);
  }

  const chooseCocktailByClick = (cocktail) => {
    const cocktailInfo = cocktail;
    const cocktailName = cocktail.name.replace(/ /gi, "+");
    dispatch({
      type: "COCKTAIL_INFO",
      item: {
        cocktailInfo: cocktailInfo,
      },
    });
    navigate(`/productPage/search?q=${cocktailName}`);
  };

  return <div className={props.class}>{eachCocktail}</div>;
}
export default CocktailList;
