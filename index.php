<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, user-scalable=yes" />
<title>Security Camera</title> 
<link rel="stylesheet" href="common/css/webcam.css" type="text/css" />
</head>
<body class="portrait">
<div id="container">
<div id="leftContainer">
    <div id="wc1_option" class="button" style="display:none" onclick="control.toggleOption('wc1')"><p id="wc1_option_msg">Option</p></div>
    <div id="wc1_snapshot" class="button" style="display:none" onclick="webcam.screenShot(1)"><p>Snapshot</p></div>
    <div id="wc1_control" class="button" style="display:none" onclick="control.toggleControl('wc1')"><p>Control</p></div>
    <div id="wc1_arrows" style="display:none">
        <div class="arrow_left arrow" onclick="webcam.moveLeft(1)"></div>
        <div class="arrow_right arrow" onclick="webcam.moveRight(1)"></div>
        <div class="arrow_up arrow" onclick="webcam.moveUp(1)"></div>
        <div class="arrow_down arrow" onclick="webcam.moveDown(1)"></div>
        <div class="arrow_scan" onclick="control.hideControl('wc1');webcam.moveScan(1);"><p>Scan</p></div>
    </div>
    <img src="image/loading.gif" class="loading" name="webcam1" id="webcam1" />
    <div id="wc1_message" class="message"></div>
</div>
<div id="rightContainer">
    <div id="wc2_option" class="button" style="display:none" onclick="control.toggleOption('wc2')"><p id="wc2_option_msg">Option</p></div>
    <div id="wc2_snapshot" class="button" style="display:none" onclick="webcam.screenShot(2)"><p>Snapshot</p></div>
    <div id="wc2_control" class="button" style="display:none" onclick="control.toggleControl('wc2')"><p>Control</p></div>
    <div id="wc2_arrows" style="display:none">
        <div class="arrow_left arrow" onclick="webcam.moveLeft(2)"></div>
        <div class="arrow_right arrow" onclick="webcam.moveRight(2)"></div>
        <div class="arrow_up arrow" onclick="webcam.moveUp(2)"></div>
        <div class="arrow_down arrow" onclick="webcam.moveDown(2)"></div>
        <div class="arrow_scan" onclick="control.hideControl('wc2');webcam.moveScan(2);"><p>Scan</p></div>
    </div>
    <img src="image/loading.gif" class="loading" name="webcam2" id="webcam2" />
    <div id="wc2_message" class="message"></div>
</div>
</div>
</body>
<script type="text/javascript" src="common/js/webcam.js"> </script>
<script type="text/javascript">
var uniqueID = "<?php echo uniqid(time()); ?>";
var seed = <?php echo time(); ?>;
var currDate = new Date();
var startTime = currDate.getTime();
var maxViewTime = 1000*60*2; //2 min
var maxDiffTime = 1000*10; //10 sec
var imageWidth = 320;
var imageUpdateCycle = 1000;
window.onload=function()
{
    window.scrollTo(0, 1);
    webcam.init("webcam1","webcam2");
//   window.onorientationchange=updateOrientation;
}
</script>
</html>
