<?php
//PHP based on https://github.com/joshbirk/Canvas-PHP

//turn on reporting for all errors and display
//error_reporting(E_ALL);
//ini_set("display_errors", 1);

if(isset($_REQUEST['signed_request'])){
  $signedRequest = $_REQUEST['signed_request'];
  $consumer_secret = '4016556530579883540';
  $sep = strpos($signedRequest, '.');
  $encodedSig = substr($signedRequest, 0, $sep);
  $encodedEnv = substr($signedRequest, $sep + 1);
  $calcedSig = base64_encode(hash_hmac('sha256', $encodedEnv, $consumer_secret, true));
  if ($calcedSig === $encodedSig) {
    // signatures match, proceed to app.
    header('Location: ../index.html#/Overview');
  }
  else {
    // signatures fo not match
    echo 'Error: Signed Request Failed. Is the app in Canvas?';
  }
}
else if(isset($_GET['_sfdc_canvas_auth'])){
  //received GET instead of signed post means that users must self authorize (org setting)
  //proceed to Oauth page.
  $url = urlencode($_GET['loginUrl']);
  header('Location: ../oauth/sfOauth.html');
}
else{
  //No POST or GET, not opened in Salesforce.
  echo 'Error: Signed Request not found.';
}
?>
