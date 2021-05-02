import  React ,{useContext,useEffect,useState,useCallback} from 'react'
import {View,Text,StyleSheet,} from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import firebaseSvc from '../FirebaseConfig'
 
import { AuthContext } from '../navigation/AuthProvider'

const ChatScreen = (route) => {
    const {user,logout} = useContext(AuthContext)
    console.log("{user.id} = "+user.uid)

    const [messages, setMessages] = useState([]);
 
    useEffect(() => {
        //const {id} = route.params.userId
        setMessages([
        {
            _id: user.uid,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])
  }, [])
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
      return(
        <Bubble
            {...props}
            wrapperStyle = {{
            right:{
                backgroundColor: '#2e64e5'
            }
        }}
        textStyle ={{
            right:{
                color: '#fff'
            }
        }}
        />
      ) 
  }

  const renderSend = (props) => {
      return(
        <Send {...props}>
            <View>
                <MaterialCommunityIcons 
                    name = 'send-circle' 
                    style={{marginBottom:5,marginRight:5}} 
                    size = {32} 
                    color = '#2e64e5'
                />
            </View>
        </Send>
      )
  }

  const scrollToBottomComponent = () => {
      return (
        <FontAwesome name = 'angle-double-down' size = {22} color = '#333' />
      )
  }

    return (
        
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
        renderBubble = {renderBubble}
        //always display the send button
        alwaysShowSend
        renderSend = {renderSend}
        scrollToBottom
        scrollToBottomComponent ={scrollToBottomComponent}
      />
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#f9fafd',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },
    text : {
        fontSize:25,
       color:'#333333'
    }
})