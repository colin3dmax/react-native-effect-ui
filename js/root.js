import React,{Component} from 'react';
import {Dimensions} from 'react-native';
import {Provider,connect} from 'react-redux';
import SceneMoveAnimation from './animations/scene-move-animation';
import configureStore from './store/configure-store';
import { Router,Scene,Actions } from 'react-native-router-flux';
import MainScreen from './containers/main-screen';
import TaskScreen from './containers/task-screen';

const store = configureStore();
const RouterWithRedux = connect()(Router);
const scenes = Actions.create(
    <Scene key="root" >
        <Scene key="main" component={MainScreen} title="主界面" hideNavBar={true} duration={300} direction="horizontal" animationStyle={SceneMoveAnimation}/>
        <Scene key="tasklist" component={TaskScreen} title="任务列表" hideNavBar={true} duration={300} direction="horizontal" animationStyle={SceneMoveAnimation} />
    </Scene>
);

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
        <RouterWithRedux scenes={scenes} />
      </Provider>
		)
	}
}
