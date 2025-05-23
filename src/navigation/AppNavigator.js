import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../views/SplashScreen";
import WelcomeScreen from "../views/WelcomeScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import HomeScreen from "../views/HomeScreen";
import LogOutScreen from "../views/LogOutScreen";
import SearchScreen from "../views/SearchScreen";
import { AuthContext } from "../context/AuthContext";
import SearchResultsScreen from "../views/SearchResultsScreen";
import ProfileScreen from "../views/ProfileScreen";
import CreatePetitionScreen from '../views/CreatePetitionScreen';
import DraftsScreen from "../views/DraftsScreen";
import EditProfileScreen from '../views/EditProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LogOut" component={LogOutScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CreatePetition" component={CreatePetitionScreen} />
          <Stack.Screen name="Drafts" component={DraftsScreen} /> 
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />         
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
