import React, { PropTypes } from 'react';

export const Game = ({ board }) => (
    <Board board={board} />
);

Board.propTypes = {
    board: PropTypes.array.isRequired,
};

export default Board;
