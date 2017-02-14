/**
 * 编辑任务对话框
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Animated,
    LayoutAnimation,
    Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import RadioButtonGroup from '../components/radio-button-group';
import PopDialog from './base-pop-dialog';


class EditTaskDialog extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };
    static propTypes = {
        isOpen: PropTypes.bool,
        isHiddening: PropTypes.bool,
        onHidden: PropTypes.func,
    };

    static defaultProps = {
        isOpen: false,
        isHiddening: false,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPressMenuMove() {
        alert("onPressMenuMove")
    }

    onPressMenuDelete() {
        alert("onPressMenuDelete")
    }

    onPressMenuBackground() {
        alert("onPressMenuBackground")
    }

    genMenuItem(icon, title, onPressFunc) {
        return (
            <TouchableWithoutFeedback onPress={onPressFunc.bind(this)} style={styles.menuItem}>
                <View style={styles.menuItem}>
                    <Image style={styles.menuItemIcon} source={icon}/>
                    <Text style={styles.menuItemTitle}>{title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const {isOpen, onHidden} = this.props;
        // console.log("edit-task-pop-dialog",isOpen)
        return (<PopDialog dialogHeight={120} isOpen={isOpen} onHidden={onHidden}>
            {this.genMenuItem(require('./../imgs/icon_menu_move.png'), "Move late tasks to today", this.onPressMenuMove)}
            {this.genMenuItem(require('./../imgs/icon_menu_delete.png'), "Delete all completed tasks", this.onPressMenuDelete)}
            {this.genMenuItem(require('./../imgs/icon_menu_background.png'), "Background", this.onPressMenuBackground)}
        </PopDialog>);


    }
}

const styles = StyleSheet.create({

    menuItem: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 40,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    menuItemIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 20,
        marginRight: 20,
    },
    menuItemTitle: {
        color: '#A7B8D1',
        fontSize: 18,
        fontWeight: '300',
    },
});

export default connect(
    (state, props) => ({})
)(EditTaskDialog)
