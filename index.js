/*
  Name: Thomas McFann
  Date: Nov 14, 2018
  Section: CSE 154 AK
  This is the index.js for my favorite athletes page.
  It is used by my favorite athletes page to provide the interactivity for the html file.
  It also performs the AJAX fetch calls my api.
*/

(function() {
  "use strict";

  const INDEX_URL = "index.php?";
  const SPORTS_URL = "sports.php?id=";
  const ENTER_KEY = 13;

  window.addEventListener("load", initialize);

  /**
   * Loads the page and sets up event listeners.
   */
  function initialize() {
    $("sport-btn").addEventListener("click", getSports);
    $("player-btn").addEventListener("click", getPlayer);
    $("back-btn").addEventListener("click", goBack);
    qs("textarea").addEventListener("keypress", function (event) {
      if (event.which === ENTER_KEY) {
        getPlayer();
      }
    });
  }

  /**
   * Hides sport and player butttons and the textarea, reveals back button.
   */
  function hideButtonsAndText() {
    $("sport-btn").classList.add("hidden");
    qs("textarea").classList.add("hidden");
    $("player-btn").classList.add("hidden");
    $("back-btn").classList.remove("hidden");
  }

  /**
   * Fetches a list of valid sports.
   */
  function getSports() {
    hideButtonsAndText();
    let url = INDEX_URL + "sport=list";
    fetch(url, {mode: 'cors'})
      .then(checkStatus)
      .then(showSports)
      .catch(printError);
  }

  /**
   * Shows the given list of valid sports.
   * @param {string} sports - the list of valid sports
   */
  function showSports(sports) {
    let displayArea = $("display-area");
    let sportList = document.createElement("p");
    displayArea.appendChild(sportList);
    sportList.innerText = sports;
  }

  /**
   * Either fetches list of sports or a player depending on text in textarea
   */
  function getPlayer() {
    hideButtonsAndText();
    let sport = qs("textarea").value;
    let url = INDEX_URL + "sport=" + sport;
    if(sport === "list") {
      getSports();
    } else {
      fetch(url, {mode: 'cors'})
        .then(checkStatus)
        .then(JSON.parse)
        .then(showPlayer)
        .catch(printError);
    }
  }

  /**
   * Uses the JSON file to show a player (shows their name, picture, team, and sport)
   * @param {object} player - the JSON object of a player
   */
  function showPlayer(player) {
    let playerArea = $("display-area");
    let name = document.createElement("h2");
    playerArea.appendChild(name);
    name.innerText = player.name;
    let image = document.createElement("img");
    playerArea.appendChild(image);
    image.src = player.picture;
    image.alt = player.name;
    let teamAndSport = document.createElement("p");
    playerArea.appendChild(teamAndSport);
    teamAndSport.innerText = player.team + ", " + player.sport;

    let url = SPORTS_URL + player.id;
    fetch(url, {mode: 'cors'})
      .then(checkStatus)
      .then(JSON.parse)
      .then(showStats)
      .catch(printError);
  }

  function showStats(stats) {
    let stat = document.createElement("p");
    $("display-area").appendChild(stat);
    stat.innerText = "Games Played: " + stats.gamesPlayed + "\nYears Played: " + stats.careerYear;
  }

  /**
   * Changes page display to the original view
   */
  function goBack() {
    let text = qs("textarea");
    $("sport-btn").classList.remove("hidden");
    text.classList.remove("hidden");
    $("player-btn").classList.remove("hidden");
    $("back-btn").classList.add("hidden");
    text.value = "";
    $("display-area").innerHTML = "";
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
   function checkStatus(response) {
     const OK = 200;
     const ERROR = 300;
     let responseText = response.text();
     if (response.status >= OK && response.status < ERROR || response.status === 0) {
       return responseText;
     } else {
       return responseText.then(Promise.reject.bind(Promise));
     }
   }

   /**
    * Creates an element on the page alerting the user of the given error
    * @param {string} error - the error from the checkStatus fuction
    */
   function printError(error) {
     let displayArea = $("display-area");
     let errorMessage = document.createElement("p");
     displayArea.appendChild(errorMessage);
     errorMessage.innerText = error;
   }

})();
