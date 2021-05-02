import  React ,{useContext,useEffect, useState} from 'react'
import {View,Text,Image,ScrollView, Alert,FlatList, SafeAreaView} from 'react-native'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { AuthContext } from '../navigation/AuthProvider'
import {Container} from '../styles/FeedStyles'

import PostCard from '../components/PostCard'

const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      //require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
          liked: true,
          likes: '14',
          comments: '5',
        },
        {
          id: '2',
          userName: 'John Doe',
          userImg: require('../assets/users/user-1.jpg'),
          postTime: '2 hours ago',
          post:
            'Hey there, this is my test for a post of my social app in React Native.',
          postImg: 'none',
          liked: false,
          likes: '8',
          comments: '0',
        },
        {
          id: '3',
          userName: 'Ken William',
          userImg: require('../assets/users/user-4.jpg'),
          postTime: '1 hours ago',
          post:
            'Hey there, this is my test for a post of my social app in React Native.',
          postImg: require('../assets/posts/post-img-2.jpg'),
          liked: true,
          likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthContext)
    console.log("{user.id} = "+user.uid)

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)
  
      const fetchPosts = async () => {
        try{
          const list = []

          await firestore() 
          .collection('posts')
          .orderBy('postTime','desc')
          .get()
          .then((querySnapshot) => {
            console.log("Total posts = "+ querySnapshot.size)

            querySnapshot.forEach((doc) => {
              //from each document get the data
              const {userId,post, postImg, postTime, likes, comments,} = doc.data()
              list.push({
                id: doc.id,
                userId,
                userName: 'Test name',
                userImg: 
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                postTime: postTime,
                post,
                postImg,
                liked: true,
                likes,
                comments,
              })
            })
          })
          setPosts(list)

          if (loading){
            setLoading(false)
          }
          console.log("POSTS = "+list)
        }catch(e){
          console.log(e)
        }
      }
      
    useEffect(() => {
        fetchPosts()
    },[])

    useEffect(() => {
      fetchPosts()
      setDeleted(false)
    },[deleted])

    //First display the confirmation msg before deleting any msg
    const handleDelete = (postId) => {
        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text : 'Cancel',
              onPress: () => console.log('Cancel pressed'),
              style : 'cancel'
            },
            {
              text : 'Confirm',
              onPress: () => deletePost(postId),
            }
          ],
          {cancelable : false}
        )
    }

    const deletePost = (postId) => {
        console.log("Post id for the item to be deleted : "+ postId)

        //for deleting a particular post
        //from the collection of posts get a particular post(doc) with the postid
        firestore().collection('posts')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists){
            const {postImg} = documentSnapshot.data()

            //Check if the post has any post image associated with it
            //if yes then we have to delete the image from firebase storage
            if  (postImg != null) {
              //getting the reference to the storage of the image.
              const storageRef = storage().refFromURL(postImg)

              //Create a reference to this image.
              const imageRef = storage().ref(storageRef.fullPath)

              //and then delete the image 
              imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully`)

                //Now delete the post from firestore.
                deleteFirestoreData(postId)

              })
              .catch(e => {
                console.log("error while deleting the image from firebase storage : "+e)
              })
            }
            //if the post image is not present and has nly a text value
            else {
              //Now delete the post from firestore.
              deleteFirestoreData(postId)
            }
            
          }
        })
    }

    const deleteFirestoreData = (postId) => {
      firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted',
          'Your post has been deleted Successfully.'
        )
        //when this dependency val changes useEffect is executed
        setDeleted(true)
      })
      .catch(e => console.log("Error while deleting post : "+e))

    }

    const ListHeader = () => {
      return null
    }

    //WHILE THE DATA IS STILL LOADING DISPLAY THE SHIMMER / SKELETON EFFECT
    return (
      <SafeAreaView style ={{flex:1}} >
      { loading ?
      (
        <ScrollView style = {{flex:1}} contentContainerStyle = {{alignItems:'center'}}>
          
        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                  <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                  <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}/>
              </View>
          </View>

          <View style = {{marginTop:10,marginBottom:30}}>
              <View style = {{width:300,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:250,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:350,height:200,borderRadius:4}}/>
          </View>
        </SkeletonPlaceholder>       

        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                  <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                  <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}/>
              </View>
          </View>

          <View style = {{marginTop:10,marginBottom:30}}>
              <View style = {{width:300,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:250,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:350,height:200,borderRadius:4}}/>
          </View>
        </SkeletonPlaceholder>       

        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                  <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                  <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}/>
              </View>
          </View>

          <View style = {{marginTop:10,marginBottom:30}}>
              <View style = {{width:300,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:250,height:20,borderRadius:4}}/>
              <View style = {{marginTop:6,width:350,height:200,borderRadius:4}}/>
          </View>
        </SkeletonPlaceholder>       
      </ScrollView>  
    )
    :
    (
      <Container> 
           <FlatList 
            data = {posts}
          renderItem={({item}) => 
          <PostCard 
          item = {item} 
          onDelete={handleDelete} 
          onPress={() => navigation.navigate('HomeProfile',{userId:item.userId})}
          />}
            keyExtractor = {(item) => item.id}
            //ListHeaderComponent = {ListHeader()}
            //ListFooterComponent = {ListHeader()}
            showsVerticalScrollIndicator = {false}
           />
      </Container>
    )}
        
  </SafeAreaView>
  )
}

export default HomeScreen

