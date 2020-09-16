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
                    
                }

}