import { Button, TextField, Autocomplete } from "@mui/material"
import './ManagementHeader.scss';

const filterByOption = [
    "ORDER ID",
    "COMPANY NAME",
    "ORDER STATUS",
    "PAYMENT STATUS"
]

const ManagementHeader = () => {
    const InputLabelProps = {
      shrink: true,
    }

    return (
    <div className="section-header margin--top-standard fd">
        <Button className="add-btn -big" variant="contained">Add New Order</Button>
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