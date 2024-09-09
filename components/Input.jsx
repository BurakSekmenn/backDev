import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyles]}>
      {
        props.icon && props.icon
      }
      <TextInput
        style={{flex:1, height:hp(3.1)}}
        placeholder={props.placeholder}
        placeholderTextColor={theme.colors.textLight}
        ref = {props.inputRef && props.inputRef}
        {...props}
        >
        </TextInput>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection : 'row',
        height : hp(7.2),
        alignContent : 'center',
        justifyContent : 'center',
        borderWidth : 0.4,
        borderColor : theme.colors.text,
        borderRadius : theme.radius.xxl,
        borderCurve : "continuous",
        paddingHorizontal : 18,
        paddingTop:hp(1.9),
        gap:12,
    }
})