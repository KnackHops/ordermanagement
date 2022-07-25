/* eslint-disable react-hooks/exhaustive-deps */
import { 
    TextField, 
    Button,
    FormControl, 
    Select,
    MenuItem,
    InputLabel,
    Autocomplete
} from '@mui/material';
import { 
    useCallback,
    useEffect, 
    useState 
} from "react";
import debounce from 'lodash.debounce';
import './ManagementOrderModal.scss';

const rootUrl = process.env.REACT_APP_API_URL

const InputLabelProps = {
  shrink: true,
}

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

const ManagementNewOrderModal = ( { handleClose, open, order=null, dateStringify=null, fetchTableData=null } ) => {

    const [ date, setDate ] = useState("");
    const [ seller_name, setSellerName ] = useState("");
    
    const [ seller_email, setSellerEmail ] = useState("");
    const [ seller_email_selected, setSellerEmailSelected ] = useState("");

    useEffect( () => {
        if ( seller_email_selected ) setSellerEmail( seller_email_selected )
    }, [ seller_email_selected ] )

    const [ client_name, setClientName ] = useState("");
    
    const [ client_email, setClientEmail ] = useState("");
    const [ client_email_Selected, setClientEmailSelected ] = useState("");

    useEffect( () => {
        if ( client_email_Selected ) setClientEmail( client_email_Selected )
    }, [ client_email_Selected ] )

    const [ company_name, setCompanyName ] = useState("");
    const [ company_name_selected, setCompanyNameSelected ] = useState("");

    useEffect( () => {
        if ( company_name_selected ) setCompanyName( company_name_selected )
    }, [ company_name_selected ] )

    const [ company_url, setCompanyUrl ] = useState("");
    const [ number_of_reviews, setNumberOfReviews ] = useState("");
    const [ unit_cost, setUnitCost ] = useState("");

    const [ reviewers, setReviewers ] = useState("");
    const [ remarks, setRemarks ] = useState("");

    const [ order_status, setOrderStatus ] = useState("");
    const [ payment_status, setPaymentStatus] = useState("");

    const [ sellers, setSellers ] = useState( [] )

    const fetchSellers = _seller_email => {
        // fetch seller
        if ( !_seller_email ) return

        fetch( rootUrl + `/seller/search/${ _seller_email }` )
        .then( resp => resp.json() )
        .then( data => {
            console.log( data )
            setSellers( data )
        } )
        .catch( err => {
            console.log( err )
            if ( sellers.length ) setSellers( [] )
        } )
    }

    const debouncedFetchSellers = useCallback( debounce( fetchSellers, 500 ), [ ] )

    // auto fill for seller
    useEffect( () => {
        if ( seller_email && sellers.length ) {
            const foundSeller = sellers.find( _seller => _seller?.email === seller_email )

            if ( seller_name === foundSeller?.name ) return

            if ( foundSeller ) setSellerName( foundSeller.name )
        }
    }, [ seller_email, sellers ] )

    // auto complete with fetch
    // seller
    useEffect( () => {
        if ( seller_email ) debouncedFetchSellers( seller_email )
    }, [ seller_email ] )

    
    // CLIENTS ==============================================================================

    const [ clients, setClients ] = useState( [] )

    const fetchClients = _client_email => {

        if ( !_client_email ) return

        fetch( rootUrl + `/client/search/${ _client_email }` )
        .then( resp => resp.json() )
        .then( data => setClients( data ) )
        .catch( err => {
            console.log( err )
            if ( sellers.length ) setClients( [] )
        } )
    }

    const debouncedFetchClients = useCallback( debounce( fetchClients, 500 ), [ ] )

    // auto fill for client
    useEffect( () => {
        if ( client_email && clients.length ) {
            const foundClient = clients.find( _client => _client?.email === client_email )

            if ( client_name === foundClient?.name ) return

            if ( foundClient ) setClientName( foundClient?.name )
        }
    }, [ client_email, clients ] )

    // auto complete with fetch
    // client
    useEffect( () => {
        if ( client_email ) debouncedFetchClients( client_email )
    }, [ client_email ] )

    
    // COMPANIES ==============================================================================

    const [ companies, setCompanies ] = useState( [] )

    const fetchCompanies = _company_name => {

        if ( !_company_name ) return

        fetch( rootUrl + `/company/search/${ _company_name }` )
        .then( resp => resp.json() )
        .then( data => setCompanies( data ) )
        .catch( err => {
            console.log( err )
            if ( sellers.length ) setCompanies( [] )
        } )
    }

    const debouncedFetchCompanies = useCallback( debounce( fetchCompanies, 500 ), [ ] )

    // auto fill for company
    useEffect( () => {
        if ( company_name ) {
            const foundCompany = companies.find( _company => _company?.name === company_name )

            if ( company_url === foundCompany?.url ) return

            if ( foundCompany ) setCompanyUrl( foundCompany.url )
        }
    }, [ company_name, companies ] )

    // auto complete with fetch
    // client
    useEffect( () => {
        if ( company_name ) debouncedFetchCompanies( company_name )
    }, [ company_name ] )

    useEffect( () => {
        if ( !open ) {
            // we empty
            setDate("")
            setSellerName("")
            setSellerEmail("")
            setClientName("")
            setClientEmail("")
            setCompanyName("")
            setCompanyUrl("")
            setNumberOfReviews("")
            setUnitCost("")
            setReviewers("");
            setRemarks("");
            setOrderStatus("")
            setPaymentStatus("")
        } else if ( open ) {
            if ( order?.id ) {
                // fill the data here
                const dt = new Date( order.created_at )

                setDate( dateStringify( dt ) )
                setSellerName( order?.seller?.name )
                setSellerEmail( order?.seller?.email )
                setClientName( order?.client?.name )
                setClientEmail( order?.client?.email )
                setCompanyName( order?.company?.name )
                setCompanyUrl( order?.company?.url )
                setNumberOfReviews( order?.number_of_reviews )
                setUnitCost( order?.unit_cost )
                setReviewers( order?.reviewers );
                setRemarks( order?.remarks );
                setOrderStatus( Number( order?.order_status ) )
                setPaymentStatus( Number( order?.payment_status ) )
            } else {
                setOrderStatus( 0 )
                setPaymentStatus( 0 )
            }
        }
    }, [ open ] )

    const dateGenerator = date => {
        if ( !date ) return ""

        const dateDT = new Date( date )

        return dateDT.toISOString()
    }

    const submitHandler = e => {
        e.preventDefault()

        const _order_date = dateGenerator(date);

        const fields = {
            seller_name,
            seller_email,
            client_name,
            client_email,
            company_name,
            company_url,
            number_of_reviews,
            unit_cost,
            reviewers,
            order_status,
            payment_status
        }

        let foundEmpty = false

        Object.keys( fields ).forEach( field => {
            if ( !fields[field] && fields[field] !== 0 ) foundEmpty = true
        } )

        if ( foundEmpty ) {
            window.alert( "Please fill required" )
            return
        }

        fields.remarks = remarks || ""

        if ( order?.id ) {
            if ( !_order_date ) {
                window.alert( "Please fill required" )
                return
            } else fields.order_date = _order_date

            fetch( `${rootUrl}/order/${order.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( fields )
            } )
            .then( resp => {
                if ( resp.ok ) {
                    window.confirm("Order updated!")
                    if ( fetchTableData ) fetchTableData()
                    handleClose()
                }
                return resp.json()
            } )
            .catch( err => {
                console.log( err )
                window.alert("Something went wrong!")
            } )
        } else {
            if ( _order_date ) fields.order_date = _order_date
            fetch( `${rootUrl}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( fields )
            } )
            .then( resp => {
                if ( resp.ok ) {
                    window.confirm("Order added!")
                    if ( fetchTableData ) fetchTableData()
                    handleClose()
                }
                return resp.json()
            } )
            .catch( err => {
                console.log( err )
                window.alert("Something went wrong!")
            } )
        }

        return
    }

    return (
        <form className="management-order-modal" onSubmit={ submitHandler } >    
                <ul>
                    <li className="fd">
                        <TextField 
                            label="DATE" 
                            value={ date || "" } 
                            onChange={ e => setDate( e.target.value ) }  
                            InputLabelProps={ InputLabelProps } 
                            type="date"
                            required={ order?.id ? true : false }
                            variant="standard" />
                        {
                            order?.id ? 
                            <TextField 
                                label="ORDER ID" 
                                value={ order?.id || "" } 
                                disabled
                                variant="standard" /> : <div></div>
                        }
                    </li>
                    <li className='fd'>
                        <Autocomplete
                            id="seller-email"
                            options={ sellers }
                            getOptionLabel={ option => option?.email || "" }
                            freeSolo
                            disableClearable
                            value={ seller_email_selected || "" }
                            onChange={ ( e, newValue ) => setSellerEmailSelected( newValue.email ) }
                            inputValue={ seller_email || "" }
                            onInputChange={ ( e, newValue ) => setSellerEmail( newValue ) }
                            renderOption={ ( params, option ) => 
                                <li {...params} key={option.id}>
                                        {option.email}
                                </li>
                            }
                            renderInput={ params => 
                                <TextField
                                    {...params}
                                    label="SELLER EMAIL"
                                    variant='standard'
                                    required /> } />
                        <TextField
                            id="seller-name"
                            label="SELLER NAME"
                            value={ seller_name }
                            onChange={ e => setSellerName( e.target.value ) }
                            variant='standard'
                            required />
                    </li>
                    <li className="fd">
                        <Autocomplete
                            id="client-email"
                            options={ clients }
                            getOptionLabel={ option => option?.email || "" }
                            freeSolo
                            disableClearable
                            value={ client_email_Selected || "" } 
                            onChange={ ( e, newValue ) => setClientEmailSelected( newValue.email ) }
                            inputValue={ client_email || "" } 
                            onInputChange={ ( e, newValue ) => setClientEmail( newValue ) }
                            renderOption={ ( params, option ) => 
                                <li {...params} key={option.id}>
                                        {option.email}
                                </li>
                            }
                            renderInput={ params =>
                                    <TextField
                                    {...params}
                                    label="CLIENT EMAIL" 
                                    variant="standard"
                                    required /> } />
                        <TextField
                            id="client-name"
                            label="CLIENT NAME" 
                            value={ client_name || "" } 
                            onChange={ e => setClientName( e.target.value ) } 
                            variant="standard"
                            required />
                    </li>
                    <li className='fd'>
                        <TextField
                            label="NUMBER OF REVIEWS"
                            value={ number_of_reviews || "" }
                            onChange={ e => setNumberOfReviews( e.target.value ) }
                            variant='standard'
                            required/>
                        <TextField
                            label="UNIT PRICE"
                            value={ unit_cost || "" }
                            onChange={ e => setUnitCost( e.target.value ) }
                            variant='standard'
                            required/>
                    </li>
                    <li className="fd">
                        <Autocomplete
                            id="company"
                            options={ companies }
                            getOptionLabel={ option => option?.name || "" }
                            freeSolo
                            disableClearable
                            value={ company_name_selected || "" } 
                            onChange={ ( e, newValue ) => setCompanyNameSelected( newValue.name ) }
                            inputValue={ company_name || "" } 
                            onInputChange={ ( e, newValue ) => setCompanyName( newValue ) }
                            renderOption={ ( params, option ) => 
                                <li {...params} key={ option.id }>
                                        {option.name}
                                </li>
                            }
                            renderInput={ params => 
                                <TextField
                                    { ...params }
                                    label="COMPANY" 
                                    variant="standard"
                                    required /> } />
                            <TextField
                                id="company-url"
                                label="COMPANY URL" 
                                value={ company_url || "" } 
                                onChange={ e => setCompanyUrl( e.target.value ) } 
                                variant="standard"
                                required />
                    </li>
                    <li>
                        <TextField 
                            id="reviewers" 
                            className="outside-text" 
                            label="NAME OF REVIEWS"
                            value={ reviewers || "" }
                            onChange={ e => setReviewers( e.target.value ) } 
                            variant="standard"
                            required 
                            fullWidth 
                            multiline 
                            rows={2} />
                    </li>
                    <li>
                        <TextField 
                            id="remarks" 
                            className="outside-text" 
                            label="REMARKS"
                            value={ remarks || "" }
                            onChange={ e => setRemarks( e.target.value ) } 
                            variant="standard" 
                            fullWidth 
                            multiline 
                            rows={2} />
                    </li>
                    <li className='fd'>
                        <FormControl variant="standard">
                            <InputLabel id="order_status_label">
                                ORDER STATUS
                            </InputLabel>
                            <Select 
                                labelId="order_status_label"
                                id="order_status"
                                label="ORDER STATUS"
                                value={ order_status || order_status === 0 ? order_status : "" }
                                onChange={ e => setOrderStatus( e.target.value ) } >
                                    {
                                        orderStatusDropDown.map( order_status_drop => 
                                            <MenuItem 
                                                key={ order_status_drop.value }
                                                value={ order_status_drop.value } >
                                                    { order_status_drop.label }
                                            </MenuItem> 
                                        )
                                    }        
                            </Select>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel id="payment_status_label">
                                PAYMENT STATUS
                            </InputLabel>
                            <Select
                                labelId='payment_status_label'
                                id="payment_status"
                                label="PAYMENT STATUS"
                                value={ payment_status || payment_status === 0 ? payment_status : "" }
                                onChange={ e => setPaymentStatus( e.target.value ) } >
                                    {
                                        paymentStatusDropDown.map( payment_status_drop =>
                                            <MenuItem
                                                key={ payment_status_drop.value }
                                                value={ payment_status_drop.value } >
                                                { payment_status_drop.label }
                                            </MenuItem>
                                        )
                                    }
                            </Select>
                        </FormControl>
                    </li>
                </ul>
                <div className="base-btns fd">
                    <Button
                        type="button"
                        variant="contained" 
                        className="-gray" 
                        sx={ { minWidth: '8rem' } } 
                        onClick={ handleClose }> { order?.id ? "Close" : "Cancel" } </Button>
                    <Button
                        type="submit"
                        variant="contained" 
                        className="-big"> { order?.id ? "Update Order" : "Add New Order" } </Button>
                </div>
            </form>
    )
}

export default ManagementNewOrderModal;