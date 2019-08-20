import React from 'react';
import { View , Button, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import Constants from '../../constants';

const BASEURL = Constants.baseUrl + 'manage/restaurants/';

export default class ResturantMenuUpdateScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menuName: '',
            menuPrice: '',
            name: '',
            price: '',
            menuId: '',
            restaurantId: '',
        }
        const { navigation } = this.props;
        this.state.menuId = navigation.getParam('menuId');
        this.state.menuName = navigation.getParam('menuName');
        this.state.menuPrice = navigation.getParam('menuPrice');
        this.state.restaurantId = navigation.getParam('restaurantId');
        this.handleclick = this.handleclick.bind(this);
    }

    async handleclick() {
        const url = BASEURL + this.state.restaurantId + '/menu/'+ this.state.menuId;
        const value = await AsyncStorage.getItem('token');
        console.log(url)
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };  
        fetch(url, {
            method: 'put',
            headers: urlHeaders,
            body: JSON.stringify({ "name": this.state.name,
                                    "price": parseFloat(`${this.state.price}`),
                                })              
        }).then(response => response.json())
          .then((_) => {
              if(_.msg)
                alert(_.msg);
              else
              alert(_.error);
              this.goBack()
          }).catch((error) => {
              alert(error)
          });
    }

    goBack() {
        const { navigation } = this.props
        navigation.state.params.onGoBack()
        navigation.goBack()
    }

    componentDidMount() {
        this.setState({
            name: this.state.menuName,
            price: this.state.menuPrice
        })
    }

    render() {
        

        return (
           <React.Fragment>
            <View style={styles.container}>
            <TextInput 
                value= {this.state.name}
                blurOnSubmit= {true}
                onChangeText={(name) => this.setState({ name })}
                placeholder= {'Name'}
                style={styles.input}
            />
            <TextInput 
                value= {`${this.state.price}`}
                blurOnSubmit= {true}
                onChangeText={(price) => this.setState({ price })}
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