import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [provinceSelectedState, setProvinceSelectedState] = useState(false);
  const [inputCities, setInputCities] = useState(["Seleccionar una localidad"]);
  const [inputCitySelected, setInputCitySelected] = useState("");
  const [error, setError] = useState("");

  const [weatherCities, setWeatherCities] = useState(
    localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : []
  );

  const handleProvinceChange = ({ target: { value } }) => {
    if (value === "Buenos Aires") {
      setInputCities([
        "Seleccionar una localidad",
        "Mar del Plata",
        "Lanús",
        "Bahía Blanca",
      ]);
    } else if (value === "Catamarca") {
      setInputCities([
        "Seleccionar una localidad",
        "San Fernando del Valle de Catamarca",
        "Recreo",
        "San Isidro",
      ]);
    } else if (value === "Chaco") {
      setInputCities([
        "Seleccionar una localidad",
        "Resistencia",
        "Presidencia Roque Sáenz Peña",
        "Villa Ángela",
      ]);
    } else if (value === "Chubut") {
      setInputCities([
        "Seleccionar una localidad",
        "Comodoro Rivadavia",
        "Rawson",
        "Puerto Madryn",
      ]);
    } else if (value === "Córdoba") {
      setInputCities([
        "Seleccionar una localidad",
        "Córdoba",
        "Río Cuarto",
        "Villa Carlos Paz",
      ]);
    } else if (value === "Corrientes") {
      setInputCities([
        "Seleccionar una localidad",
        "Corrientes",
        "Concepción",
        "Goya",
      ]);
    } else if (value === "Entre Ríos") {
      setInputCities([
        "Seleccionar una localidad",
        "Paraná",
        "Concordia",
        "Gualeguaychú",
      ]);
    } else if (value === "Formosa") {
      setInputCities([
        "Seleccionar una localidad",
        "Formosa",
        "Clorinda",
        "Comandante Fontana",
      ]);
    } else if (value === "Jujuy") {
      setInputCities([
        "Seleccionar una localidad",
        "San Salvador de Jujuy",
        "La Quiaca",
        "Palpalá",
      ]);
    } else if (value === "La Pampa") {
      setInputCities([
        "Seleccionar una localidad",
        "Toay",
        "General Pico",
        "General Acha",
      ]);
    } else if (value === "La Rioja") {
      setInputCities([
        "Seleccionar una localidad",
        "La Rioja",
        "Chilecito",
        "Chamical",
      ]);
    } else if (value === "Mendoza") {
      setInputCities([
        "Seleccionar una localidad",
        "San Rafael",
        "Mendoza",
        "Godoy Cruz",
      ]);
    } else if (value === "Misiones") {
      setInputCities([
        "Seleccionar una localidad",
        "Posadas",
        "Oberá",
        "Eldorado",
      ]);
    } else if (value === "Neuquén") {
      setInputCities([
        "Seleccionar una localidad",
        "Neuquén",
        "Plottier",
        "Centenario",
      ]);
    } else if (value === "Río Negro") {
      setInputCities([
        "Seleccionar una localidad",
        "Viedma",
        "San Carlos de Bariloche",
        "General Roca",
      ]);
    } else if (value === "Salta") {
      setInputCities([
        "Seleccionar una localidad",
        "Salta",
        "San Ramón de la Nueva Orán",
        "Tartagal",
      ]);
    } else if (value === "San Juan") {
      setInputCities([
        "Seleccionar una localidad",
        "San Juan",
        "Caucete",
        "Chimbas",
      ]);
    } else if (value === "San Luis") {
      setInputCities([
        "Seleccionar una localidad",
        "San Luis",
        "Villa Mercedes",
        "Merlo",
      ]);
    } else if (value === "Santa Cruz") {
      setInputCities([
        "Seleccionar una localidad",
        "Río Gallegos",
        "Caleta Olivia",
        "Pico Truncado",
      ]);
    } else if (value === "Santa Fe") {
      setInputCities([
        "Seleccionar una localidad",
        "Rosario",
        "Santa Fe",
        "Rafaela",
      ]);
    } else if (value === "Santiago del Estero") {
      setInputCities([
        "Seleccionar una localidad",
        "Santiago del Estero",
        "La Banda",
        "Termas de Río Hondo",
      ]);
    } else if (value === "Tierra del Fuego") {
      setInputCities([
        "Seleccionar una localidad",
        "Río Grande",
        "Ushuaia",
        "Tolhuin",
      ]);
    } else if (value === "Tucumán") {
      setInputCities([
        "Seleccionar una localidad",
        "San Miguel de Tucumán ",
        "Banda del Río Salí",
        "Yerba Buena",
      ]);
    }
    setProvinceSelectedState(true);
  };

  const handleCityChange = ({ target: { value } }) => {
    console.log(value);
    setInputCitySelected(value);
  };

  const handleAddCity = () => {
    if (inputCitySelected !== "") {
      setWeatherCities([...weatherCities, inputCitySelected]);
      setError("");
    } else {
      setError("Debe seleccionar una localidad");
    }
  };

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(weatherCities));
    console.log('efefefe')
  }, [weatherCities]);

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-96">
          <h1 className="text-center text-2xl font-bold mb-3">Clima</h1>

          {error && (
            <div className="flex justify-center items-center mb-3">
              <div className="bg-red-500 rounded-full p-1 container">
                <p className="text-center text-sm font-bold">{error}</p>
              </div>
            </div>
          )}

          {weatherCities.map((city) => (
            <Link
              className="flex justify-center items-center mb-3"
              key={city}
              to={`/weather/${city.toLowerCase()}`}
            >
              <div className="bg-gray-300 rounded-full p-1 container flex">
                <img className="w-5" src="favicon.ico" alt="weatherIcon" />
                <p className="text-center text-sm font-bold m-auto">{city}</p>
                <img className="w-5" src="favicon.ico" alt="weatherIcon" />
              </div>
            </Link>
          ))}

          <div className="mb-3">
            <select
              className="mb-3 appearance-none w-full px-2 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:outline-none cursor-pointer"
              onChange={handleProvinceChange}
            >
              {!provinceSelectedState && (
                <option value="">Seleccionar una provincia</option>
              )}
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Catamarca">Catamarca</option>
              <option value="Chaco">Chaco</option>
              <option value="Chubut">Chubut</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Entre Ríos">Entre Ríos</option>
              <option value="Formosa">Formosa</option>
              <option value="Jujuy">Jujuy</option>
              <option value="La Pampa">La Pampa</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Misiones">Misiones</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Salta">Salta</option>
              <option value="San Juan">San Juan</option>
              <option value="San Luis">San Luis</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Tierra del Fuego">Tierra del Fuego</option>
              <option value="Tucumán">Tucumán</option>
            </select>

            <select
              className="mb-3 appearance-none w-full px-2 py-1 text-gray-700 border border-gray-300 rounded focus:outline-none cursor-pointer"
              onChange={handleCityChange}
            >
              {inputCities.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded container"
              onClick={handleAddCity}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
