const express     =  require('express');
const logger      =  require('morgan');
const path        =  require('path');
const admin       =  require("firebase-admin");
const bodyParser  =  require("body-parser");

var serviceAccount = require("./sanskrut-interns-firebase-adminsdk-jm6gx-28d2298760.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sanskrut-interns.firebaseio.com"
});

var firedb = firebaseAdmin.database();
var count = 1;


const app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



function randomgen(){
    var minimum = 1000000;
    var maximum = 9999999;
    var x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return x;
};


app.get('/createroom', function(req, res){
    
    var roomtoken = randomgen();  
    var roomref = firedb.ref('/rooms');
    roomref.child('room_'+roomtoken).set({'roomid':roomtoken})
            .then(function(){
                res.redirect('/createroom');
            })
            .catch(function(err){
                console.log(err);
            });
    
    var roomref1 = firedb.ref('/rooms/room_'+roomtoken+'/players');        
    roomref1.child('player_'+count).set({name : 'Harsh'})
    .then(function(){
            count++;
            res.redirect('/joinroom');
    })
    .catch(function(err){
        console.log(err);
    });

    res.json({roomid : roomtoken});

});




app.get('/joinroom', function(req, res){
    res.render('joinroomtemp.ejs');
});



app.post('/joinroom', function(req, res){

    var roomtoken = req.body.enterid;
    var roomref = firedb.ref('/rooms/room_'+roomtoken+'/players');


    roomref.once('value', function(data){
                  
        var lenref = Object.keys(data.val()).length;
        console.log(lenref);

        if(lenref<4){
            console.log(lenref);
            roomref.child('player_'+count).set({name : 'Harsh'})
                .then(function(){
                        count++;
                        res.redirect('/joinroom');
                })
                .catch(function(err){
                    console.log(err);
                });
        } else{
            res.send('Max players');
        };
    });
   
});


app.listen(3000, function(){
    console.log('This server is running over port 3000.');
})