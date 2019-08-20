import React from 'react';
import { View,TextInput , StyleSheet, AsyncStorage, Button} from 'react-native';
import Constants from '../../constants';

export default class RestaurantMenuAddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            name: '',
            price: '',
            restaurantsId: '',
        }
        

        this.handleclick = this.handleclick.bind(this);
    }

    async handleclick() {
        const url = Constants.baseUrl + 'manage/restaurants/'+ this.state.restaurantsId + '/menu';
        const value = await AsyncStorage.getItem('token');  
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };      
        fetch(url, {
            method: 'POST',
            headers: urlHeaders,
            body: JSON.stringify([{ "name": this.state.name,
                                   "price": parseFloat(this.state.price),
                                }])          
        }).then(response => response.json())
          .then((_) => {
              if(_.msg){
                alert(_.msg)
                this.goBack();
              }else
                alert(_.error)
          }).catch((error) => {
              alert(error)
          });
    }

    goBack() {
        const {navigation} = this.props
        navigation.state.params.onGoBack();
        navigation.goBack();
      }


    render() {
        const { navigation } = this.props;
        this.state.restaurantsId = navigation.getParam('restaurantsId');
        
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
                value= {this.state.price}
                onChangeText={(price) => this.setState({ price })}
                placeholder= {' price '}
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
