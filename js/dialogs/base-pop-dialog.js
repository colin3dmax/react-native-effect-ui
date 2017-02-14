/**
 * 上滑弹出框-基础类
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
import {Actions} from 'react-native-router-flux'
import RadioButtonGroup from '../components/radio-button-group'


class BasePopDialog extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };
    static propTypes = {
        isOpen: PropTypes.bool,
        isHiddening: PropTypes.bool,
        onHidden: PropTypes.func,
        dialogHeight: PropTypes.number,
    };

    static defaultProps = {
        isOpen: false,
        isHiddening: false,
        dialogHeight: 100,
    };

    constructor(props) {
        super(props);
        this.state = {
            popAddTaskAnim: new Animated.Value(-this.props.dialogHeight),
            fadeAnim: new Animated.Value(0),
            isShowMaskUI: false,
            isClosed: true,
            taskName: '',
            dateSelectIndex: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOpen != nextProps.isOpen) {
            if (nextProps.isOpen) {
                this.showDialog();
            } else {
                this.hideDialog();
            }
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.isOpen == nextProps.isOpen) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }


    showDialog() {
        this.setState({isClosed: false,});
        this.showMaskUI();
        Animated.spring(
            this.state.popAddTaskAnim,
            {toValue: 0, friction: 6, tension: 50},
        ).start();
    }

    hideDialog() {
        this.hideMaskUI();
        // this.state.popAddTaskAnim.setValue(0);
        Animated.spring(
            this.state.popAddTaskAnim,
            {toValue: -this.props.dialogHeight, friction: 6, tension: 50},
        ).start();
    }

    onPressMask() {
        this.hideDialog();
    }

    showMaskUI() {
        this.state.fadeAnim.setValue(0);
        this.setState({isShowMaskUI: false});
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0.5, duration: 200},
        ).start();
    }

    hideMaskUI() {
        this.state.fadeAnim.setValue(0.5);
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0.0, duration: 200},
        ).start((result) => {
            if (result.finished) {
                this.setState({isShowMaskUI: false, isClosed: true,});
                this.props.onHidden()
            }
        });
    }

    onPressDateItem(item, index, selectedIndex) {
        this.setState({dateSelectIndex: index});
    }

    renderGroupButtonDateItem(item, index, selectedIndex) {
        const isSelected = index == selectedIndex;
        if (isSelected) {
            return (
                <View key={'date-item-'+index} style={styles.groupButtonDateSelectedItem}>
                    <Text style={styles.groupButtonSelectedTitle}>{item.title}</Text>
                    <Text style={styles.groupButtonSelectedSubTitle}>{item.subTitle}</Text>
                </View>
            );
        } else {
            return (
                <View key={'date-item-'+index} style={styles.groupButtonDateDefaultItemOut}>
                    <TouchableHighlight onPress={this.onPressDateItem.bind(this,item,index,selectedIndex)}
                                        style={styles.groupButtonDateDefaultItemOut}>
                        <View style={styles.groupButtonDateDefaultItem}>
                            <Text style={styles.groupButtonDefaultTitle}>{item.title}</Text>
                            <Text style={styles.groupButtonDefaultSubTitle}>{item.subTitle}</Text>
                        </View>

                    </TouchableHighlight>
                </View>
            );
        }

    }


    genMaskUI() {
        return (
            <TouchableWithoutFeedback onPress={this.onPressMask.bind(this)}>
                <Animated.View style={[styles.mask,{opacity: this.state.fadeAnim}]}>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const {isOpen} = this.props;
        const {isClosed, dateSelectIndex} = this.state;
        // console.log("task-dialog",isOpen,isClosed);
        if (isClosed) {
            return null;
        } else {
            return (
                <View style={styles.settingDialogContainer}>
                    {this.genMaskUI()}
                    <Animated.View
                        style={[styles.boxItem,{height:this.props.dialogHeight,bottom:this.state.popAddTaskAnim}]}>
                        {this.props.children}
                    </Animated.View>
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    settingDialogContainer: {
        // backgroundColor:'blue',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        borderWidth: 1,
    },
    mask: {
        backgroundColor: 'black',
        opacity: 1.0,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    boxItem: {
        backgroundColor: 'white',
        margin: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
    },
});

export default connect(
    (state, props) => ({})
)(BasePopDialog)
