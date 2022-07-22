
import { createContext, useState } from "react";
import DataCard from "../../../sharedComponent/DataCard";
import SectionWrapper from "../../../wrapper/SectionWrapper"
import ManagementHeader from "./ManagementHeader";
import './ManagementSystem.scss';
import ManagementTable from "./ManagementTable";

const DataContext = createContext( null )

const pseudoData = [
    {
        "id": 1,
        "date": "2022-06-03 06:16:56",
        "company_name": "Coke",
        "reviews": 3,
        "price": 123,
        "order_status": "complete",
        "payment_status": "complete"
    },
    {
        "id": 2,
        "date": "2022-06-03 06:16:56",
        "company_name": "Sprite",
        "reviews": 4,
        "price": 456,
        "order_status": "pending",
        "payment_status": "pending"
    },
    {
        "id": 3,
        "date": "2022-06-03 06:16:56",
        "company_name": "Royal",
        "reviews": 1,
        "price": 789,
        "order_status": "pending",
        "payment_status": "pending"
    }
]

const ManagementSystem = () => {
    const datas = [
        { 
            value: 123,
            label: "NEW ORDERS",
            color: "#30A8FF",
            src: "/dataIcons/new-order-icon.png" },
        { 
            value: 456,
            label: "SEEN",
            color: "#F46D0B",
            src: "/dataIcons/seen-icon.png" },
        { 
            value: 789,
            label: "PREPARING",
            color: "#E34040",
            src: "/dataIcons/preparing-icon.png" },
        { 
            value: 10,
            label: "FINISHED",
            color: "#48D16F",
            src: "/dataIcons/finished-icon.png" },
    ]

    const [ filter, setFilter ] = useState("");
    const [ keyword, setKeyWord ] = useState("");

    return (
        <SectionWrapper sectionClass="management-system">
            <DataContext.Provider value={ { filter, setFilter, keyword, setKeyWord, data: pseudoData } }>
                <ManagementHeader />
                <div className="data-card-container margin--top-standard">
                    <ul className="fd">
                        {
                            datas.map( ( data, i ) => 
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
                    <div className="btns fd">
                        <button className="fd">
                            <img src="/pagination_btns/prev-btn.png" alt="previous button" />
                            <span>Prev</span>
                        </button>
                        <button className="fd">
                            <span>Next</span>
                            <img src="/pagination_btns/next-btn.png" alt="next button" />
                        </button>
                    </div>
                    <p className="total fd">
                        <span>TOTAL</span>
                        <span className="value">$123</span>
                    </p>
                </div>
            </DataContext.Provider>
        </SectionWrapper>
    )
}

export default ManagementSystem
export { DataContext }