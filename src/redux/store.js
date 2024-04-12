import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './rootReducer';
import {baseApi} from './api/baseApi'; // Import baseApi từ tệp của bạn

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware), // Thêm middleware của baseApi vào đây
    devTools: process.env.NODE_ENV !== 'production'
});
