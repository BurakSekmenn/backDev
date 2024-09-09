import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { hp,wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import { Image } from 'expo-image'
import UsersContext from '../../context/UserContext'
import {getUserImageSrc}   from '../../services/imageServices'
import Icon from '../../assets/icons'
import Input from '../../components/Input'
import ButtonCom from '../../components/ButtonCom'
import Loading from '../../components/Loading'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'
import baseApiUrl from '../../config/apiconfig'
import { router } from 'expo-router'


const EditProfile = () => {
    const { user, logouts } = useContext(UsersContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [infoUser, setInfoUser] = useState({
        name: '',
        phone: '',
        image: null,
        bio: '',
        addres: '',
    });

    useEffect(() => {
        if (user) {
            setInfoUser({
                name: user.userName || '',
                phone: user.phone || '',
                image: user.image || null,
                bio: user.bio || '',
                addres: user.addres || '',
            });
            setImage(user.image ? getUserImageSrc(user.image).uri : null); // Başlangıçtaki resmi state'e yükleyin
        }
    }, [user]);

    const onPickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri); // Seçilen resmi hemen göstermek için URI'yi state'e kaydedin

            const formData = new FormData();
            formData.append('filem', {
                uri: uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });

            try {
                const response = await axios.post(baseApiUrl + 'api/Users/UploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setInfoUser({ ...infoUser, image: response.data.imageUrl });
            } catch (err) {
                if (err.response) {
                    console.log("API isteği hatası: ", err.response.data);
                    console.log("Status Code: ", err.response.status);
                } else {
                    console.log("Hata mesajı: ", err.message);
                }
            }
        }
    };

    const onSubmit = async () => {
        const { name, phone, image, bio, addres } = infoUser;
        if (!name || !phone || !addres || !bio || !image) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.put(baseApiUrl + 'api/Users', {
                oldUsername: user.userName,
                newUsername: name,
                newBio: bio,
                newImage: image,
                newPhoneNumber: phone,
                newAddress: addres,
            });
            console.log(res);
            console.log(res.data);
            if (res.data.isSucces) {
                alert('Profile updated successfully');
                logouts();
                router.push('/welcome');
            } else {
                alert('Profile update failed');
            }
        } catch (err) {
            if (err.response) {
                console.log("API isteği hatası: ", err.response.data);
                console.log("Status Code: ", err.response.status);
            } else {
                console.log("Hata mesajı: ", err.message);
            }
        }
    };



  return (
    // <ScreenWrapper bg="white">
    //         <View style={styles.container}>
    //             <ScrollView style={{flex:1}}>
    //                 <Header title="Edit Profile" style={styles.up} /> 

    //                 {/* form gelecek */}
    //                 <View style={styles.form}>
    //                         <View style={styles.avatarContainer}>
    //                             <Image source={imageSource} style={styles.avatar} />
    //                             <Pressable style={styles.cameraIcon} onPress={onPickImage}>
    //                                 <Icon name="camera" size={20}  color={theme.colors.primary} />
    //                             </Pressable>
    //                         </View>
    //                         <Text style={{fontSize:hp(1.5),color:theme.colors.text}}>
    //                             Please fill your profile information
    //                          </Text>
    //                          <Input
    //                             icon={<Icon name="user" />}
    //                             placeholder="Enter your Name"
    //                             value={infoUser.name}  // user yerine infoUser kullanıyoruz
    //                             onChangeText={value=>setInfoUser({...infoUser,name:value})}
    //                          />
    //                          <Input
    //                             icon={<Icon name="call" />}
    //                             placeholder="(___) ___ __ __"
    //                             value={infoUser.phone}
    //                             onChangeText={value=>setInfoUser({...infoUser,phone:value})}
    //                             keyboardType="phone-pad"
    //                          />
    //                          <Input
    //                             icon={<Icon name="location" />}
    //                             placeholder="Enter your address"
    //                              value={infoUser.addres}
    //                             onChangeText={value=>setInfoUser({...infoUser,addres:value})}
    //                          />
    //                          <Input
    //                             placeholder="Enter your bio"
    //                              value={infoUser.bio}
    //                              multiline={true}
    //                              containerStyle={styles.bio}
    //                              textAlignVertical="top"  // Metni yukarı hizalar
    //                              numberOfLines={4}  // Başlangıçtaki satır sayısı
    //                              editable={true}    // Düzenlenebilir olmasını sağlar
    //                             onChangeText={value=>setInfoUser({...infoUser,bio:value})}
    //                          />

    //                          <ButtonCom title="Update" loading={Loading} onPress={onSubmit} /> 
    //                 </View>
    //             </ScrollView>
    //         </View>
    // </ScreenWrapper>
    <ScreenWrapper bg="white">
    <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
            <Header title="Edit Profile" style={styles.up} />

            {/* form gelecek */}
            <View style={styles.form}>
                <View style={styles.avatarContainer}>
                    <Image source={image ? { uri: image } : require('../../assets/images/defaultUser.png')} style={styles.avatar} />
                    <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                        <Icon name="camera" size={20} color={theme.colors.primary} />
                    </Pressable>
                </View>
                <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                      Lütfen profil bilgilerinizi doldurun
                </Text>
                <Input
                    icon={<Icon name="user" />}
                    placeholder="Kullanici Adınızı Giriniz"
                    value={infoUser.name}
                    onChangeText={value => setInfoUser({ ...infoUser, name: value })}
                />
                <Input
                    icon={<Icon name="call" />}
                    placeholder="(___) ___ __ __"
                    value={infoUser.phone}
                    onChangeText={value => setInfoUser({ ...infoUser, phone: value })}
                    keyboardType="phone-pad"
                />
                <Input
                    icon={<Icon name="location" />}
                    placeholder="Adresinizi Giriniz"
                    value={infoUser.addres}
                    onChangeText={value => setInfoUser({ ...infoUser, addres: value })}
                />
                <Input
                    placeholder="Hakkında..."
                    value={infoUser.bio}
                    multiline={true}
                    containerStyle={styles.bio}
                    textAlignVertical="top"
                    numberOfLines={4}
                    editable={true}
                    onChangeText={value => setInfoUser({ ...infoUser, bio: value })}
                />

                <ButtonCom title="Update" loading={loading} onPress={onSubmit} />
            </View>
        </ScrollView>
    </View>
</ScreenWrapper>
);
  
}

export default EditProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal : wp(4)
    },
    avatarContainer:{
        height: hp(20),
        width: hp(20),
        alignSelf : 'center',
    },
    avatar:{
        width:'100%',
        height:'100%',
        borderRadius : theme.radius.xxl*1.8,
        borderCurve : 'continuous',
        borderWidth : 1,
        borderColor : theme.colors.darkLight,
    },
    cameraIcon:{
        position:'absolute',
        bottom:0,
        right:-10,
        padding:8,
        borderRadius:50,
        backgroundColor : 'white',
        shadowColor : theme.colors.textLight,
        shadowOffset: {width:0,height:4},
        shadowOpacity : 0.4,
        shadowRadius:5,
        elevation : 7
    },
    form:{
        gap:18,
        marginTop : 40
    },
    input:{
        flexDirection : 'row',
        borderWidth : 0.4,
        borderColor : theme.colors.text,
        borderRadius : theme.radius.xxl,
        borderCurve : 'continuous',
        padding : 17,
        paddingHorizontal:20,
        gap :15
    },
    bio:{
        flexDirection: 'column', // Dikeyde hizalar
        height: hp(5),
        alignItems: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin:wp(10),
        borderWidth: 1,
        borderColor: '#ccc',
        textAlignVertical: 'top', // Android'de metni üstten hizalar
    },
    
})