import React from 'react';
import Constants from '../../constants';
import { View ,Text, Button, TextInput, StyleSheet, AsyncStorage} from 'react-native';

export default class RestaurantListUpdateScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            owner:'',
            restaurantName : '',
            restaurantLat : '',
            restaurantLng : '',
            restaurantId : '',
            name: '',
            lat: '',
            lng: '',
       }
       this.handleclick = this.handleclick.bind(this)
       const {navigation} = this.props;
        this.state.owner = navigation.getParam('ownerType')
        this.state.restaurantId = navigation.getParam('RestaurantId') 
        this.state.restaurantName= navigation.getParam('name')
        this.state.restaurantLat= navigation.getParam('lat')
        this.state.restaurantLng= navigation.getParam('lng')
    }

    componentDidMount() {
        this.setState({
            name: this.state.restaurantName,
            lat: this.state.restaurantLat,
            lng: this.state.restaurantLng,
        })
    }

    async handleclick() {
        const url =  Constants.baseUrl + 'manage/restaurants/' + this.state.restaurantId ;
        console.log(url)
        const value = await AsyncStorage.getItem('token');
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };  
        fetch(url, {
            method: 'put',
            headers: urlHeaders,
            body: JSON.stringify({ "name": this.state.name,
                                   "lat": parseFloat(this.state.lat),
                                   "lng": parseFloat(this.state.lng),
                                })              
        }).then(response => response.json())
          .then((_) => {
              if(_.msg){
                alert(_.msg);
              }else{ 
                alert(_.error) }
              this.goBack() 
          }).catch((error) => {
              alert(error)
          });
    }

    goBack() {
        const {navigation} = this.props
        navigation.state.params.onGoBack();
        navigation.goBack()
    }

    render() {
        console.log(this.state.owner)
        if(this.state.owner){
            return(
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>You can't update the Restaurant</Text>
                </View>
            );
        } else{
            return (
            <React.Fragment>
                    <View style={styles.container}>
                    <TextInput
                        value= {this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder= {'Name'}
                        style={styles.input}
                    />
                    <TextInput
                        value= {(this.state.lat).toString()}
                        onChangeText={(lat) => this.setState({ lat })}
                        placeholder= {'Price'}
                        style={styles.input}
                    />
                    <TextInput
                        value= {(this.state.lng).toString()}
                        onChangeText={(lng) => this.setState({ lng })}
                        placeholder= {'Price'}
                        style={styles.input}
                    />
                    <Button
                    title="Submit"
                    onPress={this.handleclick}
                    />
                    </View>
            </React.Fragment>
        );
    }
    }
} 

const styles = StyleSheet.create ({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
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
      
})