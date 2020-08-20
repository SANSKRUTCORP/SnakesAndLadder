const express     =  require('express');
const logger      =  require('morgan');
const path        =  require('path');
const admin       =  require("firebase-admin");
const bodyParser  =  require("body-parser");
const middlew     =  require("express-firebase-middleware");
const randomroom  =  require("./models");

var serviceAccount = require("enter path to service acc .json key");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "your db URL"
});

var firedb = firebaseAdmin.database();


const app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.json());

app.use('/createroom', middlew.auth);
app.use('/loginroom', middlew.auth);


app.get('/lgntmp', function(req, res){
    res.render('logintemp.ejs');
})


app.get('/createroom', function(req, res){
    
    var roomToken = randomroom();  
    var roomRef = firedb.ref('/rooms');
    var idToken = req.header("Authorization");
    var currentUser;
    firebaseAdmin.auth().verifyIdToken(idToken)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    admin.auth().getUser(uid)
                                .then(function(userRecord) {
                                    currentUser = userRecord.displayName;
                                })
                                .catch(function(error) {
                                    console.log('Error fetching user data:', error);
                                });

                }).catch(function(error) {
                    console.log(error);
                });
    
    roomRef.child('room_'+roomToken).set({roomid:roomToken, tempCounter:2})
            .then(function(){
                console.log(roomToken)
                res.redirect('/createroom/'+roomToken);
            })
            .catch(function(err){
                console.log(err);
            });
    
    var roomRef1 = firedb.ref('/rooms/room_'+roomToken+'/players');        
    roomRef1.child('player_1').set({name : currentUser})
    .then(function(){
            
    })
    .catch(function(err){
        console.log(err);
    });

    // res.json({roomid : roomToken, room_creator : currentUser});

});

app.get('/createroom/:id', function(req, res){
    var token = req.params.id ;
    var roomRef1 = firedb.ref('/rooms/room_'+token+'/players');
    var idToken = req.header("Authorization");
    var currentUser;
    firebaseAdmin.auth().verifyIdToken(idToken)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    admin.auth().getUser(uid)
                                .then(function(userRecord) {
                                    currentUser = userRecord.displayName;
                                })
                                .catch(function(error) {
                                    console.log('Error fetching user data:', error);
                                });

                }).catch(function(error) {
                    console.log(error);
                });

    roomRef1.once("value")
            .then(function(snapshot){
                
                var user2 = snapshot.child('player_2/name');
                var user3 = snapshot.child('player_3/name');
                var user4 = snapshot.child('player_4/name');
                console.log(user2.val(), user3.val(), user4.val())

                res.json({roomid : token,
                          creator : currentUser,
                          player2 : user2.val(),
                          player3 : user3.val(),
                          player4 : user4.val()})
            });

})





app.get('/joinroom', function(req, res){
    res.render('joinroomtemp.ejs');
});



app.post('/joinroom', function(req, res){

    var roomToken = req.body.enterid;
    var username = req.body.entername;
    
    var ref = firedb.ref('/rooms/room_'+roomToken);

    ref.once('value', function(snapshot){

        var count = snapshot.child('tempCounter');
        var countVal = count.val();

        var roomRef = firedb.ref('/rooms/room_'+roomToken+'/players');
        roomRef.once('value', function(data){
                    
            var lenref = Object.keys(data.val()).length;

            if(lenref<4){
                roomRef.child('player_'+countVal).set({name : username})
                    .then(function(){
                            countVal = countVal+1;
                            ref.update({tempCounter : countVal});
                            res.redirect('/createroom/'+roomToken);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            } else{
                res.send('Max players');
            };
            
        });
    })

 
});

app.post('/board', function(req, res){
    // console.log(req);
    res.send(req.body);
})

module.exports = app;
