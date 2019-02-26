import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './Login.css';

class Login extends Component {

    render(){
        return (
        <div>
            <div className={styles.login}>
                <RegisterForm />
            </div>
            <div className={styles.login}>
                <LoginForm />
            </div>
        </div>
        );
    }
}

export default Login;


class RegisterForm extends Component {
    constructor(props){
        super(props);
        const { classes } = props;
        this.state = {
            email: '',
            phone: '',
            f_name: '',
            l_name: '',
            password: '',
            pw_confirm: '',
            errors: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event){
        event.preventDefault();
        this.postNewUser()
        .then(res => {
            this.setState({test: res.message})
            }
        )
        .catch(error => console.log("ERROR", error));
    }

    toggleModal(){
        this.setState({
            errors: null,
        });
    }

    postNewUser = async () => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                phone: this.state.phone,
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                password: this.state.password,
                pw_confirm: this.state.pw_confirm
            })
        });
        const body = await response.json();
        if (response.status !== 200){
            throw Error(body.message);
        }
        if (body.errors){
            console.log(body.errors);
            this.setState({errors: body.errors});
        } else {
            alert("howdy doody");
        }
        return body;
    }

    render(){
        return (
            <Paper>
                <ErrorModal show={this.state.errors} onClose={this.toggleModal} errors={this.state.errors}  />
                <form className={styles.Formo} onSubmit={this.handleSubmit}>
                    <FormControl margin='normal' required className={styles.formfield}>
                        <InputLabel htmlFor='email'>Email Address: </InputLabel>
                        <Input onChange={this.handleChange} id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin='normal' required className={styles.formfield}>
                        <InputLabel htmlFor='phone'>Phone Number: </InputLabel>
                        <Input onChange={this.handleChange.bind(this)} id="phone" name="phone" />
                    </FormControl>
                    <FormControl margin='normal' required className={styles.formfield2}>
                        <InputLabel htmlFor='f_name'>First Name: </InputLabel>
                        <Input onChange={this.handleChange} id="f_name" name="f_name" />
                    </FormControl>
                    <FormControl margin='normal' required className={styles.formfield2}>
                        <InputLabel htmlFor='l_name'>Last Name: </InputLabel>
                        <Input onChange={this.handleChange} id="l_name" name="l_name" />
                    </FormControl><br />
                    <FormControl margin='normal' required className={styles.formfield2}>
                        <InputLabel htmlFor='password'>Password: </InputLabel>
                        <Input onChange={this.handleChange} type="password" id="password" name="password" />
                    </FormControl>
                    <FormControl margin='normal' required className={styles.formfield2}>
                        <InputLabel htmlFor='pw_confirm'>Confirm Password: </InputLabel>
                        <Input onChange={this.handleChange} type="password" id="pw_confirm" name="pw_confirm" />
                    </FormControl><br />
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                    >
                    Register
                    </Button>
                </form>
            </Paper>
        )
    }
}

class ErrorModal extends Component {

    render(){
        if(!this.props.show){
            return null;
        }
        
        const errors = this.props.errors.map((err, key) => {
            console.log("rendering modal");
             return <li key={err.msg} className={styles.errLi}>{err.msg}</li>
        })

        return (
                <div className = {styles.modal}>
                    <h2 className = {styles.errorHeader}>Error: </h2>
                    <ul>
                        {errors}
                    </ul>
                <Button
                    onClick={this.props.onClose}
                    variant="contained"
                    className={styles.submitButton}
                >
                Close
                </Button>
                </div>
        )
    }
}

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleChange(event){
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.checkLogin()
    }

    checkLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body: {
                email: this.state.email,
                password: this.state.password
            }
        })
    }

    toggleModal(event){

    }

    render(){
        return(
            <Paper>
                <ErrorModal 
                    show={this.state.errors} 
                    onClose={this.toggleModal}
                    errors={this.state.errors}
                />
                <form className={styles.Formo} onSubmit={this.handleSubmit}>
                    <FormControl margin='normal' required className={styles.formfield}>
                        <InputLabel htmlFor='email'>Email address: </InputLabel>
                        <Input onChange={this.handleChange} id='email' name='email' autoComplete='email'/>
                    </FormControl>
                    <FormControl margin='normal' required className={styles.formfield}>
                        <InputLabel htmlFor='password'>Password: </InputLabel>
                        <Input onChange={this.handleChange} id='password' />
                    </FormControl>
                    <Button 
                        type='submit'
                        variant='contained'
                        className={styles.submitButton}
                    > Log In
                    </Button>
                </form>
            </Paper>
        )
    }
}
