import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';
import { useContext } from 'react';
import { DataContext } from './ManagementSystem';
import './ManagementTable.scss';


const tableHeadCellsx = i => {
    const _sx = {  }

    return _sx
}
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
        label: "ACTIONS"
    }
]

const keys = [
    "date",
    "id",
    "company_name",
    "reviews",
    "price",
    "order_status",
    "payment_status",
]

const ManagementTable = () => {
    const { data } = useContext( DataContext );

    return (
        <TableContainer className='margin--top-standard table-container' component={ Paper }  sx={ { minHeight: "500px" } }>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            tableHead.map( ( head, i ) => <TableCell key={ i } sx={ tableHeadCellsx(i) } align="left"> { head.label } </TableCell> )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            data.map( 
                                ( product, i ) => <TableRow key={ i }>
                                    { keys.map(
                                        ( key, keyI ) => <TableCell key={ keyI } align="left"> { product?.[key] || "" } </TableCell>
                                    ) }
                                    { 
                                        <TableCell sx={ { minWidth: "175px" } } align='left' className='last-row'>
                                            <span className="last-row-btns fd">
                                                <span className='view-btn'>View</span> <span className='delete-btn'>Delete</span>
                                            </span>
                                        </TableCell> }
                                </TableRow> )
                        }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ManagementTable