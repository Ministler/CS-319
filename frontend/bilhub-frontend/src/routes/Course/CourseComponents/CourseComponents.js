import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';
import _ from 'lodash';

import { convertMembersToMemberElement } from '../../../components';
import './CourseComponents.css';
import { Form, Search, Button, Grid, TextArea, Modal, Dropdown, GridColumn } from 'semantic-ui-react';

export const InformationSection = (props) => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ display: 'inline', marginLeft: '0px' }}>{props.courseName}</h1>
                <span className="CourseNameEdit"> {props.courseSettingsIcon} </span>
                <p style={{ marginLeft: '-30px' }}>{props.description}</p>
            </div>
            <div className="InstructorsBlock">
                {convertMembersToMemberElement(props.instructors, props.onUserClicked, 'Instructors')}
            </div>
            <div className="TAsBlock">{convertMembersToMemberElement(props.TAs, props.onUserClicked, "TA's")}</div>
            <div className="InformationBlock">
                <h4 style={{ marginLeft: '20px' }}>Information</h4>
                <p className="InformationText" style={{ display: 'inline-block' }}>
                    {props.informationElement} &nbsp;
                </p>
                {props.informationEditIcon}
            </div>
        </div>
    );
};

const options = [
    { key: 1, text: 'Submission', value: 1 },
    { key: 2, text: 'Peer Review', value: 2 },
];

export class NewAssignmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            type: 0,
            isStudentComments: false,
            isCommentsAnonymous: false,
            isCommentsGraded: false,
            isSubmissionVisible: false,
            isLateSubmissionsAllowed: false,
            dueDate: '',
            file: '',
        };
    }
    handleChange = (event, data) => {
        event.preventDefault();
        let name = data.name;
        let value = data.value;
        if (data.type === 'checkbox') {
            value = data.checked;
            if (data.name === 'isStudentComments') {
                this.setState({
                    [name]: value,
                    isCommentsAnonymous: false,
                    isCommentsGraded: false,
                });
            } else {
                this.setState({
                    [name]: value,
                });
            }
        } else if (data.name === 'type') {
            this.setState({
                [name]: value,
                isStudentComments: false,
                isCommentsAnonymous: false,
                isCommentsGraded: false,
                isSubmissionVisible: false,
                isLateSubmissionsAllowed: false,
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    };
    onFormSubmit() {
        let dateArr = this.state.dueDate.split(/-/);
        dateArr[2] = dateArr[2].split(/T/);
        dateArr[2][1] = dateArr[2][1].split(/:/);
        let d = new Date(dateArr[0], dateArr[1], dateArr[2][0], dateArr[2][1][0], dateArr[2][1][1]);
        console.log(d);
        return {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            isStudentComments: this.state.isStudentComments,
            isCommentsAnonymous: this.state.isCommentsAnonymous,
            isCommentsGraded: this.state.isCommentsGraded,
            isSubmissionVisible: this.state.isSubmissionVisible,
            isLateSubmissionsAllowed: this.state.isLateSubmissionsAllowed,
            dueDate: d,
            file: this.state.file,
        };
    }
    render() {
        return (
            <Modal closeIcon onClose={() => this.props.onClosed(false)} open={this.props.isOpen} size={'small'}>
                <Modal.Header style={{ fontSize: '16px' }}>New Assignment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid style={{ flexDirection: 'column' }}>
                            <Form>
                                <Form.Group inline style={{ justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            float: 'left',
                                            marginBottom: '0px',
                                            display: 'flex',
                                        }}>
                                        Title
                                    </p>
                                    <Dropdown
                                        name="type"
                                        style={{ display: 'flex' }}
                                        item
                                        selection
                                        text="Assignment Type"
                                        direction="right"
                                        options={options}
                                        onChange={this.handleChange}
                                        value={this.state.type}
                                    />
                                </Form.Group>
                                <Form.Input
                                    name="title"
                                    onChange={this.handleChange}
                                    type="text"
                                    style={{ width: '40%', height: '35px', marginTop: '-15px' }}
                                    value={this.state.title}
                                />
                                <label style={{ fontSize: '14px', float: 'left', marginBottom: '5px' }}>
                                    Description
                                </label>
                                <TextArea
                                    value={this.state.description}
                                    name="description"
                                    onChange={this.handleChange}
                                    placeholder="Your message here"
                                    style={{ minHeight: 100, width: '95%' }}
                                />
                                <Form.Group grouped>
                                    <Grid columns={2}>
                                        <GridColumn>
                                            {(this.state.type === 1 || this.state.type === 2) && (
                                                <>
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        onChange={this.handleChange}
                                                        name="isSubmissionVisible"
                                                        checked={this.state.isSubmissionVisible}
                                                        label="Groups' Submission Visable"
                                                        type="checkbox"
                                                    />
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        onChange={this.handleChange}
                                                        name="isLateSubmissionsAllowed"
                                                        checked={this.state.isLateSubmissionsAllowed}
                                                        label="Late Submission"
                                                        type="checkbox"
                                                    />
                                                </>
                                            )}
                                        </GridColumn>
                                        <GridColumn>
                                            {this.state.type === 1 && (
                                                <>
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        name="isStudentComments"
                                                        checked={this.state.isStudentComments}
                                                        label="Student Comments"
                                                        type="checkbox"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.isStudentComments && (
                                                        <>
                                                            <Checkbox
                                                                className="AssignmentCheckbox"
                                                                onChange={this.handleChange}
                                                                style={{ marginLeft: '30px' }}
                                                                name="isCommentsAnonymous"
                                                                checked={this.state.isCommentsAnonymous}
                                                                label="Anonymous Student Comments"
                                                                type="checkbox"
                                                            />
                                                            <Checkbox
                                                                className="AssignmentCheckbox"
                                                                onChange={this.handleChange}
                                                                style={{ marginLeft: '30px' }}
                                                                name="isCommentsGraded"
                                                                checked={this.state.isCommentsGraded}
                                                                label="Graded Comments"
                                                                type="checkbox"
                                                            />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </GridColumn>
                                    </Grid>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        name="dueDate"
                                        type="datetime-local"
                                        value={this.state.dueDate}
                                        label="Due Date"></Form.Input>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        name="file"
                                        type="file"
                                        value={this.state.file}
                                        label="Add File"
                                    />
                                </Form.Group>
                            </Form>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color="blue"
                        onClick={() => {
                            this.onFormSubmit();
                            this.props.onClosed(false);
                        }}
                        style={{
                            borderRadius: '10px',
                            padding: '5px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            whiteSpace: 'nowrap',
                        }}>
                        Send
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export class EditAssignmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.curAssignment.title,
            description: props.curAssignment.caption,
            type: props.curAssignment.type,
            isStudentComments: false,
            isCommentsAnonymous: false,
            isCommentsGraded: false,
            isSubmissionVisible: false,
            isLateSubmissionsAllowed: false,
            dueDate: '',
            file: '',
        };
    }
    handleChange = (event, data) => {
        event.preventDefault();
        let name = data.name;
        let value = data.value;
        if (data.type === 'checkbox') {
            value = data.checked;
            if (data.name === 'isStudentComments') {
                this.setState({
                    [name]: value,
                    isCommentsAnonymous: false,
                    isCommentsGraded: false,
                });
            } else {
                this.setState({
                    [name]: value,
                });
            }
        } else if (data.name === 'type') {
            this.setState({
                [name]: value,
                isStudentComments: false,
                isCommentsAnonymous: false,
                isCommentsGraded: false,
                isSubmissionVisible: false,
                isLateSubmissionsAllowed: false,
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    };
    onFormSubmit() {
        let dateArr = this.state.dueDate.split(/-/);
        let d = new Date(dateArr[0], dateArr[1], dateArr[2]);
        return {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            isStudentComments: this.state.isStudentComments,
            isCommentsAnonymous: this.state.isCommentsAnonymous,
            isCommentsGraded: this.state.isCommentsGraded,
            isSubmissionVisible: this.state.isSubmissionVisible,
            isLateSubmissionsAllowed: this.state.isLateSubmissionsAllowed,
            dueDate: d,
            file: this.state.file,
        };
    }
    render() {
        return (
            <Modal closeIcon onClose={() => this.props.onClosed(false)} open={this.props.isOpen} size={'small'}>
                <Modal.Header style={{ fontSize: '16px' }}>Edit Assignment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid style={{ flexDirection: 'column' }}>
                            <Form>
                                <Form.Group inline style={{ justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            float: 'left',
                                            marginBottom: '0px',
                                            display: 'flex',
                                        }}>
                                        Title
                                    </p>
                                    <Dropdown
                                        name="type"
                                        style={{ display: 'flex' }}
                                        item
                                        selection
                                        text="Assignment Type"
                                        direction="right"
                                        options={options}
                                        onChange={this.handleChange}
                                        value={this.state.type}
                                    />
                                </Form.Group>
                                <Form.Input
                                    name="title"
                                    onChange={this.handleChange}
                                    type="text"
                                    style={{ width: '40%', height: '35px', marginTop: '-15px' }}
                                    value={this.state.title}
                                />
                                <label style={{ fontSize: '14px', float: 'left', marginBottom: '5px' }}>
                                    Description
                                </label>
                                <TextArea
                                    value={this.state.description}
                                    name="description"
                                    onChange={this.handleChange}
                                    placeholder="Your message here"
                                    style={{ minHeight: 100, width: '95%' }}
                                />
                                <Form.Group grouped>
                                    <Grid columns={2}>
                                        <GridColumn>
                                            {(this.state.type === 1 || this.state.type === 2) && (
                                                <>
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        onChange={this.handleChange}
                                                        name="isSubmissionVisible"
                                                        checked={this.state.isSubmissionVisible}
                                                        label="Groups' Submission Visable"
                                                        type="checkbox"
                                                    />
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        onChange={this.handleChange}
                                                        name="isLateSubmissionsAllowed"
                                                        checked={this.state.isLateSubmissionsAllowed}
                                                        label="Late Submission"
                                                        type="checkbox"
                                                    />
                                                </>
                                            )}
                                        </GridColumn>
                                        <GridColumn>
                                            {this.state.type === 1 && (
                                                <>
                                                    <Checkbox
                                                        className="AssignmentCheckbox"
                                                        name="isStudentComments"
                                                        checked={this.state.isStudentComments}
                                                        label="Student Comments"
                                                        type="checkbox"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.isStudentComments && (
                                                        <>
                                                            <Checkbox
                                                                className="AssignmentCheckbox"
                                                                onChange={this.handleChange}
                                                                style={{ marginLeft: '30px' }}
                                                                name="isCommentsAnonymous"
                                                                checked={this.state.isCommentsAnonymous}
                                                                label="Anonymous Student Comments"
                                                                type="checkbox"
                                                            />
                                                            <Checkbox
                                                                className="AssignmentCheckbox"
                                                                onChange={this.handleChange}
                                                                style={{ marginLeft: '30px' }}
                                                                name="isCommentsGraded"
                                                                checked={this.state.isCommentsGraded}
                                                                label="Graded Comments"
                                                                type="checkbox"
                                                            />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </GridColumn>
                                    </Grid>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        name="dueDate"
                                        type="datetime-local"
                                        value={this.state.dueDate}
                                        label="Due Date"></Form.Input>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        name="file"
                                        type="file"
                                        value={this.state.file}
                                        label="Add File"
                                    />
                                </Form.Group>
                            </Form>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color="blue"
                        onClick={() => {
                            this.onFormSubmit();
                            this.props.onClosed(false);
                        }}
                        style={{
                            borderRadius: '10px',
                            padding: '5px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            whiteSpace: 'nowrap',
                        }}>
                        Send
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export const DeleteAssignmentModal = (props) => {
    return (
        <Modal closeIcon onClose={() => props.onClosed(false)} open={props.isOpen} size={'small'}>
            <Modal.Header style={{ fontSize: '16px' }}>New Assignment</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Grid>
                        <Form>
                            <Form.Group inline>
                                <p style={{ fontSize: '14px', float: 'left', marginBottom: '0px', display: 'inline' }}>
                                    Title
                                </p>
                                <Dropdown
                                    item
                                    simple
                                    text="Assignment Type"
                                    direction="right"
                                    options={options}
                                    style={{ marginLeft: '510px', float: 'right', display: 'inline' }}
                                />
                            </Form.Group>
                            <Form.Input
                                type="text"
                                name="groupName"
                                style={{ width: '40%', height: '35px', marginTop: '-15px' }}
                            />
                            <label style={{ fontSize: '14px', float: 'left', marginBottom: '5px' }}>Description</label>
                            <TextArea placeholder="Your message here" style={{ minHeight: 100, width: '95%' }} />
                            <Form.Group grouped>
                                <Form.Field label="Student Comments" control="input" type="checkbox" />
                                <Form.Field label="Anonymous Student Comments" control="input" type="checkbox" />
                                <Form.Field label="Graded Comments" control="input" type="checkbox" />
                                <Form.Field label="Groups' Submission Visable" control="input" type="checkbox" />
                                <Form.Field label="Late Submission" control="input" type="checkbox" />
                                <Form.Field label="Due Date" />
                                <Form.Field label="Add File" />
                            </Form.Group>
                        </Form>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="blue"
                    onClick={() => props.onClosed(false)}
                    style={{
                        borderRadius: '10px',
                        padding: '5px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        whiteSpace: 'nowrap',
                    }}>
                    Send
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

const initialState = {
    loading: false,
    results: [],
    value: '',
};

function studentSearchReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState;
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query };
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results };
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection };

        default:
            throw new Error();
    }
}

export const UserSearchBar = (props) => {
    const [state, dispatch] = React.useReducer(studentSearchReducer, initialState);
    const { loading, results, value } = state;
    let searchUsers = [];
    for (let i = 0; i < props.users.length; i++) {
        let temp = { title: props.users[i].mail, description: props.users[i].type };
        searchUsers.push(temp);
    }

    const timeoutRef = React.useRef();
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current);
        dispatch({ type: 'START_SEARCH', query: data.value });

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' });
                return;
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i');
            const isMatch = (result) => re.test(result.title);

            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(searchUsers, isMatch),
            });
        }, 300);
    }, []);
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Grid>
            <Grid.Column width={6}>
                <Search
                    loading={loading}
                    onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })}
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
            </Grid.Column>
            <Grid.Column width={4}>
                <Button color="red" onClick={() => props.removeUserFromCourse(value)}>
                    Remove User
                </Button>
            </Grid.Column>
        </Grid>
    );
};

export const UnformedGroupModal = (props) => {
    return (
        <Modal closeIcon onClose={() => props.onClosed(false)} open={props.isOpen} style={{ width: '38%' }}>
            <Modal.Header style={{ fontSize: '16px' }}>Ready Status</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {props.isFormable ? (
                        <div className="ui negative message" style={{ fontSize: '12px', width: '95%' }}>
                            ONCE GROUP FINALIZED, YOU CANNOT EXIT OR DISSOLVE GROUP
                        </div>
                    ) : null}
                    <div className="ui information message" style={{ fontSize: '12px', width: '95%' }}>
                        Group Members
                    </div>
                    {convertMembersToMemberElement(props.members, props.onUserClicked)}
                    <Form onSubmit={(e) => props.onClosed(e, true, 'update')}>
                        <Form.Field>
                            {props.isFormable ? (
                                <Checkbox
                                    name="isReady"
                                    label={'Ready ' + props.voteStatus}
                                    defaultChecked={props.isUserReady}
                                />
                            ) : null}
                            <Link
                                style={{
                                    fontSize: '14px',
                                    float: 'right',
                                }}
                                to="/notifications">
                                Check join requests
                            </Link>
                        </Form.Field>
                        {props.isFormable ? (
                            <Button
                                floated="right"
                                type="submit"
                                positive
                                style={{
                                    borderRadius: '10px',
                                    padding: '5px 16px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '10px',
                                }}>
                                Update Ready
                            </Button>
                        ) : null}
                        <Button
                            floated="right"
                            negative
                            onClick={() => props.onClosed(true, 'exit')}
                            style={{
                                borderRadius: '10px',
                                padding: '5px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                lineHeight: '20px',
                                whiteSpace: 'nowrap',
                                marginBottom: '10px',
                            }}>
                            Exit Group
                        </Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export const SendRequestModal = (props) => {
    return (
        <Modal closeIcon onClose={() => props.onClosed(false)} open={props.isOpen} size={'mini'}>
            <Modal.Header style={{ fontSize: '16px' }}>Request Group Join & Merge</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {!props.isUserAlone ? (
                        <div className="ui negative message" style={{ fontSize: '12px', width: '95%' }}>
                            IF YOUR JOIN REQUEST ACCEPTED, YOU WILL AUTOMATICALLY EXIT FROM YOUR CURRENT GROUP
                        </div>
                    ) : null}
                    <div className="ui information message" style={{ fontSize: '12px', width: '95%' }}>
                        Group Members
                    </div>
                    {convertMembersToMemberElement(props.members, props.onUserClicked)}
                    <div className="ui warning message" style={{ fontSize: '12px', width: '95%' }}>
                        Please write a note and send a request
                    </div>
                    <TextArea
                        value={props.text}
                        onChange={props.onTextChange}
                        style={{ minHeight: 100, width: '95%' }}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {!props.isUserAlone ? (
                    <Button
                        color="blue"
                        onClick={() => props.onClosed(true, 'merge')}
                        style={{
                            borderRadius: '10px',
                            padding: '5px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            whiteSpace: 'nowrap',
                        }}>
                        Merge Request
                    </Button>
                ) : null}
                <Button
                    color="blue"
                    onClick={() => props.onClosed(true, 'join')}
                    style={{
                        borderRadius: '10px',
                        padding: '5px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        whiteSpace: 'nowrap',
                    }}>
                    Join Request
                </Button>
            </Modal.Actions>
        </Modal>
    );
};
