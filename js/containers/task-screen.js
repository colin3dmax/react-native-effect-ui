import React, {Component, PropTypes,} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
    Animated,
    LayoutAnimation,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import EditTaskDialog from './../dialogs/edit-task-pop-dialog';
import AddTaskDialog from './../dialogs/add-task-pop-dialog';

class TaskScreen extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isShowPopMenu: false,
            isShowTaskPage: false,
            headImageFadeAnim: new Animated.Value(0),
            popAddTaskAnim: new Animated.Value(-300),
        };
    }

    componentDidMount() {
        this.state.headImageFadeAnim.setValue(0);
        this.state.popAddTaskAnim.setValue(-100);

        Animated.sequence([
            Animated.timing(
                this.state.headImageFadeAnim,
                {toValue: 1.0, delay: 300, duration: 500},
            ),
            Animated.timing(
                this.state.headImageFadeAnim,
                {toValue: 1.0, delay: 50, duration: 0},
            ),
            Animated.spring(
                this.state.popAddTaskAnim,
                {toValue: 0, friction: 6, tension: 50},
            )]).start();

    }

    onPressBack() {
        const {routes} = this.context;
        Actions.pop();
    }

    genMainBodyUI() {
        const isEmpty = true;
        if (isEmpty) {
            return this.genEmptyTaskUI();
        } else {
            return this.genTaskListUI();
        }
    }

    genEmptyTaskUI() {
        return (
            <View style={styles.emptyContainer}>
                <Image style={styles.emptyIcon} source={require('./../imgs/icon_done.png')}/>
                <Text style={styles.emptyDone}>All done</Text>
                <Text style={styles.emptyTip}>Tap on + to add a new task.</Text>
            </View>
        );
    }

    genTaskListUI() {
        return (
            <View>
            </View>
        );
    }

    onPressAddTask() {
        console.log("onPressAddTask");
        this.setState({isShowTaskPage: true});
    }

    onHiddenAddTaskDialog() {
        console.log("onHiddenAddTaskDialog");
        this.setState({isShowTaskPage: false});
    }

    onPressMenu() {
        console.log("onPressMenu");
        this.setState({isShowPopMenu: true});
    }

    onHiddenEditTaskDialog() {
        console.log("onHiddenEditTaskDialog");
        this.setState({isShowPopMenu: false});
    }

    render() {
        const {isShowPopMenu, isShowTaskPage} = this.state;
        return (
            <View style={styles.container}>
                <Animated.Image source={require('./../imgs/bg01.jpg')}
                                style={[styles.navBar,{opacity: this.state.headImageFadeAnim}]}>
                    <View style={styles.navBarMenu}>
                        <Icon onPress={this.onPressBack.bind(this)} style={styles.navButtonBack} size={40} color='white'
                              name='ios-arrow-round-back'/>
                        <View style={styles.navBarMiddle}/>
                        <Icon onPress={this.onPressMenu.bind(this)} style={styles.navButtonEdit} size={40} color='white'
                              name='ios-list'/>
                    </View>
                    <Text style={styles.taskTitle}>{this.props.data}</Text>
                </Animated.Image>
                <View style={styles.mainBody}>
                    {this.genMainBodyUI()}
                </View>
                <TouchableHighlight style={styles.btnAddTask} onPress={this.onPressAddTask.bind(this)}>
                    <Animated.Image source={require('./../imgs/btn_add.png')}
                                    style={[styles.btnAddTaskImg,{right:this.state.popAddTaskAnim}]}/>
                </TouchableHighlight>
                <EditTaskDialog isOpen={isShowPopMenu} onHidden={this.onHiddenEditTaskDialog.bind(this)} me={this}/>
                <AddTaskDialog isOpen={isShowTaskPage} onHidden={this.onHiddenAddTaskDialog.bind(this)} me={this}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    navBar: {
        // backgroundColor:'#15445D',
        height: 150,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        padding: 20,
    },
    navBarMenu: {
        flexDirection: 'row',
    },
    navBarMiddle: {
        flex: 1,
    },
    navButtonBack: {
        backgroundColor: 'transparent',
    },
    navButtonEdit: {
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
    },
    taskTitle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 20,
        marginTop: 50,
    },
    mainBody: {
        flex: 1,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    emptyIcon: {
        width: 50,
        height: 50,
        margin: 5,
        marginTop: -50,
    },
    emptyDone: {
        margin: 5,
        fontWeight: '900',
        color: '#6C8492',
        fontSize: 16,
    },
    emptyTip: {
        margin: 5,
        fontWeight: '300',
        color: '#BECADA',
    },
    btnAddTask: {
        width: 52,
        height: 52,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    btnAddTaskImg: {
        width: 52,
        height: 52,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    mask: {
        backgroundColor: 'black',
        opacity: 0.8,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        // zIndex:999,
    },
    bottomPanel: {
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        padding: 10,
    },
});

export default connect(
    (state, props) => ({})
)(TaskScreen)
