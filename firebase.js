const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    const user = result.user;
    
    document.getElementById("playerInfo").innerText = user.displayName;

    let playerId = localStorage.getItem("playerId");
    if (!playerId) {
      playerId = "PLAYER_" + Math.floor(Math.random() * 100000);
      localStorage.setItem("playerId", playerId);
    }

    document.getElementById("playerId").innerText = playerId;

    document.getElementById("status").innerText = "Online";
  });
}