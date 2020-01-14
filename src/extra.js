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
const clientId = "b53e5e2e05c949b1b41db9786ee2483f";
const redirectUri = "https://m97nt.csb.app/";
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-top-read&response_type=token&show_dialog=true`;
}

// Make a call using the token
fetch("https://api.spotify.com/v1/me/playlists", {
  headers: {
    Authorization: "Bearer " + _token
  }
})
  .then(res => res.json())
  .then(data => console.log("all the playlists", data));

fetch("https://api.spotify.com/v1/playlists/4SsHmrWvOptrdhzGONDXt2", {
  headers: {
    Authorization: "Bearer " + _token
  }
})
  .then(res => res.json())
  .then(data => {
    console.log("one particular playlist", data);
    document.getElementById("playlist-name").innerText = data["name"];
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
