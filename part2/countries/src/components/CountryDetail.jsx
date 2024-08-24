import React from "react";

const CountryDetail = ({ country }) => {
  return (
    <div key={country.name.common}>
      <h3>{country.name.common}</h3>
      <p>
        <b>Capital: </b> {country.capital}
      </p>
      <p>
        <b>area:</b> {country.area}
      </p>
      <h3>languages</h3>
      {country.languages ? (
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>No languages available</p>
      )}
      <img src={country.flags.png} alt="country flag" />
    </div>
  );
};

export default CountryDetail;
