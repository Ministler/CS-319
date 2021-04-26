import React, { Component } from 'react';
import {
    Divider,
    Input,
    Dropdown,
    Grid,
    Checkbox,
    Segment,
    GridColumn,
    Button,
    GridRow,
    Icon,
    Form,
    Message,
    List,
} from 'semantic-ui-react';

import './CourseCreation.css';

const semesterOptions = [
    {
        key: 'Fall',
        text: 'Fall',
        value: 'Fall',
    },
    {
        key: 'Spring',
        text: 'Spring',
        value: 'Spring',
    },
    {
        key: 'Summer',
        text: 'Summer',
        value: 'Summer',
    },
];
var code = '';
var year = '';
var semester = '';
export class CourseCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            year: '',
            semester: '',
            isSectionless: false,
            sectionNumber: 1,
            sections: [
                {
                    key: 1,
                    text: 1,
                    value: 1,
                },
            ],
            instructorList: [],
            TAList: [],
            studentManualList: [],
            studentAutoList: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, data) {
        const name = data.name;
        var value = '';
        if (data.type === 'checkbox') {
            value = data.checked;
            var sectionNumber = value ? 0 : 1;
            this.setState({ [name]: value, sectionNumber: sectionNumber });
        } else {
            value = data.value;
            this.setState({
                [name]: value,
            });
        }
    }

    changeSection = (event, data) => {
        var sections = [];
        for (var i = 1; i <= data.value; i++) {
            sections.push({
                key: i,
                text: i,
                value: i,
            });
        }
        console.log(sections);
        this.setState({ sections: sections });
        this.handleChange(event, data);
    };

    createUserList(members) {
        return (
            <Segment style={{ height: '200px' }}>
                <List items={members}></List>
                <Segment.Inline className="AddSegment">
                    <Input icon={<Icon name="plus" inverted circular link />} placeholder="Enter" />
                </Segment.Inline>
            </Segment>
        );
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <h1>Create New Course</h1>
                </Form.Group>
                <Divider />
                <Form.Group>
                    <Form.Field width={3}>
                        <label for="code">Code:</label>{' '}
                        <Form.Input onChange={this.handleChange} name="code" style={{ width: '50%' }} />
                    </Form.Field>
                    <Form.Field width={3}>
                        <label for="year">Year:</label>
                        <Form.Input
                            min="0"
                            name="year"
                            style={{ width: '50%' }}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </Form.Field>
                    <Form.Field width={3}>
                        <label for="semester">Semester:</label>
                        <Form.Dropdown
                            onChange={this.handleChange}
                            name="semester"
                            inline
                            placeholder="Select"
                            selection
                            options={semesterOptions}
                        />
                    </Form.Field>
                    <Form.Field width={7} textAlign="center">
                        {this.state.code}
                        {(this.state.code != '' || this.state.code != '') && '-'}
                        {this.state.year} {this.state.semester}
                    </Form.Field>
                </Form.Group>
                <Divider />
                <Form.Group widths={3}>
                    <Form.Field>
                        <Checkbox
                            name="isSectionless"
                            onChange={this.handleChange}
                            label="Group Formation Between Sections"
                        />
                    </Form.Field>
                    <Form.Field>
                        {this.state.isSectionless || (
                            <Form.Input
                                type="number"
                                min="1"
                                label="Number of Sections: "
                                name="sectionNumber"
                                onChange={this.changeSection}
                                style={{ width: '25%' }}
                                value={this.state.sectionNumber}
                            />
                        )}
                    </Form.Field>
                    <Form.Field verticalAlign="middle">
                        <Message negative>
                            <Message.Header>THESE CHOICES CANNOT BE CHANGED</Message.Header>
                        </Message>
                    </Form.Field>
                </Form.Group>
                <Divider />
                <Grid>
                    <Grid.Row columns={6}>
                        <GridColumn>Add Instructor:</GridColumn>
                        <GridColumn>{this.createUserList(this.state.instructorList)}</GridColumn>
                        <GridColumn>Add Teaching Assistants</GridColumn>
                        <GridColumn>{this.createUserList(this.state.instructorList)}</GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={6}>
                        <GridColumn>
                            <div>Add Student as .txt file:</div>
                            {this.state.sectionNumber > 0 && (
                                <div>
                                    Section:
                                    <Dropdown
                                        fluid
                                        selection
                                        options={this.state.sections}
                                        defaultValue={this.state.sections[0].value}
                                    />
                                </div>
                            )}
                        </GridColumn>
                        <GridColumn>
                            <Button>Add File</Button>
                        </GridColumn>
                        <GridColumn>
                            <div>Add Student as a list:</div>
                            {this.state.sectionNumber > 0 && (
                                <div>
                                    Section:{' '}
                                    <Dropdown
                                        fluid
                                        selection
                                        options={this.state.sections}
                                        defaultValue={this.state.sections[0].value}
                                    />
                                </div>
                            )}
                        </GridColumn>
                        <GridColumn>{this.createUserList(this.state.instructorList)}</GridColumn>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Grid columns={1}>
                    <GridColumn>
                        <Grid.Row>
                            Group Formation Type:<Dropdown></Dropdown>
                            <Icon name="info circle"></Icon>
                        </Grid.Row>
                        <Grid.Row>
                            Min:<Input></Input> Max:<Input></Input>
                        </Grid.Row>
                        <Grid.Row>
                            Group Formation Date
                            <Input type="date"></Input>
                        </Grid.Row>
                    </GridColumn>
                </Grid>
                <Divider />
                <Button>Create New Course</Button>
            </Form>
        );
    }
}
