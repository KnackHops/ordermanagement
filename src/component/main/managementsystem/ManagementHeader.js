import { 
    Button, 
    TextField, 
    FormControl,
    InputLabel,
    Select,
    MenuItem, 
    Modal, 
    Box 
} from "@mui/material"
import { useContext, useState } from "react";
import ManagementOrderModal from "./ManagementOrderModal";
import { DataContext } from "./ManagementSystem";
import './ManagementHeader.scss';

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
    }
]

const filterByOption = [
    {   
        value: "order_id",
        label: "ORDER ID"
    },
    {   
        value: "company",
        label: "COMPANY"
    },
    {   
        value: "order_status",
        label: "ORDER STATUS"
    },
    {   
        value: "payment_status",
        label: "PAYMENT STATUS"
    },
    {
        value: "",
        label: "NONE",  
    },
]

const InputLabelProps = {
  shrink: true,
}

const ManagementHeader = ( { updateDataHandler } ) => {
    const { 
        filterBy, 
        handleFilterBy, 
        keyword, 
        handleKeyWord,
        start_date,
        startDateMax,
        handleStartDate,
        end_date,
        handleEndDate,
        fetchTableData
    } = useContext( DataContext );

    const [ addOrderOpen, setAddOrderOpen ] = useState( false )

    const handleAddOrderOpen = () => setAddOrderOpen( true )
    const handleAddOrderClose = () => setAddOrderOpen( false )

    return (
        <div className="section-header margin--top-standard fd">
            <Button className="add-btn -big" type="button" variant="contained" onClick={ handleAddOrderOpen }>Add New Order</Button>
            <Modal 
                open={ addOrderOpen }
                onClose={ handleAddOrderClose } >
                    <Box className="order-modal-box">
                        <ManagementOrderModal
                            open={ addOrderOpen } 
                            handleClose={ handleAddOrderClose }
                            fetchTableData={ fetchTableData } />
                    </Box>
            </Modal>
            <div className="header-fields fd">
                <FormControl variant="standard">
                    <InputLabel id="filter_label">
                        FILTER
                    </InputLabel>
                    <Select
                        labelId='filter_label'
                        id="filter-by"
                        label="FILTER"
                        value={ filterBy }
                        sx={ { minWidth: "12rem" } }
                        onChange={ e => handleFilterBy( e.target.value ) } >
                            {
                                filterByOption.map( ( filterOption, i ) =>
                                    <MenuItem
                                        key={ i }
                                        value={ filterOption.value } >
                                        { filterOption.label }
                                    </MenuItem>
                                )
                            }
                    </Select>
                </FormControl>
                {
                    filterBy === "order_status"  && 
                    <FormControl variant="standard">
                        <InputLabel id="order_status_label">
                            ORDER STATUS
                        </InputLabel>
                        <Select
                            labelId='order_status_label'
                            id="order_status"
                            label="ORDER STATUS"
                            value={ keyword }
                            sx={ { minWidth: "12rem" } }
                            onChange={ e => handleKeyWord( e.target.value ) } >
                                {
                                    orderStatusDropDown.map( ( orderOption, i ) =>
                                        <MenuItem
                                            key={ i }
                                            value={ orderOption.value } >
                                            { orderOption.label }
                                        </MenuItem>
                                    )
                                }
                        </Select>
                    </FormControl>
                }
                {
                   filterBy === "payment_status" && 
                   <FormControl variant="standard">
                       <InputLabel id="payment_status_label">
                            PAYMENT STATUS
                       </InputLabel>
                       <Select
                           labelId='payment_status_label'
                           id="payment_status"
                           label="PAYMENT STATUS"
                           value={ keyword }
                           sx={ { minWidth: "12rem" } }
                           onChange={ e => handleFilterBy( e.target.value ) } >
                               {
                                   paymentStatusDropDown.map( ( paymentOption, i ) =>
                                       <MenuItem
                                           key={ i }
                                           value={ paymentOption.value } >
                                           { paymentOption.label }
                                       </MenuItem>
                                   )
                               }
                       </Select>
                   </FormControl>
                }
                {
                    filterBy !== "order_status" && filterBy !== "payment_status" && 
                    <TextField 
                        id="keyword" 
                        label="KEYWORD"
                        value={ keyword }
                        onChange={ e => handleKeyWord( e.target.value ) }
                        variant="standard"  />
                }
                <div className="text-fields fd">
                    <TextField 
                        id="start_date" 
                        type="date" 
                        label="START DATE"
                        value={ start_date }
                        onChange={ e => handleStartDate( e.target.value ) }
                        variant="standard" 
                        InputLabelProps={ InputLabelProps }
                        inputProps={ { max: startDateMax } } />
                    <TextField 
                        id="end_date" 
                        type="date" 
                        label="END DATE"
                        value={ end_date }
                        onChange={ e => handleEndDate( e.target.value ) }
                        variant="standard"
                        InputLabelProps={ InputLabelProps }
                        InputProps={ { min: start_date } } />
                </div>
                <Button variant="contained" className="-gray -big" onClick={ updateDataHandler } >Update Data</Button>
            </div>
        </div>
    )
}

export default ManagementHeader;