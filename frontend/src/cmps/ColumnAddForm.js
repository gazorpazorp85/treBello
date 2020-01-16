import React from 'react';
import { Formik } from 'formik';

const ColumnAddForm = () => (
    <div>
      <h1>Add Column</h1>
      <Formik
        initialValues={{ title: ''}}
        onSubmit={this.addColumn}>
  
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="title"
                name="title"
                placeholder="Column Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <button type="submit">Submit</button>
            </form>
          )}
      </Formik>
    </div>
  );
  
export default ColumnAddForm;