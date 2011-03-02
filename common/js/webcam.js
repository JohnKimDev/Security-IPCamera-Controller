var control = function()
{
    var my={};
    my.toggleControl = function(id)
    {
        var ar = document.getElementById(id+"_arrows");
        if(ar.style.display == "none")
        {
            my.showControl(id);
        }
        else
        {
            my.hideControl(id);
        }
    };
    my.hideControl = function(id)
    {
        document.getElementById(id+"_arrows").style.display = "none";
    };
    my.showControl = function(id)
    {
        document.getElementById(id+"_arrows").style.display = "block";
    };
    my.toggleOption = function(id)
    {
        var oo = document.getElementById(id+"_option");
        var ot = document.getElementById(id+"_option_msg");
        var ss = document.getElementById(id+"_snapshot");
        var ct = document.getElementById(id+"_control");
        webcam.clearOptBtTimeout(id);
        if (ss.style.display == "none")
        {
            oo.className = "button";
            ot.innerHTML = "&nbsp;&nbsp;Close";
            ss.style.display = "block";
            ct.style.display = "block";
        }
        else
        {
            oo.className = "button_hide";
            ot.innerHTML = "Option";
            ss.style.display = "none";
            ct.style.display = "none";
            my.hideControl(id);
        }
    };


    return my;

}();

var webcam = function()
{
    var WEBCAM_IMAGE_URL_1 = "webcam_image.php?cam=1&width=";
    var WEBCAM_IMAGE_URL_2 = "webcam_image.php?cam=2&width=";
    
    var WEBCAM_CONTROL_URL_1 = "webcam_control.php?cam=1&nav=";
    var WEBCAM_CONTROL_URL_2 = "webcam_control.php?cam=2&nav=";
    
    var WEBCAM_SCREENSHOT_URL_1 = "webcam_screenshot.php?cam=1";
    var WEBCAM_SCREENSHOT_URL_2 = "webcam_screenshot.php?cam=2";

    var timer1 = null;
    var timer2 = null;
    var checkTimer = null;

    var start1a = null;
    var start1b = null;
    var start2a = null;
    var start2b = null;
    var stopTrigger = false;

    var my={};
    my.init = function(img1,img2)
    {
        
        var timg1 = new Image();
        timg1.src=my.getImageUrl(WEBCAM_IMAGE_URL_1) + "&rand="+my.generateRandNumber();
        timg1.onload=function(){
                var _this = document.images[img1];
                _this.style.visibility = "hidden";
                _this.className = "webcam";
                my.updateImage(img1,timg1,WEBCAM_IMAGE_URL_1,timer1);
                start1a = setTimeout(function(){
                document.getElementById("wc1_option").style.display = "block";
                },1000);
                start1b = setTimeout(function(){
                document.getElementById("wc1_option").className = "button_hide";
                },6000);
        };
        
        var timg2 = new Image();
        timg2.src=my.getImageUrl(WEBCAM_IMAGE_URL_2) + "&rand="+my.generateRandNumber();
        timg2.onload=function(){
                var _this = document.images[img2];
                _this.style.visibility = "hidden";
                _this.className = "webcam";
                my.updateImage(img2,timg2,WEBCAM_IMAGE_URL_2,timer2);
                start2a = setTimeout(function(){
                document.getElementById("wc2_option").style.display = "block";
                },1000);
                start2b = setTimeout(function(){
                document.getElementById("wc2_option").className = "button_hide";
                },6000);
        };

        checkTimer = setInterval(my.checkViewTimer,2000);
    };

    my.clearOptBtTimeout = function(id)
    {
        if (id == "wc1") { clearTimeout(start1b); }
        else if (id == "wc2") { clearTimeout(start2b); }
    };
    my.getImageUrl = function(url)
    {
        return url +imageWidth;
    };
    my.updateImage = function(name,img,url,time)
    {
        var target = document.images[name];
        target.src=img.src;
        target.onload = function(){ this.style.visibility = "visible"; };
        if (stopTrigger)
        {
            clearInterval(checkTimer);
            clearTimeout(timer1);
            clearTimeout(timer2);
            return;
        }
        clearTimeout(time);
        time = setTimeout(function(){
                    var timg = new Image();
                    timg.src=my.getImageUrl(url)+"&rand="+my.generateRandNumber();
                    var func = function(){my.updateImage(name,timg,url,time);};
                    timg.onload=func;
                    timg.onerror=func;
        },imageUpdateCycle);
    };


    var lastCheckViewTime = null;

    my.checkViewTimer = function() 
    {
        var dt = new Date();
        var diff = dt.getTime() - startTime;
        if (diff >= maxViewTime)
        {
            var lastdiff = dt.getTime() - lastCheckViewTime;
            if (lastCheckViewTime && lastdiff <= maxDiffTime)
            {
                stopTrigger = true;

                var container = document.getElementById("container");
                document.body.removeChild(container);

                var el1 = document.createElement("div");
                el1.setAttribute("id","timeoutMsg");
                var txt = document.createTextNode("Webcam Acces Time Out!");
                el1.appendChild(txt);

                var el2 = document.createElement("input");
                el2.setAttribute("type", "button");
                el2.setAttribute("onclick","window.location.reload()");
                el2.setAttribute("value", "RELOAD");
                var foo = document.body;

                foo.appendChild(el1);
                foo.appendChild(el2);
            }
            else
            {
                startTime = dt.getTime();
            }
        }
        else
        {
            lastCheckViewTime = dt.getTime();
        }
    };
    my.generateRandNumber = function() {
        var rand = Math.round(1000000+(Math.random() * 1000000));
        return uniqueID + "_"+(seed++) +"_"+ rand;
    }
    my._getCamScreenShotUrl = function(cid)
    {
        var val = null;
        switch (cid)
        {
            case 1:
                val = WEBCAM_SCREENSHOT_URL_1;
                break;
            case 2:
                val = WEBCAM_SCREENSHOT_URL_2;
                break;
        }
        return val;
    };
    my._getCamControlUrl = function(cid)
    {
        var val = null;
        switch (cid)
        {
            case 1:
                val = WEBCAM_CONTROL_URL_1;
                break;
            case 2:
                val = WEBCAM_CONTROL_URL_2;
                break;
        }
        return val;
    };
    my.moveLeft = function(cid)
    {
        var cam = my._getCamControlUrl(cid);
        var cmdurl = cam + "left&rand="+my.generateRandNumber();
        var call= new my.ajaxCall(cmdurl);
        call.send();
    };
    my.moveRight = function(cid)
    {
        var cam = my._getCamControlUrl(cid);
        var cmdurl = cam + "right&rand="+my.generateRandNumber();
        var call= new my.ajaxCall(cmdurl);
        call.send();
    };
    my.moveUp = function(cid)
    {
        var cam = my._getCamControlUrl(cid);
        var cmdurl = cam + "up&rand="+my.generateRandNumber();
        var call= new my.ajaxCall(cmdurl);
        call.send();
    };
    my.moveDown = function(cid)
    {

        var cam = my._getCamControlUrl(cid);
        var cmdurl = cam + "down&rand="+my.generateRandNumber();
        var call= new my.ajaxCall(cmdurl);
        call.send();
    };
    my.moveScan = function(cid)
    {
        var cam = my._getCamControlUrl(cid);
        var cmdurl = cam + "scan&rand="+my.generateRandNumber();
        var call= new my.ajaxCall(cmdurl);
        call.send();
    };
    my.screenShot = function(cid)
    {
        var cam = my._getCamScreenShotUrl(cid);
        var cmdurl = cam + "&rand="+my.generateRandNumber();
        var el = document.getElementById("wc"+cid + "_message");
        el.innerHTML = "Saving...";
        var call= new my.ajaxCall(cmdurl,function(txt){
            if (txt=="OK")
            {
                el.innerHTML = "SAVED";   
            }
            else
            {
                el.innerHTML = "FAILED";
            }
            setTimeout(function(){el.innerHTML="";},1500);
        },function(){
            el.innerHTML = "FAILED";
            setTimeout(function(){el.innerHTML="";},1500);
        });
        call.send();
    };
    my.ajaxCall = function(url,onSuccessFunc,onErrorFunc)
    {
        if (!onSuccessFunc || typeof onSuccessFunc == "function")
        {
            onSuccessfunc = new Function();
        }
        if (!onErrorFunc || typeof onErrorFunc == "function")
        {
            onErrorFunc = new Function();
        }
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) 
        {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) 
        {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        self.xmlHttpReq.open('GET', url, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.onreadystatechange = function() 
        {
            if (self.xmlHttpReq.readyState == 4) 
            {
                if (self.xmlHttpReq.status == 200) 
                {
                    onSuccessFunc(self.xmlHttpReq.responseText,self.xmlHttpReq.responseXML);
                }
                else
                {
                    onErrorFunc();
                }
            }
        }
        return self.xmlHttpReq;

        //self.xmlHttpReq.send();
    };

    return my;
}();
