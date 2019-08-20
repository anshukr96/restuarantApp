import React from 'react';
import { TextInput, View , Button, StyleSheet, AsyncStorage } from 'react-native';
import Constants from '../../constants';

const url = Constants.baseUrl + 'manage/owners';

export default class UsersAddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            email: '',
            password: '',
        }
        this.handleclick = this.handleclick.bind(this);
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
                                   "email": this.state.email,
                                   "password": this.state.password,
                                })          
        }).then(response => response.json())
          .then((_) => {
              if(_.msg)
                alert(_.msg)
              else  
                alert(_.error)  
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
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput 
                value= {this.state.name}
                onChangeText={(name) => this.setState({ name })}
                placeholder= {' name '}
                style={styles.input}
            />
            <TextInput 
                value= {this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder= {' email '}
                style={styles.input}
            />
            <TextInput 
                value= {this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder= {' password '}
                style={styles.input}
            />
            <Button
            onPress={this.handleclick}
            title='Submit'
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