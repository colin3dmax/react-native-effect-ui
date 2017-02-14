import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'


class Box extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.boxItem]}>
                <Text style={styles.boxItemTitle}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxItem: {
        height: 76,
        flex: 1,
        backgroundColor: '#151C2A',
        margin: 5,
        borderRadius: 5,
    },
    boxItemTitle: {
        color: '#666B74',
        margin: 20,
        marginTop: 40,
        fontSize: 16,
    },
});

export default connect(
    (state, props) => ({})
)(Box)
