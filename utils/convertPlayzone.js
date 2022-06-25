import { playzoneMaxHeight, playzoneMaxWidth, playzoneDefaultValue } from '~/constants/common';

const getCell = (grid, row, col) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of grid) {
        if ([row, col].every((val, ind) => val === item.l[ind])) {
            return item.v;
        }
    }

    return playzoneDefaultValue;
};

export const unpackGrid = (grid) => {
    const newGrid = [];

    for (let x = 0; x < playzoneMaxHeight; x += 1) {
        const row = [];

        for (let y = 0; y < playzoneMaxWidth; y += 1) {
            const cell = getCell(grid, x, y);
            row.push(cell);
        }
        newGrid.push(row);
    }

    return newGrid;
};
