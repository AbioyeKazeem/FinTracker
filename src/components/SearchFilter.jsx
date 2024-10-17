import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SearchFilter = ({ setSearchQuery, setFilterCriteria, filterCriteria = {} }) => {
    // Destructure filterCriteria to ensure defaults
    const {
        date = "",
        category = "",
        minAmount = "",
        maxAmount = ""
    } = filterCriteria;

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleFilterChange(event) {
        const { name, value } = event.target;

        // Parse numbers for minAmount and maxAmount
        const parsedValue = name === "minAmount" || name === "maxAmount" ? (value ? parseFloat(value) : "") : value;

        setFilterCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: parsedValue
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
                                value={date}
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
                                value={category}
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
                                value={minAmount}
                                onChange={handleFilterChange}
                                placeholder="0"
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMaxAmount">
                            <Form.Label>Max Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxAmount"
                                value={maxAmount}
                                onChange={handleFilterChange}
                                placeholder="0"
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SearchFilter;
