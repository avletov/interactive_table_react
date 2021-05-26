const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

export const fetchPageNumbers = (lengthData, rowsLimit, currentPage = 1, pageNeighbours = 1) => {

    const totalPages = Math.ceil(lengthData / rowsLimit);
    pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));

    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pages = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
}

export const getNewPage = (pageNumber, currentPage) => {
    if (pageNumber === 'LEFT') {
        return currentPage - 1;
    } else if (pageNumber === 'RIGHT')
        return currentPage + 1;

    return pageNumber;
}

export const getSortingDirection = (currentDirection, isSame) => {
    if (currentDirection === 'ASC' && isSame) {
        return 'DESC';
    } else if (currentDirection === 'DESC' && isSame) {
        return null;
    } else {
        return 'ASC';
    }
}

export const sorting = (data, column, newSort) => {
    const compare = (a, b) => {
        if (a[column] > b[column]) {
            return 1;
        }
        if (a[column] < b[column]) {
            return -1;
        }

        return 0;
    }

    if (data.length === 0) {
        return [];
    }

    const sorted = data.slice(0).sort(compare);

    if (newSort === 'ASC') {
        return sorted;
    }

    if (newSort === 'DESC') {
        return sorted.reverse();
    }

    return data;
}

export const toFilter = (data, value) => {
    if (value === null) {
        return data;
    }

    return data.filter(item => {
        let matching;

        for (let key in item) {
            const text1 = String(item[key]).replace(/\r?\n/g, ' ');
            const text2 = value.trim();
            matching = matching || text1.indexOf(text2) !== -1;
        }

        return matching;
    })
}