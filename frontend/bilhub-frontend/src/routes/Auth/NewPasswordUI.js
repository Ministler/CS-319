import React from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const NewPasswordUI = (props) => {
    return (
        <div>
            <Grid centered>
                <Grid.Column style={{ maxWidth: 300, marginTop: 50 }}>
                    <h2 className="ui center aligned icon header">
                        <i className="circular users icon"></i>
                        Reset your password
                    </h2>
                    {props.error && (
                        <div className="ui negative message" style={{ fontSize: '12px' }}>
                            <i
                                className="close icon"
                                onClick={() => {
                                    props.onErrorClosed();
                                }}></i>
                            {props.error}
                        </div>
                    )}
                    <Segment>
                        <Form className="Sign in form">
                            <div className="field">
                                <label style={{ fontSize: '12px' }}>Please type your Bilkent email</label>
                                <Form.Input type="email" name="email" value={props.form?.email || ''}
                                    onChange={props.onChange}/>
                            </div>
                            <Button onClick={props.onSubmit} fluid positive className="Sign in button" type="submit">
                                Send new password
                            </Button>
                        </Form>
                    </Segment>
                    <div className="ui center aligned segment">
                        <Link
                            style={{
                                fontSize: '12px',
                            }}
                            to="/login">
                            Go back to Login Page
                        </Link>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
};
