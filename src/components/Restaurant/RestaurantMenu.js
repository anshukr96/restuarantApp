import React from 'react';
import { View,Text, StyleSheet,ScrollView , ActivityIndicator, Button,AsyncStorage,  } from 'react-native';
import Constants from '../../constants';
import { Card, } from 'react-native-elements';
import { Header, Right,  Left} from 'native-base';


export default class RestaurantMenuScreen extends React.Component {
    constructor(props){
        super(props);
        const {navigation} = this.props;
        this.state= {
            loading: true,
            menuList: [],
            idArr: [],
            restaurantsId: navigation.getParam('restaurantId'),
        
        }
        this.DeleteMenu = this.DeleteMenu.bind(this);
    }

    async updateMenu() {
        const url = Constants.baseUrl+ '/manage/restaurants/' + this.state.restaurantsId + '/menu' ;
        console.log(url)
        const value = await AsyncStorage.getItem('token');
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'GET',
            headers: urlHeaders,
        }).then( response => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({
                loading: false,
                menuList: responseJSON
            })
        }).catch((error) => {
            alert(error)
        });
    }

    async componentDidMount() {
        const url = Constants.baseUrl+ '/manage/restaurants/' + this.state.restaurantsId + '/menu' ;
        console.log(url)
        const value = await AsyncStorage.getItem('token');
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'GET',
            headers: urlHeaders,
        }).then( response => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({
                loading: false,
                menuList: responseJSON
            })
        }).catch((error) => {
            alert(error)
        });
        
    }
    
    async DeleteMenu(id) {
        this.state.idArr[0]= id;
        console.log(this.state.idArr)
        const menuUrl = Constants.baseUrl + 'manage/restaurants/' + this.state.restaurantsId + '/menu';
        const value = await AsyncStorage.getItem('token');;
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(menuUrl, {
            method: 'delete',
            headers: urlHeaders,
            body: JSON.stringify({ "idArr": this.state.idArr,
                                })     
        }).then( response => response.json())
          .then((_) => {
                if(_.msg)
                    console.log(_.msg)
        }).catch((error) => {
            alert(error);
        });
    }

    deleteItemById = id => {
        const filteredData = this.state.menuList.filter(item => item.id !== id);
        this.setState({ menuList: filteredData });
        this.DeleteMenu(id);
      }

    render() {
        if(this.state.loading){
            return (
               <View>
                   <ActivityIndicator size="large" color="#0c9"/>
               </View>
            )}
            if(this.state.menuList.error){
                return (
                <React.Fragment>
                    <View>
                        <Button 
                            title= "Add"
                            onPress={() => { 
                                this.props.navigation.navigate('RestaurantMenuAdd' , {
                                restaurantsId: this.state.restaurantsId,
                                onGoBack: () => this.updateMenu(),
                            })}}> 
                        </Button>
                    </View>
                    <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Text>No Menu  to Display</Text>
                    </View>
                </React.Fragment>
                );
            }else{    
              return ( 
                <React.Fragment>
                <Header>
                    <Left>
                    <Button 
                    title= "Add"
                    onPress={() => { 
                                this.props.navigation.navigate('RestaurantMenuAdd' , {
                                restaurantsId: this.state.restaurantsId,
                                onGoBack: () => this.updateMenu(),
                            })}}>
                    </Button>
                    </Left>
                </Header>
    
                <ScrollView> 
                <Card  title="Menu" style={{ color: 'black', fontWeight:"bold" }}>
                { 
                    this.state.menuList.map((u) => {
                    return (
                        
                        <View key={u.id} style={styles.user}>
                            <Text
                            style={styles.text}>
                            {u.name}         
                            </Text>
                            <Text
                            style={styles.text} >
                            {u.price}
                            </Text> 
                            <View>
                                <Button 
                                    title= "Update"
                                    color= 'orange' 
                                    onPress={() => {this.props.navigation.navigate('RestaurantMenuUpdate' , {
                                        menuId: u.id, menuName: u.name, menuPrice: u.price, restaurantId: this.state.restaurantsId,
                                        onGoBack: () => this.updateMenu(),
                                    })}}>
                                </Button>

                                <Button 
                                    title= "Delete"
                                    color= 'red' 
                                    onPress={()=> this.deleteItemById(u.id)}>
                                </Button>
                            </View>
                            </View>

                        );
                   })
                }
                </Card> 
                </ScrollView>
                    </React.Fragment>
            );
    }}
} 

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    text: {
        fontSize: 20,
        color: 'green'
    },
    
  });