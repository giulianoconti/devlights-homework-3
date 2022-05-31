import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ciudades = {
  "Buenos Aires": [
    "Seleccionar una localidad",
    "Mar del Plata",
    "Lanús",
    "Bahía Blanca",
  ],
  Catamarca: [
    "Seleccionar una localidad",
    "San Fernando del Valle de Catamarca",
    "Recreo",
    "San Isidro",
  ],
  Chaco: [
    "Seleccionar una localidad",
    "Resistencia",
    "Presidencia Roque Sáenz Peña",
    "Villa Ángela",
  ],
  Chubut: [
    "Seleccionar una localidad",
    "Comodoro Rivadavia",
    "Rawson",
    "Puerto Madryn",
  ],
  Córdoba: [
    "Seleccionar una localidad",
    "Córdoba",
    "Río Cuarto",
    "Villa Carlos Paz",
  ],
  Corrientes: ["Seleccionar una localidad", "Corrientes", "Concepción", "Goya"],
  "Entre Ríos": [
    "Seleccionar una localidad",
    "Paraná",
    "Concordia",
    "Gualeguaychú",
  ],
  Formosa: [
    "Seleccionar una localidad",
    "Formosa",
    "Clorinda",
    "Comandante Fontana",
  ],
  Jujuy: [
    "Seleccionar una localidad",
    "San Salvador de Jujuy",
    "La Quiaca",
    "Palpalá",
  ],
  "La Pampa": [
    "Seleccionar una localidad",
    "Toay",
    "General Pico",
    "General Acha",
  ],
  "La Rioja": [
    "Seleccionar una localidad",
    "La Rioja",
    "Chilecito",
    "Chamical",
  ],
  Mendoza: ["Seleccionar una localidad", "San Rafael", "Mendoza", "Godoy Cruz"],
  Misiones: ["Seleccionar una localidad", "Posadas", "Oberá", "Eldorado"],
  Neuquén: ["Seleccionar una localidad", "Neuquén", "Plottier", "Centenario"],
  "Río Negro": [
    "Seleccionar una localidad",
    "Viedma",
    "San Carlos de Bariloche",
    "General Roca",
  ],
  Salta: [
    "Seleccionar una localidad",
    "Salta",
    "San Ramón de la Nueva Orán",
    "Tartagal",
  ],
  "San Juan": ["Seleccionar una localidad", "San Juan", "Caucete", "Chimbas"],
  "San Luis": [
    "Seleccionar una localidad",
    "San Luis",
    "Villa Mercedes",
    "Merlo",
  ],
  "Santa Cruz": [
    "Seleccionar una localidad",
    "Río Gallegos",
    "Caleta Olivia",
    "Pico Truncado",
  ],
  "Santa Fe": ["Seleccionar una localidad", "Rosario", "Santa Fe", "Rafaela"],
  "Santiago del Estero": [
    "Seleccionar una localidad",
    "Santiago del Estero",
    "La Banda",
    "Termas de Río Hondo",
  ],
  "Tierra del Fuego": [
    "Seleccionar una localidad",
    "Río Grande",
    "Ushuaia",
    "Tolhuin",
  ],
  Tucumán: [
    "Seleccionar una localidad",
    "San Miguel de Tucumán ",
    "Banda del Río Salí",
    "Yerba Buena",
  ],
};

export const Home = () => {
  const [inputCities, setInputCities] = useState(["Seleccionar una localidad"]);
  const [inputCitySelected, setInputCitySelected] = useState("");
  const [error, setError] = useState("");

  const [weatherCities, setWeatherCities] = useState(
    localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : []
  );

  const handleProvinceChange = ({ target: { value } }) => {
    if (value !== "Seleccionar una provincia") {
      setInputCities(ciudades[value]);
    } else {
      setInputCities(["Seleccionar una localidad"]);
    }
  };

  const handleCityChange = ({ target: { value } }) => {
    setInputCitySelected(value);
  };

  const handleAddCity = () => {
    if (
      inputCitySelected !== "" &&
      !weatherCities.includes(inputCitySelected) &&
      inputCitySelected !== "Seleccionar una localidad"
    ) {
      setWeatherCities([...weatherCities, inputCitySelected]);
      setError("");
    } else {
      setError("Debe seleccionar una localidad");
    }
  };

  const deleteItem = (city) => {
    const weatherCitiesWithoutOneCity = weatherCities.filter(
      (item) => item !== city
    );
    setWeatherCities(weatherCitiesWithoutOneCity);
  };

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(weatherCities));
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
            <div
              className="flex justify-center items-center mb-3"
              key={city}
              to={`/weather/${city.toLowerCase()}`}
            >
              <div className="bg-gray-300 rounded-full p-1 container flex">
                <img
                  className="w-5 mr-2 h-5 self-center"
                  src="favicon.ico"
                  alt="weatherIcon"
                />
                <Link
                  className="text-center text-sm font-bold m-auto w-full"
                  key={city}
                  to={`/weather/${city.toLowerCase()}`}
                >
                  {city}
                </Link>
                <img
                  className="w-5 cursor-pointer ml-2 h-5 self-center"
                  src="delete.png"
                  alt="borrar ciudad"
                  onClick={() => deleteItem(city)}
                />
              </div>
            </div>
          ))}

          <div className="mb-3">
            <select
              className="mb-3 appearance-none w-full px-2 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:outline-none cursor-pointer"
              onChange={handleProvinceChange}
            >
              <option value="Seleccionar una provincia">Seleccionar una provincia</option>
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
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
