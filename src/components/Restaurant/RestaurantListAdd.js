import React from 'react';
import { View,Text,TextInput , StyleSheet, AsyncStorage, Button} from 'react-native';
import Constants from '../../constants';

const url = Constants.baseUrl + "manage/restaurants";


export default class RestaurantListAddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            name: '',
            lat: '',
            lng: '',
            isOwner: false
        }
        
        this.handleclick = this.handleclick.bind(this);
        this.checkForUser();
    }


    async checkForUser(){
        const value = await AsyncStorage.getItem('role');
        this.setState({
            isOwner : value === 'owner'
        })
    }

    async handleclick() {  
        const value = await AsyncStorage.getItem('token');
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };  
        fetch(url, {
            method: 'POST',
            headers: urlHeaders,
            body: JSON.stringify({ "name": this.state.name,
                                   "lat": parseFloat(this.state.lat),
                                   "lng": parseFloat(this.state.lng),
                                })        
        }).then(response => response.json())
          .then((_) => {
              if(_.msg){
              alert(_.msg);
              this.goBack();
              }else{
                  alert(_.error)
              }
          }).catch((error) => {
              console.log('personal error',error)
          });
    }

    goBack() {
        const {navigation} = this.props
        navigation.state.params.onGoBack();
        navigation.goBack();
      }


        render() {
            if(this.state.isOwner){
                return(
                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>You Don't have the permission to Add Restaurant</Text>
                </View>
                );
            }else{
            return (
                <React.Fragment>
                <View style={styles.container}>
                <TextInput 
                    value= {this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    placeholder= {' name '}
                    style={styles.input}
                />
                <TextInput 
                    value= {this.state.lat}
                    onChangeText={(lat) => this.setState({ lat })}
                    placeholder= {' lat '}
                    style={styles.input}
                />
                <TextInput 
                    value= {this.state.lng}
                    onChangeText={(lng) => this.setState({ lng })}
                    placeholder= {' lng '}
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

} }

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
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
