import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import CustomLayout from '../app/CostumLayout'; // CustomLayout'ı doğru yol ile import et
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LogBox } from 'react-native';



LogBox.ignoreAllLogs([" Warning: TNodeChildrenRenderer","Warning: TNodeChildrenRenderer","Warning: MemoizedTNodeRenderer: ","Warning: TNodeChildrenRenderer:","Warning: React has detected a change in the order of Hooks called by ","Warning: Cannot update a component from inside the function body of a different component.","Warning: Can't perform a React state update on an unmounted component.",]);
const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      const tokenExpiration = await AsyncStorage.getItem('expiration');
      if (tokenData && tokenExpiration) {
        const expirationDate = new Date(tokenExpiration);
        const now = new Date();

        if (now < expirationDate) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('expiration');
          router.push('/welcome'); // Token süresi dolduğunda yönlendirme yapılır
        }
      } else {
        setIsAuthenticated(false);
        router.push('/welcome'); // Token veya expiration bulunamadığında yönlendirme yapılır
      }
    } catch (error) {
      console.error('Token kontrolü sırasında bir hata oluştu:', error);
      setIsAuthenticated(false);
    }
  };

  return (
    <CustomLayout>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="(main)/profile" />
          </>
        ) : (
          <Stack.Screen name="welcome" />
        )}
      </Stack>
    </CustomLayout>
  );
};

export default Layout;