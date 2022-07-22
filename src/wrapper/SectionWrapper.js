const SectionWrapper = ( { children, sectionClass } ) => {
    return (
        <section className={ sectionClass }>
            { children }
        </section>
    )
}

export default SectionWrapper;