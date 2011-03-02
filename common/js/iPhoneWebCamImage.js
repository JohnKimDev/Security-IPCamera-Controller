var webcam = function()
{
    var WEBCAM_URL_1 = "webcam.php?cam=1&width=";
    var WEBCAM_URL_2 = "webcam.php?cam=2&width=";

    var timer1 = null;
    var timer2 = null;
    var checkTimer = null;

    var stopTrigger = false;

    var my={};
    my.init = function(img1,img2)
    {
        
        var timg1 = new Image();
        timg1.src=my.getImageUrl(WEBCAM_URL_1) + "&rand="+my.generateRandNumber();
        timg1.onload=function(){
                var _this = document.images[img1];
                _this.style.visibility = "hidden";
                _this.className = "webcam";
                my.updateImage(img1,timg1,WEBCAM_URL_1,timer1);
        };
        
        var timg2 = new Image();
        timg2.src=my.getImageUrl(WEBCAM_URL_2) + "&rand="+my.generateRandNumber();
        timg2.onload=function(){
                var _this = document.images[img2];
                _this.style.visibility = "hidden";
                _this.className = "webcam";
                my.updateImage(img2,timg2,WEBCAM_URL_2,timer2);
        };

        checkTimer = setInterval(my.checkViewTimer,2000);
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
    my.checkViewTimer = function() 
    {
        var dt = new Date();
        var diff = dt.getTime() - startTime;
        if (diff >= maxViewTime)
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
    };
    my.generateRandNumber = function() {
        var rand = Math.round(1000000+(Math.random() * 1000000));
        return uniqueID + "_"+(seed++) +"_"+ rand;
    }
    return my;
}();
