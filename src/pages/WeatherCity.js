import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

export const WeatherCity = () => {
  const { cityName } = useParams();

  const { data: data5Days, loading: loading5Days } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=es&appid=8610943c5841376526505edad52f7f04`
  );

  const { data: dataCurrentWeather, loading: loadingCurrentWeather } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8610943c5841376526505edad52f7f04`
  );
  const [datesFiltered, setDatesFiltered] = useState([]);

  useEffect(() => {
    if (data5Days) {
      const dates = data5Days.list.map((item) => item.dt_txt.slice(0, 10));
      const datesFiltered = dates.filter((item, index) => index % 8 === 0);
      setDatesFiltered(datesFiltered);
    }
  }, [data5Days]);

  if (loading5Days || loadingCurrentWeather) return <Loading />;

  return (
    <div className="container m-auto bg-gray-custom text-white my-12 rounded">
      <div>
        <div className="flex pt-3">
          <Link className="pl-3" to="/"><img className="w-8" src="/homeIcon.png" alt="Inicio"></img></Link>
          <h1 className="text-2xl m-auto pr-12">
            {dataCurrentWeather.name}
          </h1>
        </div>

        <div className="grid grid-cols-2 max-w-xl m-auto">
          <div className="p-4 flex justify-center items-center m-4 bg-rgba-0-0-0-01 rounded">
            <img
              className="h-24"
              src={`http://openweathermap.org/img/wn/${dataCurrentWeather.weather[0].icon}@2x.png`}
              alt={dataCurrentWeather.weather[0].main}
            />
          </div>
          <h5 className="p-4 flex justify-center items-center mx-4 text-5xl">
            {Math.round(dataCurrentWeather.main.temp - 273.15)}&deg;C
          </h5>
          <p className="p-4 flex justify-center items-center mx-4">
            {dataCurrentWeather.main.humidity}% Humedad
          </p>
          <p className="p-4 flex justify-center items-center mx-4">
            {dataCurrentWeather.main.pressure} hPa
          </p>
        </div>
      </div>

      {datesFiltered.map((day, index) => (
        <div key={index}>
          <div className="border-t">
            <h1 className="pl-3">{day}</h1>
          </div>
          <div className="flex overflow-x-auto w-full py-2">
            <div className="flex m-auto space-x-8 pb-4">
              {data5Days.list
                .filter((item) => item.dt_txt.slice(0, 10) === day)
                .map((item, index) => (
                  <div
                    className="flex-shrink-0 rounded-full text-center text-gray-300 p-2 bg-rgba-0-0-0-01"
                    key={index}
                  >
                    <p>{item.dt_txt.slice(11, 16)}</p>
                    <img
                      className="h-14 w-14 rounded-full"
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].main}
                    />
                    <p>{Math.round(item.main.temp - 273.15)}&deg;</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
