import { Text, View, StyleSheet, ScrollView, ToastAndroid, Platform } from 'react-native';
import React, { Component, PropTypes } from 'react';

import { ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class SaunaItem extends Component {
    render() {
        const { listItem } = this.context.uiTheme;
        const flattenPrimaryText = StyleSheet.flatten(listItem.primaryText);
        return (
            <ListItem
                divider
                leftElement="person"
                centerElement={{
                    primaryText: this.props.name,
                    secondaryText: this.props.address,
                    tertiaryText: this.props.telephone,
                }}
                style={{
                    secondaryText: { color: flattenPrimaryText.color },
                }}
            />
        );
    }
}
SaunaItem.contextTypes = contextTypes;


class SaunaList extends Component {
  componentWillMount() {
    this.setState({
      saunaList: [, ]
    })
  }
    componentDidMount() {
      fetch('http://saunalife.me/api/saunas')
          .then((res) => res.json()
          .then((data) => {
            this.setState({
              saunaList: data
            })
          }));
  }
    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <ScrollView style={styles.container}>
                  {
                    this.state.saunaList.map((data) => {
                      return (<SaunaItem name={data.name} address={data.address} telephone={data.telephone} />)
                  })
                  }
                </ScrollView>
            </View>
        );
    }
}

SaunaList.propTypes = propTypes;
SaunaList.contextTypes = contextTypes;

export default SaunaList;
