import { ScrollView, StyleSheet, Text, View ,TextInput} from 'react-native'
import React,{useContext,useEffect,useRef,useState} from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import PostCard from '../../components/PostCard'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import baseApiUrl from '../../config/apiconfig'
import Loading from '../../components/Loading'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from '../../assets/icons'
import CommentItem from '../../components/CommentItem'



const postDetail = () => {
    const { user } = useContext(UserContext);
    const { item } = useLocalSearchParams();
    const router = useRouter();
    const postItem = JSON.parse(item);
    console.log("Post Item: ", postItem);
    const [posts, setPosts] = useState(null);
    const [starLoading,setStarLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]); // Başlangıçta boş dizi
    
    useEffect(() => {
        fetchComments(); // Yorumları al
      }, []);

      const fetchComments = async () => {
        try {
          const response = await axios.get(`${baseApiUrl}api/Comments`, {
            params: { postId: postItem.id }
          });
          setComments(response.data.comment || []); // Gelen yorumları state'e set et
          
          setLoading(false);
        } catch (err) {
           if (err.response) {
                console.log("API isteği hatası: ", err.response.data);
                console.log("Status Code: ", err.response.status);
            } else if (err.request) {
                console.log("Sunucuya istek gönderilemedi: ", err.request);
            } else {
                console.log("Hata mesajı: ", err.message);
            }
        }
      };

    const onNewComment = async () => { 
        // console.log("Yorum ekleme fonksiyonu çalıştı");
        // console.log("Yorum: ", text);
        // console.log("Post ID: ", postItem.id);
        console.log("post ıd",postItem);
        console.log("Kullanıcı ID: ", user.userName);
        console.log("Kullanıcı Fotoğrafı: ",postItem.userPhoto);
        console.log("bu sattırraaa bakklkkkk: ", user.image);
        const newComment = {
          userName: user.userName,
          userPhoto: user.image, // Eğer user.photoUrl yoksa varsayılan URL
          content: text,
          createdAt: new Date().toISOString(), // Anlık zamanı kullan
      };
      setComments(prevComments => [...prevComments, newComment]);
      setText('');
        try {
            const response = await axios.post(`${baseApiUrl}api/Comments`, {
                postId: postItem.id,
                userName: user.userName,
                content: text,
            });
            console.log("Yorum ekleme başarılı: ", response.data);
            setText('');
        }catch(err){
            if (err.response) {
                console.log("API isteği hatası: ", err.response.data);
                console.log("Status Code: ", err.response.status);
            } else if (err.request) {
                console.log("Sunucuya istek gönderilemedi: ", err.request);
            } else {
                console.log("Hata mesajı: ", err.message);
            }
        
    }

 
}
   

    return (
        <ScreenWrapper bg="white">
            
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
      <PostCard 
        item={postItem}  // Direkt postItem'ı geçiyoruz
        currentUser={user}
        router={router}
        hasShadow={true}
        showMoreIcon={false}
      />
      {/* Comment input */}
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={"Add a comment"}
        placeholderTextColor={theme.colors.textLight}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={onNewComment} style={styles.sendIcon}>
        <Icon name="send" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      </View>
        {/* Comments Lists */}
        <View style={{ marginVertical: 15, gap: 17 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                        <CommentItem item={comment} key={index}  />
                        ))
                    ) : (
                        <Text style={styles.notFound}>No comments found</Text>
                    )}
    </View>
    </ScrollView>
  </View>
</ScreenWrapper>
    )
}



export default postDetail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingVertical: wp(7),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: theme.colors.dark,
        borderRadius: theme.radius.xl,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        height: hp(5.8),
        fontSize: 16,
    },
    inputField: {
      flex: 1,  // Input elemanının esnekliği
      height: hp(5.8),
    },
    sendIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    list: {
      paddingHorizontal: wp(4),
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFound: {
      fontSize: hp(2.5),
      color: theme.colors.text,
      fontWeight: theme.fonts.medium,
    },
    loading: {
      height: hp(5.8),
      width: hp(5.8),
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scale: 1.3 }],
    },
  });