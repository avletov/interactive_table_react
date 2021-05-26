import React, { useState, useEffect } from 'react';

import {
    fetchPageNumbers,
    getSortingDirection,
    getNewPage,
    sorting,
    toFilter
} from './utils';

import {
    LEFT_ARROW,
    RIGHT_ARROW,
    tableHeader
} from './datasets';

import {
    Container,
    Title,
    Search,
    InteractiveTable,
    Table,
    THead,
    THeadCell,
    TBody,
    Row,
    Cell,
    Toolbar,
    Pagination,
    Button,
    Output
} from './styles';


export default function App() {
    const [table, setTable] = useState({
        data: [],
        rowsLimit: 10,
        currentPage: 1,
        sort: null,
        sortField: 'id'
    });

    const [search, setSearch] = useState(null);

    useEffect(() => {
        getPosts();
    }, []);

    const { data, rowsLimit, currentPage, sortField, sort } = table;

    const sortedData = sorting(data, sortField, sort);
    const filteredData = toFilter(sortedData, search);
    const pageNumbers = fetchPageNumbers(filteredData.length, rowsLimit, currentPage);

    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(responce => responce.json())
            .then(result => setTable({ ...table, data: result }));
    }

    const changePage = (pageNumber) => {
        const { currentPage } = table;
        const newPage = getNewPage(pageNumber, currentPage);

        setTable({ ...table, currentPage: newPage });
    }

    const setRowsLimit = (value) => {
        setTable({ ...table, rowsLimit: value, currentPage: 1 });
    }

    const sortData = (column) => {
        const { data, sort, sortField } = table;

        const newSort = getSortingDirection(sort, sortField === column);

        setTable({ ...table, sort: newSort, sortField: column });
    }

    const toSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    }

    const renderPagination = () => {
        return (
            <Pagination>
                {pageNumbers.map(pageNumber => <Button
                    key={`page_${pageNumber}`}
                    onClick={() => changePage(pageNumber)}
                    active={currentPage === pageNumber}
                >
                    {pageNumber === 'LEFT' ? LEFT_ARROW :
                        pageNumber === 'RIGHT' ? RIGHT_ARROW : pageNumber
                    }</Button>)}
            </Pagination>
        );
    }

    return (
        <Container>
            <Title>Posts list</Title>
            <InteractiveTable>
                <Search onChange={(e) => toSearch(e)} placeholder={'Найти'} value={search}></Search>
                <Toolbar>
                    {renderPagination()}
                    <Output onClick={() => setRowsLimit(10)} active={rowsLimit === 10}>по 10 элементов</Output>
                    <Output onClick={() => setRowsLimit(50)} active={rowsLimit === 50}>по 50 элементов</Output>
                </Toolbar>
                <Table>
                    <THead>
                        <Row>{tableHeader.map(({ name, columnName, width, align }) =>
                            <THeadCell
                                key={name}
                                width={width}
                                align={align}
                                sorting={name === sortField ? sort : null}
                                onClick={() => sortData(name)}
                            >{columnName}</THeadCell>)}
                        </Row>
                    </THead>
                    <TBody>{filteredData.slice((table.rowsLimit * (table.currentPage - 1)), table.currentPage * table.rowsLimit).map((item) => {
                        return (
                            <Row key={`row_${item.id}`}>
                                {tableHeader.map(({ name, align }) =>
                                    <Cell
                                        key={name}
                                        align={align}
                                    >{item[name]}</Cell>)}
                            </Row>
                        )
                    })}
                    </TBody>
                </Table>
                {renderPagination()}
            </InteractiveTable>
        </Container>
    );
}