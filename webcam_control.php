<?php
include_once "lib/webcam_access.inc";

$_webcam = null;
$_controlcmmd = null;

if (!array_key_exists("cam",$_GET))
{
    die("Invalid Access");
}
switch ($_GET['cam']) 
{
    case "1":
        $_webcam = CAMONE;
        break;
    case "2":
        $_webcam = CAMTWO;
        break;
    default:
        die("Invalid Access");
        break;
}

if (!array_key_exists("nav",$_GET))
{
    die("Invalid Access");
}
switch ($_GET['nav']) 
{
    case "left":
        $_controlcmmd = "290002";
        break;
    case "right":
        $_controlcmmd = "290001";
        break;
    case "up":
        $_controlcmmd = "290004";
        break;
    case "down":
        $_controlcmmd = "290003";
        break;
    case "scan":
        $_controlcmmd = "290404";
        break;
    default:
        die("Invalid Access");
        break;
}

$base_url = $_webcam . "/cmmd=" . $_controlcmmd;
// The usual - init a curl session and set the url
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $base_url);

// Set your login and password for authentication
curl_setopt($ch, CURLOPT_USERPWD, USERIDPWD);

// You can use CURLAUTH_BASIC, CURLAUTH_DIGEST, CURLAUTH_GSSNEGOTIATE,
// CURLAUTH_NTLM, CURLAUTH_ANY, and CURLAUTH_ANYSAFE
//
// You can use the bitwise | (or) operator to combine more than one method.
// If you do this, CURL will poll the server to see what methods it supports and pick the best one.
//
// CURLAUTH_ANY is an alias for CURLAUTH_BASIC | CURLAUTH_DIGEST |
// CURLAUTH_GSSNEGOTIATE | CURLAUTH_NTLM
//
// CURLAUTH_ANYSAFE is an alias for CURLAUTH_DIGEST | CURLAUTH_GSSNEGOTIATE |
// CURLAUTH_NTLM
//
// Personally I prefer CURLAUTH_ANY as it covers all bases
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

// This is occassionally required to stop CURL from verifying the peer's certificate.
// CURLOPT_SSL_VERIFYHOST may also need to be TRUE or FALSE if
// CURLOPT_SSL_VERIFYPEER is disabled (it defaults to 2 - check the existence of a
// common name and also verify that it matches the hostname provided)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Optional: Return the result instead of printing it
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// The usual - get the data and close the session
$data = curl_exec($ch);
curl_close($ch);

?>
