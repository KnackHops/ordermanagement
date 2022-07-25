
import { createContext, useEffect, useState, useMemo } from "react";
import DataCard from "../../../sharedComponent/DataCard";
import SectionWrapper from "../../../wrapper/SectionWrapper"
import ManagementHeader from "./ManagementHeader";
import './ManagementSystem.scss';
import ManagementTable from "./ManagementTable";

const rootUrl = process.env.REACT_APP_API_URL

const DataContext = createContext( null )

const aggrevatedDatasFormat = [
    { 
        value: 0,
        label: "NEW ORDERS",
        color: "#30A8FF",
        src: "/dataIcons/new-order-icon.png" },
    { 
        value: 0,
        label: "SEEN",
        color: "#F46D0B",
        src: "/dataIcons/seen-icon.png" },
    { 
        value: 0,
        label: "PREPARING",
        color: "#E34040",
        src: "/dataIcons/preparing-icon.png" },
    { 
        value: 0,
        label: "FINISHED",
        color: "#48D16F",
        src: "/dataIcons/finished-icon.png" },
]

const ManagementSystem = () => {

    const [ orders, setOrders ] = useState( [] );

    const fetchTableData = ( init=false ) => {
        if ( init && orders.length ) return

        const dateParams = { ...dateSupplier() }

        let url = ""

        if ( filterBy && ( keyword || keyword === 0  ) ) {
            url = rootUrl 
            + `/order?filter=${ filterBy }&keyword=${ keyword }&date_from=${dateParams.start_date}&date_to=${dateParams.end_date}`
        } else {
            handleFilterBy("")
            handleKeyWord("")

            url = rootUrl + 
            `/order?date_from=${dateParams.start_date}&date_to=${dateParams.end_date}`
        }

        fetch( url )
        .then( resp => resp.json() )
        .then( data => setOrders( data ) )
        .catch( err => console.log( err ) )
    }

    useEffect( () => {
        fetchTableData( true )
    } )

    const updateDataHandler = () => {
        fetchTableData()
    }

    const filterData = ( total, order, filter ) => {
        if ( order.order_status === filter ) return total + 1
        else return total
    }

    const aggrevatedDatas = useMemo( () => {
        const _aggrevatedDatas = aggrevatedDatasFormat.map( data => data )

        if ( !orders.length ) return _aggrevatedDatas

        const new_orders_value = orders.reduce( ( total, order ) => filterData( total, order, 0 ), 0 )
        const seen_orders_value = orders.reduce( ( total, order ) => filterData( total, order, 1 ), 0 )
        const preparing_orders_value = orders.reduce( ( total, order ) => filterData( total, order, 2 ), 0 )
        const finished_orders_value = orders.reduce( ( total, order ) => filterData( total, order, 3 ), 0 )

        _aggrevatedDatas[0].value = new_orders_value
        _aggrevatedDatas[1].value = seen_orders_value
        _aggrevatedDatas[2].value = preparing_orders_value
        _aggrevatedDatas[3].value = finished_orders_value

        return _aggrevatedDatas
    }, [ orders] )

    const total = useMemo( () => {
        if ( !orders.length ) return "0"

        return `${ orders.reduce( ( total, order ) => total + Number( order.total_price ), 0 ) }`
    }, [ orders ] )

    const [ filterBy, setFilterBy ] = useState( "" );
    const [ keyword, setKeyWord ] = useState( "" );

    const handleFilterBy = value => {
        setKeyWord( "" )
        setFilterBy( value )
    }
    const handleKeyWord = value => setKeyWord( value )

    const [ start_date, setStartDate ] = useState( "" )
    const [ end_date, setEndDate ] = useState( "" )

    const dateStringify = date => {
        const month = ( date.getMonth() + 1 ) > 9 ? date.getMonth() + 1 : `0${ date.getMonth() + 1 }`
        const day = date.getDate() > 9 ? date.getDate() : `0${ date.getDate() }`

        return `${ date.getFullYear() }-${ month }-${ day }`
    }

    const startDateMax = useMemo( () => {
        if ( !end_date ) return ""

        const dateDT = new Date( end_date )

        dateDT.setDate( dateDT.getDate() - 1 )

        return dateStringify( dateDT )

    }, [ end_date ] )

    const handleStartDate = value => {
        if ( startDateMax ) {
            const startDateMaxDT = new Date( startDateMax );
            const newValueDT = new Date( value );
    
            if ( newValueDT.getTime() > startDateMaxDT.getTime() ) return
        }

        setStartDate( value )
    }
    const handleEndDate = value => {
        const newValueDT = new Date( value );

        if ( start_date ) {
            const startDateDT = new Date();

            if ( startDateDT.getTime() >= newValueDT.getTime() ) {
                startDateDT.setDate( newValueDT.getDate() - 1 )

                setStartDate( dateStringify( startDateDT ) )
            }
        }
        
        setEndDate( value )
    }

    const dateSupplier = () => {
        const returnDates = {}

        if ( end_date ) {
            const endDateDT = new Date( end_date )

            endDateDT.setHours( 23, 59, 59, 999 )

            returnDates.end_date = endDateDT.toISOString()

            if ( !start_date ) {
                endDateDT.setHours( 0, 0, 0, 0 )

                endDateDT.setDate( endDateDT.getDate() - 1 )

                returnDates.start_date = endDateDT.toISOString()
            } else {
                const startDateDT = new Date( start_date )

                startDateDT.setHours( 0, 0, 0, 0 )
                
                returnDates.start_date = startDateDT.toISOString()
            }
        }

        if ( start_date && !end_date ) {
            const startDateDT = new Date( start_date )

            startDateDT.setHours( 0, 0, 0, 0 )

            returnDates.start_date = startDateDT.toISOString()

            // reset the time
            startDateDT.setDate( startDateDT.getDate() + 1 )

            startDateDT.setHours( 23, 59, 59, 999 )

            returnDates.end_date = startDateDT.toISOString()
        }
        
        if ( !( 'start_date' in returnDates ) ) {

            const currentDate = new Date()

            currentDate.setHours( 23, 59, 59, 999 )
    
            returnDates.end_date = currentDate.toISOString();
    
            currentDate.setDate( currentDate.getDate() - 1 )

            currentDate.setHours( 0, 0, 0, 0 )
    
            returnDates.start_date = currentDate.toISOString();
        }

        return returnDates
    }

    return (
        <SectionWrapper sectionClass="management-system">
            <DataContext.Provider 
                value={ {
                    orders,
                    fetchTableData,
                    filterBy, 
                    handleFilterBy, 
                    keyword, 
                    handleKeyWord,
                    start_date,
                    startDateMax,
                    handleStartDate,
                    end_date,
                    handleEndDate,
                    dateStringify } }>
                <ManagementHeader updateDataHandler={ updateDataHandler } />
                <div className="data-card-container margin--top-standard">
                    <ul className="fd">
                        {
                            aggrevatedDatas.map( ( data, i ) => 
                            <li key={ i }> 
                                <DataCard 
                                    label={ data.label }
                                    color={ data.color } 
                                    value={ data.value } 
                                    src={ data.src } /> 
                            </li> )
                        }
                    </ul>
                </div>
                <ManagementTable />
                <div className="base-control fd">
                    <p className="total fd">
                        <span>TOTAL</span>
                        <span className="value">${total}</span>
                    </p>
                </div>
            </DataContext.Provider>
        </SectionWrapper>
    )
}

export default ManagementSystem
export { DataContext }