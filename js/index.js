$(function(){
  alert("Thank you for checking out my Year 12 Media Project. Your feedback would be greatly apprechiated. Submit it via the button in the Top Left hand corner.")
  changeImage();
  onresize = changeImage;
  loadPage($($(".active").children()[0]).attr("link"));
  $(".tab").click(function(){
    let p = $($(this)[0].parentElement);
    // if(p.hasClass("active"))return;
    $("li").removeClass("active");
    p.addClass("active")
    loadPage($(this).attr("link"));
  })
  onfocus = () => {
    if(window.op)op.close();
  }
})
const changeImage = () => {
  let url = false ? `'https://source.unsplash.com/YkWz_coLm84/${innerWidth}x${innerHeight}/'` : "'./images/photo-1486728297118-82a07bc48a28.jpg'"
  $("#ImageBG").css("background",`url(${url})`);
}
const loadPage = i => {
  onkeydown = null;
  fetch("./pages/" + i +".html").then(async r => {
      $("#Page")[0].innerHTML = await r.text();
      await eval($("script#RunAfterLoad").html());
      $(".Compile").each(function (){
        let s = new Sass();
        s.compile($(this).html(), res => {
          if (res.status == 1) {
            throw new Error(res.formatted);
          }
          console.log("Compiled Sucsessfully");
          let a = open();
          a.window.document.write(res.text);
          let e = $("<style></style>").html(res.text);
          $("#Page").append(e);
        })
      })
    })
    .catch(() => {

    })
}

function openImage(url, i = false){
  if ($("#overlayBackground")) $("#overlayBackground").remove();
  let e = $(`<div id='overlayBackground'><center>
  <image src='${url}' id="imageForeground"></center>
  <div class='fas fa-times' id='cancel'></div>
  </div>`)
  e.find("#cancel").click(function(){
    $(this).parent().remove();
    onkeydown = null;
  })
  $("#Content").append(e)
  if(window.imageList && !i){
    window.index = window.imageList.indexOf(url);
    if(window.index != -1){
      onkeydown = function(ev){
        let evt = ev || event;
        if(evt.which != 37 && evt.which != 39 && evt.which != 27)return;
        if(evt.which == 37)window.index > 0 ? window.index-- : null;
        if(evt.which == 39)window.index < window.imageList.length - 1 ? window.index++ : null;
        if(evt.which == 27){
          $("#overlayBackground").remove();
          onkeydown = null;
        }
        e.find("#imageForeground").attr("src", window.imageList[window.index]);
        $(`[url="${window.imageList[window.index]}"]`)[0].scrollIntoView();
      }
    }
  }
  $("#imageForeground")[0].onload = function(){
    let r = $("#imageForeground");
    let s = r[0].getBoundingClientRect();
    r.css("margin", `${(innerHeight - s.height) / 2}px ${(innerWidth - s.width) / 2}px`);
  }
}

function openFeedback(){
  // if(confirm("Hello There. You spent 2 Minutes on my website. Would you like to Awner some Questions about it?")){
    window.op = open("https://docs.google.com/forms/d/e/1FAIpQLSeU1ixKW8lph7-ArO8uDFeNxXzBGVJD1rUTa5-iz0nRVFCdMg/viewform?usp=sf_link");
  // }
}