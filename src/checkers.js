export const EMPTY_CELL = 0;
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export const createBoard = () => [
    [PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1],
    [PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2],
    [PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2],
];

const getCellValue = (board, x, y) => {
    if (x < 0 || y < 0 || x >= board.length || y >= board.length) {
        return null;
    }

    return board[y][x];
};

export const getPostCapturePositions = (board, x, y) => {
    const currentPlayer = getCellValue(board, x, y);
    if (currentPlayer === EMPTY_CELL || !currentPlayer) {
        return [];
    }

    const forwardDirection = currentPlayer === PLAYER_1 ? 1 : -1;
    const postCapturePositions = [[x - 1, y + forwardDirection], [x + 1, y + forwardDirection]].map(([captureX, captureY]) => {
        const capturedManColor = getCellValue(board, captureX, captureY);
        if (capturedManColor === null || capturedManColor === currentPlayer || capturedManColor === EMPTY_CELL) {
            return;
        }

        const postCaptureX = captureX + (captureX - x);
        const postCaptureY = captureY + forwardDirection;

        const postCaptureValue = getCellValue(board, postCaptureX, postCaptureY);
        if (postCaptureValue !== EMPTY_CELL) {
            return;
        }

        const postCaptureBoard = [...board];
        postCaptureBoard[y][x] = EMPTY_CELL;
        postCaptureBoard[captureY][captureX] = EMPTY_CELL;
        postCaptureBoard[postCaptureY][postCaptureX] = currentPlayer;

        const nextCapturePositions = getPostCapturePositions(postCaptureBoard, postCaptureX, postCaptureY);

        if (!nextCapturePositions.length) {
            return [postCaptureX, postCaptureY];
        }

        return nextCapturePositions[0];
    });

    return postCapturePositions.filter(p => p);
};

export const getPlayablePositions = (board, x, y) => {
    let playablePositions = [];

    const player = getCellValue(board, x, y);
    const forwardDirection = player === PLAYER_1 ? 1 : -1;

    [[x - 1, y + forwardDirection], [x + 1, y + forwardDirection]].forEach(coordinates => {
        const adjacentValue = getCellValue(board, coordinates[0], coordinates[1]);

        // outside from board
        if (adjacentValue === null) {
            return;
        }

        // // near diagnoal empty cell: that's playable!
        if (adjacentValue === EMPTY_CELL) {
            playablePositions = playablePositions.concat({
                capture: false,
                position: [...coordinates],
            });
            return;
        }

        // ennemy spotted? let's check if we can engage battle!
        const postCapturePositions = getPostCapturePositions(board, x, y);
        if (postCapturePositions && postCapturePositions.length) {
            postCapturePositions.forEach(postCapturePosition => {
                playablePositions.push({
                    capture: true,
                    position: [...postCapturePosition],
                });
            });
        }
    });

    return playablePositions;
};

export const getAllPlayablePositions = (board, player) => {
    let playablePositions = [];

    const length = board.length;
    for (const x = 0 ; x < length ; x++) {
        for (const y = 0 ; y < length ; y++) {
            if (getCellValue(board, x, y) !== player) {
                continue;
            }

            const newPlayablePositions = getPlayablePositions(board, x, y);
            playablePositions = playablePositions.concat(newPlayablePositions);
        }
    }

    const captureMoves = playablePositions.filter(pp => pp.capture);
    if (captureMoves.length) {
        return captureMoves.map(m => m.position);
    }

    return playablePositions.map(m => m.position);
};
