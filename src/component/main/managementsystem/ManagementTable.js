import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Modal, 
    Box,
    Select,
    MenuItem,
    TablePagination
} from '@mui/material';
import {
    useState,
    useEffect,
    useContext, 
} from 'react';
import { DataContext } from './ManagementSystem';
import ManagementOrderModal from "./ManagementOrderModal";
import './ManagementTable.scss';
import { FunctionContext } from '../Main';

const rootUrl = process.env.REACT_APP_API_URL

const tableHead = [
    {
        label: "DATE"
    },
    {
        label: "ORDER ID"
    },
    {
        label: "COMPANY NAME"
    },
    {
        label: "REVIEWS"
    },
    {
        label: "PRICE"
    },
    {
        label: "ORDER STATUS"
    },
    {
        label: "PAYMENT STATUS"
    },
    {
        label: "REMARKS"
    },
    {
        label: "ACTIONS"
    }
]

const keys = [
    "created_at",
    "id",
    "company",
    "number_of_reviews",
    "total_price",
    "order_status",
    "payment_status",
    "remarks",
]

const orderStatusDropDown = [
    { 
        value: 0, 
        label: "New" 
    }, { 
        value: 1, 
        label: "Seen" 
    }, { 
        value: 2, 
        label: "Preparing" 
    }, { 
        value: 3, 
        label: "Finished" }
]

const paymentStatusDropDown = [
    { 
        value: 0,
        label: "New"
    }, { 
        value: 1,
        label: "Sent Invoice"
    }, { 
        value: 2,
        label: "Paid"
    }, { 
        value: 11,
        label: "Payment Reminder 1"
    }, { 
        value: 12,
        label: "Payment Reminder 2"
    }
]


const ManagementTable = ( ) => {
    // function context

    const { 
        dateStringify,
        handleOrderUpdate,
        handlePaymentUpdate 
    } = useContext( FunctionContext );

    // function context

    const { orders, fetchTableData } = useContext( DataContext );

    const [ currentPage, setCurrentPage ] = useState( 0 );

    const [ order, setOrder ] = useState( null );
    const [ updateOrderOpen, setUpdateOrderOpen ] = useState( false );

    const handleUpdateOrderOpen = id => {
        // find order and set it
        if ( !orders.length ) return

        const orderFound = orders.find( _order => Number( _order.id ) === Number( id ) )

        if ( orderFound ) setOrder( orderFound )
    }
    const handleUpdateOrderClose = () => setOrder( null )

    useEffect( () => {
        if ( order?.id ) setUpdateOrderOpen( true )
        else setUpdateOrderOpen( false )
    }, [ order ] )

    const handleDeleteOrder = ( product_id ) => {
        const deletOrder = window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS ORDER?")

        if ( !deletOrder ) return
        
        fetch( `${rootUrl}/order/${product_id}`, {
            method: 'DELETE'
        } )
        .then( resp => {
            if ( resp.ok ) {
                window.confirm("Order deleted!")
                fetchTableData()
            }
            return resp.json()
        } )
        .catch( err => {
            console.log( err )
            window.alert( "Something went wrong" )
        } )
    }

    const cellGenerator = ( product, i, key, keyI ) => {
        if ( keyI === 0 ) {
            const dateDt = new Date( product?.[key] );

            return dateStringify( dateDt )
        }

        if ( keyI === 2 ) return product?.[key].name

        if ( keyI === 5 ) {
            return <Select
                        id={ `order_status_${ i }` }
                        label="ORDER STATUS"
                        sx={ { width: "max-content" } }
                        variant="standard"
                        value={ Number( product?.[key] ) }
                        onChange={ e => handleOrderUpdate( e.target.value, product.id, fetchTableData ) } >
                            {
                                orderStatusDropDown.map( ( orderStatus, orderI ) => 
                                    <MenuItem key={ orderI }
                                        value={ orderStatus.value }>
                                        { orderStatus.label }
                                    </MenuItem> )
                            }

                    </Select>
        }
        
        if ( keyI === 6 ) {
            return <Select
                        id={ `payment_status${ i }` }
                        label="PAYMENT STATUS"
                        sx={ { width: "max-content" } }
                        variant="standard"
                        value={ Number( product?.[key] ) }
                        onChange={ e => handlePaymentUpdate( e.target.value, product.id, fetchTableData ) } >
                            {
                                paymentStatusDropDown.map( ( paymentStatus, paymentI ) => 
                                    <MenuItem key={ paymentI }
                                        value={ paymentStatus.value }>
                                        { paymentStatus.label }
                                    </MenuItem> )
                            }

                    </Select>
        }

        return product?.[key]
    }

    return (
        <>
        
            <Modal 
                open={ updateOrderOpen }
                onClose={ handleUpdateOrderClose } >
                    <Box className='order-modal-box'>
                        <ManagementOrderModal
                            open={ updateOrderOpen } 
                            handleClose={ handleUpdateOrderClose }
                            order={ order }
                            dateStringify={ dateStringify }
                            fetchTableData={ fetchTableData } />
                    </Box>
            </Modal>
            <TableContainer 
                className='margin--top-standard table-container' 
                component={ Paper }
            >
                <Table
                    sx={ { width: "100%" } }>
                    <TableHead>
                        <TableRow>
                            {
                                tableHead.map( ( head, i ) => <TableCell key={ i } align="left"> { head.label } </TableCell> )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders
                            .slice( currentPage * 10, currentPage * 10 + 10 )
                            .map( 
                                ( product, i ) => <TableRow key={ i }>
                                    {
                                        keys.map( ( key, keyI ) => <TableCell key={ keyI } align="left">
                                            { cellGenerator( product, i, key, keyI ) }
                                        </TableCell>  )
                                    }
                                    <TableCell sx={ { minWidth: "150px" } } align='left' className='last-row'>
                                        <span className="last-row-btns fd">
                                            <span 
                                                className='view-btn'
                                                onClick={ () => handleUpdateOrderOpen( product.id ) }>View</span> 
                                                <span onClick={ () => handleDeleteOrder( product.id )  } className='delete-btn'>Delete</span>
                                        </span>
                                    </TableCell>
                                </TableRow> )
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    rowsPerPage={10}
                    count={orders.length}
                    page={currentPage}
                    onPageChange={ ( e, newPage ) => setCurrentPage( newPage ) }
                />
            </TableContainer>
        </>
    )
}

export default ManagementTable