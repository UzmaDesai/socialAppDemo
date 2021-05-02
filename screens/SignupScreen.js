import  React ,{useState,useContext} from 'react'
import {View,Text,Image,StyleSheet, TouchableOpacity} from 'react-native'

import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'
import {windowHeight,windowWidth} from '../utils/Dimensions'

const SignupScreen = ({navigation}) => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()

    const {register} = useContext(AuthContext)

    return(
        <View style = {styles.container}>
            
            <Text style = {styles.text}>Create an account</Text>
            
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

            <FormInput 
                labelValue={confirmPassword}
                onChangeText= {(userPassword) => setConfirmPassword(userPassword)}
                placeHolderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />

            {/* SignIn Button  */}
            {/* <FormButton 
                buttonTitle = "Sign Up"
                onPress = {() => register(email,password)}
            /> */}

            <TouchableOpacity style = {styles.buttonContainer} onPress = {() => register(email,password)}>
                <Text style = {styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            {/* forgot password button  */}
            <View style = {styles.textPrivate}>
                <Text style = {styles.color_textPrivate}>By registering,you confirm that you accept our</Text>
                <TouchableOpacity 
                onPress = {() => alert('Terms Clicked')}
                >
                    <Text style = {[styles.color_textPrivate,{color:"#e88832"}]}> Terms of service </Text>
                </TouchableOpacity>
                <Text style = {styles.color_textPrivate}>and</Text>
                <Text style = {[styles.color_textPrivate,{color:"#e88832"}]}> Privacy policy </Text>

            </View>

            {Platform.OS == 'android' ? (
                /* facebook login button  */
                <View> 

            <SocialButton 
                buttonTitle = "Sign up with Facebook"
                btnType = "facebook"
                color = "#4867aa"
                backgroundColor = "#e6eaf4"
                onPress = {() => {}}
            /> 

            {/* google login button  */}
            <SocialButton 
                buttonTitle = "Sign up with Google"
                btnType = "google"
                color = "#de4d41"
                backgroundColor = "#f5e7ea"
                onPress = {() => {}}
            />
            </View>

        ) : null        }

            {/* Dont have account button  */}
            <TouchableOpacity style ={styles.navButton}
                onPress = {() => navigation.navigate('Login')}
            >
                <Text style = {styles.navButtontext}>Have an account? Sign in</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20
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
    
    navButtontext: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
      },
      buttonContainer: {
        marginTop : 10,
        width : '100%',
        height : windowHeight / 15,
        backgroundColor: '#2e64e5',
       // color:'#fff',
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