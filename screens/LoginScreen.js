import  React ,{useState,useContext} from 'react'
import {View,Text,Image,StyleSheet, TouchableOpacity, Platform} from 'react-native'

import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'
import {windowHeight,windowWidth} from '../utils/Dimensions'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    const {login,googleLogin} = useContext(AuthContext)

    const userLogin = (email,password) => {
        if (!email){
            alert("Enter your email")
        }else if(!password){
            alert("Enter your password")
        }else{
            login(email,password)
        }
    }

    return(
        <View style = {styles.container}>
            {/* App logo  */}
            <Image
                source={require('../assets/rn-social-logo.png')}
                style = {styles.logo}
            />
            <Text style = {styles.text}>RN Social App</Text>
            
            {/* Email input  */}

            <FormInput 
                labelValue={email}
                onChangeText= {(userEmail) => setEmail(userEmail)}
                placeHolderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect= {false}
            />

            {/* Password input  */}
            <FormInput 
                labelValue={password}
                onChangeText= {(userPassword) => setPassword(userPassword)}
                placeHolderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            {/* SignIn Button  */}
            {/* <FormButton 
                buttonTitle = "Sign In"
                color = "#fff"
                backgroundColor = "#f5e7ea"
                onPress = {() => userLogin(email,password)}
            /> */}

            <TouchableOpacity style = {styles.buttonContainer} onPress = {() => userLogin(email,password)}>
                <Text style = {styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            {/* forgot password button  */}
            <TouchableOpacity style ={styles.forgotButton}
                onPress = {() => {}}
            >
                <Text style = {styles.navButtontext}>Forgot Password?</Text>
            </TouchableOpacity>

            {Platform.OS == 'android' ? (
                /* facebook login button  */
                <View> 
                    <SocialButton 
                        buttonTitle = "Sign in with Facebook"
                        btnType = "facebook"
                        color = "#4867aa"
                        backgroundColor = "#e6eaf4"
                        onPress = {() => {}}
                    />    

                {/* google login button  */}
                    <SocialButton 
                        buttonTitle = "Sign in with Google"
                        btnType = "google"
                        color = "#de4d41"
                        backgroundColor = "#f5e7ea"
                        onPress = {() => googleLogin()}
                    /> 
                </View>

            ) : null } 

            {/* Dont have account button  */}
            <TouchableOpacity style ={styles.forgotButton}
                onPress = {() => navigation.navigate('Signup')}
            >
                <Text style = {styles.navButtontext}>Don't have an account? Create here</Text>
            </TouchableOpacity>

        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover'
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f'
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35
    },
    navButtontext: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },

    buttonContainer: {
        marginTop : 10,
        width : '100%',
        height : windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding : 10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius : 3
    },
    buttonText : {
        fontSize : 18,
        fontWeight : 'bold',
        fontFamily : 'Lato-Regular',
        color: '#ffffff',

    },
})