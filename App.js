import React from 'react';
import { Button, Image } from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import { createStackNavigator,createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './src/Login' ;
import RegisterScreen from './src/Register';
import RestaurantListScreen from './src/components/Restaurant/RestaurantList';
import RestaurantMenuScreen from './src/components/Restaurant/RestaurantMenu';
import RestaurantListAddScreen from './src/components/Restaurant/RestaurantListAdd';
import RestaurantMenuAddScreen from './src/components/Restaurant/RestaurantMenuAdd';
import UserListScreen from './src/components/User/userList';
import UsersAddScreen from './src/components/User/UsersAdd';
import UserRestaurantListScreen from './src/components/User/UserRestaurantList';
import UserUpdateScreen from './src/components/User/UserUpdate';
import ResturantMenuUpdateScreen from './src/components/Restaurant/RestaurantMenuUpdate';
import RestaurantListUpdateScreen from './src/components/Restaurant/RestaurantListUpdate';
import UserRestaurantListAddScreen from './src/components/User/UserRestaurantListAdd';



export class AppScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <View style={styles.logo} >
        <Text style={styles.text} >Welcome to Food App!!</Text>
        <Image 
          source={ require("./assets/images/logo.png") }
          style={{ width: 300, height: 300}}
        />
        <View style={styles.authButton}>
          <Button
            title= "Signup"
            color= "#1ac6ff"
            onPress= {() => this.props.navigation.navigate('Register')}
          />
          <Button
            title= "Login"
            color= "#ff6600"
            onPress= {() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View> 
    );
  }
}

export const Restaurant = createStackNavigator({
  RestaurantList: { screen: RestaurantListScreen },
  RestaurantMenu: { screen: RestaurantMenuScreen},
  RestaurantListAdd: { screen: RestaurantListAddScreen },
  RestaurantListUpdate: { screen: RestaurantListUpdateScreen},
  RestaurantMenuAdd: { screen: RestaurantMenuAddScreen },
  RestaurantMenuUpdate: { screen: ResturantMenuUpdateScreen},
  },
   {
    initialRouteName: 'RestaurantList',
});

export const UserList = createStackNavigator({
  UserList: { screen: UserListScreen },
  UsersAdd: { screen: UsersAddScreen },
  UserRestaurantList: { screen: UserRestaurantListScreen },
  UserRestaurantListAdd: { screen: UserRestaurantListAddScreen},
  RestaurantListUpdate: { screen: RestaurantListUpdateScreen},
  UserUpdate: { screen: UserUpdateScreen },
  RestaurantMenu: { screen: RestaurantMenuScreen},
  RestaurantMenuAdd: { screen: RestaurantMenuAddScreen },
  RestaurantMenuUpdate: { screen: ResturantMenuUpdateScreen},
}, {
  initialRouteName: 'UserList',
});

export const Tabs = createBottomTabNavigator({
  Restaurant: { screen: Restaurant},
  UserList: { screen: UserList},
 },
  {
    initialRouteName: 'Restaurant',
});

export const App = createStackNavigator({
  App: {
    screen: AppScreen,
  },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
 }, {
    initialRouteName: 'App',
})

export const AppNavigator = createSwitchNavigator({
  App: {
    screen: App,
  },
    Tabs: { screen: Tabs },
  }, {
  initialRouteName: 'App',
  
});



export default createAppContainer(AppNavigator);


// ADD STYLING FOR COMPONENTS

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },

  text: {
    color: 'blue',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Button: {
    padding: 100,
  },


  
})