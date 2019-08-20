import React, { Component } from 'react';
import { Picker,Button, TextInput, View, StyleSheet,AsyncStorage } from 'react-native';
import {  Form, Icon, } from 'native-base';
import Constants from '../src/constants';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
      };
    constructor(props) {
        super(props),
        this.state= {
            email: '',
            password: '',
            role: '',
            token: '',
            selected: 'admin',
        };
        this.__login = this.__login.bind(this);
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
    }

    __login(){
        const url= Constants.baseUrl + 'login';
        fetch(url , {
            method: 'POST',
            body: JSON.stringify({ "email": this.state.email,
                                   "password": this.state.password,
                                   "role": this.state.selected
                                })                    
        }).then((res) => {
            return res.json()
        }).then(async (responseJSON) => {
            if(responseJSON.msg){
                AsyncStorage.setItem('token', responseJSON.token)  
                AsyncStorage.setItem('role', responseJSON.role)
                alert(responseJSON.msg)       
                this.props.navigation.navigate('RestaurantList')
            }else{
                   alert(responseJSON.error)
            }
        }).catch((error) => {
            alert(error);
        });

    }

render() {
    return (
        <View style={styles.container}>
            <TextInput 
                value= {this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder= {' email '}
                style={styles.input}
            />
            <TextInput 
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                style={ styles.input}
                placeholder= { 'password' }
                secureTextEntry= { true }
            />

            <Form >
                <Picker
                    iosIcon={<Icon name="arrow-down" />}
                    mode="dropdown"
                    style={{ width: 200 }}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="superAdmin" value="superAdmin" />
                    <Picker.Item label="admin" value="admin" />
                    <Picker.Item label="owner" value="owner" />
                    </Picker>
            </Form>

            <Button 
                title= { 'Login' }
                style= { styles.input }
                onPress={this.__login}
            /> 
        </View>
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

