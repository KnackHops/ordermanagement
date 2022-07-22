import { TextField, Button } from '@mui/material';
import { useEffect } from "react";

const InputLabelProps = {
  shrink: true,
}

const ManagementNewOrderModal = ( { handleClose, open } ) => {

    useEffect( () => {
        if ( !open ) {
            // we empty
            console.log("do the empty")
        }
    } )

    return (
        <form className="add-new-order-form">    
                <ul>
                    <li className="fd">
                        <TextField label="DATE"  InputLabelProps={ InputLabelProps } type="date" variant="standard" />
                        <TextField label="SELLER" variant="standard" />
                    </li>
                    <li className="fd">
                        <TextField label="COMPANY" variant="standard" />
                        <TextField label="URL" variant="standard" />
                    </li>
                    <li className="fd">
                        <TextField label="CLIENT NAME" variant="standard" />
                        <TextField label="CLIENT EMAIL" variant="standard" />
                    </li>
                </ul>
                <TextField id="name_of_reviews" className="outside-text" label="NAME OF REVIEWS" variant="standard" fullWidth multiline rows={3} />
                <TextField id="remarks" className="outside-text" label="REMARKS" variant="standard" fullWidth multiline rows={3} />
                <div className="base-btns">
                    <Button variant="contained" className="-gray" sx={ { minWidth: '8rem' } } onClick={ handleClose }>Cancel</Button>
                    <Button variant="contained" className="-big">Add New Order</Button>
                </div>
            </form>
    )
}

export default ManagementNewOrderModal;