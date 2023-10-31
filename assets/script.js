// Everything in "Document ready function" -JA
document.addEventListener("DOMContentLoaded", function () {
  // Geo Js
  const geoJsApiUrl = "https://get.geojs.io/v1/ip/geo.json";

  // Assignment code here:

  fetchUserCity();

  // Immediately gets user's city -JA
  function fetchUserCity() {
    fetch(geoJsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var userCurrentCity = data.city;
        var userCurrentState = data.region;
        console.log(
          "Hello User! You're currently in " +
            userCurrentCity +
            ", " +
            userCurrentState +
            "!"
        );
        //   Replacing potential spaces in city names with underscores (to use api)
        currentCityUnderscored = userCurrentCity.replace(/ /g, "_");
        // Forcing that to be lowercase -JA
        currentCityClean = currentCityUnderscored.toLowerCase();
        fetchNearbyBars(currentCityClean);
      })
      .catch((error) => {
        // Error handling done here -JA
        console.error("Error:", error);
      });
  }

  function fetchNearbyBars(currentCityClean) {
    const barsByCityApi =
      // NOTE: some places only have 4 or 5 bars, but this will fetch up to 8
      `https://api.openbrewerydb.org/v1/breweries?by_city=${currentCityClean}&per_page=8`;

    fetch(barsByCityApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // do stuff with the data here
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
