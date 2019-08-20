import React from 'react'
import { Left,Header, Right, Button} from 'native-base';
export default class HeaderScreen extends React.Component {
    render() {
        return (
            <Header>
                <Left>
                <Button style={{padding: 20, width: 30, height: 30}} >
                    <Icon style={{fontSize: 20, color: 'white'}}  name='plus-circle' />
                </Button>
                </Left>
                <Right>
                <Button style={{padding: 20, width: 30, height: 30}} >
                    <Icon style={{fontSize: 20, color: 'white'}}  name='edit' />
                </Button>
                </Right>
            </Header>
        );
    }
}