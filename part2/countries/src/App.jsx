import { useEffect, useState } from "react";
import axios from "axios";
import Content from "./components/Content";
function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCountries, setSearchedCountries] = useState([]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const resultingCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );

    if (resultingCountries.length > 10) {
      setSearchedCountries([]);
    } else {
      setSearchedCountries(resultingCountries);
    }
  }, [searchQuery, countries]);

  console.log("fetched countries: ", countries.length);
  console.log("searchQuery", searchQuery);

  return (
    <>
      <div>
        Find Countries: <input value={searchQuery} onChange={handleChange} />
      </div>
      <h1>Results: </h1>
      <Content
        searchQuery={searchQuery}
        searchedCountries={searchedCountries}
      />
    </>
  );
}

export default App;
