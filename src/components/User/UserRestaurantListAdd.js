import React from 'react';
import {View, Button, Text, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import Constants from '../../constants';
import { ActivityIndicator } from 'react-native-paper';
import { CheckBox, Card , ListItem} from 'react-native-elements';


export default class UserRestaurantListAddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            availableRestaurantList: [],
            checked: [],
            selectedRestaurants: [],
            userId: '',
            idArr: [],
        }
        this.handleclick = this.handleclick.bind(this);
        const { navigation } = this.props;
        this.state.userId = navigation.getParam('userId')
    }

    async componentDidMount() {
        const url = Constants.baseUrl + 'manage/available/restaurants'
        const value = await AsyncStorage.getItem('token');  
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };      
        fetch(url, {
            method: 'GET',
            headers: urlHeaders,    
        }).then(response => response.json())
          .then((responseJSON) => {
              console.log(responseJSON)
              this.setState({
                  loading: false,
                  availableRestaurantList: responseJSON
              })
          }).catch((error) => {
              alert(error)
          });        
    }

    async handleclick() {
        const url = Constants.baseUrl + 'manage/owners/'+ this.state.userId + '/restaurants';
        console.log(this.state.checked)
        for(i=0;i<this.state.checked.length;i++){
            this.state.selectedRestaurants[i]=this.state.checked[i]
        }
        const value = await AsyncStorage.getItem('token');  
        const urlHeaders = {
            token:  value,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };      
        fetch(url, {
            method: 'POST',
            headers: urlHeaders,
            body: JSON.stringify({
                                    "idArr": this.state.selectedRestaurants
                                 })          
        }).then(response => response.json())
          .then((_) => {
              console.log(_)
              if(_.msg){
              alert(_.msg)
            }else 
              alert(_.error)
              this.goBack();
          }).catch((error) => {
              alert(error)
          });
    
}
        goBack() {
            const { navigation } = this.props;
            navigation.state.params.onGoBack();
            navigation.goBack()
        }



        checkItem = item => {
            const { checked } = this.state;
        
            if (!checked.includes(item)) {
              this.setState({ checked: [...checked, item] });
            } else {
              this.setState({ checked: checked.filter(a => a !== item) });
            }
        };

    render() {

        if(this.state.loading){
            return (
                <View>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            );
        }
        return (
            <React.Fragment>
                <Button 
                    title= "Add"
                    onPress={this.handleclick}
                />
                <View style={{ flex:1, alignItems: 'center', marginTop: 40 ,color: 'orange'}}>
                    <Text>Choose Restaurants</Text>
                </View>
                <ScrollView> 
                <Card>
                    {
                        this.state.availableRestaurantList.map((u,i) => {
                            return (
                            <CheckBox
                                title= {u.name}
                                key={i}
                                checked={this.state.checked.includes(u.id)}
                                onPress={() => this.checkItem(u.id)}
                            />
                            );
                        })

                    }

                </Card>
                
                </ScrollView>
            </React.Fragment>
        )
    }
}


