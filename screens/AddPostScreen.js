import  React ,{useContext,useState} from 'react'
import {View,StyleSheet,Alert,Text, Platform, ActivityIndicator} from 'react-native'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import  ImagePicker from 'react-native-image-crop-picker'

import { AuthContext } from '../navigation/AuthProvider'

import { InputField,
        InputWrapper, 
        AddImage,
        SubmitBtn,
        SubmitBtnText, 
        StatusWrapper
    } from '../styles/AddPost'

const AddPostScreen = () => {
    const [image,setImage] = useState(null)
    const [uploading,setUploading] = useState(false)
    const [transferred,setTransferred] = useState(0)
    const [post,setPost] = useState(null)

    const {user} = useContext(AuthContext)

    const takePhotoFromCamera = () => {
        //alert("hello")
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
          }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
          });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true
          }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
          });
    }

    const checkPost = () => {
        if (image == null && post == null){
            alert("No post data available.Please enter")
        }else {
            submitPost()
        }
    }

    const submitPost = async () => {

        const imageUrl = await uploadImage()
        console.log("image url = "+ imageUrl)

        //storing data into firebase firestore by making a new folder by name 'posts'
        firestore()
        .collection('posts')
        .add({
            userId : user.uid,
            post : post,
            postImg: imageUrl,
            postTime: firestore.Timestamp.fromDate(new Date()),
            likes: null,
            comments: null,
        })
        .then(() => {
            console.log('Post Added')
            Alert.alert(
                'Post published',
                'Your post has been published Successfully.'
            )
            setPost(null)
        })
        .catch((e) => {
            console.log("Something went wrong while adding post to firestore.",+e)
        })
    }

    const uploadImage = async () => {
        //IN CASE IF USER POST HAS NO IMAGE AND HAS ONLY TEXT DATA
        if (image == null) { return null }
        const uploadUri = image
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        //Add timestamp to file name
        const extension = filename.split('.').pop() //split the filename by . and return the last value
        const name = filename.split('.').slice(0,-1).join('.')
        filename = name + Date.now() + '.' + extension

        setUploading(true)
        setTransferred(0)

        const storageRef = storage().ref(`photos/${filename}`)
        const task = storageRef.putFile(uploadUri)

        //set trnasferred state
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            )
          });

        try{
            await task
            //Get the url of the uploaded image
            const url = await storageRef.getDownloadURL()

            setUploading(false)
            setImage(null)

            return url
        }catch(e){
            console.log(e)
            return null
        }
    }

    return (
        <View style = {styles.container}>
            <InputWrapper>
                {image != null ? <AddImage source = {{uri: image}}/> : null}

                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                    value = {post}
                    onChangeText = {(content) => setPost(content) }
                />
                {uploading ?(
                    <StatusWrapper>
                        <Text>{transferred} % Completed</Text>
                        <ActivityIndicator size ="large" color= "#0000ff"/>
                    </StatusWrapper>
                ) :(
                    <SubmitBtn onPress = {checkPost} >
                        <SubmitBtnText>Post</SubmitBtnText>    
                    </SubmitBtn>
                )}

            </InputWrapper>

            {/* Floating Button Code */}
        <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item 
              buttonColor='#9b59b6'
              title="Take Photo"
              onPress={() => {takePhotoFromCamera()}}>
              <Icon name="camera-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item 
              buttonColor='#3498db' 
              title="Choose Photo" 
              onPress={() => {choosePhotoFromLibrary()}}>
              <Icon name="md-images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            
         </ActionButton>

        </View>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})