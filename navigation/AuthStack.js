import React,{useContext,useState,useEffect }  from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
 
import OnBoardingScreen from '../screens/OnBoardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

//import { useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator()
 
const AuthStack = () => {

   //TO CHECK IF IT IS THE FIRST LAUNH OF THE APP IF SO THEN OMIT OnBoardingScreen SCREEN
    const [isFirstLaunch,setIsFirstLaunch] = useState(null)
    let routeName;

    //RUNS ONLY ONCE WEN THE APP IS MOUNTED
    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value == null){
                AsyncStorage.setItem('alreadyLaunched','true')
                setIsFirstLaunch(true)
            }else{
                setIsFirstLaunch(false)
            }
        })
        GoogleSignin.configure({
            webClientId: '53658911130-vktsvnqpp902eskjglvcah5fmns0mmqg.apps.googleusercontent.com',
          });
    },[]);

    //Display onboarding screen only for first launch.
    if (isFirstLaunch == null){
        return null
    }else if (isFirstLaunch == true ){
        routeName = 'OnBoarding'
    }else {
        routeName = 'Login'
    }

    return(
        <Stack.Navigator initialRouteName = {routeName}>
          
            <Stack.Screen 
                name = "OnBoarding" 
                component = {OnBoardingScreen} 
                options = {{header:() => null}}
            />
            <Stack.Screen 
                name = "Login"fafd
                component = {LoginScreen} 
                options = {{header:() => null}}
            />

            <Stack.Screen 
                name = "Signup"
                component = {SignupScreen}
                options = {({navigation}) =>({
                    title : '',
                    headerStyle: {
                        backgroundColor : '#f9fafd',
                        shadowColor : '#f9fafd',
                        elevation:0
                    },
                    headerLeft: () => (
                        <View style = {{marginLeft:10}}>
                            <FontAwesome.Button 
                                name = "long-arrow-left"
                                size= {25}
                                backgroundColor="#f9fafd"
                                color = "#333"
                                onPress = {()=>navigation.navigate('Login')}
                            />
                        </View>
                    )
                })}
            />
        </Stack.Navigator>
      )
 }
 
 export default AuthStack
 
 
 
 
 
   
 
 