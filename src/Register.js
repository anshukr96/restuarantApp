import React, { Component } from 'react';
import { Picker,Button, TextInput, View, StyleSheet} from 'react-native';
import {  Form, Icon, } from 'native-base';
import Constants from '../src/constants';
export default class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Register',
    };
    constructor(props) {
        super(props),
        this.state= {
            name: '',
            email: '',
            password: '',
            selected: undefined,
            showToast: false,
        };
        this.__registerCall = this.__registerCall.bind(this);
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
    }

    __registerCall() {
        var url = Constants.baseUrl+ 'register/' ;
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "email": this.state.email,
                                   "name": this.state.name,
                                   "password": this.state.password,
                                   "role": this.state.selected,
                                })
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            if(responseJson.msg){
                alert(responseJson.msg)
                this.props.navigation.navigate('Login')
            }else{
                alert(responseJson.error)
            }
            
        }).catch((error) => {
            console.log('personal error',error);
        });
    }




    render() {
        return (
            <View style={styles.container}>
             <TextInput 
                value= {this.state.name}
                onChangeText={(name) => this.setState({ name })}
                placeholder= {' UserName '}
                style={styles.input}
             />
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
                    </Picker>
            </Form>
                    
             <Button 
                title= { 'Register' }
                style= { styles.input }
                onPress={this.__registerCall}
             /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
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
