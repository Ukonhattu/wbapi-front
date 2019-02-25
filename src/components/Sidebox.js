import React from 'react'
import { Table, Button } from 'react-bootstrap'

const Sidebox = ({ countries, handleRemove }) => {

    const TableItem = ({ value, i }) => {
        return (
            <tr>
                <td style={{ color: countries[i].color }} >{value.country}</td>
                <td><Button variant='danger' onClick={() => handleRemove(i)}>Remove</Button></td>
            </tr>
        )
    }
    const list = countries.map((p, i) => <TableItem key={i.toString()} value={p} i={i} />)
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Country name</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </Table>

    )
}

export default Sidebox;