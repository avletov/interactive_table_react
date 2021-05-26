import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    min-width: 700px;
    padding: 0px 25px;
    flex-direction: column;
    font-family: 'Roboto';
    background-color: rgb(237, 240, 244); 
`;

export const Title = styled.h1`
    margin-top: 0px;
    text-align: center;
`;

export const Search = styled.input`
    width: calc(100% - 60px);
    height: 30px;
    margin-left: 20px;
    padding: 0px 10px;
    box-sizing: border-box;
`;

export const InteractiveTable = styled.div`
    min-width: 600px;
    margin-bottom: 25px;
    padding-top: 10px;
    border-radius: 5px;
    background-color: white; 
`;

export const Table = styled.table`
    width: 100%;
    margin: 20px 0px;
    border-collapse: collapse;
`;

export const THead = styled.thead`
    border-bottom: 1px solid rgb(200, 200, 200);
`;

export const THeadCell = styled.td`
    position: relative;
    text-align: ${({ align }) => align ? 'center' : ''};
    cursor: pointer;
    ${({ sorting }) => {
        if (sorting) {
            const content = sorting === 'ASC' ? '▲' : '▼';
            return (
                `&::before {
                    content: '${content}';
                    position: absolute;
                    top: 50%;
                    right: 5px;
                    transform: translateY(-50%);
                    font-size: 12px;
                    color: rgb(200, 200, 200);
                }`
            )
        }
    }}
`;

export const TBody = styled.tbody``;
export const Row = styled.tr`
    border-bottom: 1px solid rgb(200, 200, 200);

    &:last-child {
        border-bottom: none;
    }
`;
export const Cell = styled.td`
    padding: 10px 5px;
    text-align: ${({ align }) => align};
`;

export const Toolbar = styled.div`
    display: flex;
`;

export const Pagination = styled.ul`
    display: flex;
    min-width: 253px;
    min-height: 32px;
    margin: 10px 20px;
    padding: 0px;
    list-style-type: none;
`;

export const Button = styled.li`
    display: flex;
    width: 35px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(200, 200, 200);
    border-bottom: 1px solid rgb(200, 200, 200);
    border-left: 1px solid rgb(200, 200, 200);
    background-color: ${({ active }) => active ? 'rgb(200, 200, 200)' : 'rgb(230, 230, 230)'};
    cursor: pointer;

    &:last-child {
        border-right: 1px solid rgb(200, 200, 200);
    }
`;

export const Output = styled.span`
    display: inline-flex;
    margin-left: 10px;
    align-items: center;  
    text-decoration: ${({ active }) => active ? 'underline' : ''};
    color: rgb(100, 100, 100);
    cursor: pointer;
`;