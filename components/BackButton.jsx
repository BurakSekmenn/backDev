import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ size = 26, router }) => {
    const navigation = useNavigation();
  return (
    <Pressable onPress={()=> navigation.goBack()} style={styles.button}>
      <Icon name="arrowleft" strokeWidth={2.5} size={size} color={theme.colors.primary} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf : 'flex-start',
    padding: 5,
    borderRadius : theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)', // Typo düzeltildi: 'rbga' => 'rgba'
  },
});