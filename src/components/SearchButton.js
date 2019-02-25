import React from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'

const SearchButton = ({handleInputChange, search, handleCheckbox,
                        checkboxDefault, reset, checkboxDisabled,
                        handleRangeStart, handleRangeEnd, range}) => {
  
    return (
      <Form>
        <Row>
            <Col>
                <Form.Control 
                type = 'text'
                onChange = {handleInputChange}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <Button onClick = {search} variant = 'primary' type = 'submit'>Add</Button>
                <Button onClick = {reset} variant = 'danger'>Reset</Button>
            </Col>
            <Col>
                <Form.Label>
                    Range Start
                </Form.Label>
                <Form.Control
                type = 'text'
                onChange = {handleRangeStart}
                value = {range.start}
                />
            </Col>
            <Col>
                <Form.Label>
                    End
                </Form.Label>
                <Form.Control
                type = 'text'
                onChange = {handleRangeEnd}
                value = {range.end}
                />
            </Col>
        </Row>
        <Form.Check
            disabled = {checkboxDisabled}
            type = 'checkbox'
            onChange = {handleCheckbox}
            defaultChecked = {checkboxDefault}
            label = "Per Capita"
        />
            
        
      </Form>
    )
}

export default SearchButton;
