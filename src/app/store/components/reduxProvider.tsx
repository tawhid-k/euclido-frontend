'use client'

import { Provider } from 'react-redux'
import store from '../store'
import { ReactNode } from 'react'
import AuthInitializer from './authInitializer'

interface ReduxProviderProps {
    children: ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    )
}

export default ReduxProvider
