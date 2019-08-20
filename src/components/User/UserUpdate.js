import React from 'react';
import { View , Button, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import Constants from '../../constants';

const BASEURL = Constants.baseUrl + "manage/owners/";

export default class UserUpdateScreen extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            name: '',
            email: '',
            ownerId: '',
            userName: '',
            userEmail: '',
        }
        this.handleclick = this.handleclick.bind(this);
    }

    componentDidMount() {
        this.setState({
            name: this.state.userName,
            email: this.state.userEmail,
        })
    }

    async handleclick() {
        const url = BASEURL + this.state.ownerId;
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
                                    "email": this.state.email,
                                })        
        }).then(response => response.json())
          .then((_) => {
            console.log(_)
              if(_.msg){
              alert(_.msg);
              this.goBack()
            }  else{
                alert(_.error)
              }
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
        const {navigation } = this.props;
        this.state.ownerId = navigation.getParam('ownerId');
        this.state.userName = navigation.getParam('userName');
        this.state.userEmail = navigation.getParam('userEmail');

        return (
            <React.Fragment>
            <View style={styles.container}>
            <TextInput 
                value= {this.state.name}
                blurOnSubmit= {true}
                onChangeText={(name) => this.setState({ name })}
                placeholder= {'name'}
                style={styles.input}
            />
            <TextInput 
                value= {this.state.email}
                blurOnSubmit= {true}
                onChangeText={(email) => this.setState({ email })}
                placeholder= {'email'}
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

const styles = StyleSheet.create({
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
      
    
  });