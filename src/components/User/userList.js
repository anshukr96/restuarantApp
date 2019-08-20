import React from 'react';
import { View,Text, StyleSheet,FlatList, TextInput , ScrollView,Button, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import Constants from '../../constants';
import { Header, Right, Left, Card,CardItem, Content, Row,  } from 'native-base';





const url = Constants.baseUrl + 'manage/owners'

export default class UserListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            loading: true,
            UsersList: [],
            name: '',
            email:'',
            id: '',
            idArr: [],
            isOwner: false

        }
        this.DeleteUser = this.DeleteUser.bind(this);
        this.checkForUser();
    }


    async componentDidMount() {    
        this.fetchUserDetails()
    }

    async fetchUserDetails() {
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
            this.setState({
                loading: false,
                UsersList: responseJSON
            })
        }).catch((error) => {
            console.log('users api call crash', error);
        });
    }


    async checkForUser(){
        const value = await AsyncStorage.getItem('role');
        this.setState({
            isOwner : value === 'owner'
        })
    }


    async DeleteUser(id) {
        this.state.idArr[0]= id;
        const userUrl = Constants.baseUrl + 'manage/owners/' ;
        const value = await AsyncStorage.getItem('token');
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(userUrl, {
            method: 'delete',
            headers: urlHeaders,
            body: JSON.stringify({ "idArr": this.state.idArr,
                                })     
        }).then( response => response.json())
          .then((_) => {
                alert(_.msg)
        }).catch((error) => {
            alert(error);
        });
    }
    
    
    deleteItemById = id => {
        const filteredData = this.state.UsersList.filter(item => item.id !== id);
        this.setState({ UsersList: filteredData });
        this.DeleteUser(id);

      }

    render() {
        if(this.state.isOwner){
            return(
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Sorry!!! You can't see the other Users.</Text>
                </View>
            );
        }
        if(this.state.loading){
            return (
               <View>
                   <ActivityIndicator size="large" color="#0c9"/>
               </View>
            )}
            
        if(this.state.UsersList.error){
            return (
                <React.Fragment>
                    <Header>
                                <Left>
                                    <Button 
                                        title= "Add" 
                                        color="orange"
                                        onPress= {() => this.props.navigation.navigate('UsersAdd', {
                                            onGoBack: () => this.fetchUserDetails(),
                                        })}
                                    /> 
                                </Left>
                    </Header>
                    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>You have not created any Users</Text>
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
                                    color="orange"
                                    onPress= {() => this.props.navigation.navigate('UsersAdd', {
                                        onGoBack: () => this.fetchUserDetails(),
                                    })}
                                /> 
                            </Left>
                            
                        </Header>
                        <ScrollView>
                        <Card  title="Users" style={{ color: 'black', fontWeight:"bold" }}>
                        { 
                            this.state.UsersList.map((u,i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('UserRestaurantList', {
                                    userId: u.id
                                    } )} >
                                <View key={u.id} style={styles.user}>
                                    <Text
                                    style={styles.text}
                                    onChangeText={(name) => {
                                                this.setState({ name })
                                        }}
                                    >
                                        {u.name}         
                                    </Text>
                                    <Text
                                    onChangeText={(email) => {
                                            this.setState({ email })
                                        
                                    }}
                                    style={styles.text}>
                                    { u.email}
                                    </Text>
                                    
                                    <Button 
                                        title= "Update"
                                        color= 'red' 
                                        style={{ margin: 40}}
                                        onPress={() => { this.props.navigation.navigate('UserUpdate' , {
                                            ownerId:  u.id, userName: u.name, userEmail: u.email,
                                            onGoBack: () => this.fetchUserDetails()
                                        })} }>
                                    </Button>

                                    <Button 
                                        title= "Delete"
                                        color= 'red' 
                                        style={{ margin: 40}}
                                        onPress={()=> this.deleteItemById(u.id)}>
                                    </Button>
                                
                                    </View>
                                    </TouchableOpacity>   
                                );
                        })
                        }
                        </Card> 
                        </ScrollView>

                        </React.Fragment>
                );
            }
}
} 

const styles = StyleSheet.create({
    user: {
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'blue'
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        },
      
    
  });