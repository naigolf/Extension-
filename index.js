

// ดีพาย  heroku    https://dashboard.heroku.com/apps/golf-security/deploy/heroku-git
const fs = require('fs');
const request = require('request');
const express = require('express');
const app = express();

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const URL_IPCam1 = "http://viral-no.ddns.net:3241/snapshot.cgi?user=admin&pwd=0841931809&res=0"
const TOKENKEY_LINE_NOTIFY = "TufRdQbmM58LNBHRL1ABl4pJc3nlPYehmgJx3gbU2Hh"
const MSG_LINE_NOTIFY = "Home alarm -"

var count = 0;

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
    })
app.get('/', function (req, res) {
        res.end('Snapshot IP Camera Smart Home')
    })


    
app.get('/0841931809', function (req, res) {
    res.end('Capture Image IPCam1')
ffmpeg(URL_IPCam1)
  .format('image2')
  .outputOptions(['-r 1/5','-s 640x480','-updatefirst 1'])
  .saveToFile('./image/snapshot.jpg')  
        
        var inStr = fs.createReadStream('./image/snapshot.jpg');
        var outStr = fs.createWriteStream('./image/capture.jpg');
        inStr.pipe(outStr);
  console.log('snapshot.....OK');
  
  if(count == 0){
        count = 3
        checkTimer()
    }else{
        count = 3
    }

  
})  


//////////////////////////////////////////////    
    function checkTimer(){
    var check = setInterval(function (){
    console.log(count);
    count--

        if (count === 0) {
            LineNotify(MSG_LINE_NOTIFY, "./image/snapshot.jpg")
            console.log("send Line");
    if(count == 0){
        count = 4
    checkTimer2()
    }else{
        count = 4
    }
            
            clearInterval(check);
        }
        
    }, 1000);
}


//////////////////////////////////////////////    
    function checkTimer2(){
    var check = setInterval(function (){
    console.log(count);
    count--

        if (count === 0) {
            change()
            clearInterval(check);
        }
        
    }, 1000);
}




function change(){
var download = function(uri, filename, callback){

request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};
download('https://www.google.com/images/srpr/logo3w.png', './image/snapshot.jpg', function(){
console.log('change done');
});

}









function LineNotify(text, imgPath){
    var LINE_API = 'https://notify-api.line.me/api/notify'
    var Authorization = 'Bearer ' + TOKENKEY_LINE_NOTIFY
 
    var headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': Authorization
    }
    
    var option = {
        url:     LINE_API,
        headers: headers
    }
    var req = request.post(option)
	var form = req.form();
	form.append('message', text);
	form.append('imageFile', fs.createReadStream(imgPath));
 }

/*

////////////////////// ใช้ แยก แต่ ละ ตัว ///////////////////////////////

/// สั่งแคปภาพ //////
app.get('/8888', function (req, res) {
        
ffmpeg(URL_IPCam1)
  .format('image2')
  .outputOptions(['-r 1/5','-s 640x480','-updatefirst 1'])
  .saveToFile('./image/snapshot.jpg')  
        
        var inStr = fs.createReadStream('./image/snapshot.jpg');
        var outStr = fs.createWriteStream('./image/capture.jpg');
        inStr.pipe(outStr);
        console.log('Capture Image IPCam');
        res.end('Capture Image IPCam1')
    })
//// สั่งดูภาพ //////
app.get('/image.jpg', function (req, res) {
        var img = fs.readFileSync('./image/snapshot.jpg');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
        console.log('image.jpg');
        res.end('image.jpg')

    })
    

/// สั่งบันทึกภาพทับ แก้ซ้ำ //////
app.get('/change', function (req, res) {
var download = function(uri, filename, callback){

request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};
download('https://www.google.com/images/srpr/logo3w.png', './image/snapshot.jpg', function(){
console.log('change done');
res.end('change done')
});

    })
*/


/*  เก็บไว้ เคยใช้ทำ และทดลอง


    app.get('/golf', function (req, res) {
        
ffmpeg(URL_IPCam1)
  .format('image2')
  .outputOptions(['-r 1/5','-s 640x480','-updatefirst 1'])
  .saveToFile('./image/snapshot.jpg')  
        
        var inStr = fs.createReadStream('./image/snapshot.jpg');
        var outStr = fs.createWriteStream('./image/capture.jpg');
        inStr.pipe(outStr);
        res.end('Capture Image IPCam1')
    })




    
    
    */
