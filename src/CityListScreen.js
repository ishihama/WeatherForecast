// @flow
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import CITIES from './cities.json';
import { getCoordinates } from './GeolocationService';

type State = {
    data: *[],
};

type Props = {
    navigation: NavigationScreenProps<*>,
};

class CityListScreen extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {data: CITIES};
    }

    componentDidMount(){
        getCoordinates()
          .then(({ latitude, longitude}) => {
              CITIES.unshift({
                  name: '現在地',
                  en: '',
                  latitude,
                  longitude,
              });
              this.setState({ data: CITIES });
          })
    }

    onPress(item: *){
        const { navigation } = this.props;
        navigation.navigate('Weather', { city : item });
    }

    render() {
        return (
            <FlatList
              data={this.state.data}
              keyExtractor={item => item.en}
              renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => this.onPress(item)}
                    style={styles.itemContainer}
                  >
                    <Text style={styles.text}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
              )}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 8,
        height: 48,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default CityListScreen;