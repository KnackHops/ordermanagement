import './DataCard.scss';

const DataCard = ( { label="", value=0, color="", src="" } ) => {
    return (
        <div className="data-card" style={ { backgroundColor: color } }>
            <p className='fd'>
                <span className='data-card-label'>{ label.toUpperCase() }</span>
                <span className='data-bottom fd'>
                    <img alt='data icon' src={ src } />
                    <span className='data-value'>
                        { value }
                    </span>
                </span>
            </p>
        </div>
    )
}

export default DataCard