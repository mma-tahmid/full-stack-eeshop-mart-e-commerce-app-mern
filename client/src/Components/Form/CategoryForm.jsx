import React from 'react';

const CategoryForm = ({ handleSubmits, values, setValues }) => {

    return (

        <>

            <form onSubmit={handleSubmits}>
                <div className="mb-3">

                    <input type="text" className="form-control" placeholder='Enter New Category' value={values}
                        onChange={(e) => setValues(e.target.value)} />

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>



        </>
    );
};

export default CategoryForm;