<?php
  /* CSE 154
   * Name: Thomas McFann
   * Date: Nov 14, 2018
   * Section: CSE 154 AK
   * This API supports GET requests.
   * -------------------------------------- GET ---------------------------------------------
   * If sent a GET request, a parameter 'sport' is required to be passed with one of two values:
   * ====================
   *   - sport=list
   *     | returns a plain text list of valid sports
   * ====================
   *   - sport='sport'
   *     | returns a JSON object with the name, sport, team, and picture of my favorite
   *     | player from the given 'sport'
   *     | JSON-formatted object has schema:
   *     |   {
   *     |     "name" : <player-name>,
   *     |     "sport" : <player-sport>,
   *     |     "team" : <player-team>,
   *     |     "picture" : <player-picture>
   *     |   }
   *     | If 'sport' does not correspond to one of the valid sports,
   *     | returns a 400 response.
   */
  include("common.php");

  if(isset($_GET["sport"])) {
    $sport = $_GET["sport"];
    if($sport === "list") {
      echo_sport_list();
    } else if(file_exists("$sport.txt")) {
      echo_player($sport);
    } else {
      print_error("Enter a valid sport to see a player or enter 'list' to see a list of all valid sports");
    }
  } else {
    print_error("Enter parameters in form 'sport=param'");
  }

  /**
   * Echos a plain text string containing all valid sports from the txt file for all the sports.
   */
  function echo_sport_list() {
    header("Content-Type: text/plain");
    echo file_get_contents("sports.txt");
  }

  /**
   * Echos a JSON object containing all player data from txt file for that sport.
   * @param $sport - given sport
   */
  function echo_player($sport) {
    header("Content-Type: application/json");
    $player = file_get_contents("$sport.txt");
    $p_facts = explode(", ", $player);
    echo json_encode(array("name" => $p_facts[0], "sport" => $p_facts[1], "team" => $p_facts[2],
                           "picture" => $p_facts[3], "id" => (int)$p_facts[4]));
  }
?>
