module.exports  = function(){
                    var minimum = 1000000;
                    var maximum = 9999999;
                    var x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
                    return x;
                };

