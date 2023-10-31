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
          var userLatitude = data.latitude;
          var userLongitude = data.longitude;
          console.log(
          "Hello User! You're currently in " +
            userCurrentCity +
            ", " +
            userCurrentState +
            "!"
          );
          console.log(userLatitude);
          console.log(userLongitude);
        //   Replacing potential spaces in city names with underscores (to use api)
        currentCityUnderscored = userCurrentCity.replace(/ /g, "_");
        // Forcing that to be lowercase -JA
        currentCityClean = currentCityUnderscored.toLowerCase();
        fetchNearbyBars(userLatitude, userLongitude);
      })
      .catch((error) => {
        // Error handling done here -JA
        console.error("Error:", error);
      });
  }

  function fetchNearbyBars(userLatitude, userLongitude) {
    const barsByLatLonApi =
      // NOTE: searching by city gives weird results, this automatically sorts results by NEAREST
      `https://api.openbrewerydb.org/v1/breweries?by_dist=${userLatitude},${userLongitude}&per_page=8`;

    fetch(barsByLatLonApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // do stuff with the data here
          barData = data;
          console.log(barData);
          displayNearBars(barData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
    
    function displayNearBars(barData) {
        for (i = 0; i < barData.length; i++) {
            // Getting what we need from the data
            barName = barData[i].name;
            barAddress = barData[i].address_1;
            barWebsite = barData[i].website_url;
            barPhone = barData[i].phone;
            // Grabbing where it gets displayed
            nameDisplay = document.getElementById(`establishment-${[i]}`);
            addressDisplay = document.getElementById(`address-${[i]}`);
            websiteDisplay = document.getElementById(`website-${[i]}`);
            phoneDisplay = document.getElementById(`phone-${[i]}`);            
            // And displaying it!
            nameDisplay.textContent = barName;
            addressDisplay.textContent = barAddress;
            websiteDisplay.textContent = barWebsite;
            phoneDisplay.textContent = barPhone;
            
        }
    }
});
