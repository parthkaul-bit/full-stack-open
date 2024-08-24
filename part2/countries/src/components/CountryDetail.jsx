import React from "react";

<<<<<<< HEAD
const CountryDetail = ({ country }) => {
=======
const CountryDetail = () => {
>>>>>>> c5abd28290defdf87ed288f37d200f024ffe5218
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
<<<<<<< HEAD
      <img src={country.flags.png} alt="country flag" />
=======
      <img src={country.flags.png} style={{ padding: 0 }} alt="" />
>>>>>>> c5abd28290defdf87ed288f37d200f024ffe5218
    </div>
  );
};

export default CountryDetail;
