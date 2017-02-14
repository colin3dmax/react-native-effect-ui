/**
 * 添加新任务对话框
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


class AddTaskDialog extends Component {
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
        this.state = {
            taskName: '',
            dateSelectIndex: 0,
        };
    }


    onPressDateItem(item, index, selectedIndex) {
        // LayoutAnimation.spring();
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

    render() {
        const {isOpen, onHidden} = this.props;
        const dialogHeight = Dimensions.get('window').height - 100;
        const {dateSelectIndex} = this.state;

        // console.log("add-task-pop-dialog",isOpen)

        return (<PopDialog dialogHeight={dialogHeight} isOpen={isOpen} onHidden={onHidden}>
            <View style={styles.enterTaskArea}>
                <Image style={styles.iconArrow} source={require('./../imgs/icon_right_arrow.png')}/>
                <TextInput
                    style={styles.taskNameInput}
                    placeholderTextColor="#AABBD3"
                    underlineColorAndroid="transparent"
                    placeholder={'Enter your task'}
                    onChangeText={(taskName) => this.setState({taskName})}
                    value={this.state.taskName}/>
            </View>
            <View style={styles.itemPanel}>
                <View style={styles.itemTitleArea}>
                    <Text style={styles.itemTitle}>DUE DATE</Text>
                </View>
                <RadioButtonGroup dataSouce={[{
                        title:'06',
                        subTitle:'Today',
                    },{
                        title:'07',
                        subTitle:'Tomorrow',
                    },{
                        title:'13',
                        subTitle:'Next week',
                    },{
                        title:'00',
                        subTitle:'Pick date',
                    },{
                        title:'∞',
                        subTitle:'No date',
                    },]} renderItem={this.renderGroupButtonDateItem.bind(this)} selectIndex={dateSelectIndex}/>
            </View>
        </PopDialog>);
    }
}

const styles = StyleSheet.create({
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
    boxItemTitle: {
        color: '#666B74',
        margin: 20,
        marginTop: 40,
        fontSize: 16,
    },
    enterTaskArea: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
    },
    iconArrow: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginRight: 10,
    },
    taskNameInput: {
        color: '#AABBD3',
        flex: 1,
    },
    itemPanel: {
        flex: 1,
    },
    itemTitleArea: {
        padding: 20,
        paddingBottom: 10,
    },
    itemTitle: {
        color: '#666B74',
        fontWeight: '600',
    },
    groupButtonDateSelectedItem: {
        alignItems: 'center',
        width: 95,
        height: 66,
        backgroundColor: 'transparent',
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
    },
    groupButtonDateDefaultItemOut: {
        alignItems: 'center',
        width: 95,
        height: 66,
    },
    groupButtonDateDefaultItem: {
        alignItems: 'center',
        width: 95,
        height: 66,
        backgroundColor: 'transparent',
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
    },
    groupButtonSelectedTitle: {
        padding: 5,
        fontWeight: '600',
        color: '#748C99',
        fontSize: 18,
    },
    groupButtonDefaultTitle: {
        padding: 5,
        fontWeight: '600',
        color: '#748C99',
        fontSize: 18,
    },
    groupButtonSelectedSubTitle: {
        padding: 5,
        color: '#748C99',
    },
    groupButtonDefaultSubTitle: {
        padding: 5,
        color: '#748C99',
    },

});

export default connect(
    (state, props) => ({})
)(AddTaskDialog)
