import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validators";

import authService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
}

const password = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Password must be between 6 and 40  characters!
            </div>
        );
    }
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegster = this.handleRegster.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onchangePassword = this.onChangePassword.bind(this);

        this.state = {
            mail: "",
            password: "",
            fullname: "",
            successful: false,
            message: ""
        }
    }

    onChangeEmail(e) {
        this.setState({ mail: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleRegster(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        })

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            authService
                .register(this.state.mail, this.state.password, this.state.fullname)
                .then(response => {
                    this.setState({ successful: true });
                })
            error => {
                const responseMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) ||
                    error.message ||
                    error.toString();

                this.setState({ 
                    successful: false, 
                    message: responseMessage

                });
            }

        }






    }

    render() {
        return (
            <div>
                <Form 
                onSubmit={this.handleRegster}
                ref={c => {
                    this.form = c;
                }}
                >
                    

                </Form>
            </div>
        )
    }
}