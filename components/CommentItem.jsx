import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Avatar from '../components/Avatar';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../assets/icons';

const CommentItem = ({ item, canDelete = false }) => {
  const createdAt = moment(item?.createdAt).format('MMM D');
  console.log("Comment Item: ", item);
  return (
    <View style={styles.container}>
      <Avatar uri={item?.userPhoto} />
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>
            {item?.userName || 'Anonymous'}  {/* Varsayılan kullanıcı adı */}
          </Text>
          <Text>.</Text>
          <Text style={[styles.text, { color: theme.colors.textLight }]}>
            {createdAt}
          </Text>
        </View>
        <Text style={[styles.text, { fontWeight: 'normal' }]}>
          {item?.content || 'No content'}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem

const styles = StyleSheet.create({

  container:{
  flex:1,
  flexDirection:'row',
  gap:7,
  },
  content:{
   backgroundColor : 'rgba(0,0,0,0.06)',
   flex:1,
   gap:5,
   paddingHorizontal : 14,
   paddingVertical : 10,
   borderRadius : theme.radius.md,
   borderCurve : 'continuous',
   
  },
  highlight:{
    borderWidth : 0.2,
    backgroundColor : 'white',
    borderColor : theme.colors.dark,
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius : 8,
    elevation: 5,
  },
  nameContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:3,
  },

  text:{
    fontSize:hp(1.6),
    fontWeight:theme.fonts.medium,
    color:theme.colors.textDark
  }
})