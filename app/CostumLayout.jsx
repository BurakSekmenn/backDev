import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { UserProvider } from '../context/UserContext';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

const CustomLayout = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          {children}
          <Toast topOffset={70} config={toastConfig} />
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default CustomLayout;
