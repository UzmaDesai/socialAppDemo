import  React ,{useContext,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet, FlatList} from 'react-native'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider'
import { Container,
            Card,
            UserInfo,
            UserImgWrapper,
            UserImg,
            UserInfoText,
            UserName,
            PostTime,
            MessageText,
            TextSection
            
        } from '../styles/MessageStyles'

const Messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];
  
const MessageScreen = ({navigation}) => {
    const {user,logout} = useContext(AuthContext)
    console.log("{user.id} = "+user.uid)
    const [userData, setUserData] = useState(null);

    //List all the users signed with the social app
    const getAllUsers = async () => {
        const list = []
        const users = await firestore()
        .collection('users')
        .get()
         .then(querysnapshot => {
             if (querysnapshot) {
                 querysnapshot.forEach((documentSnapshot) => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());

                    const {fname,lname,userImg} = documentSnapshot.data()
                    list.push({
                        id: documentSnapshot.id,
                        fname,
                        lname,
                        userImg
                    })
                  })
                  setUserData(list)
                 console.log("USER VALUES : " + userData)
             }
        })
       
    }

    useEffect(() => {
        getAllUsers()
      },[])

    return (
        <Container>
            <FlatList 
                data = {userData}
                keyExtractor = {item => item.id}
                renderItem={({item}) => (
                <Card onPress = {() => navigation.navigate('Chat',
                {userName:item.fname,
                    userId:item.id
                })}>
                    <UserInfo>
                        <UserImgWrapper>
                            <UserImg source={{
                  uri:item.userImg
                  ? 
                  item.userImg 
                  : 
                  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                }}/>
                        </UserImgWrapper>
                        <TextSection>
                            <UserInfoText>
                                <UserName>{item.fname ? item.fname:'No details'} {item.lname ? item.lname : ""}</UserName>
                                <PostTime>hhh</PostTime>
                            </UserInfoText>
                            <MessageText>Hello</MessageText>
                        </TextSection>
                    </UserInfo>
                </Card>            
                )}
            />
        </Container>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text : {
        fontSize:25,
       color:'#333333'
    }
})