import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import React from 'react';
import Chart from 'react-google-charts';
import './Statistics.css';

function tableReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction: state.direction === 'ascending' ? 'descending' : 'ascending',
                };
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            };
        default:
            throw new Error();
    }
}

export const GradesTabel = (props) => {
    let tempData = [];
    for (let i = 0; i < props.groups.length; i++) {
        tempData.push({ group: props.groups[i].name });
        for (let k = 0; k < props.graders.length; k++) {
            tempData[i][k] = props.groups[i].grades[k];
        }
    }
    const [state, dispatch] = React.useReducer(tableReducer, {
        column: null,
        data: tempData,
        direction: null,
    });

    const { column, data, direction } = state;
    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'group' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'group' })}>
                        Groups
                    </Table.HeaderCell>
                    {}
                    {props.graders.map((grader, index) => (
                        <Table.HeaderCell
                            sorted={column === index ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: index })}>
                            {grader}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((group) => (
                    <Table.Row>
                        <Table.Cell>{group['group']}</Table.Cell>
                        {Object.keys(group).map(
                            (element) => element !== 'group' && <Table.Cell>{group[element]}</Table.Cell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
export const GradeGroupGraph = (props) => {
    let data = [['Group', 'Grade', { role: 'style' }]];
    for (let i = 0; i < props.groups.length; i++) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        data.push([props.groups[i].group, props.groups[i].grade, randomColor]);
    }

    return <Chart className="Graph" chartType="ColumnChart" width="100%" height="200px" data={data} />;
};

export const GroupNoGradeGraph = (props) => {
    let data = [['Grade', 'Group Number', { role: 'style' }]];
    for (let i = 5; i <= 100; i += 5) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        data.push([i - 5 + '-' + i, 0, randomColor]);
    }

    for (let i = 0; i < props.groups.length; i++) {
        data[Math.floor((props.groups[i].grade - 1) / 5 + 1)][1]++;
    }
    return <Chart className="Graph" chartType="ColumnChart" width="100%" height="200px" data={data} />;
};
