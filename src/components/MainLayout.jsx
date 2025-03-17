import React from 'react';
import { View, StyleSheet } from 'react-native';
import FooterTabs from './FooterTabs';
import { useNavigation } from '@react-navigation/native';

const MainLayout = ({ children }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <FooterTabs navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default MainLayout;