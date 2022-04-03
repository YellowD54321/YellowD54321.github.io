import { useStateValue } from "../Reducer/StateProvider";
import { db } from "../../firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./cocktailList.css";

function CocktailList(props) {
  const cocktails = props.cocktail;
  const navigate = useNavigate();
  const [{ user, favouriteList }, dispatch] = useStateValue();

  const eachCocktail = cocktails.map((cocktail, index) => {
    const favouriteIcon = isFavourite(cocktail.id)
      ? "myFavourite-icon.png"
      : "notMyFavourite-icon.png";
    return (
      <div className="cocktailList-region" key={index}>
        <h2 className="cocktailList-cocktail-name">{cocktail.name}</h2>
        <div className="cocktailList-img-region">
          <img
            className="cocktailList-favourite-img"
            src={`../images/icons/${favouriteIcon}`}
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
      dispatch({
        type: "FAVOURITE_LIST",
        item: {
          favouriteList: newFavouriteList,
        },
      });
    } else {
      favouriteList.push({
        id: cocktailId,
        name: cocktail.name,
        description: cocktail.description,
        image: cocktail.image,
        ingredients: cocktail.ingredients,
      });
      newFavouriteList = favouriteList;
      dispatch({
        type: "FAVOURITE_LIST",
        item: {
          favouriteList: favouriteList,
        },
      });
    }
    writeDb(newFavouriteList);
  }

  function isFavourite(cocktailId) {
    return favouriteList.some((ele) => ele.id === cocktailId);
  }

  const chooseCocktailByClick = (cocktail) => {
    const cocktailInfo = cocktail;
    dispatch({
      type: "COCKTAIL_INFO",
      item: {
        cocktailInfo: cocktailInfo,
      },
    });
    navigate("/productPage");
  };

  return <div className={props.class}>{eachCocktail}</div>;
}
export default CocktailList;
