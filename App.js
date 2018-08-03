import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Button, Text, Card, CardItem, Left, Thumbnail, Right, Body, Fab }
  from 'native-base';
import {Image} from 'react-native'
import axios from 'axios'
class App extends Component {
  state = {
    dataZomato: [],
    search: '',
    status:false
  }

  cariMakan() {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
    var config = {
      headers: { 'user-key': '7d264fd54d122817d831810aa94716a0' }
    };
    axios.get(url, config).then((ambilData) => {
      console.log(ambilData.data.restaurants)
      this.setState({
        dataZomato: ambilData.data.restaurants
      })
    })
  }

  render() {

    const data = this.state.dataZomato.map((item, i) => {
      var gambar = item.restaurant.thumb
      var nama = item.restaurant.name
      var kota = item.restaurant.location.city
      var cost = item.restaurant.average_cost_for_two
      var harga = cost / 2
      var addr = item.restaurant.location.address
      return (
        <Card style={{ flex: 0 }} key={i}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{ uri: gambar }} />
              <Body>
                <Text>{nama}</Text>
                <Text note>{kota}</Text>
              </Body>
            </Left>
            <Right>
              <Text>Rp. {harga}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: gambar }}
            style={{height: 200, width: 370, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="planet" color='blue'/>
              <Text>{addr}</Text>
            </Left>
          </CardItem>
        </Card>
      )
    })

    return (
      <Container>
        <Header searchBar>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari makanan..."
              onChangeText={(x) => { this.setState({ search: x }) }}
            ></Input>
          </Item>

        </Header>
        <Header>
          <Button block
            onPress={() => { this.cariMakan() }}
          >
            <Text> LIHAT DAFTAR RESTO </Text>
          </Button>
        </Header>
        <Content>

          {data}


        </Content>
        <Fab
          active={this.state.status}
          direction='up'
          position='bottomRight'
          
          onPress={()=>{
            this.setState({
              status: !this.state.status
            })
          }}
          >

          <Icon name='share'/>
          <Button style={{ backgroundColor: 'blue' }}>
          <Icon name='facebook' type='Zocial'/>
          </Button>
          <Button style={{ backgroundColor:'lightblue' }}>
          <Icon name='twitter' type='Zocial'/>
          </Button>
          <Button style={{ backgroundColor:'green' }}>
          <Icon name='instagram' type='Zocial'/>
          </Button>
          </Fab>
      </Container>
    );
  }
}
export default App;