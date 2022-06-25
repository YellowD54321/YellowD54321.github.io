import React, { useState, useEffect } from "react";

export function WeatherData() {
  const defaultLocation = "內湖區";
  const w961o3 = "F-D0047-063"; //台北
  const mp6xup6vu04 = "F-D0047-025"; //雲林縣
  const apiUrlTaipie = {
    key: "CWB-81EFCB65-4251-47DC-B37D-4B9B86AB3873",
    baseUrl: `https://opendata.cwb.gov.tw/api/v1/rest/datastore/${w961o3}?Authorization=`,
    format: "&format=",
    locationName: "&locationName=",
    elementName: "&elementName=",
    timeFrom: "&timeFrom=",
    timeTo: "&timeTo=",
  };
  const format = "JSON";
  const elementName = "Wx";
  const timeFrom = new Date();
  const timeTo = new Date(timeFrom.getTime() + 86400000);
  const apiUrl =
    apiUrlTaipie.baseUrl +
    apiUrlTaipie.key +
    apiUrlTaipie.format +
    format +
    apiUrlTaipie.locationName +
    defaultLocation +
    apiUrlTaipie.elementName +
    elementName +
    apiUrlTaipie.timeFrom +
    timeFrom.toISOString() +
    apiUrlTaipie.timeTo +
    timeTo.toISOString();
  const [weatherData, setWeatherData] = useState(null);

  const fetchApi = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    try {
      fetchApi(apiUrl).then((apiData) => {
        setWeatherData(apiData);
      });
    } catch (err) {
      console.log("Error happens from Weather API:");
      console.error(err);
    }
  }, []);

  const getWeatherInformation = () => {
    if (!weatherData) return null;
    const cityData = weatherData.records?.locations?.[0];
    const locationData = cityData?.location?.[0];
    const weatherElements = locationData?.weatherElement;
    const weatherTime = weatherElements?.[0]?.time;

    return weatherTime.map((data) => {
      if (!data) return null;
      return {
        startTime: data.startTime,
        endTime: data.endTime,
        id: data.elementValue[1].value,
        describe: data.elementValue[0].value,
      };
    });
  };

  return getWeatherInformation();
}

// export function getWeatherImage({ id, describe }) {
//     if (!id) return null;
//     const cerrentTime = new Date();
//     const sunMoon =
//       cerrentTime.getHours() >= 18 || cerrentTime.getHours() <= 5
//         ? "night"
//         : "day";
//     const imageSrc = `./images/weather/${sunMoon}/${id}.svg`;
//     return (
//       <img
//         className="today-weather-image"
//         src={imageSrc}
//         alt="weatherIcon"
//         title={describe}
//         onClick={handleWeatherImageClick}
//       />
//     );
//   };
