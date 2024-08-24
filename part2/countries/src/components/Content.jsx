import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Content = ({ searchedCountries, searchQuery }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleClick = (country) => {
    setSelectedCountry(country);
  };

  const handleReset = () => {
    setSelectedCountry(null);
  };

  let content;

  if (searchedCountries.length === 0 && searchQuery !== "") {
    content = <p>Too many matches, specify other filters.</p>;
  } else if (searchedCountries.length === 1) {
    content = (
      <>
        <CountryDetail country={searchedCountries[0]} />
        <button onClick={handleReset}>Back</button>
      </>
    );
  } else if (selectedCountry) {
    content = (
      <>
        <CountryDetail country={selectedCountry} />
        <button onClick={handleReset}>Back</button>
      </>
    );
  } else {
    content = searchedCountries.map((country) => (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={() => handleClick(country)}>Show</button>
      </div>
    ));
  }

  return <>{content}</>;
};

export default Content;
