import React from 'react';
import Board from './Board';

import { createBoard } from './checkers';

const board = createBoard();

export const App = () => (
    <div>
        <h1>Checkers</h1>
        <Board board={board} />
    </div>
);

export default App;
