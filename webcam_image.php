<?php
include_once "lib/webcam_access.inc";
$_webcam = null;
$_webcam_width = -1;
$_webcam_height = -1;
$_webcam_size_ratio = 3/4;
$_timestamp = true;

if (!array_key_exists("cam",$_GET))
{
    die("Invalid Access");
}
switch ($_GET['cam']) 
{
    case "1":
        $_webcam = CAMONE . "/image.jpg";
        break;
    case "2":
        $_webcam = CAMTWO . "/image.jpg";
        break;
    default:
        die("Invalid Access");
        break;
}
if (array_key_exists("width",$_GET)) 
{
    $_webcam_width = $_GET["width"];
}
else
{
    $_webcam_width = 640;
}

if (array_key_exists("stamp",$_GET))
{
    if ($_GET["stamp"] == "0")
    {
        $_timestamp = false;
    }
}

$_webcam_height = $_webcam_width * $_webcam_size_ratio;

$source = $_webcam . "?cache=" . getRandNumber();
doImage($source,$_webcam_width, $_webcam_height,$_timestamp);

function doImage($source,$width,$height,$timestamp=true)
{
    $image = getImage($source,$width,$height);
    if (is_null($image)) { die("Rendering Error"); }
    
    //no cache
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
    
    header('Content-Type: image/jpeg');
    $image = resize($image,$width,$height);
    if ($timestamp)
    {
        $image = addTimeStamp($image);
    }
    imagejpeg($image);
    imagedestroy($image);    
}

function getImage($source,$width,$height)
{
    $base_url = $source;
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
    if (empty($data)) { die("Connection Error"); }
    $image = imagecreatefromstring ($data);
    return $image;
}


function addTimeStamp($image)
{
$text =date("n/j/y  H:i:s", time());
$font = 2;
$w = imagefontwidth($font) * strlen($text) ;
$h = imagefontheight($font) ;
$x = imagesx($image) - $w ;
$y = imagesy($image) - $h;
//$backgroundColor = imagecolorallocate ($image, 255, 255, 255);
$fontcolor = imagecolorallocate ($image, 221,221,221);
imagestring ($image, $font, $x, $y,  $text, $fontcolor);

return $image;
}

function resize($image,$width,$height) {
    $new_image = imagecreatetruecolor($width, $height);
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $width, $height, imagesx($image), imagesy($image));
    return $new_image;   
}  

function getRandNumber()
{
    //    $prefix = date("G").date("i").date("s").date("u");
    $prefix = time();
    $str = uniqid($prefix);
    return $str;
}
?>
