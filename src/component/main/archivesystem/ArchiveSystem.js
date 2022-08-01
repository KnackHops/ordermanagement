/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SectionWrapper from "../../../wrapper/SectionWrapper"
import ArchiveTable from "./ArchiveTable";

const rootUrl = process.env.REACT_APP_API_URL

const ArchiveSystem = () => {
    const [ archivedOrders, setArchivedOrders ] = useState( [] )

    const fetchArchivedOrders = ( init = false ) => {
        if ( archivedOrders.length && init ) return

        const url = rootUrl + '/deleted'

        fetch( url )
        .then( resp => resp.json() )
        .then( data => setArchivedOrders( data ) )
        .catch( err => console.log( err ) )
    }

    useEffect( () => {
        fetchArchivedOrders( true )
    }, [] )

    console.log( archivedOrders )
    
    return (
        <SectionWrapper sectionClass={ "archive-system" }>
            <ArchiveTable orders={ archivedOrders } fetchTableData={ fetchArchivedOrders } />
        </SectionWrapper>
    )
}

export default ArchiveSystem;