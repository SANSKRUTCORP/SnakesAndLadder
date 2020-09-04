module.exports  = {
    randRoom : function(){
                    var minimum = 1000000;
                    var maximum = 9999999;
                    var x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
                    return x;
                },


    diceRoll : function(){                                                  
                    //this function is to generate random numberin the dice
                    const randomNum = Math.floor(Math.random() * 6) + 1;
                    this.diceNumber = randomNum;
                    console.log("%c dice value is"+" "+this.diceNumber, 'font-weight : bold');
                    return randomNum;
                    
                } ,

    newRoomCreate : function(userRecord, roomRef, firedb){
                        var currentUser = userRecord.displayName;
                        //Creating a branch in firebase for new rooms
                        roomRef.child('room_'+roomToken)
                                .set({roomid:roomToken, tempCounter:2})
                                .then(function(){
                                    console.log("roomToken add to db");
                                    res.send({room_token : roomToken});
                                })
                                .catch(function(err){
                                    console.log(err);
                                });
                        
                        var roomRef1 = firedb.ref('/rooms/room_'+roomToken+'/players');        
                        roomRef1.child('player_1').set({name : currentUser, position : -1})
                        .then(function(){
                            console.log('Player 1 name set')
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                    }
}