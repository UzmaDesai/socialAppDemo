import  React from 'react'
import {View,Text,Button,StyleSheet,Image,TouchableOpacity} from 'react-native'

//PAGE CONTROL KIND OF VIEW ON LOADING THE APP
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let bgColor;
   bgColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)'
  return (
    <View 
      style = {{
        width:5,
        height:5,
        marginHorizontal:3,
        bgColor
      }}
    
    />
  )
}

const Skip = ({...props}) => (
    <Button
      title={'Skip'}
      color = '#000000'
      buttonStyle={{
        backgroundColor: '#a6e4d0',
      }}
      {...props}
    >
    </Button>
  );

  //if props is not written next button is disabled
  const Next = ({...props}) => (
    <Button
      title={'Next'}
      color = '#000000'
      buttonStyle={{
        backgroundColor: '#fdeb93',
      }}
      {...props}
    >
    </Button>
  );

  //IF YOU WANT TO PROVIDE SOME STYLING TO THE BUUTON THEN USE TOUCHABLEOPACITY
  const Done = ({...props}) => (
    <TouchableOpacity
    style = {{marginHorizontal:10}}
    {...props}>
        <Text>Done</Text>
    </TouchableOpacity>
  );

const OnBoardingScreen = ({navigation}) => {
    return(
        <Onboarding
        //USE THESE METHODS TO STYLE THE BOTTOM BUTTONS
       // SkipButtonComponent={Skip}
       // NextButtonComponent={Next}
        DoneButtonComponent={Done}
        //DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
            pages={[
            {
                backgroundColor: '#a6e4d0',
                image: <Image source={require('../assets/onboarding-img1.png')} />,
                title: 'Connect to the world',
                subtitle: 'A New Way To Connect With The World',
            },
            
            {
                backgroundColor: '#fdeb93',
                image: <Image source={require('../assets/onboarding-img2.png')} />,
                title: 'Share Your Favourites',
                subtitle: 'Share Your Thoughts With Similar Kinds Of People',
            },

            {
                backgroundColor: '#e9bcbe',
                image: <Image source={require('../assets/onboarding-img3.png')} />,
                title: 'Become The Star',
                subtitle: 'Let The Spotlight Capture You',
            },
        ]}
/>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})