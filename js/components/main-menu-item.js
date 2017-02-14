import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'


class MainMenuItem extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };
    static propTypes = {
        title: PropTypes.string,
        count: PropTypes.number,
        onPress:PropTypes.func,
        isShowSlider:PropTypes.bool,
    };

    static defaultProps = {
        title:'Item',
        count:0,
        onPress:()=>console.log('press item.'),
        isShowSlider:true,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    genSliderUI(){
        const {isShowSlider} = this.props;
        if(isShowSlider){
            return <View style={styles.menuSlider}/>;
        }
    }

    render() {
        const {title,count} = this.props;
        return (

            <View style={styles.menuItemContainer}>
                <TouchableOpacity style={styles.menuItemContainer} onPress={this.props.onPress.bind(this,title)}>
                <View style={styles.menuItem}>

                        <Text style={styles.taskCount}>0</Text>

                    <Text style={styles.taskDate}>{title}</Text>
                </View>
                </TouchableOpacity>
                {this.genSliderUI()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuItemContainer:{
        flexDirection:'row',
        flex:1,
    },
    menuItem:{
        flex:1,
        alignItems:'center',
    },
    menuSlider:{
        height:46,
        width:1,
        backgroundColor:'#313744',
    },
    taskCount:{
        color:'#F9FBFC',
        padding:5,
        paddingTop:0,
        fontSize:20,
        justifyContent:'center',
        alignItems: 'center',
        textAlignVertical:'center',
    },
    taskDate:{
        color:'#A2A4A9',
        fontWeight:'900',
    },
});

export default connect(
    (state, props) => ({})
)(MainMenuItem)
