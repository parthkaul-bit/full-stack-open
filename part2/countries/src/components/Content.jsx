import React from "react";
import CountryDetail from "./CountryDetail";

const Content = ({ searchedCountries, searchQuery }) => {
  let content;
  if (searchedCountries.length === 0 && searchQuery !== "") {
    content = <p>Too many matches, specify other filters.</p>;
  } else if (searchedCountries.length === 1) {
    content = searchedCountries.map((country) => {
      return <CountryDetail country={country} />;
    });
  } else {
    content = searchedCountries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  }
  return <>{content}</>;
};

export default Content;
