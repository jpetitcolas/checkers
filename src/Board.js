import React, { PropTypes } from 'react';

import Man from './Man';

const board = [
    [1, null, 1, null, 1, null, 1, null],
    [null, 1, null, 1, null, 1, null, 1],
    [1, null, 1, null, 1, null, 1, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 2, null, 2, null, 2, null, 2],
    [2, null, 2, null, 2, null, 2, null],
    [null, 2, null, 2, null, 2, null, 2],
];

const color = (row, column) => {
    if (row % 2) {
        return column % 2 ? 'black' : 'gray';
    }

    return column % 2 ? 'gray' : 'black';
}

export const Board = () => (
    <div>
        {board.map((row, i) => (
            <div
                key={`row_${i}`}
                style={{
                    display: 'flex',
                    maxWidth: 800,
                }}
            >
                {row.map((cell, j) => (
                    <div
                        key={`column_${j}`}
                        style={{
                            flex: '1 0 0',
                            width: 100,
                            height: 100,
                            backgroundColor: color(i, j),
                        }}
                    >
                        {cell === 1 && <Man color="red" />}
                        {cell === 2 && <Man color="blue" />}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default Board;
