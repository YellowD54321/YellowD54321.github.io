import React, { useState, useEffect, useRef, useMemo } from "react";
import "./mainPage.css";
import { useViewRegion } from "./MainPageReducer/ViewRegionContext.js";
import { ScrollEffect } from "./ScrollEffect";
import Container from "./Container";
import oldFashionLoadingGif from "../../assets/images/gif/oldFashionImageLoading.gif";
import { resolvePath } from "react-router-dom";
function MainPage() {
  //oldFasionImagesOriginal saves information of every stage image.
  let oldFasionImagesOriginal = {
    finish: {
      imageUrl: [],
      amount: 1,
      fileName: "finish",
      folderName: "finish",
      startNumber: 1,
      loaded: [],
    },
    bitter: {
      imageUrl: [],
      amount: 29,
      fileName: "bitter",
      folderName: "bitter",
      startNumber: 5759,
      loaded: [],
    },
    bourbon: {
      imageUrl: [],
      amount: 123,
      fileName: "bourbon",
      folderName: "bourbon",
      startNumber: 6366,
      loaded: [],
    },
    crush: {
      imageUrl: [],
      amount: 73,
      fileName: "crush",
      folderName: "crush",
      startNumber: 5999,
      loaded: [],
    },
    sugarCube: {
      imageUrl: [],
      amount: 37,
      fileName: "test",
      folderName: "sugarCube",
      startNumber: 5419,
      loaded: [],
    },
    iceCube: {
      imageUrl: [],
      amount: 68,
      fileName: "ice cube",
      folderName: "iceCube",
      startNumber: 7166,
      loaded: [],
    },
    peel: {
      imageUrl: [],
      amount: 77,
      fileName: "peel",
      folderName: "peel",
      startNumber: 7876,
      loaded: [],
    },
    pour: {
      imageUrl: [],
      amount: 100,
      fileName: "pour",
      folderName: "pour",
      startNumber: 7275,
      loaded: [],
    },
  };
  const [loadedImage, setLoadedImage] = useState(() => {
    let imageList = {};
    for (const imageContent of Object.values(oldFasionImagesOriginal)) {
      imageList[imageContent.folderName] = false;
    }
    return imageList;
  });
  const [preLoadImageFinish, setPreLoadImageFinish] = useState(false);
  const [{ oldFasionImages }, dispatch] = useViewRegion();
  const scrollingElRef = useRef(null);
  //Get functions from ScrollEffect.js which control style and switch image when scrolling.
  const {
    scrollEffectContainer1,
    scrollEffectContainer2,
    scrollEffectContainer3,
    scrollEffectContainer4,
    scrollEffectContainer5,
    scrollEffectContainer6,
    scrollEffectImageChange,
  } = useMemo(() => ScrollEffect());

  useEffect(() => {
    console.log("Last Modified: 20220625 16:48");
    //Initialize oldFasionImages
    setImageUrlList();
    preLoadImage();
    dispatch({
      type: "SET_IMAGE",
      item: {
        oldFasionImages: oldFasionImagesOriginal,
      },
    });
    return () => {
      dispatch({
        type: "SET_IMAGE",
        item: {
          oldFasionImages: null,
        },
      });
    };
  }, []);

  //Initialize viewRegion
  useEffect(() => {
    dispatch({
      type: "SET_VIEW_REGION",
      item: {
        viewRegion: scrollingElRef.current,
      },
    });
    return () => {
      dispatch({
        type: "SET_VIEW_REGION",
        item: {
          viewRegion: null,
        },
      });
    };
  }, [scrollingElRef]);

  //Load all oldfashion production images from folder.
  function setImageUrlList() {
    for (const imageContent of Object.values(oldFasionImagesOriginal)) {
      for (let i = 0; i < imageContent.amount; i++) {
        const imageUrl = getImageUrl(
          imageContent.folderName,
          imageContent.fileName + (imageContent.startNumber + i)
        );
        imageContent.imageUrl.push(imageUrl);
      }
    }
  }

  function getImageUrl(folderName, fileName) {
    return `../images/cocktail-${folderName}/${fileName}.jpg`;
  }

  async function preLoadImage() {
    for (const imageContent of Object.values(oldFasionImagesOriginal)) {
      await loadImageInGroup(imageContent, imageContent.imageUrl.length);
      if (imageContent.loaded.every((load) => load === true)) {
        setLoadedImage((preState) => {
          return {
            ...preState,
            [imageContent.folderName]: true,
          };
        });
      }
    }
  }

  function loadImageInGroup(imageContent, groupLength) {
    let resultGroup = [];
    for (let i = 0; i < groupLength; i++) {
      resultGroup.push(loadImageAsync(imageContent, i));
    }
    return Promise.all(resultGroup);
  }

  function loadImageAsync(imageContent, index) {
    return new Promise((resolve, reject) => {
      const newImg = new Image();
      const imageUrl = imageContent.imageUrl[index];

      imageContent.loaded[index] = false;
      newImg.onload = () => {
        imageContent.loaded[index] = true;
        return resolve({ imageContent, index });
      };
      newImg.onerror = () => {
        return reject(
          new Error(`Image load error for ${imageContent.folderName}[${index}]`)
        );
      };
      newImg.src = imageUrl;
    });
  }

  //Check every class of images are loaded.
  useEffect(() => {
    let allLoaded = true;
    let firstPartIsLoaded = true;
    for (const [imageName, value] of Object.entries(loadedImage)) {
      if (value === false) allLoaded = false;
      if (
        (imageName === "finish" ||
          imageName === "bourbon" ||
          imageName === "crush" ||
          imageName === "sugarCube") &&
        value === false
      ) {
        firstPartIsLoaded = false;
      }
    }
    if (firstPartIsLoaded === true) {
      console.log("FIRST PART LOADING FINISHED!");
      setPreLoadImageFinish(true);
    }
    return () => {
      setPreLoadImageFinish(false);
    };
  }, [loadedImage]);

  let loadingGif = null;

  //If images are not loading yet, show a gif to make user understand that there are still some images need to be loaded.
  if (!preLoadImageFinish) {
    loadingGif = (
      <div className="oldFashionLoadingRegion">
        <img
          src={oldFashionLoadingGif}
          alt="LOADING......"
          className="oldFashionLoadingGif"
        />
        <h2>LOADING IMAGE......</h2>
      </div>
    );
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return (
    <main className="main-page-main-region">
      {loadingGif}
      <div className="scroll-view" ref={scrollingElRef}></div>
      {/* content of container 1 */}
      <Container containerIndex={1}>
        {(scrollPercent) => (
          <>
            <div className="view-region">
              <img
                id="container-1-img"
                className="main-page-gif-image"
                src={oldFasionImages?.finish?.imageUrl[0]}
                alt=""
                style={scrollEffectContainer1("container-1-img", scrollPercent)}
              />
            </div>
            <h2 id="container-1-feature-1" className="container-1-feature">
              Old Fasion
            </h2>
            <p
              id="container-1-feature-2"
              className="container-1-feature"
              style={scrollEffectContainer1(
                "container-1-feature-2",
                scrollPercent
              )}
            >
              Before drinking
            </p>
            <p
              id="container-1-feature-3"
              className="container-1-feature"
              style={scrollEffectContainer1(
                "container-1-feature-3",
                scrollPercent
              )}
            >
              We make it
            </p>
          </>
        )}
      </Container>
      {/* content of container 2 */}
      <Container containerIndex={2}>
        {(scrollPercent) => (
          <>
            <div className="container-2-region container-2-sugar">
              <div className="container-2-img-region container-2-img-region-sugar">
                <div
                  className="container-2-img-blur-edge"
                  style={scrollEffectContainer2(
                    "container-2-img-1-blur-edge",
                    scrollPercent
                  )}
                ></div>
                <img
                  id="container-2-img-1"
                  className="main-page-gif-image container-2-img"
                  src={scrollEffectImageChange(
                    "container-2-img-1",
                    scrollPercent,
                    oldFasionImages
                  )}
                  alt=""
                  style={scrollEffectContainer2(
                    "container-2-img-1",
                    scrollPercent
                  )}
                />
                <h2
                  id="container-2-feature-1"
                  className="container-2-feature"
                  style={scrollEffectContainer2(
                    "container-2-feature-1",
                    scrollPercent
                  )}
                >
                  Sweet
                </h2>
              </div>
            </div>
            <div className="container-2-region container-2-bitter">
              <div className="container-2-img-region container-2-img-region-bitter">
                <h2
                  id="container-2-feature-2"
                  className="container-2-feature"
                  style={scrollEffectContainer2(
                    "container-2-feature-2",
                    scrollPercent
                  )}
                >
                  Bitter
                </h2>
                <div
                  className="container-2-img-blur-edge"
                  style={scrollEffectContainer2(
                    "container-2-img-2-blur-edge",
                    scrollPercent
                  )}
                ></div>
                <img
                  id="container-2-img-2"
                  className="main-page-gif-image container-2-img"
                  src={scrollEffectImageChange(
                    "container-2-img-2",
                    scrollPercent,
                    oldFasionImages
                  )}
                  alt=""
                  style={scrollEffectContainer2(
                    "container-2-img-2",
                    scrollPercent
                  )}
                />
              </div>
            </div>
            <div className="container-2-region container-2-crush">
              <div className="container-2-img-region container-2-img-region-crush">
                <div
                  className="container-2-img-blur-edge"
                  style={scrollEffectContainer2(
                    "container-2-img-3-blur-edge",
                    scrollPercent
                  )}
                ></div>
                <img
                  id="container-2-img-3"
                  className="main-page-gif-image container-2-img"
                  src={scrollEffectImageChange(
                    "container-2-img-3",
                    scrollPercent,
                    oldFasionImages
                  )}
                  alt=""
                  style={scrollEffectContainer2(
                    "container-2-img-3",
                    scrollPercent
                  )}
                />
                <h2
                  id="container-2-feature-3"
                  className="container-2-feature"
                  style={scrollEffectContainer2(
                    "container-2-feature-3",
                    scrollPercent
                  )}
                >
                  Crush
                </h2>
              </div>
            </div>
            <div className="container-2-region container-2-bourbon">
              <div className="container-2-img-region container-2-img-region-bourbon">
                <h2
                  id="container-2-feature-4"
                  className="container-2-feature"
                  style={scrollEffectContainer2(
                    "container-2-feature-4",
                    scrollPercent
                  )}
                >
                  Flavour
                </h2>
                <div
                  className="container-2-img-blur-edge"
                  style={scrollEffectContainer2(
                    "container-2-img-4-blur-edge",
                    scrollPercent
                  )}
                ></div>
                <img
                  id="container-2-img-4"
                  className="main-page-gif-image container-2-img"
                  src={scrollEffectImageChange(
                    "container-2-img-4",
                    scrollPercent,
                    oldFasionImages
                  )}
                  alt=""
                  style={scrollEffectContainer2(
                    "container-2-img-4",
                    scrollPercent
                  )}
                />
              </div>
            </div>
          </>
        )}
      </Container>
      {/* content of container 3 */}
      <Container containerIndex={3}>
        {(scrollPercent) => (
          <>
            <div className="view-region">
              <img
                id="container-3-img-1"
                className="main-page-gif-image container-3-img"
                src={scrollEffectImageChange(
                  "container-3-img-1",
                  scrollPercent,
                  oldFasionImages
                )}
                alt=""
                style={scrollEffectContainer3(
                  "container-3-img-1",
                  scrollPercent
                )}
              />
            </div>
          </>
        )}
      </Container>
      {/* content of container 4 */}
      <Container containerIndex={4}>
        {(scrollPercent) => (
          <>
            <div className="view-region">
              <img
                id="container-4-img-1"
                className="main-page-gif-image container-4-img"
                src={scrollEffectImageChange(
                  "container-4-img-1",
                  scrollPercent,
                  oldFasionImages
                )}
                alt=""
                style={scrollEffectContainer4(
                  "container-4-img-1",
                  scrollPercent
                )}
              />
            </div>
          </>
        )}
      </Container>
      {/* content of container 5 */}
      <Container containerIndex={5}>
        {(scrollPercent) => (
          <>
            <div className="view-region">
              <img
                id="container-5-img-1"
                className="main-page-gif-image container-5-img"
                src={scrollEffectImageChange(
                  "container-5-img-1",
                  scrollPercent,
                  oldFasionImages
                )}
                alt=""
                style={scrollEffectContainer5(
                  "container-5-img-1",
                  scrollPercent
                )}
              />
            </div>
          </>
        )}
      </Container>
      {/* content of container 6 */}
      <Container containerIndex={6}>
        {(scrollPercent) => (
          <>
            <div className="view-region">
              <img
                id="container-6-img-1"
                className="main-page-gif-image container-6-img"
                src={oldFasionImages?.finish?.imageUrl[0]}
                alt=""
                style={scrollEffectContainer6(
                  "container-6-img-1",
                  scrollPercent
                )}
              />
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
export default MainPage;
