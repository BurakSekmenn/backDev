import { StyleSheet, Text, Button,View, Pressable, FlatList } from 'react-native'
import React, { useState,useContext, useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from "expo-router"; // React Navigation yerine expo-router'dan useRouter'ı kullanın
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import Avatar from '../components/Avatar';
import  UserContext  from '../context/UserContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import baseApiUrl from '@/config/apiconfig';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';


const index = () => {
    const router = useRouter();
    const { user, logouts } = useContext(UserContext); 
    const [page, setPage] = useState(1); // Başlangıç sayfası 1
    const [size] = useState(5); // Sayfa başına post sayısı
    const [totalPosts, setTotalPosts] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseApiUrl}api/Posts`, { params: { page, size } });
            const data = response.data;
            console.log(data);
            console.log(data.commentCount);
            setTotalPosts(data.postCount);
            setPosts(prevPosts => [...prevPosts, ...data.posts]); // Yeni postları mevcut listenin sonuna ekle
            setTotalPages(Math.ceil(data.postCount / size)); // Toplam sayfa sayısını hesapla
            setLoading(false);
          
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, [page]); // Sayfa her değiştiğinde yeni veriyi çek
    const handleEndReached = () => {
        console.log('reached tetiklendi');
        if (page < totalPages && !loading) {
            setPage(prevPage => prevPage + 1); // Sonraki sayfaya geç
        }
    };

    const OpenPostDetail = () => {
        //later
    };


    const logout = async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('expiration');
      logouts(); // Kullanıcı bilgilerini context'ten kald
      router.push('/welcome');
    };
    return (
     <ScreenWrapper>
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Back.Dev</Text>
                    <View style={styles.icons}>
                        <Pressable onPress={()=>router.push("notifications")}>
                            <Icon name="heart" size={hp(3)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={()=>router.push("newPost")} >
                            <Icon name="plus" size={hp(3)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={()=>router.push("profile")}>
                            <Avatar
                             uri={user?.image}
                             size={hp(4.5)}
                             rounded={theme.radius.md}
                             style={{borderWidth:2}}
                            ></Avatar>
                        </Pressable>

                    </View>
                </View>
                        
                {/* posts */}
                <View style={{flex:1}}>
                    {posts.length === 0 && !loading && <Text style={styles.noPosts}>No posts yet</Text>}
                </View>
                <FlatList
                    data={posts}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={item=> item.id.toString()}
                    renderItem={({item})=>
                    <PostCard 
                    item={item}
                    currentUser={user}
                    router = {router}
                    hasShadow={true}
                    />
                    }
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={1} // 0.5 means when the end of the content is within half the visible length of the list
                    ListFooterComponent={loading ? <Loading /> : <View style={{ marginVertical: posts.length === 0 ? 200 : 30 }} />}

                    
                /> 
            </View>
         {/* <Button title="welcome" onPress={()=> router.push('welcome')} ></Button> 
         <Button title="Logout" onPress={logout} ></Button> */}
         {/* <Button title="Logout" onPress={logout} ></Button> */}
       </ScreenWrapper> 
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom :10,
        marginHorizontal : wp(4)
    },
    title:{
        color : theme.colors.primary,
        fontSize : hp(3.2),
        fontWeight : theme.fonts.bold
    },
    avatarImage : {
        height: hp(4.3),
        width : hp(4.3),
        borderRadius : theme.radius.sm,
        borderCurve : 'continuous',
        borderColor : theme.colors.gray,
        borderWidth : 3
    },
    icons:{
        flexDirection : 'row',
        alignItems : 'center',
        gap:18,
        alignItems : 'center'
    },
    listStyle:{
        paddingTop : 20,
        paddingHorizontal : wp(4)
    },
    noPosts : {
        fontSize : hp(2),
        textAlign : 'center',
        color: theme.colors.text,
    },
    pill :{
        position : 'absolute',
        right: -10,
        top : -4,
        height : hp(2.2),
        width : hp(2.2),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 20,
        backgroundColor : theme.colors.roseLight
    },
    pillText:{
        color: 'white', 
        fontSize : hp(1.2),
        fontWeight : theme.fonts.bold
    }



})