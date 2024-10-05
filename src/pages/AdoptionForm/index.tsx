const AdoptionForm = () => {

    return (
        <form
            className="form"
            onSubmit={() => {}}
        >
            <label htmlFor="input__first-name">
                First name: 
                <input type="text" id="input__first-name" />
            </label>
            <label htmlFor="input__last-name">
                Last name: 
                <input type="text" id="input__last-name" />
            </label>
            <label htmlFor="input__email">
                Email: 
                <input type="email" id="input__email" />
            </label>
            <label htmlFor="input__phone-number">
                Phone-number: 
                <input type="tel" id="input__phone-number" />
            </label>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log('submit');
                }}
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default AdoptionForm