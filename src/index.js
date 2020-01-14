// / Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

let _token = hash.access_token;
const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "6c75520a663f4bc0936aed0e0af9e38e";
const redirectUri = "https://m97nt.csb.app/";
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-top-read&response_type=token&show_dialog=true`;
}

fetch("https://api.spotify.com/v1/playlists/0t6DkCfPNua0WASLOdsvWk", {
  headers: {
    Authorization: "Bearer " + _token
  }
})
  .then(res => res.json())
  .then(data => {
    document.getElementById("page-title").innerText = data["name"];
    let tracks = document.querySelector("table");

    data.tracks.items.map(item => {
      let row = document.createElement("tr");

      let songCell = document.createElement("td");
      songCell.innerText = item.track.name;

      let artistCell = document.createElement("td");
      artistCell.innerText = item.track.artists[0].name;

      let previewCell = document.createElement("td");
      previewCell.innerHTML = `${
        item.track.preview_url
          ? `<audio controls><source src=${
              item.track.preview_url
            } type="audio/mpeg"> </audio>`
          : "Not available"
      }`;
      tracks.appendChild(row);
      row.appendChild(songCell);
      row.appendChild(artistCell);
      row.appendChild(previewCell);
    });
  });
