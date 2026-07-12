/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoginScreen from './src/src/screens/LoginScreen';
import HomeScreen from './src/src/screens/HomeScreen';
import CommitteeMemberScreen from './src/src/screens/CommitteeMemberScreen';
import PoojaRegistrationScreen from './src/src/screens/PoojaRegistrationScreen';
import FestivalDashboardScreen from './src/src/screens/FestivalDashboardScreen';
import StartScreen from './src/src/screens/StartScreen';
import FestivalDetailScreen from './src/src/screens/FestivalDetailScreen';
import MemberContributionScreen from './src/src/screens/MemberContributionScreen';
import CollectContributionScreen from './src/src/screens/CollectContributionScreen';
import DonationCollectionScreen from './src/src/screens/DonationCollectionScreen';
import DonationDashboardScreen from './src/src/screens/DonationDashboardScreen';
import DonationSchemeDetailScreen from './src/src/screens/DonationSchemeDetailScreen';
import SchemeAssignmentScreen from './src/src/screens/SchemeAssignmentScreen';
import AddSchemeScreen from './src/src/screens/AddSchemeScreen';
import CreateFestivalScreen from './src/src/screens/CreateFestivalScreen';
import CreateUserScreen from './src/src/screens/CreateUserScreen';
import HallBookingScreen from './src/src/screens/HallBookingScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <AppContent /> */}
      {/* <StartScreen /> */}
      {/* <LoginScreen /> */}
      {/* <HomeScreen /> */}
      {/* <CommitteeMemberScreen /> */}
      {/* <PoojaRegistrationScreen /> */}
      {/* <FestivalDashboardScreen /> */}
      {/* <FestivalDetailScreen /> */}
      {/* <MemberContributionScreen /> */}
      <CollectContributionScreen />
      {/* <DonationCollectionScreen /> */}
      {/* <DonationDashboardScreen /> */}
      {/* <DonationSchemeDetailScreen /> */}
      {/* <SchemeAssignmentScreen /> */}
      {/* <AddSchemeScreen /> */}
      {/* <CreateFestivalScreen /> */}
      {/* <CreateUserScreen /> */}
      {/* <HallBookingScreen /> */}
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
