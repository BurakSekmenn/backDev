import React, { useState, useEffect } from 'react';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userName: null,
    image: null,
    email: null,
    bio: null,
    phone: null,
    addres:null
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedImage = await AsyncStorage.getItem('image');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedBio = await AsyncStorage.getItem('bio');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedAddres = await AsyncStorage.getItem('addres');
        
        if (storedUserName !== null && storedImage !== null && storedEmail !== null && storedBio !== null && storedPhone !== null && storedAddres !== null) {
          setUser({
            userName: storedUserName,
            image: storedImage,
            email: storedEmail,
            bio: storedBio,
            phone: storedPhone,
            addres: storedAddres

          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const login = (userName, image,email,bio,phone,addres) => {
    setUser({ userName, image, email, bio, phone, addres });
    // Veriyi AsyncStorage'a kaydet
    AsyncStorage.setItem('userName', userName);
    AsyncStorage.setItem('image', image);
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('bio', bio);
    AsyncStorage.setItem('phone', phone);

  };

  const logouts = async () => {
    setUser({ userName: null, image: null, email: null, bio: null, phone: null });
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('image');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('bio');
    await AsyncStorage.removeItem('phone');
  };

  return (
    <UserContext.Provider value={{ user, login, logouts }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;