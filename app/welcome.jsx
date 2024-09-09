import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import ButtonCom from '../components/ButtonCom'
import { useRouter } from 'expo-router'

const Welcome = () => {
    const router = useRouter();

  return (
    <ScreenWrapper bg="white">
        <StatusBar style='dark'>
        </StatusBar>
        <View style={styles.container}>
             {/* welcome image  */}
            <Image source={require('../assets/images/login.jpg')} resizeMode='contain' style={styles.welcomeImage}/>

            {/* welcome text */}
            <View style={{gap:20}}>
                <Text style={styles.title} >Back.Dev </Text>    
                <Text style={styles.punchline} >Her veri bir depolama alanı bulur, her API çağrısı kendi yanıtını anlatır. </Text>    
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                    <ButtonCom
                    title='Hadi Başlayalım'
                    buttonStyle={{marginHorizontal:wp(10)}}
                    onPress={()=>router.push('signUp')}
                    > </ButtonCom>

                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                                    Zaten bir hesabınız var mı?
                        </Text>
                        <Pressable
                        onPress={()=>router.push('login')}>
                                <Text style={[styles.loginText, {color : theme.colors.primary, fontWeight:theme.fonts.semibold}]}>
                                    Giriş Yap
                                </Text>
                        </Pressable>
                    </View>
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage : {
        height: hp(40),
        width : wp(100),
        alignSelf:'center'
    },
    title: {
        color : theme.colors.text,
        fontSize: hp(4),
        textAlign:'center',
        fontWeight : theme.fonts.extraBold,
    },
    punchline: {
        color : theme.colors.text,
        fontSize: hp(2.5),
        textAlign:'center',
        fontWeight : theme.fonts.medium,
        paddingHorizontal: wp(10)
    },
    footer :{
        gap: 30,
        width: '100%',
    },
    bottomTextContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5
    },
    loginText:{
        color: theme.colors.text,
        fontSize: hp(2),
        fontWeight: theme.fonts.medium,
        textAlign:'center'
    }
})