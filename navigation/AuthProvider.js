import  React ,{createContext, useState} from 'react'
import auth from '@react-native-firebase/auth'

export const AuthContext = createContext()
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    return (
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                login: async(email,password) => {
                    try{
                        await auth().signInWithEmailAndPassword(email,password)
                    }catch(e){
                        alert(e)
                    }
                },

                googleLogin : async () => {
                    try{
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                    }catch(e){
                        console.log("google sign in error : "+e)
                    }
                },

                register: async(email,password) => {
                    console.log('registering')
                    try{
                        await auth().createUserWithEmailAndPassword(email,password)
                        .then(() => {
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname: '',
                                lname: '',
                                email: email,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                userImg: null
                            })
                            .catch(e =>{
                                console.log('Something went wrong while adding data to firestore :'+e)
                            })
                        })
                        .catch(e => {
                            console.log('Something went wrong with sign up:'+e)

                        })
                    }catch(e){
                        alert(e)
                    }
                },
                logout : async () => {
                    try{
                        await auth().signOut()
                    }catch(e){
                        alert(e)
                    }
                }

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}