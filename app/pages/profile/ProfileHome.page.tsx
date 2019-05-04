import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'

export class ProfileHome extends Component {
  
  static navigationOptions = {
    title: 'Perfil'
  }

  render() {
    return (
      <View>
        <Image style={{ width: '100%' }} source={require('../../assets/img/cyclist.jpg')} ></Image>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHome)
