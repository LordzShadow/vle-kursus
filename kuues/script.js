(function () {
  "use strict";

  //clock

  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");

    //setTimeout(updateClock, 2000);
    setInterval(updateClock, 200);

    function updateClock() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      const pm = h >= 12;
      h = h % 12 == 0 ? 12 : h % 12;

      if (h < 10) {
        h = "0" + h;
      }

      if (m < 10) {
        m = "0" + m;
      }

      if (s < 10) {
        s = "0" + s;
      }

      c.innerHTML = `${h}:${m}:${s} ${pm ? "PM" : "AM"}`;
    }
  });

  // forms

  document.getElementById("form").addEventListener("submit", estimateDelivery);

  let e = document.getElementById("delivery");
  e.innerHTML = "0.00 &euro;";

  function estimateDelivery(event) {
    event.preventDefault();

    let linn = document.getElementById("linn");
    let eesnimi = document.getElementById("fname");
    let perenimi = document.getElementById("lname");
    let kingitus = document.getElementById("present");
    let kontaktivaba = document.getElementById("contactless");
    let dpd = document.getElementById("dpd");
    let omniva = document.getElementById("omniva");
    let smartpost = document.getElementById("smartpost");

    const linnaHinnad = { tln: 0, trt: 2.5, nrv: 2.5, prn: 3 };
    const kingituseHind = 5;
    const kontaktivabaHind = 1;
    if (linn.value === "") {
      alert("Palun valige linn nimekirjast");

      linn.focus();

      return;
    } else if (eesnimi.value === "" || /\d/.test(eesnimi.value)) {
      alert("Palun sisestage korrektne eesnimi");

      eesnimi.focus();

      return;
    } else if (perenimi.value === "" || /\d/.test(perenimi.value)) {
      alert("Palun sisestage korrektne perekonnanimi");

      perenimi.focus();

      return;
    } else if (!dpd.checked && !omniva.checked && !smartpost.checked) {
      alert("Palun valige tarneviis");
    } else {
      let hind = 0;

      hind += linnaHinnad[linn.value];
      hind += kingitus.checked ? kingituseHind : 0;
      hind += kontaktivaba.checked ? kontaktivabaHind : 0;

      e.innerHTML = `${hind.toFixed(2)} &euro;`;
    }

    console.log("Tarne hind on arvutatud");
  }
})();

// map

let mapAPIKey =
  "AvcnjSrOe9OoIEWAcJbA8vm9W4XiSB79Vio9vNBX70GH4TCC9c73yAz4jZd57WiP";

let map;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.38444, 26.15295);
  let tartu = new Microsoft.Maps.Location(58.38104, 26.71992);
  const viljandi = new Microsoft.Maps.Location(58.3676529, 25.595335);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 9,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    //disablePanning: true,
  });

  const tartuPin = new Microsoft.Maps.Pushpin(tartu, {
    title: "Tartu Ülikool",
  });
  tartuPin.metadata = {
    title: "Tartu Ülikool",
    description: "Äge Ülikool",
  };

  const viljandiPin = new Microsoft.Maps.Pushpin(viljandi, {
    title: "Viljandi",
    metadata: {
      title: "Viljandi",
      description: "Äge linn",
    },
  });
  viljandiPin.metadata = {
    title: "Viljandi",
    description: "Äge linn",
  };

  const infobox = new Microsoft.Maps.Infobox(centerPoint, {
    visible: false,
  });
  infobox.setMap(map);

  Microsoft.Maps.Events.addHandler(tartuPin, "click", pushpinClicked);
  Microsoft.Maps.Events.addHandler(viljandiPin, "click", pushpinClicked);

  map.entities.push([tartuPin, viljandiPin]);

  function pushpinClicked(e) {
    if (e.target.metadata) {
      infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true,
      });
    }
  }
}



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
