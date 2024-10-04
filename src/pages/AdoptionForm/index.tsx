const AdoptionForm = () => {
  return (
    <form
        className="form"
        onSubmit={() => console.log('submit')}
    >
        <label htmlFor="first-name">
            First name: 
            <input type="text" id="first-name" />
        </label>
        <label htmlFor="last-name">
            Last name: 
            <input type="text" id="last-name" />
        </label>
        <button
            onClick={(e) => {
                e.preventDefault();
                console.log('submit');
            }}
        >
            Submit
        </button>
    </form>
  )
}

export default AdoptionForm