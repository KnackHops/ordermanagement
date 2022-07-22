import { Button, TextField, Autocomplete, Modal, Box } from "@mui/material"
import { useState } from "react";
import './ManagementHeader.scss';
import ManagementNewOrderModal from "./ManagementNewOrderModal";

const filterByOption = [
    "ORDER ID",
    "COMPANY NAME",
    "ORDER STATUS",
    "PAYMENT STATUS"
]

const InputLabelProps = {
  shrink: true,
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    padding: '4rem'
}

const ManagementHeader = () => {
    const [ addOrderOpen, setAddOrderOpen ] = useState( false )

    const handleAddOrderOpen = () => setAddOrderOpen( true )
    const handleAddOrderClose = () => setAddOrderOpen( false )

    const addNewOrderOpen = () => {
        handleAddOrderOpen()
    }

    return (
        <div className="section-header margin--top-standard fd">
            <Button className="add-btn -big" type="button" variant="contained" onClick={ addNewOrderOpen }>Add New Order</Button>
            <Modal 
                open={addOrderOpen}
                onClose={ handleAddOrderClose } >
                    <Box sx={ boxStyle }>
                        <ManagementNewOrderModal
                            open={ addOrderOpen } 
                            handleClose={ handleAddOrderClose } />
                    </Box>
            </Modal>
            <div className="header-fields fd">
                <Autocomplete
                    id="filter_by"
                    autoHighlight
                    options={ filterByOption }
                    sx={ { width: "12.5rem" } }
                    renderInput={ params => 
                        <TextField 
                            {...params} 
                            label="FILTER BY" 
                            variant="standard" /> }
                />
                <TextField 
                    id="keyword" 
                    label="KEYWORD" 
                    variant="standard"  />
                <div className="text-fields fd">
                    <TextField 
                        id="start_date" 
                        type="date" 
                        label="START DATE" 
                        variant="standard" 
                        InputLabelProps={InputLabelProps} />
                    <TextField 
                        id="end_date" 
                        type="date" 
                        label="END DATE" 
                        variant="standard"
                        InputLabelProps={InputLabelProps} />
                </div>
                <Button variant="contained" className="-gray -big">Update Data</Button>
            </div>
        </div>
    )
}

export default ManagementHeader;