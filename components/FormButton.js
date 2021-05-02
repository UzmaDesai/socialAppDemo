import  React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {windowHeight,windowWidth} from '../utils/Dimensions'

const FormButton = ({buttonTitle,
                 color,
                backgroundColor
                , ...rest}) => 
{
    let bgColor = backgroundColor;
    return (
        <TouchableOpacity styles = {[styles.buttonContainer, {backgroundColor: bgColor}]} {...rest} >
            <Text style = {styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop : 10,
        width : '100%',
        height : windowHeight / 15,
       // backgroundColor: '#2e64e5',
       // color:'#fff',
        padding : 10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius : 3
    },
    buttonText : {
        fontSize : 18,
        fontWeight : 'bold',
        //color: '#2e64e5',
        fontFamily : 'Lato-Regular',
    },
})