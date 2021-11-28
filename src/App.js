import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupingGenerator from "./GroupingGenerator";
import "./App.css";

const API_ENDPOINT = "https://travelbriefing.org/countries.json";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    axios(API_ENDPOINT)
      .then((response) => {
        setData(response.data.sort(() => 0.5 - Math.random()).slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="App">
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
      <GroupingGenerator data={data} />
    </div>
  );
}

export default App;
