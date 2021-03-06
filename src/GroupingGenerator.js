import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GroupingGenerator({ data }) {
  const countryArray = [];
  let pairs = [];

  const [result, setResult] = useState(["Results will be shown here"]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    data.forEach((country) => {
      const countryObject = { name: "", neighbors: [] };
      countryObject.name = country.name;
      axios(country.url).then((response) =>
        response.data.neighbors.forEach((neighbor) => {
          countryObject.neighbors.push(neighbor.name);
        })
      );
      countryArray.push(countryObject);
    });
  }

  function handleClick() {
    for (let i = 0; i < countryArray.length; i++) {
      for (let k = 1 + i; k < countryArray.length; k++) {
        if (
          countryArray[k].neighbors.includes(countryArray[i].name) &&
          countryArray[i].neighbors.includes(countryArray[k].name)
        ) {
          pairs.push(`${countryArray[k].name} - ${countryArray[i].name}`);
        }
      }
    }

    document.getElementById("generateButton").setAttribute("disabled", true);
    pairs.length !== 0 ? setResult(pairs) : setResult("No mutual neighboring countries found");
  }
  return (
    <div>
      <button id="generateButton" onClick={handleClick}>
        Generate Groupings
      </button>

      <div>
        {typeof result !== "string"
          ? result.map((pair, index) => <p key={index}>{pair}</p>)
          : result}
      </div>
    </div>
  );
}
