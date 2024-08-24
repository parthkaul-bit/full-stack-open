<<<<<<< HEAD
import React from "react";
import CountryDetail from "./CountryDetail";
=======
import React, { useState } from "react";
>>>>>>> c5abd28290defdf87ed288f37d200f024ffe5218

const Content = ({ searchedCountries, searchQuery }) => {
  let content;
  if (searchedCountries.length === 0 && searchQuery !== "") {
    content = <p>Too many matches, specify other filters.</p>;
  } else if (searchedCountries.length === 1) {
    content = searchedCountries.map((country) => {
<<<<<<< HEAD
      return <CountryDetail country={country} />;
=======
      return <CountryDetails country={country} />;
>>>>>>> c5abd28290defdf87ed288f37d200f024ffe5218
    });
  } else {
    content = searchedCountries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  }
  return <>{content}</>;
};

export default Content;
