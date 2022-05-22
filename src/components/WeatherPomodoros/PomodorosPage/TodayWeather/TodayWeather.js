import "./todayWeather.css";
import React, { useState, useEffect } from "react";

function TodayWeather() {
  const defaultLocation = "內湖區";
  const w961o3 = "F-D0047-061"; //台北
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
  const timeFrom = "2022-05-23T00:00:00";
  const timeTo = "2022-05-23T23:59:59";
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
    timeFrom +
    apiUrlTaipie.timeTo +
    timeTo;
  const [weatherData, setWeatherData] = useState(null);

  const fetchApi = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const getWeatherInformation = () => {
    if (!weatherData) return null;
    console.log(weatherData);
    const cityData = weatherData.records.locations[0];
    const locationData = cityData.location[0];
    const weatherElements = locationData.weatherElement;
    const weatherTime = weatherElements[0].time[0];
    if (!weatherTime || weatherTime.length <= 0) return null;
    const weatherId = weatherTime.elementValue[1].value;
    const weatherDescribe = weatherTime.elementValue[0].value;
    return {
      id: weatherId,
      describe: weatherDescribe,
    };
  };

  const getWeatherImage = ({ id, describe }) => {
    if (!id) return null;
    const cerrentTime = new Date();
    const sunMoon =
      cerrentTime.getHours() >= 18 || cerrentTime.getHours() <= 5
        ? "night"
        : "day";
    const imageSrc = `./images/weather/${sunMoon}/${id}.svg`;
    return (
      <img
        src={imageSrc}
        alt="weatherIcon"
        title={describe}
        className="today-weather-image"
      />
    );
  };

  useEffect(() => {
    fetchApi(apiUrl).then((apiData) => {
      setWeatherData(apiData);
    });
  }, []);

  const weatherInformation = getWeatherInformation();
  let weatherImage = null;
  if (weatherInformation) {
    weatherImage = getWeatherImage(weatherInformation);
  }

  return <div>{weatherImage}</div>;
}
export default TodayWeather;
