import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableHighlight,
    LayoutAnimation,
    Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'


class RadioButtonGroup extends Component {
    static contextTypes = {
        routes: PropTypes.object.isRequired,
    };
    static propTypes = {
        title: PropTypes.string,
        dataSouce: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
        selectIndex: PropTypes.number,
        itemWidth: PropTypes.number,
    };

    static defaultProps = {
        selectIndex: 0,
        itemWidth:95,
    };

    componentWillMount() {
        // 创建动画
        // LayoutAnimation.spring();
    };

    componentWillReceiveProps(nextProps) {
        const oldSelectIndex = this.props.selectIndex;
        const newSelectIndex = nextProps.selectIndex;
        // console.log(`oldSelectIndex:${oldSelectIndex},newSelectIndex:${newSelectIndex}`);

        const {itemWidth} = this.props;
        let oldOffsetX = itemWidth*oldSelectIndex;
        let newOffsetX = itemWidth*newSelectIndex;
        // console.log(`oldOffsetX:${oldOffsetX},newOffsetX:${newOffsetX}`);
        this.state.selectItemOffsetX.setValue(oldOffsetX);
        Animated.spring(
            this.state.selectItemOffsetX,
            {toValue:newOffsetX, friction: 6.5, tension: 60},
        ).start();
    }

    constructor(props) {
        super(props);
        this.state = {
            selectItemOffsetX:new Animated.Value(this.props.itemWidth*this.props.selectIndex),
        };
    }

    render() {
        const {selectIndex} = this.props;
        return (
            <View style={[styles.buttonGroup]}>

                <ScrollView style={[styles.buttonGroupScrollView,{backgroundColor:'transparent'}]} horizontal={true}
                            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Animated.View style={[styles.boxSelectedItem,{width:this.props.itemWidth,left:this.state.selectItemOffsetX }]}></Animated.View>
                    {this.props.dataSouce.map((item, index) => {
                        return this.props.renderItem(item, index, selectIndex);
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
        minHeight: 36,
        backgroundColor: '#EEF1F4',
        borderColor: '#F1F2F3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    buttonGroupScrollView: {},
    boxItemTitle: {
        color: '#666B74',
        margin: 20,
        marginTop: 40,
        fontSize: 16,
    },
    boxSelectedItem:{
        position:'absolute',
        width:95,
        backgroundColor:'white',
        left:0,
        top:0,
        bottom:0,
        // zIndex:1,
    }
});

export default connect(
    (state, props) => ({})
)(RadioButtonGroup)
