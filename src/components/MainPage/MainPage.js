import React, { useState, useEffect, useRef, useMemo } from "react";
import "./mainPage.css";
import { useViewRegion } from "./MainPageReducer/ViewRegionContext.js";
import { ScrollEffect } from "./ScrollEffect";
import Container from "./Container";
function MainPage() {
  let oldFasionImagesOriginal = {
    bitter: {
      imageUrl: [],
      imageElement: [],
      amount: 93,
      fileName: "bitter",
      startNumber: 5695,
    },
    bourbon: {
      imageUrl: [],
      imageElement: [],
      amount: 123,
      fileName: "bourbon",
      startNumber: 6366,
    },
    crush: {
      imageUrl: [],
      imageElement: [],
      amount: 73,
      fileName: "crush",
      startNumber: 5999,
    },
    finish: {
      imageUrl: [],
      imageElement: [],
      amount: 1,
      fileName: "finish",
      startNumber: 1,
    },
    iceCube: {
      imageUrl: [],
      imageElement: [],
      amount: 68,
      fileName: "ice cube",
      startNumber: 7166,
    },
    peel: {
      imageUrl: [],
      imageElement: [],
      amount: 77,
      fileName: "peel",
      startNumber: 7876,
    },
    pour: {
      imageUrl: [],
      imageElement: [],
      amount: 100,
      fileName: "pour",
      startNumber: 7275,
    },
    sugarCube: {
      imageUrl: [],
      imageElement: [],
      amount: 37,
      fileName: "test",
      startNumber: 5419,
    },
  };
  const [{ oldFasionImages }, dispatch] = useViewRegion();
  const scrollingElRef = useRef(null);
  // const container1 = useRef(null);
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
    //Initialize oldFasionImages
    loadImageListFromEachFolder(oldFasionImagesOriginal);
    console.log("oldFasionImagesOriginal");
    console.log(oldFasionImagesOriginal);
    dispatch({
      type: "SET_IMAGE",
      item: {
        oldFasionImages: oldFasionImagesOriginal,
      },
    });
  }, []);

  useEffect(() => {
    //Initialize viewRegion
    dispatch({
      type: "SET_VIEW_REGION",
      item: {
        viewRegion: scrollingElRef.current,
      },
    });
  }, [scrollingElRef]);

  function loadImageListFromEachFolder(imgObject) {
    for (const [key, imageName] of Object.entries(imgObject)) {
      for (let i = 0; i < imageName.amount; i++) {
        const imageUrl = `../images/cocktail-${key}/${imageName.fileName}${
          imageName.startNumber + i
        }.png`;
        const newImg = new Image();
        const imgClassName = setImgClassName(key);
        const imgId = setImgId(key);
        newImg.src = imageUrl;
        // newImg.className = `main-page-gif-image ${imgClassName}`;
        // newImg.id = imgId;
        imageName.imageUrl.push(imageUrl);
        // imageName.imageElement.push(newImg);
      }
    }
  }

  function setImgClassName(imageName) {
    switch (imageName) {
      case "sugarCube":
        return "container-2-img";
      case "bitter":
        return "container-2-img";
      case "crush":
        return "container-2-img";
      case "bourbon":
        return "container-2-img";
      case "iceCube":
        return "container-3-img";
      case "pour":
        return "container-4-img";
      case "peel":
        return "container-5-img";
      default:
        return "";
    }
  }

  function setImgId(imageName) {
    switch (imageName) {
      case "sugarCube":
        return "container-2-img-1";
      case "bitter":
        return "container-2-img-2";
      case "crush":
        return "container-2-img-3";
      case "bourbon":
        return "container-2-img-4";
      case "iceCube":
        return "container-3-img-1";
      case "pour":
        return "container-4-img-1";
      case "peel":
        return "container-5-img-1";
      default:
        return "";
    }
  }

  return (
    <main className="main-page-main-region">
      <div className="scroll-view" ref={scrollingElRef}></div>
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
                {/* {console.log("oldFasionImages.sugarCube.imageElement[7]")}
                {console.log(oldFasionImages?.sugarCube)}
                {oldFasionImages?.sugarCube?.imageElement[7]} */}
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
