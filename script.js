function getIP(json) {
  document.getElementById("ipAddress").innerText = json.ip;
  localStorage.setItem("ipAddress", json.ip);
}

function formSubmit() {
  let getStarted = document.getElementById("getStarted");
  getStarted.addEventListener("click", function () {
    //if (location.hostname === "localhost" || location.hostname === "127.0.0.1" ) {
      window.location.pathname = "/myLocation.html";
   // }
  });
}
window.addEventListener("DOMContentLoaded", (event) => {
  formSubmit();
});

// getIP();
// let IP = localStorage.getItem("ipAddress");
// let position=[];
// //console.log(IP);

// async function getData() {
//     console.log(IP);
//     const response = await fetch(
//       `https://ipapi.co/${IP}/json/`
//     );
//     const data = await response.json();
//     console.log("data is ", data);
//     position.push({
//         lat: data.latitude,
//         lng: data.longitude,
//         title: data.city,
//       });
//   }

//   getData();

//   // Initialize and add the map
// let map;
// //let position = [];

// async function initMap() {
//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   //const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Delhi
//   map = new Map(document.getElementById("myMap"), {
//     zoom: 12,
//     center: position[0],
//     mapId: "DEMO_MAP_ID",
//   });

//   // Create an info window to share between markers.
//   const infoWindow = new google.maps.InfoWindow();

//   // Create the markers.
//   position.forEach((data) => {
//     const marker = new google.maps.Marker({
//       position: data,
//       map: map,
//       title:data.city,
//       optimized: false,
//     });

//     // Add a click listener for each marker, and set up the info window.
//     marker.addListener("click", () => {
//       infoWindow.close();
//       infoWindow.setContent(marker.getTitle());
//       infoWindow.open(map, marker);
//     });
//   });

// }
// initMap();
