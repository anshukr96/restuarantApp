import React from 'react';
import {
StyleSheet,
View,
Text,
Button,
ActivityIndicator,
AsyncStorage,
ScrollView,
TouchableOpacity,
} from "react-native";
import { Card, } from 'react-native-elements';
import Constants from '../../constants';


export default class UserRestaurantListScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            id: '',
            restaurantList: [],
            name: '',
            lat: '',
            lng: '',
        };
    }
    


    componentDidMount() {
        this.getUserRestaurantList()
    }

    async getUserRestaurantList() {
        const url = Constants.baseUrl + 'manage/owners/' + this.state.id + '/restaurants';
        const value = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        this.setState({ isOwner: role === 'owner' })
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(url, {
            method: 'GET',
            headers:urlHeaders,
            
        }).then(response => response.json())
          .then((responseJSON) => {
              if(responseJSON.msg)
                alert(responseJSON.msg)
            this.setState({
                loading: false,
                restaurantList: responseJSON
            })
        }).catch((error) => {
            console.log('error pops out', error);
        });
    }

    render() { 
        const { navigation } = this.props;
        this.state.id =  navigation.getParam('userId') ;
        if(this.state.loading){
        return (
           <View>
               <ActivityIndicator size="large" color="#0c9"/>
           </View>
        )}
        if(this.state.restaurantList.error){
            return (
              <React.Fragment>
                    <View>
                        <Button 
                            title= "Add"
                            onPress={() => { 
                                this.props.navigation.navigate('UserRestaurantListAdd' , {
                                    userId: this.state.id,
                                    onGoBack: () => this.getUserRestaurantList()
                                })}} 
                        /> 
                    </View>
                    <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Text>No RestaurantList  to Display</Text>
                    </View>
                </React.Fragment>
            );
        }else{
        return (
            <React.Fragment>
            <View>
            <View>
            <Button 
                title= "Add"
                onPress={() => { 
                    this.props.navigation.navigate('UserRestaurantListAdd' , {
                    userId: this.state.id,
                    onGoBack: () => this.getUserRestaurantList()
                    })}} 
            /> 
            </View>
            </View>

            <ScrollView> 
                <Card  title="Restaurants" style={{ color: 'black', fontWeight:"bold" }}>
                { 
                    this.state.restaurantList.map((u,i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('RestaurantMenu', {
                            restaurantId: u.id,
                            })}>
                        <View key={u.id} style={styles.user}>
                            <Text
                            style={styles.name}>
                            {(u.name.indexOf(' ') !== -1) ? (u.name.split(' ')[0]+'...' ): u.name}         
                            </Text>
                            <Text
                            style={styles.text} >
                            { Math.round(u.lat * 100) / 100 }
                            </Text>
                            <Text
                            style={styles.text}
                            >
                            { Math.round(u.lng * 100) / 100 }
                            </Text>

                            <Button
                                style={styles.text}
                                title= "Update"
                                color= 'orange' 
                                onPress={() => this.props.navigation.navigate('RestaurantListUpdate', {
                                    ownerType: this.state.isOwner,
                                    RestaurantId: u.id,
                                    name: u.name,
                                    lat: u.lat,
                                    lng: u.lng
                                })}>
                            </Button>
                           
                            </View>
                            </TouchableOpacity>   
                        );
                   })
                }
                </Card> 
                </ScrollView>
                </React.Fragment>
          )
            };
    }
}


const styles = StyleSheet.create({
    
    user: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderWidth: 2,
        padding: 5,
        margin: 5,
        borderTopColor: "grey"
    },
    name: {
        flex: 1,
        fontSize: 15,
    },
    text: {
        flex: 1,
        fontSize: 15,
    },
    btn: {
        flex: 1,
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