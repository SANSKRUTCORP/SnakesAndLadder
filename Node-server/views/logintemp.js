function checkloggedin() {
    firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("User signed in");
                console.log(user);

                var name = user.displayName;
                var usermail = user.email;
                                    
                document.getElementById('google-displayName').innerHTML = usermail;
                document.getElementById('google-email').innerHTML = name;
                document.getElementById('gone').setAttribute('style', 'display: none; visibility: hidden');
                document.getElementById('signout').setAttribute('style', 'display: inline-block; visibility: visible');

                // console.log('my token.. plz dikh jao :'+firebase.auth().currentUser.token);
                var idToken = null;
                
                firebase.auth().currentUser
                    .getIdToken()
                    .then(function (token) {
                        idToken = token;                        
                        console.log('My token fetched : '+idToken);
                        console.log('got token!');                      
                    });
                

            } else {
                console.log("User not signed in");
                document.getElementById('gone').setAttribute('style', 'display: inline-block; visibility: visible');
                document.getElementById('signout').setAttribute('style', 'display: none; visibility: hidden');
                console.log(user);
            }
        })
    };

window.onload = function () {
checkloggedin();
}

function googlesignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function signout() {
    firebase.auth().signOut();
    window.location.reload();
    checkloggedin();
};