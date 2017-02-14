/**
 * Created by Colin3dmax on 2016/12/26.
 */
'use strict';

import {combineReducers} from 'redux';
import task from './task';

const rootReducer = combineReducers({
    task,
});

export default rootReducer;
