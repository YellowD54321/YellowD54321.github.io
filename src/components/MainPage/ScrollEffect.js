export function ScrollEffect() {
  //container 1
  function scrollEffectContainer1(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    const imgOne = () => {
      const DEMARCATION_OUT_START = 0.64;
      const DEMARCATION_OUT_END = 0.91;
      let styleOpacity =
        1 -
        proportionWithContainer(
          scrollPercent,
          DEMARCATION_OUT_START,
          DEMARCATION_OUT_END
        );
      let styleScale =
        proportionWithContainer(
          scrollPercent,
          DEMARCATION_OUT_START,
          DEMARCATION_OUT_END
        ) + 1;
      if (styleScale >= 2) styleScale = 2;
      if (scrollPercent >= DEMARCATION_OUT_START) {
        return {
          opacity: styleOpacity,
          transform: `scale(${styleScale}, ${styleScale})`,
        };
      }
      return {};
    };
    const featureOne = () => {
      const DEMARCATION = 0.21;
      const styleOpacity = effectOpacityIncreaseThenDecrease(
        scrollPercent,
        DEMARCATION
      );
      return { opacity: styleOpacity };
    };
    const featureTwo = () => {
      const DEMARCATION = 0.54;
      const styleOpacity = effectOpacityIncreaseThenDecrease(
        scrollPercent,
        DEMARCATION
      );
      return { opacity: styleOpacity };
    };
    switch (elementId) {
      case "container-1-img":
        return imgOne();
      case "container-1-feature-2":
        return featureOne();
      case "container-1-feature-3":
        return featureTwo();
      default:
        return {};
    }
  }
  //container 2
  function scrollEffectContainer2(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    //Image
    const imgOne = () => {
      const DEMARCATION_IN_START = -0.12;
      const DEMARCATION_IN_END = 0.07;
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      let styleOpacity = 0;
      //Start
      let { styleVertical, styleHorizontal } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        -500,
        500
      );
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          1 +
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleVertical > 0) styleVertical = 0;
      if (styleHorizontal < 0) styleHorizontal = 0;
      if (styleScale >= 2) styleScale = 2;
      return {
        top: styleVertical,
        right: styleHorizontal,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const imgTwo = () => {
      const DEMARCATION_IN_START = -0.05;
      const DEMARCATION_IN_END = 0.21;
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      let styleOpacity = 0;
      //Start
      let { styleVertical, styleHorizontal } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        -500,
        -500
      );
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          1 +
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleVertical > 0) styleVertical = 0;
      if (styleHorizontal > 0) styleHorizontal = 0;
      if (styleScale >= 2) styleScale = 2;
      return {
        top: styleVertical,
        right: styleHorizontal,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const imgThree = () => {
      const DEMARCATION_IN_START = 0.17;
      const DEMARCATION_IN_END = 0.44;
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      let styleOpacity = 0;
      //Start
      let { styleVertical, styleHorizontal } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        500,
        500
      );
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          1 +
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleVertical < 0) styleVertical = 0;
      if (styleHorizontal < 0) styleHorizontal = 0;
      if (styleScale >= 2) styleScale = 2;
      return {
        top: styleVertical,
        right: styleHorizontal,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const imgFour = () => {
      const DEMARCATION_IN_START = 0.39;
      const DEMARCATION_IN_END = 0.61;
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      let styleOpacity = 0;
      //Start
      let { styleVertical, styleHorizontal } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        500,
        -500
      );
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          1 +
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleVertical < 0) styleVertical = 0;
      if (styleHorizontal > 0) styleHorizontal = 0;
      if (styleScale >= 2) styleScale = 2;
      return {
        top: styleVertical,
        right: styleHorizontal,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    //Text
    const featureOne = () => {
      //Start
      const DEMARCATION_IN_START = -0.12;
      const DEMARCATION_IN_END = 0.07;
      let styleOpacity = 0;
      let { styleVertical } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        -500,
        0
      );
      if (styleVertical >= 0) styleVertical = 0;
      //End
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      if (styleScale >= 2) styleScale = 2;
      if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          ) + 1;
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      }
      return {
        top: styleVertical,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const featureTwo = () => {
      //Start
      const DEMARCATION_IN_START = -0.05;
      const DEMARCATION_IN_END = 0.21;
      let styleOpacity = 0;
      let { styleVertical } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        -500,
        0
      );
      if (styleVertical > 0) styleVertical = 0;
      //End
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      if (styleScale >= 2) styleScale = 2;
      if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          ) + 1;
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      }
      return {
        top: styleVertical,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const featureThree = () => {
      //Start
      const DEMARCATION_IN_START = 0.17;
      const DEMARCATION_IN_END = 0.44;
      let styleOpacity = 0;
      let { styleVertical } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        500,
        0
      );
      if (styleVertical < 0) styleVertical = 0;
      //End
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      if (styleScale >= 2) styleScale = 2;
      if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          ) + 1;
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      }
      return {
        top: styleVertical,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };
    const featureFour = () => {
      //Start
      const DEMARCATION_IN_START = 0.39;
      const DEMARCATION_IN_END = 0.61;
      let styleOpacity = 0;
      let { styleVertical } = effectPositionChangeFromOutSide(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        500,
        0
      );
      if (styleVertical < 0) styleVertical = 0;
      //End
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      let styleScale = 1;
      if (styleScale >= 2) styleScale = 2;
      if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale =
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          ) + 1;
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
      }
      return {
        top: styleVertical,
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };

    switch (elementId) {
      case "container-2-img-1-blur-edge":
        return imgOne();
      case "container-2-img-2-blur-edge":
        return imgTwo();
      case "container-2-img-3-blur-edge":
        return imgThree();
      case "container-2-img-4-blur-edge":
        return imgFour();
      case "container-2-img-1":
        return imgOne();
      case "container-2-img-2":
        return imgTwo();
      case "container-2-img-3":
        return imgThree();
      case "container-2-img-4":
        return imgFour();
      case "container-2-feature-1":
        return featureOne();
      case "container-2-feature-2":
        return featureTwo();
      case "container-2-feature-3":
        return featureThree();
      case "container-2-feature-4":
        return featureFour();
      default:
        return {};
    }
  }
  //container 3
  function scrollEffectContainer3(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    const imgOne = () => {
      const DEMARCATION_IN_START = 0;
      const DEMARCATION_IN_END = 0.33;
      let styleOpacity = 0;
      let styleScale = 2;
      let styleBlur = 0;
      const DEMARCATION_OUT_START = 0.7;
      const DEMARCATION_OUT_END = 1;
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
        //Start
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_OUT_START
      ) {
        styleScale =
          2 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_IN_START,
              DEMARCATION_IN_END
            ));
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
        //End
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleScale = 1;
        styleOpacity =
          2 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_OUT_START,
              DEMARCATION_OUT_END
            ));
        styleBlur =
          8 *
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleScale < 1) styleScale = 1;
      return {
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
        filter: `blur(${styleBlur}px)`,
      };
    };

    switch (elementId) {
      case "container-3-img-1":
        return imgOne();
      default:
        return {};
    }
  }
  //container 4
  function scrollEffectContainer4(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    const imgOne = () => {
      const DEMARCATION_IN_START = -0.09;
      const DEMARCATION_IN_END = 0.13;
      let styleOpacity = 0;
      let styleBlur = 0;
      const DEMARCATION_OUT_START = 0.8;
      const DEMARCATION_OUT_END = 1;
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
        //Start
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
        styleBlur =
          8 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_IN_START,
              DEMARCATION_IN_END
            ));
        //End
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleOpacity =
          1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_OUT_START,
            DEMARCATION_OUT_END
          );
      } else {
        styleOpacity = 1;
      }
      return {
        opacity: styleOpacity,
        filter: `blur(${styleBlur}px)`,
      };
    };

    switch (elementId) {
      case "container-4-img-1":
        return imgOne();
      default:
        return {};
    }
  }
  //container 5
  function scrollEffectContainer5(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    const imgOne = () => {
      const DEMARCATION_IN_START = 0.04;
      const DEMARCATION_IN_END = 0.29;
      let styleOpacity = 0;
      let styleScale = 1;
      let styleBlur = 0;
      const DEMARCATION_OUT_START = 0.61;
      const DEMARCATION_OUT_END = 0.83;
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
        //Start
      } else if (
        scrollPercent >= DEMARCATION_IN_START &&
        scrollPercent < DEMARCATION_IN_END
      ) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
        styleBlur =
          8 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_IN_START,
              DEMARCATION_IN_END
            ));
        //End
      } else if (scrollPercent >= DEMARCATION_OUT_START) {
        styleOpacity = 1;
        styleScale =
          2 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_OUT_START,
              DEMARCATION_OUT_END
            ));
      } else {
        styleScale = 1;
        styleOpacity = 1;
      }
      if (styleScale > 1) styleScale = 1;
      if (styleScale < 0) styleScale = 0;
      return {
        opacity: styleOpacity,
        transform: `scaleX(${styleScale})`,
        filter: `blur(${styleBlur}px)`,
      };
    };

    switch (elementId) {
      case "container-5-img-1":
        return imgOne();
      default:
        return {};
    }
  }
  //container 6
  function scrollEffectContainer6(elementId, scrollPercent) {
    if (screenWidthTooSmall()) return;
    const imgOne = () => {
      const DEMARCATION_IN_START = -0.04;
      const DEMARCATION_IN_END = 0.48;
      let styleOpacity = 0;
      let styleScale = 1;
      const DEMARCATION_OUT_START = 0.61;
      const DEMARCATION_OUT_END = 0.83;
      if (scrollPercent < DEMARCATION_IN_START) {
        styleOpacity = 0;
      } else if (scrollPercent >= DEMARCATION_IN_START) {
        styleOpacity = proportionWithContainer(
          scrollPercent,
          DEMARCATION_IN_START,
          DEMARCATION_IN_END
        );
        styleScale =
          2 *
          (1 -
            proportionWithContainer(
              scrollPercent,
              DEMARCATION_IN_START,
              DEMARCATION_IN_END
            ));
      }
      if (styleScale > 2) styleScale = 2;
      if (styleScale < 1) styleScale = 1;
      return {
        opacity: styleOpacity,
        transform: `scale(${styleScale}, ${styleScale})`,
      };
    };

    switch (elementId) {
      case "container-6-img-1":
        return imgOne();
      default:
        return {};
    }
  }

  const proportionWithContainer = (scrollPercent, startPoint, endPoint) => {
    return (scrollPercent - startPoint) / (endPoint - startPoint);
  };

  const effectOpacityIncreaseThenDecrease = (scrollPercent, DEMARCATION) => {
    let styleOpacity = 0;
    if (scrollPercent < DEMARCATION) {
      //opacity increasing
      styleOpacity = (scrollPercent - (DEMARCATION - 0.1)) * 4;
    } else if (scrollPercent < DEMARCATION + 0.1) {
      //hold opacity on
      styleOpacity = 1;
    } else {
      //opacity decreasing
      styleOpacity = (DEMARCATION + 0.2 - scrollPercent) * 4;
    }
    return styleOpacity;
  };

  const effectPositionChangeFromOutSide = (
    scrollPercent,
    DEMARCATION_IN_START,
    DEMARCATION_IN_END,
    verticalPosition,
    horizontalPosition
  ) => {
    let styleVertical = verticalPosition;
    let styleHorizontal = horizontalPosition;
    if (scrollPercent >= DEMARCATION_IN_START) {
      styleVertical =
        (1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_IN_START,
            DEMARCATION_IN_END
          )) *
        verticalPosition;
      styleHorizontal =
        (1 -
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_IN_START,
            DEMARCATION_IN_END
          )) *
        horizontalPosition;
    }
    return { styleVertical: styleVertical, styleHorizontal: styleHorizontal };
  };

  function scrollEffectImageChange(elementId, scrollPercent, oldFasionImages) {
    const imgFinish = () => {};

    const imgSugarCube = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.sugarCube?.images[5];
      }
      const DEMARCATION_IN_START = -0.12;
      const DEMARCATION_IN_END = 0.8;
      const imgAmount = oldFasionImages?.sugarCube?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.sugarCube?.images[imageClip];
    };

    const imgBitter = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.bitter?.images[
          oldFasionImages?.bitter?.images.length - 1
        ];
      }
      const DEMARCATION_IN_START = -0.05;
      const DEMARCATION_IN_END = 0.8;
      const imgAmount = oldFasionImages?.bitter?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.bitter?.images[imageClip];
    };

    const imgCrush = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.crush?.images[43];
      }
      const DEMARCATION_IN_START = 0.17;
      const DEMARCATION_IN_END = 0.8;
      const imgAmount = oldFasionImages?.crush?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.crush?.images[imageClip];
    };

    const imgBourbon = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.bourbon?.images[85];
      }
      const DEMARCATION_IN_START = 0.17;
      const DEMARCATION_IN_END = 0.8;
      const imgAmount = oldFasionImages?.bourbon?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.bourbon?.images[imageClip];
    };

    const imgIceCube = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.iceCube?.images[47];
      }
      const DEMARCATION_IN_START = 0;
      const DEMARCATION_IN_END = 0.9;
      const imgAmount = oldFasionImages?.iceCube?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.iceCube?.images[imageClip];
    };

    const imgPour = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.pour?.images[63];
      }
      const DEMARCATION_IN_START = 0;
      const DEMARCATION_IN_END = 0.9;
      const imgAmount = oldFasionImages?.pour?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.pour?.images[imageClip];
    };

    const imgPeel = () => {
      if (screenWidthTooSmall()) {
        return oldFasionImages?.peel?.images[32];
      }
      const DEMARCATION_IN_START = 0;
      const DEMARCATION_IN_END = 0.8;
      const imgAmount = oldFasionImages?.peel?.images.length - 1;
      const imageClip = setImage(
        scrollPercent,
        DEMARCATION_IN_START,
        DEMARCATION_IN_END,
        imgAmount
      );
      return oldFasionImages?.peel?.images[imageClip];
    };

    switch (elementId) {
      case "container-1-img":
        return imgFinish();
      case "container-2-img-1":
        return imgSugarCube();
      case "container-2-img-2":
        return imgBitter();
      case "container-2-img-3":
        return imgCrush();
      case "container-2-img-4":
        return imgBourbon();
      case "container-3-img-1":
        return imgIceCube();
      case "container-4-img-1":
        return imgPour();
      case "container-5-img-1":
        return imgPeel();
      default:
        return {};
    }

    function setImage(
      scrollPercent,
      DEMARCATION_IN,
      DEMARCATION_OUT,
      imgAmount
    ) {
      let imageClip = Math.floor(
        imgAmount *
          proportionWithContainer(
            scrollPercent,
            DEMARCATION_IN,
            DEMARCATION_OUT
          )
      );
      if (imageClip < 0) {
        imageClip = 0;
      }
      if (imageClip > imgAmount) {
        imageClip = imgAmount;
      }
      return imageClip;
    }
  }

  function screenWidthTooSmall() {
    return window.outerWidth < 1024;
  }

  return {
    scrollEffectContainer1,
    scrollEffectContainer2,
    scrollEffectContainer3,
    scrollEffectContainer4,
    scrollEffectContainer5,
    scrollEffectContainer6,
    scrollEffectImageChange,
  };
}
