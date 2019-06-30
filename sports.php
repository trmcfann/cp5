<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  /* CSE 154
   * Name: Thomas McFann
   * Date: Nov 29, 2018
   * Section: CSE 154 AK
   * This API supports GET requests.
   * -------------------------------------- GET ---------------------------------------------
   * If sent a GET request, a parameter 'id' is required to be passed with values:
   * ====================
   *   - id='id number'
   *     | returns a JSON object with the games played and years played of my favorite
   *     | player with the given 'id'
   *     | JSON-formatted object has schema:
   *     |   {
   *     |     "gamesPlayed" : <games-played>,
   *     |     "careerYear" : <career-year>,
   *     |   }
   *     | If 'id' does not correspond to one of the player ids,
   *     | returns a 400 response.
   */
  include("common.php");

  $host = 'localhost';
  $port = '8889';
  $user = 'root';
  $password = 'root';
  $dbname = 'sports';
  $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

  if(isset($_GET["id"])) {
    echo_stats($ds, $user, $password);
  } else {
    print_error("Enter parameters in form 'id=param'");
  }

  /**
   * Echos a JSON object containing a player's games played and years played.
   * @param $ds - data source for db, $user - user name for db, $password - password for db
   */
  function echo_stats($ds, $user, $password) {
    $id = $_GET["id"];
    try {
      $db = new PDO($ds, $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "SELECT games_played, career_year FROM Players WHERE id = :id;";
      $stmt = $db->prepare($sql);
      $params = array("id" => $_GET["id"]);
      $stmt->execute($params);
      $stats = $stmt->fetchAll();
      if(!empty($stats)) {
        header("Content-Type: application/json");
        echo json_encode(array("gamesPlayed" => $stats[0]["games_played"],
                               "careerYear" => $stats[0]["career_year"]));
      } else {
        print_error("No player with that id exists in the sports database");
      }
    } catch (PDOException $ex) {
      header("HTTP/1.1 400 Invalid Request");
      header("Content-Type: text/plain");
      print ("Can not connect to the database. Please try again later.\n");
      print ("Error details: $ex \n");
      die();
    }
  }
?>
