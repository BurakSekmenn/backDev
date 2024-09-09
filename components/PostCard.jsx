import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Avatar from './Avatar';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../assets/icons';
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image';
import UserContext from '../context/UserContext'; 
import axios from 'axios';
import baseApiUrl from '../config/apiconfig';

const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.8),
};

const api = 'http://192.168.0.5:5125';

const tagsStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark,
  },
  h4: {
    color: theme.colors.dark,
  },
};

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
  showMoreIcon = true
}) => {

  
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(item.commentCount || 0);
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);

  useEffect(() => {
    // Check if post is liked when the component is loaded
    checkIfLiked();
  }, []);

  const checkIfLiked = async () => {
    try {
      const params = {
        postId: item.id,
        userName: user.userName
      };

      const response = await axios.get(`${baseApiUrl}api/PostLikes/`, { params });
      if (response.data.isLiked === true) {
        setLiked(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const OpenPostDetail = async () => {
    if (!showMoreIcon) return null;
    router.push({
      pathname: '(main)/postDetail',
      params: {
        item: JSON.stringify(item) // Send the item as a JSON string
      }
    });
  };

  const onLike = async () => {
    const datas = {
      userName: user.userName,
      postId: item.id
    };

    try {
      const res = await axios.post(`${baseApiUrl}api/PostLikes`, datas);
      
      if (res.data.isSuccess) {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const createdAt = moment(item.createdAt).format('MMM Do YYYY');

  return (
    <View style={[styles.container, hasShadow && styles.shadow]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar 
            size={hp(4.5)}
            uri={item?.userPhoto}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.userName}</Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
          {
            showMoreIcon && (
              <TouchableOpacity onPress={OpenPostDetail} style={{ marginLeft: wp(47) }}>
                <Icon name="threedotscircle" size={hp(4)} strokeWidth={1} color={theme.colors.text} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>

      <View style={styles.content}>
        {item?.body && 
          <RenderHtml contentWidth={wp(80)} source={{ html: item?.body }} tagsStyles={tagsStyles} />
        }
        {item?.file &&
          <Image 
            source={{ uri: `${api}${item.file}` }}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        }
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLike}>
            <Icon name="heart" size={24} strokeWidth={2} fill={liked ? theme.colors.rose : 'transparent'} color={liked ? theme.colors.rose : theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>{likeCount}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={OpenPostDetail}>
            <Icon name="comment" size={24} strokeWidth={2} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>{commentCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container : {
      gap:10,
      marginBottom : 15,
      borderRadius: theme.radius.xxl*1.1,
      borderCurve : 'continuous',
      padding : 10,
      paddingVertical: 12,
      backgroundColor : 'white',
      borderWidth : 0.5,
      borderColor : theme.colors.gray,
      shadowColor: theme.colors.dark,
      shadowOffset: { width: 0, height: 4 }, // Gölgenin ofseti
      shadowOpacity: 0.25, // Gölgenin opaklığı
      shadowRadius: 3.84, // Gölge yarıçapı
      elevation: 5, // Android için gölge yüksekliği
  },
  header:{
    flexDirection:'row',
    alignItems :'center',
    gap:8
  },
  userInfo:{
    flexDirection:'row',
    alignItems:'center',
    gap:8
  },
  postTime:{
    fontSize : hp(1.5),
    color : theme.colors.textDark,
    fontWeight : theme.fonts.regular
  },
  username:{
    fontSize : hp(1.7),
    color : theme.colors.textDark,
    fontWeight : theme.fonts.medium
  },
  postMedia:{
    height:hp(30),
    width:'100%',
    borderRadius : theme.radius.xl,
    borderCurve : 'continuous',
  },
  postBody:{
    marginLeft:5,
  },
  footer:{
    flexDirection:'row',
    alignItems:'center',
    gap :15
  },
  footerButton:{
    flexDirection:'row',
    marginLeft:5,
    alignItems:'center',
    gap:4
  },
  actions:{
    flexDirection:'row',
    alignItems:'center',
    gap:18,
  },
  count:{
    color : theme.colors.text,
    fontSize : hp(1.8),
  }
})

