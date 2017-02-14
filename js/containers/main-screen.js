import React, {Component, PropTypes} from 'react'
import {
    AppRegistry,
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
import {Actions, ActionConst} from 'react-native-router-flux';
import Box from './../components/task-box';
import GridView from 'react-native-grid-view';
import MenuItem from './../components/main-menu-item';
import SettingDialog from '../dialogs/setting-pop-dialog';


class MainScreen extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isShowSettingDialog: false,
            dataSource: [
                {index: 0, name: 'INBOX'},
                {index: 1, name: 'TRAVEL'},
                {index: 2, name: 'GROCERIES'},
                {index: 3, name: 'OTHERS'},
                {index: 4, name: 'ABC'},
                {index: 5, name: '123'},
                {index: 6, name: '456'},
            ],
        };
    }

    renderItem(item, index) {
        return <Box key={item.index} title={item.name}/>
    }

    onPressTaskList(title) {
        const {routes} = this.context;
        routes.tasklist(title);
    }

    onPressMenuButton() {
        this.setState({isShowSettingDialog: true});
    }

    onHiddenSettingDialog() {
        this.setState({isShowSettingDialog: false});
    }

    render() {
        const {isShowSettingDialog} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.titleBar}></View>
                <View style={styles.menuBar}>
                    <View>
                        <TouchableOpacity onPress={this.onPressMenuButton.bind(this)}>
                            <Image style={styles.mainMenu} source={require('./../imgs/MainMenu.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <GridView
                        items={this.state.dataSource}
                        itemsPerRow={2}
                        renderItem={this.renderItem}
                        style={styles.listView}
                    />
                </ScrollView>
                <View style={styles.bottomMenu}>
                    <MenuItem title="TODAY" onPress={this.onPressTaskList.bind(this)}/>
                    <MenuItem title="WEEK" onPress={this.onPressTaskList.bind(this)}/>
                    <MenuItem title="ALL" onPress={this.onPressTaskList.bind(this)} isShowSlider={false}/>
                </View>
                <SettingDialog isOpen={isShowSettingDialog} onHidden={this.onHiddenSettingDialog.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#232B3E',
        flex: 1,
    },
    titleBar: {
        height: 20,
    },
    menuBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    mainMenu: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    bottomMenu: {
        backgroundColor: '#171C28',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
    },
    menuSlider: {
        height: 46,
        width: 1,
        backgroundColor: '#313744',
    },
    taskCount: {
        color: '#F9FBFC',
        padding: 5,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    taskDate: {
        color: '#A2A4A9',
        fontWeight: '900',
    },
    boxGridRow: {
        flexDirection: 'row',
    },
    boxItemLeft: {
        height: 76,
        flex: 1,
        backgroundColor: '#151C2A',
        margin: 5,
        marginLeft: 10,
    },
    boxItemRight: {
        height: 76,
        flex: 1,
        backgroundColor: '#151C2A',
        margin: 5,
        marginRight: 10,
    },
    boxItemTitle: {
        color: '#666B74',
        margin: 20,
        marginTop: 40,
        fontSize: 16,
    },
    listView: {
        padding: 5,
    },
});

export default connect(
    (state, props) => ({})
)(MainScreen)
