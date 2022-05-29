import "./weatherPage.css";
import { WeatherData } from "./WeatherData/WeatherData";

function WeatherPage() {
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay();
  let twoWeekWeatherData = [];
  const weatherData = WeatherData();

  if (!weatherData) return null;
  for (let i = 0; i < 14; i++) {
    const MS_IN_ONE_DAY = 86400000;
    const eachDayMs =
      currentDay.getTime() + (i - currentWeekday) * MS_IN_ONE_DAY;
    const eachday = new Date(eachDayMs);
    const month = eachday.getMonth() + 1;
    const date = eachday.getDate();
    const { id, describe } = getOneDayWeatherData({ month, date });
    twoWeekWeatherData[i] = {
      date: {
        month: month,
        day: date,
      },
      weather: {
        id: id,
        describe: describe,
      },
    };
  }

  function getOneDayWeatherData({ month, date }) {
    const dayData = weatherData.filter((data) => {
      const startTime = new Date(data.startTime);
      return startTime.getMonth() + 1 === month && startTime.getDate() === date;
    });
    if (!dayData || dayData.length <= 0) return { id: null, describe: null };
    const id = dayData[0].id;
    const describe = dayData[0].describe;
    return { id, describe };
  }

  const getWeatherImage = ({ id, describe, index }) => {
    const sunMoon = "day";
    const imageSrc = id ? `./images/weather/${sunMoon}/${id}.svg` : "";
    return (
      <img
        key={index}
        className="weather-page-weather-image"
        src={imageSrc}
        alt={describe}
        title={describe}
      />
    );
  };

  function getDateThisWeek() {
    const thisWeekWeatherData = twoWeekWeatherData.slice(0, 7);
    const thisWeekDate = thisWeekWeatherData.map((data, index) => {
      return <h3 key={index}>{`${data.date.month}/${data.date.day}`}</h3>;
    });
    return thisWeekDate;
  }

  function getDateNextWeek() {
    const nextWeekWeatherData = twoWeekWeatherData.slice(7, 14);
    const nextWeekDate = nextWeekWeatherData.map((data, index) => {
      return <h3 key={index}>{`${data.date.month}/${data.date.day}`}</h3>;
    });
    return nextWeekDate;
  }

  function getWeatherThisWeek() {
    const thisWeekWeatherData = twoWeekWeatherData.slice(0, 7);
    const thisWeekWeather = thisWeekWeatherData.map((data, index) => {
      return getWeatherImage({
        id: data.weather.id,
        describe: data.weather.describe,
        index: index,
      });
    });
    return thisWeekWeather;
  }

  function getWeatherNextWeek() {
    const nextWeekWeatherData = twoWeekWeatherData.slice(7, 14);
    const nextWeekWeather = nextWeekWeatherData.map((data, index) => {
      return getWeatherImage({
        id: data.weather.id,
        describe: data.weather.describe,
        index: index,
      });
    });
    return nextWeekWeather;
  }

  return (
    <div className="weather-page-body">
      <div className="weather-page-main">
        <div className="weather-page-weather-list">
          {getDateThisWeek()}
          {getWeatherThisWeek()}
          {getDateNextWeek()}
          {getWeatherNextWeek()}
        </div>
      </div>
    </div>
  );
}
export default WeatherPage;
