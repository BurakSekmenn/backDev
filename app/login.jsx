import { Pressable, StyleSheet, Text, View,Alert } from 'react-native';
import React,{useRef,useState,useContext} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import {hp, wp} from '../helpers/common'
import Input from '../components/Input';
import Icon from '../assets/icons';
import ButtonCom from '../components/ButtonCom';
import { useRouter } from "expo-router"; // React Navigation yerine expo-router'dan useRouter'ı kullanın
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';  // Axios kütüphanesi
import baseApiUrl from "../config/apiconfig";
import UserContext from '../context/UserContext';


const Login = ({ navigation }) => {
  const router = useRouter(); // useRoute yerine useRouter kullanın
  const { login } = useContext(UserContext); // login fonksiyonunu context'ten alın
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadings, setLoadings] = useState(false);

  const onSubmit = async () => {
    console.log('email:', email);
    console.log('password:', password);
    
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login',
        text2: 'Please fill all fields',
        autoHide: true,
        visibilityTime: 2000,
      });
      return;
    }
    
    setLoadings(true);
    
    try {
      const response = await axios.post(`${baseApiUrl}api/Users/login`, {
        usernameOrEmail: email,
        password: password,
      });
      
      const data = response.data;

      
      if (data.isSucces) {
        await AsyncStorage.setItem('token', data.tokenConfig.accesToken);
        await AsyncStorage.setItem('expiration', data.tokenConfig.expiration);
        login(data.userName, data.image,data.email,data.bio,data.phoneNumber,data.address);  // Kullanıcı bilgilerini context'e ayarlayın
        Alert.alert('Success', 'Login successful');
        router.push('');  // Burada bir rota belirtmelisin. Örneğin: router.push('/home');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Login',
          text2: data.message || 'Login failed',
          autoHide: true,
          visibilityTime: 2000,
        });
        setLoadings(false);
      }
      
    } catch (e) {
      console.log('error:', e);
      Alert.alert('Error', 'An unexpected error occurred');
      setLoadings(false);
    } finally {
      setLoadings(false);
    }
  };
  const navigateToSignup = () => {
    router.push("/signUp");
  };


  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton  navigation={navigation} />
        {/* welcome text */}
        <View>
          <Text style={styles.welcomeText}>Merhaba !</Text>
          <Text style={styles.welcomeText}>Hoşgeldin </Text>
        </View>
             {/* Form text */}
        <View style={styles.form}>
             <Text style={{fontSize:hp(1.5), color:theme.colors.text}}>
              Devam edebilmek için Giriş Yapın
             </Text>
             <Input
             icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
             onChangeText={(text)=>setEmail(text)}
             placeholder="Mail adresiniz yada kullanıcı adınızı giriniz">
             </Input>

             <Input
             icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
             onChangeText={(text)=>setPassword(text)}
             secureTextEntry={true}
             placeholder="Şifrenizi giriniz">
             </Input>

             <Text style={styles.forgotPassword}>
                Şifremi Unutum ?
             </Text>

            <ButtonCom
              title='Giriş Yap'
              loading={loadings}
              onPress={onSubmit}
            >

            </ButtonCom>
             
          
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabınız yok mu ?</Text>
          <Pressable 
            onPress={navigateToSignup}
          >
            <Text style={[styles.footerText, {color:theme.colors.primary}]}>Kayıt Olun </Text>
          </Pressable>

        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap : 45,
    paddingHorizontal:wp(5),
  },
  welcomeText:{
    fontSize : hp(6),
    fontWeight : theme.fonts.bold,
    color : theme.colors.text,
  },
  form:{
    gap:25
  },
  forgotPassword:{
    textAlign : 'right',
    fontWeight : theme.fonts.medium,
    color : theme.colors.text,
  },
  footer:{
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    gap :5  
  },
  footerText:{
    textAlign : 'center',
    color : theme.colors.dark,
    fontSize : hp(1.6),
  }

});