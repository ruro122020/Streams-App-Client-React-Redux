import React, { Component } from "react";
//Field is a react input component. reduxForm is a function.
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

/*
Important Note: The Field component has a 'name' property. 
Using the value of the name property will give you access to the inputs values and info. 
*/

class StreamCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    //{...input} this syntax taks all the key/value pairs from the input object
    // and passed them as props to the input
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };
  render() {
    return (
      <form
        //call handleSubmit from the redux-form library
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        ></Field>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//to use validate in the form pass it in to the reduxForm function below
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  //The name you want to give to this form
  form: "streamCreate",
  validate: validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
