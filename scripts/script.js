//A: Project ID: PhysixYouTubeAPI
//B: API key: AIzaSyDf0Zdjd5AGfV-F_RA_qZTCl0AdimFGRA8
//D: Incorporate the acivities tab
//E: add a MORE button to keep feching 10 more search results
// Fetch and diplay tile, caption,
// deal with errors 403, 400, 404

console.log("hi");

$(document).ready(function () {
  var API_KEY = "AIzaSyDf0Zdjd5AGfV-F_RA_qZTCl0AdimFGRA8";
  var video = "";

  $("#form").submit(function (event) {
    event.preventDefault();

    var elmnt = document.getElementById("projects");
    elmnt.scrollIntoView();

    var search = $("#search").val();
    videoSearch(API_KEY, search, 10);
  });
});

function videoSearch(key, search, maxResults) {
  $("#searchResult").empty();

  $("#searchResult").append(`<div class="wow fadeIn" id="queryString"></div>`);
  $("#queryString").append(`
  <br><br>
  <div id="spinner">
  <div class="text-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
</div>`);

  searchTitle = `
    <h2 class="text-center h1 my-4">Showing results for ${search}
    </h2><br>
    `;
  $("#queryString").append(searchTitle);

  $.get(
    "https://www.googleapis.com/youtube/v3/search?key=" +
      key +
      "&type=video&part=snippet&maxResults=" +
      maxResults +
      "&q=" +
      search,
    function (data) {
      data.items.forEach((item) => {
        console.log(item)
        video = `
<div class="row wow fadeInLeft" data-wow-delay=".3s">
<div class="col-lg-6 col-xl-5 pr-lg-5 pb-5">
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="http://www.youtube.com/embed/${
          item.id.videoId}" allowfullscreen frameboarder=0></iframe>
</div>
</div>
<div class="col-lg-6 col-xl-7 pl-lg-5 pb-4">
  <div class="row mb-3">
    <div class="col-1 mr-1"><i class="fa fa-youtube fa-2x red-text"></i></div>
    <div class="col-10">
      <h5 class="font-weight-bold">${item.snippet.title}</h5>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-1 mr-1"><i class="fa fa-code fa-2x cyan-text"></i></div>
    <div class="col-10">
      <h5 class="font-weight-bold">${item.snippet.channelTitle}</h5>
    </div>
  </div>
  <div class="row">
    <div class="col-1 mr-1"><i class="fa fa-download fa-2x deep-purple-text"></i></div>
    <div class="col-1">
    <button class="btn btn-info" id="${
      "btn_" + item.id.videoId
    }"> Download </button>
    </div>
  </div>
</div>
</div>
<hr/>
`;

        $("#searchResult").append(video);
        $("#btn_" + item.id.videoId).on("click", downloadVideo);
        // console.log("https://www.googleapis.com/youtube/v3/GET/captions/id")
      });
      $("#spinner").empty();
    }
  );
}

// "#btn_"+item.id.videoId
function downloadVideo(event) {
  console.log("hoo ho ho");
  btnID = event.target.id;
  videoID = btnID.split("_")[1];
  console.log(`video you clicked on is ${videoID}`);
}

// video = `
// <iframe widh="800" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameboarder="0" allowfullscreen></iframe>
// <button class="btn btn-info" id="${"btn_"+item.id.videoId}"> Download </button>
// <br><br>
// `
