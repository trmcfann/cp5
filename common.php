<?php
/**
 * Outputs a 400 error with the given $msg text (plain text output).
 * Cite: This function is from CSE 154 example code.
 * @param $msg - error message output.
 */
function print_error($msg) {
  header("HTTP/1.1 400 Invalid Request");
  header("Content-type: text/plain");
  die($msg);
}
?>
