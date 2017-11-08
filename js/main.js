// READ THIS FIRST

// 1. All of the code needed to let user enter a location is here and works
// 2. The only code that needs editing begins on line 69


// VARIABLES

var open_settings = document.querySelector(".open-settings");
var close_settings = document.querySelector(".close-settings");
var settings = document.querySelector(".settings");
var content = document.querySelector("#weather");

var submit_form = document.querySelector(".submit");
var input_lc = document.querySelector(".locale");

if (localStorage.getItem("locale")){
  var lc = localStorage.getItem("locale");
} else {
  // Default location (area code or city, state or airport code – in quotes)
  var lc = "Providence, RI";
}


// EVENTS

open_settings.addEventListener("click",function(){
  openSettings();
});

close_settings.addEventListener("click",function(){
  closeSettings();
});

submit_form.addEventListener("click",function(e){
  // prevent defalt click behavior
  e.preventDefault();
  // get locale from form
  lc = locale.value;
  // store values in local storage
  localStorage.setItem("locale", lc);
  // close settings panel
  updateSettings();
  closeSettings();
});


// FUNCTIONS

function openSettings(){
  settings.classList.remove("js-hide");
  open_settings.classList.add("js-hide");
  close_settings.classList.remove("js-hide");
  content.classList.add("js-hide");
}

function closeSettings(){
  settings.classList.add("js-hide");
  close_settings.classList.add("js-hide");
  open_settings.classList.remove("js-hide");
  content.classList.remove("js-hide");
}

function updateSettings(){
  reallySimpleWeather.weather({
    wunderkey: '', // leave blank for Yahoo API
    location: lc, //your location here, also works in lat/lon
    woeid: '', // "Where on Earth ID" optional alternative to location
    unit: 'f', // 'c' also works
    success: function(weather) {
      // sample data to display city and temperature
      html =  '<main>';

        html += '<header>';
          html += '<h1><span>THE&nbsp;</span>SHITCAST</h1>'
        html += '</header>';

        html += '<section class="location">';

          html += '<div class="locleft">';
            html += '<h2>' +weather.city+ ", " +weather.region+ '</h2>';
            html += '<p>' +weather.forecast[0].day+ ' ' +weather.forecast[0].date+ '</p>';
          html += '</div>';

          html += '</section>'


        html += '<section class="shitmometer">'

          html += '<img src="img/thermometer.svg">'

          html += '<div>'
            html += '<h3>SH*T-MOMETER</h3>'
            html += '<p>' +weather.temp+ ' ' +weather.units.temp+ '</p>'
          html += '</div>';

        html += '</section>'


        html += '<section class="moreshit">'

          html += '<div class="conditions">';
            html += '<h4>SH*T-CONDITIONS</h4>';
            html += '<p><i class="icon icon-' +weather.code+ '"></i></p>';
          html += '</div>';

          html += '<div class="wind">';
            html += '<h4>SH*TWINDS</h4>';
            html += '<p class="windspeed">' +weather.wind.speed+ '</p>';

            html += '<div class="windblock">';
              html += '<p class="windunit">' +weather.units.speed+ '</p>';
              html += '<p class="winddirection">' +weather.wind.direction+ '</p>';
            html += '</div>';

          html += '</div>';

        html += '</section>';

        html += '<div class="showmore">';
          html += '<a href="#week">';
          html += '<p>IMPENDING SH*T</p>';
          html += '<p><i class="fa fa-chevron-down" aria-hidden="true"></i></p>';
          html += '</a>';
        html += '</div>';

      html += '</main>';

      html += '<div class="clear"></div>';

      html += '<section class="week" id="week">';

        html += '<div class="boxes highlight">';
          html += '<p class="day">' +weather.forecast[1].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[1].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[1].code+ '"></i></p>';
        html += '</div>';

        html += '<div class="boxes">';
          html += '<p class="day">' +weather.forecast[2].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[2].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[2].code+ '"></i></p>';
        html += '</div>';

        html += '<div class="boxes highlight">';
          html += '<p class="day">' +weather.forecast[3].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[3].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[3].code+ '"></i></p>';
        html += '</div>';

        html += '<div class="boxes">';
          html += '<p class="day">' +weather.forecast[4].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[4].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[4].code+ '"></i></p>';
        html += '</div>';

        html += '<div class="boxes highlight">';
          html += '<p class="day">' +weather.forecast[5].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[5].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[5].code+ '"></i></p>';
        html += '</div>';

        html += '<div class="boxes">';
          html += '<p class="day">' +weather.forecast[6].day+ '</p>';
          html += '<p class="temp">' +weather.forecast[6].high+ '&deg;F</p>';
          html += '<p><i class="icon icon-' +weather.forecast[6].code+ '"></i></p>';
        html += '</div>';

      html += '</section>';







      document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
      document.getElementById('weather').innerHTML = '<p class="error">'+error+'</p>';
    }
  });
}

//INITIALIZE

closeSettings();
updateSettings();

