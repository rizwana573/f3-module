let IP = localStorage.getItem("ipAddress");
let position=[];
//console.log(IP);


async function getData() {
    console.log(IP);
    const response = await fetch(
      `https://ipapi.co/${IP}/json/`
    );
    const data = await response.json();
    console.log("data is ", data);
    position.push({
        lat: data.latitude,
        lng: data.longitude,
        title: data.city,
      });
      initMap();

      document.getElementById("showIp").innerText = IP;
      document.getElementById("lat").innerHTML = `Lat: <span>${data.latitude}</span>`;
      document.getElementById("city").innerHTML = `City: <span>${data.city}</span>`;
      document.getElementById("organisation").innerHTML = `Organisation: <span>${data.org}</span>`;
      document.getElementById("longt").innerHTML = `Long: <span>${data.longitude}</span>`;
      document.getElementById("region").innerHTML = `Region: <span>${data.region}</span>`;
      document.getElementById("hostname").innerHTML = `hostname: <span>${window.location.hostname}</span>`;

      document.getElementById("timeZone").innerHTML = `Timezone: <span>${data.timezone}</span>`;
      let res= getDateAndTime(data.timezone);
      console.log(res);
      document.getElementById("dateAndTime").innerHTML = `Date And Time: <span>${res}</span>`;
      document.getElementById("pincode").innerHTML = `Pincode: <span>${data.postal}</span>`;

      getPostalsNearYou(data.postal);
  }

   getData();

  // Initialize and add the map
let map;
//let position = [];

async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  //const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Delhi
  map = new Map(document.getElementById("myMap"), {
    zoom: 12,
    center: position[0],
    mapId: "DEMO_MAP_ID",
  });

  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  position.forEach((data) => {
    const marker = new google.maps.Marker({
      position: data,
      map: map,
      title:data.city,
      optimized: false,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(map, marker);
    });
  });

}
function getDateAndTime(timeZone){
    // current datetime string in America/Chicago timezone
let datetime_str = new Date().toLocaleString("en-US", { timeZone: timeZone });

// create new Date object
let date_str = new Date(datetime_str);

console.log("222 ", date_str );
// year as (YYYY) format
let year = date_str.getFullYear();

// month as (MM) format
let month = ("0" + (date_str.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_str.getDate()).slice(-2);

let hour = ("0" + date_str.getHours()).slice(-2);
let minutes = ("0" + date_str.getMinutes()).slice(-2);

// date time in YYYY-MM-DD format
let date_time = year + "-" + month + "-" + date + "   "+ hour + ":"+minutes;

// "2021-03-22"
console.log("111 ", date_time);
return date_time;
}

async function getPostalsNearYou(pincode){
    const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const dataList = await response.json();
      
      // console.log("postal data" , data[0].PostOffice);
       let data = dataList[0].PostOffice;

    data.forEach((po) => {
        let card = document.createElement("li");
        card.class = "poCard";
        card.innerHTML = '<div class="name">' + "Name: " + '<span>' + po.Name + '</span>' + '</div>' +
        '<div class="branchType">' + "Branch Type: " + '<span>' + po.BranchType + '</span>' + '</div>' +
        '<div class="deliveryStatus">' + "Delivery Status: " + '<span>' + po.DeliveryStatus+ '</span>' + '</div>' + 
        '<div class="district">' + "District: " + '<span>' +po.District + '</span>' + '</div>' +
        '<div class="division">' + "Division: " + '<span>' +po.Division + '</span>' + '</div>'
        let posNearMe = document.getElementById("posNearMe");
        posNearMe.appendChild(card);
    });
}