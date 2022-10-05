import { configureStore } from "@reduxjs/toolkit";
import user from '../Features/Users'
export default configureStore({
    reducer: {
        user: user
    }
})