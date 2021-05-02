import firebase from 'firebase';

class FirebaseSvc {
    constructor(){
        if (!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyC-IIAqfyAYsrt-bXl8W0iKfbCT5yVQfkQ",
                authDomain: "socialappdemo-9f9ad.firebaseapp.com",
                databaseURL: "https://socialappdemo-9f9ad-default-rtdb.firebaseio.com",
                projectId: "socialappdemo-9f9ad",
                storageBucket: "socialappdemo-9f9ad.appspot.com",
                messagingSenderId: "53658911130",
                appId: "1:53658911130:web:fd6598da508b701dacfa23"
              });
        }
    }

    get ref() {
        return firebase.database().ref('Messages');
      }

      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);
    
        const message = {
          id,
          _id,
          timestamp,
          text,
          user,
        };
        return message;
      };
    
      refOn = callback => {
        this.ref
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
      }

      get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
      }

      refOff() {
        this.ref.off();
      }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          const message = {
            text,
            user,
            createdAt: this.timestamp,
          };
          this.ref.push(message);
        }
      };


}


const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;  