import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchFilter = ({ setSearchQuery, setFilterCriteria, filterCriteria }) => {
    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleFilterChange(event) {
        const { name, value } = event.target;
        setFilterCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
        }));
    }

    return (
        <div>
            <h5>Search and Filter Transactions</h5>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formSearch">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by description"
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={filterCriteria.date}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={filterCriteria.category}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Category</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Rent">Rent</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Transport">Transport</option>
                                <option value="Others">Others</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMinAmount">
                            <Form.Label>Min Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="minAmount"
                                value={filterCriteria.minAmount}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMaxAmount">
                            <Form.Label>Max Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxAmount"
                                value={filterCriteria.maxAmount}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SearchFilter;
