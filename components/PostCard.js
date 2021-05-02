import React ,{useContext,useState,useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import ProgressiveImage from './ProgressiveImage'
import { AuthContext } from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore';

import {Container,
    Card, 
    UserInfo,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider
} from '../styles/FeedStyles'
import {TouchableOpacity} from 'react-native'

const PostCard = ({item, onDelete, onPress}) => {
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState(null);

    //if liked is 'true' then display filled heart iocon/
    const likeIcon = item.liked  ? 'heart' : 'heart-outline'
    const likeiconColor = item.liked ? "#2e64e5" : "#333"

    //setting the num of likes and comments
    var likeText = ''
    if(item.likes == 1){
        likeText = '1 Like'
    }else if(item.likes > 1) {
        likeText = item.likes + ' Likes'
    }else {
        likeText = 'Like'
    }

    var commentText = ''
    if(item.comments == 1){
        commentText = '1 Comment'
    }else if(item.comments > 1) {
        commentText = item.comments + ' Comments'
    }else {
        commentText = 'Comment'
    }

    const getUser = async() => {
        await firestore()
       .collection('users')
       .doc(item.userId)
       .get()
       .then((documentSnapshot) => {
         if( documentSnapshot.exists ) {
           console.log('User Data', documentSnapshot.data());
           setUserData(documentSnapshot.data());
         }
       })
     }

     useEffect(() => {
        getUser()
      },[])
  
    return(
        <Card>
               {/* //view for user image and name */}
               <UserInfo>
                   <UserImg 
                    source={{
                        uri: userData
                          ? userData.userImg ||
                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                          : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                      }}
                   />
                   
                   {/*  //view for user name posted time */}
                   <UserInfoText>
                       <TouchableOpacity onPress={onPress}>
                            <UserName>{userData ? userData.fname || 'Test':'No Details'} {userData ? userData.lname || " ":' '}</UserName>
                       </TouchableOpacity>
                        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                   </UserInfoText>
               </UserInfo>

                {/* //Styles for post content and image */}
               <PostText>{item.post}</PostText>

                {/*  if post image is null then display nly the divider */}
               {/* {item.postImg != null ? <PostImg source = {{uri:item.postImg}}/> :  <Divider />} */}
               {item.postImg != null ? (
                  <ProgressiveImage
                  defaultImageSource={require('../assets/default-img.jpg')}
                  source={{uri: item.postImg}}
                  style={{width: '100%', height: 250}}
                  resizeMode="cover"
                  />
                ) : (
                   <Divider />
              )}

                {/* //View for the like and comment button */}
               <InteractionWrapper>
                    <Interaction active = {item.liked}>
                        <Ionicons name = {likeIcon} size={25}  color={likeiconColor}/>
                        <InteractionText active = {item.liked}>{likeText}</InteractionText>
                    </Interaction>

                    <Interaction>
                        <Ionicons name = "md-chatbubble-outline" size={25} />
                        <InteractionText>{commentText}</InteractionText>
                    </Interaction>

                    {/* Delete post button only for post created by the logged in user*/}
                    {user.uid == item.userId ? 
                    <Interaction onPress = {() => onDelete(item.id)}>
                        <Ionicons name = "md-trash-bin" size={25} />
                    </Interaction>
                    :
                    null
                    }
               </InteractionWrapper>
           </Card>
    )
}

export default PostCard