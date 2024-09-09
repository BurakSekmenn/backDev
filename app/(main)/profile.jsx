import { Alert, Pressable, StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import UserContext from '../../context/UserContext'
import ScrenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { hp, wp } from '../../helpers/common';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';
import axios from 'axios';
import baseApiUrl from '../../config/apiconfig';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log("ne geliyorburada loo", user.userName);
  const [page, setPage] = useState(1); // Başlangıç sayfası 1
  const [size] = useState(5); // Sayfa başına post sayısı
  const [currentUser, setCurrentUser] = useState(user.userName);
  console.log('current user:', currentUser);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [loading, setLoading] = useState(false);

//   const getPosts = async () => {
//     try {
//         setLoading(true);
//         const response = await axios.get(`${baseApiUrl}api/Posts/GetByUserId`, { params: { userName:currentUser,page, size } });
//         const data = response.data;
        
//         console.log(data);
//         console.log(data.commentCount);
//         // setTotalPosts(data.postCount);

//         setPosts(prevPosts => [...prevPosts, ...data.posts]); // Yeni postları mevcut listenin sonuna ekle
//         setTotalPages(Math.ceil(data.postCount / size)); // Toplam sayfa sayısını hesapla
//         setLoading(false);
      
//     } catch (err) {
//       if (err.response) {
//         console.log("API isteği hatası: ", err.response.data);
//         console.log("Status Code: ", err.response.status);
//       } else if (err.request) {
//         console.log("Sunucuya istek gönderilemedi: ", err.request);
//       } else {
//         console.log("Hata mesajı: ", err.message);
//       }
//     }
// };
// const getPosts = async () => {
//   try {
//       setLoading(true);
//       const response = await axios.get(`${baseApiUrl}api/Posts/GetByUserId`, {
//           params: { userName: currentUser, page, size }
//       });
//       const data = response.data;
//       console.log("Post verileriiiiii:", response.data);
//       console.log("Post sayısı:", data.postCount);
      
//       // Eğer post sayısı 0 ise, posts listesini temizle
//       if (data.posts.length === 0 && page === 1) {
//         console.log("buraya girdi post yok");
//           setPosts([]);
//       } else {
//         setPosts(prevPosts => {
//           const newPosts = data.posts.filter(newPost => 
//             !prevPosts.some(prevPost => prevPost.id === newPost.id)
//           );
//           return [...prevPosts, ...newPosts];
//         });
//       }
//       setTotalPages(Math.ceil(data.postCount / size)); // Toplam sayfa sayısını hesapla
//       setLoading(false);
//   } catch (err) {
//       console.error("API Hatası:", err.message);
//       setLoading(false);
//   }
// };
const getPosts = async () => {
  try {
      setLoading(true);
      const response = await axios.get(`${baseApiUrl}api/Posts/GetByUserId`, {
          params: { userName: currentUser, page, size }
      });
      const data = response.data;
      
      console.log("Post verileriiiiii:", data.posts);
      console.log("Post sayısı:", data.postCount);
      
      if (data.posts.length === 0 && page === 1) {
        setPosts([]); // İlk sayfa için post yoksa boş liste
      } else {
        setPosts(prevPosts => {
          const newPosts = data.posts.filter(newPost => 
            !prevPosts.some(prevPost => prevPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
      }
      setTotalPages(Math.ceil(data.postCount / size)); // Toplam sayfa sayısını hesapla
      setLoading(false);
  } catch (err) {
      console.error("API Hatası:", err.message);
      setLoading(false);
      Alert.alert("Error", "Posts could not be loaded. Please try again later.");
  }
};
useEffect(() => {
    getPosts();
  }, [page]); // Sayfa her değiştiğinde yeni veriyi çek

 
  const handleEndReached = () => {
    console.log('Reached tetiklendi. Şu anki sayfa:', page);
    if (page < totalPages && !loading) {
        setPage(prevPage => prevPage + 1); // Sayfa numarasını artır
    } 
};

  console.log('user data profile sayfası:', user);
  const router = useRouter();
 
  return (
    <ScrenWrapper bg="white">
       <UserHeader user={user} router={router} posts={posts} handleEndReached={handleEndReached} loading={loading} /> 
    </ScrenWrapper>
  )
}


const UserHeader = ({ user, router,posts,handleEndReached,loading }) => {
  const { logouts } = useContext(UserContext); 
  const handleLogout = async () => {
    Alert.alert('confirm', 'Are you sure you want to logout?', [
      {
        text:'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style:'cancel'
      },
      {
        text:'Logout',
        onPress: async () => {
          logouts();
          router.push('/welcome');
        },
        style:'destructive'
      }
    ])
  };
  return(
    <View style={{flex:1,backgroundColor:'white', paddingHorizontal: wp(4)}}>
        <View>
             <Header title="Profil"  mb={30}
             />
             <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
               <Icon name="logout" size={24} color={theme.colors.rose} />
             </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <View style={{gap:15}}>
              <View style={styles.avatarContainer}>
              <Avatar
                  uri={user.image}
                  size={hp(12)}
                  rounded={theme.radius.xxl*1.4}
                />
                <Pressable onPress={()=>router.push('editProfile')}>
                  <Icon name='edit' size={24} strokeWidth={2.5}  style={styles.editIcon}/>
                </Pressable>
              </View>
              {/* edit usernama and adreess */}
              <View style={{alignItems:'center'}}>
                <Text style={styles.userName}>{user.userName}</Text>
                <Text style={styles.info}>{user.addres}</Text>
              </View>
              {/* email,phone,bio */}
              <View style={{gap:10}}>
                    <View style={styles.info}>
                      <Icon name="mail" size={20} color={theme.colors.textLight} />
                      <Text style={styles.infoText}>{user.email}
                          {/* {user.email} */}
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <Icon name="call" size={20} color={theme.colors.textLight} />
                      <Text style={styles.infoText}>{user.phone}
                          {/* {user.email} */}
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <Icon name="threedotscircle" size={20} color={theme.colors.textLight} />
                      <Text style={styles.infoText}>{user.bio}
                          {/* {user.email} */}
                      </Text>
                    </View>
              </View>
              
              <View style={{marginTop:10}}>
                      <FlatList
            data={posts}
            keyExtractor={(item, index) => `${item.id}-${index}`}  // index ile birlikte benzersiz bir anahtar
            renderItem={({ item }) => (
              <PostCard 
                item={item}
                currentUser={user}
                router={router}
                hasShadow={true}
              />
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            // ListFooterComponent={loading ? <Loading /> : <View style={{ marginVertical: posts.length === 0 ? 200 : 30 }} />}
          />
                      
              </View>
            </View>
        </View>
    </View>
  )
}




export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  headerContainer:{
    marginHorizontal: wp(4),
    marginBottom:20,
  },
  headerShape:{
    width: wp(100),
    height: hp(20),
  },
  avatarContainer:{
    height: hp(12),
    width : hp(12),
    alignSelf : 'center',
  },
  editIcon:{
   position : 'absolute',
   bottom : 0,
   right :-12,
   padding:7,
   borderRadius:50,
   backgroundColor : 'white',
   shadowColor : theme.colors.textLight,
   shadowOffset : {width:0, height:4},
   shadowOpacity:0.4,
   shadowRadius: 5,
   elevation:7
  },
  userName:{
    fontSize: hp(2.5),
    fontWeight: '500',
    color : theme.colors.textDark
  },
  info:{
    flexDirection:'row',
    alignItems : 'center',
    gap: 10,
  },
  infoText:{
   fontSize : hp(1.6),
   fontWeight : '500',
   color : theme.colors.textLight
  },
  logoutButton:{
  position : 'absolute',
  right :0,
  padding:5,
  borderRadius: theme.radius.sm,
  backgroundColor: '#fee2e2',
  top:-68
  },
  listStyle:{
    // paddingHorizontal : wp(4),
    // paddingBottom : 30,
  },
  noPost:{
    fontsize:hp(2),
    textAlign : 'center',
    color: theme.colors.text
  }
})