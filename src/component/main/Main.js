import { createContext } from 'react';
import { Outlet } from 'react-router-dom'
import './Main.scss';

const FunctionContext = createContext( );

const rootUrl = process.env.REACT_APP_API_URL

const Main = () => {

    const dateStringify = date => {
        const month = ( date.getMonth() + 1 ) > 9 ? date.getMonth() + 1 : `0${ date.getMonth() + 1 }`
        const day = date.getDate() > 9 ? date.getDate() : `0${ date.getDate() }`

        return `${ date.getFullYear() }-${ month }-${ day }`
    }

    const handleOrderUpdate = ( newStatus, id, successCall=null ) => {
        // update here
        const url = rootUrl + `/order/order_status/${id}`

        fetch( url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { order_status: newStatus } )
        } )
        .then( resp => {
            if ( resp.ok ) {
                window.confirm("Order updated!")
                if ( successCall ) successCall();
            }
            return resp.json()
        } )
        .catch( err => {
            console.log( err )
            window.alert( "Something went wrong" )
        } )
    }

    const handlePaymentUpdate = ( newStatus, id, successCall=null ) => {
        // update here
        const url = rootUrl + `/order/payment_status/${id}`

        fetch( url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { payment_status: newStatus } )
        } )
        .then( resp => {
            if ( resp.ok ) {
                window.confirm("Order updated!")
                if ( successCall ) successCall();
            }
            return resp.json()
        } )
        .catch( err => {
            console.log( err )
            window.alert( "Something went wrong" )
        } )
    }
    
    return (
        <FunctionContext.Provider
            value={ {
                dateStringify,
                handleOrderUpdate,
                handlePaymentUpdate
            } }>    
            <main>
                <Outlet />
            </main>
        </FunctionContext.Provider>
    )
}

export default Main;
export { FunctionContext };