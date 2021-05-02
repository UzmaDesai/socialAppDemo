// import  React ,{useContext,useState,useEffect } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import auth from '@react-native-firebase/auth';

// import AuthStack from './AuthStack'
// import AppStack from './AppStack'
// import {AuthContext} from './AuthProvider'


// const Routes = () => {
//     const {user,setUser} = useContext(AuthContext)
//     const [initializing,setInitializing] = useState(true)

//     const onAuthStateChanged = (user) => {
//         setUser(user)
//         if (initializing) setInitializing(false)
//     }

//     useEffect(()=> {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//     },[])

//     //Until the app establishes connection with the firebase it returns null(deciding which page to display)
//     //YOU CAN ALSO RETURN A LOADER........................
//     if(initializing) return null

//     return (
//         <NavigationContainer>
//             {/* IF THE USER IS DEFINED THEN DISPLAY THE APPSTACK ELSE THE AUTHSTACK */}
//            {user ? <AppStack /> : <AuthStack /> }
//         </NavigationContainer>
//     )
// }

// export default Routes

import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //If user is logged display the AppStack
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
