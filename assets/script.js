// Everything in "Document ready function -JA"
document.addEventListener("DOMContentLoaded", function () {
  const geoJsApiUrl = "https://get.geojs.io/v1/ip/geo.json";

  fetchUserCity();
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
      })
      .catch((error) => {
        // Error handling done here -JA
        console.error("Error:", error);
      });
  }
});
