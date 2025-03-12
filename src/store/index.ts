import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer/reduser';

export const store = configureStore({reducer});
