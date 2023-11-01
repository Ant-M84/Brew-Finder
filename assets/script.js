// Everything in "Document ready function" -JA
document.addEventListener("DOMContentLoaded", function () {
  // Geo Js
  const geoJsApiUrl = "https://get.geojs.io/v1/ip/geo.json";

  // Assignment code here:
  var cityDisplay = document.getElementById("cityDisplay");
  cityDisplay.style.textTransform = "capitalize";

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
        var userCurrentCity = data.city;
        cityDisplay.textContent = userCurrentCity;
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

  function fetchPlaceLogos(barWebsite) {
    // Turning barWebsite into barDomain (ex: target.com)
    var barDomain = barWebsite.replace(/.*?(example\.com).*/, "$1");
    console.log(barDomain);
  }

  function displayNearBars(barData) {
    for (i = 0; i < barData.length; i++) {
      // Getting what we need from the data
      barName = barData[i].name;
      barAddress = barData[i].address_1;
      barWebsite = barData[i].website_url;
      barPhone = barData[i].phone;
      // Grabbing where it gets displayed
      var barCard = document.getElementById(`barCard-${[i]}`);
      nameDisplay = document.getElementById(`establishment-${[i]}`);
      addressDisplay = document.getElementById(`address-${[i]}`);
      websiteDisplay = document.getElementById(`website-${[i]}`);
      phoneDisplay = document.getElementById(`phone-${[i]}`);
      // And displaying it!
      if (barName == null || barAddress == null) {
        nameDisplay.textContent = "(No name information available)";
        barCard.style.display = "none";
        console.log(
          "Something with insufficient data was returned, and not shown to the user -JA\n",
          barCard
        );
      } else {
        nameDisplay.textContent = barName;
      }
      if (barAddress == null) {
        addressDisplay.textContent = "(No address information available)";
      } else {
        addressDisplay.textContent = barAddress;
      }
      if (barWebsite == null) {
        websiteDisplay.textContent = "(No website for this location available)";
      } else {
        // Clearing placeholder text
        websiteDisplay.textContent = "";
        // Adding barWebsite as an anchor
        const websiteAnchor = document.createElement("a");
        websiteAnchor.href = `${barWebsite}`;
        websiteAnchor.textContent = barWebsite;
        websiteDisplay.appendChild(websiteAnchor);
        // Calling function to get images from barAddresses
        fetchPlaceLogos(barWebsite);
      }
      if (barPhone == null) {
        phoneDisplay.textContent = "(No phone information available)";
      } else {
        // Clearing placeholder text
        phoneDisplay.textContent = "";
        // Adding barPhone as a tel:anchor
        const phoneAnchor = document.createElement("a");
        phoneAnchor.href = `tel:${barPhone}`;
        phoneAnchor.textContent = `(${barPhone.substring(
          0,
          3
        )}) ${barPhone.substring(3, 6)}-${barPhone.substring(6, 10)}`;
        phoneDisplay.appendChild(phoneAnchor);
      }
    }
  }

  //   Functionality to Search my Location button
  var currentLocationButton = document.getElementById(
    "searchCurrentLocationButton"
  );

  currentLocationButton.addEventListener("click", fetchUserCity);

  // Functionality to Search! button
  var searchInput = document.getElementById("searchInput");
  var searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", function () {
    var searchedCity = searchInput.value;
    searchInput.value = "";
    console.log(searchedCity);
    fetchSearchedCityData(searchedCity);
  });

  function fetchSearchedCityData(searchedCity) {
    // Replacing spaces with _ -JA
    var searchedCityUnderscored = searchedCity.replace(/ /g, "_");
    // Forcing that to be lowercase -JA
    var searchedCityClean = searchedCityUnderscored.toLowerCase();

    var searchByCityUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${searchedCityClean}&per_page=8`;

    fetch(searchByCityUrl)
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
        //   If fetch successfull, display city that was searched
        cityDisplay.textContent = searchedCity;
        cityDisplay.style.textTransform = "capitalize";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
