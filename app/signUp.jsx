import { Pressable, StyleSheet, Text, View,Alert } from 'react-native';
import React,{useRef,useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRoute } from '@react-navigation/native';
import {hp, wp} from '../helpers/common'
import { TextInput } from 'react-native-gesture-handler';
import Input from '../components/Input';
import Icon from '../assets/icons';
import ButtonCom from '../components/ButtonCom';
import { useRouter } from "expo-router"; // React Navigation yerine expo-router'dan useRouter'ı kullanın
import axios from 'axios';  // Axios kütüphanesi
import baseApiUrl from "../config/apiconfig";
import Toast from 'react-native-toast-message';


const Signup = ({ navigation }) => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadings, setLoadings] = useState(false);

    const onSubmit = async () => {
        if (!email || !password || !userName) {        
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Signup',
                text2: 'Lütfen tüm alanları doldurun',
                autoHide: true,
                visibilityTime: 2000,
            });
            return;
        }
        let lowerCaseEmail = email.toLowerCase();
        let lowerCaseUserName = userName.toLowerCase();
        
        setLoadings(true);
        try {
          const response = await axios.post(`${baseApiUrl}api/Users`, { 
              nameSurname: lowerCaseUserName,
              userName: lowerCaseUserName,
              email: lowerCaseEmail,
              password: password
          });
          var data = response.data;
          console.log('Kayıt başarılı:', data);
          if (response.data.isSuccess==true) {
            Alert.alert('Başarılı', 'Kayıt başarılı');
            router.push('/login');  
          } else {
            //  Alert.alert('Error', response.data.message || 'Registration failed');
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Signup',
                text2: response.data.message || 'Kayıt başarısız oldu',
                autoHide: true,
                visibilityTime: 2000,
            });
             setLoadings(false);
          }

      } catch (error) {
          // Hata durumunu yönetin
          console.log('Kayıt hatası:', error);
          Alert.alert('Error', 'Registration failed');
      } finally {
          setLoadings(false);  // Yüklenme durumunu geri alın
      }
};
    const navigateToLogin = () => {
        router.push("/login");
    };
    return (
      <ScreenWrapper bg="white">
          <StatusBar style="dark" />
          <View style={styles.container}>
              <BackButton navigation={navigation} />
              <View>
                  <Text style={styles.welcomeText}>Hadi !</Text>
                  <Text style={styles.welcomeText}>Başlayalım </Text>
              </View>
              <View style={styles.form}>
                  <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                  Hesap oluşturmak için lütfen detayları doldurunuz
                  </Text>
                  <Input
                      icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                      onChangeText={(text)=>setUserName(text)}
                      placeholder="Kullanıcı Adınızı Giriniz" 
                  />
                  <Input
                      icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                      onChangeText={(text)=>setEmail(text)}
                      placeholder="Email adresinizi giriniz"
                  />
                  <Input
                      icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                      onChangeText={(text)=>setPassword(text)}
                      secureTextEntry={true}
                      placeholder="Şifrenizi giriniz"
                  />
                  <ButtonCom
                      title='Kayıt Ol'
                      loading={loadings}
                      onPress={onSubmit}
                  />
              </View>
              <View style={styles.footer}>
                  <Text style={styles.footerText}>
                        Zaten bir hesabınız var mı ?
                  </Text>
                  <Pressable onPress={navigateToLogin}>
                      <Text style={[styles.footerText, { color: theme.colors.primary }]}> Giriş Yap </Text>
                  </Pressable>
              </View>
          </View>
      </ScreenWrapper>
  );
};

export default Signup;

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
    fontWeight : theme.fonts.semibold,
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
    color : theme.colors.text,
    fontSize : hp(1.6),
  }

});