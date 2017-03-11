import React, { PropTypes } from 'react';

import Man, { PLAYER_1_COLOR, PLAYER_2_COLOR } from './Man';

require('./Board.css');

export const Board = ({ board }) => (
    <div className="board">
        {board.map((row, i) => (
            <div className="row" key={`row_${i}`}>
                {row.map((cell, j) => (
                    <div key={`column_${j}`} className="cell">
                        {cell === 1 && <Man color={PLAYER_1_COLOR} />}
                        {cell === 2 && <Man color={PLAYER_2_COLOR} />}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default Board;
