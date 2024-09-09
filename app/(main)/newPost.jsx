import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useRef, useState } from "react";
import ScrrenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Avatar from "../../components/Avatar";
import UserContext from "../../context/UserContext";
import RichTextEditor from "../../components/RichTextEditor";
import { useRouter } from "expo-router";
import Icon from "../../assets/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import ButtonCom from "../../components/ButtonCom";
import axios from "axios";
import baseApiUrl from "../../config/apiconfig";

const NewPost = () => {
  const api = "http://192.168.0.5:5125";
  const { user } = useContext(UserContext);
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const router = useRouter();
  const [imageApi, setImageApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onPick = async () => {
    console.log("Dosya Seçme Fonksiyonu");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFile(uri); // Resim URI'sini state'e set ediyoruz

      const formData = new FormData();
      formData.append("filem", {
        uri: uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      try {
        console.log("Basiapi", baseApiUrl);
        const response = await axios.post(
          `${baseApiUrl}api/Posts/UploadImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImageApi(response.data.imageUrl);
        const imageUrl = `${api}${response.data.imageUrl}`;
        console.log("Dosya URL'si: ", imageUrl);
        setFile(imageUrl); // Bu satırı kaldırabiliriz çünkü bu aşamada file zaten URI'yi içeriyor.
      } catch (err) {
        console.log("Hata: ", err);
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
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      userName: user.userName,
      body: bodyRef.current,
      file: imageApi,
    };
    console.log("Post verisi: ", data);
    try {
      const response = await axios.post(`${baseApiUrl}api/Posts`, data);
      console.log("Post oluşturuldu: ", response.data);
      if(response.data.isSuccess === true){
        console.log("Post oluşturuldu");
        router.push("");
      }
    } catch (err) {
      console.log("Hata: ", err);
      if (err.response) {
        console.log("API isteği hatası: ", err.response.data);
        console.log("Status Code: ", err.response.status);
      } else if (err.request) {
        console.log("Sunucuya istek gönderilemedi: ", err.request);
      } else {
        console.log("Hata mesajı: ", err.message);
      }
    }

    setLoading(false);
  };

  return (
    <ScrrenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Post Oluşur" />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* avatar */}
          <View style={styles.header}>
            <Avatar uri={user.image} size={hp(6.5)} rounded={theme.radius.xl} />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user.userName || "UserName"}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>
          {/* text editor */}
          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef} // Update this line
              onChange={(body) => {
                bodyRef.current = body;
              }}
            />
          </View>
          {file && (
            <View style={styles.file}>
              <Image
                source={{ uri: file }}
                style={styles.imageIcon}
                resizeMode="cover"
              />
            </View>
          )}
          {/* media */}
          <View style={styles.media}>
            <Text style={styles.addImageText}> Gönderilerinizi Şekillendirin </Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={onPick} style={{ zIndex: 1 }}>
                <Icon name="image" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPick} style={{ zIndex: 1 }}>
                <Icon name="video" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <ButtonCom
          buttonStyle={{ height: hp(7) }}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
      </View>
    </ScrrenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    pointerEvents: "auto", // Bunu ekle
  },
  addImageText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  imageIcon: {
    borderRadius: theme.radius.md,
    height: "100%", // Ekledim
    width: "100%", // Ekledim
  },
  file: {
    height: hp(20),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  video: {},
  closeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
