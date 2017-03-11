import expect from 'expect';
import { getPlayablePositions } from './checkers';

describe.only('Checkers Logic', () => {
    describe.only('getPlayablePositions', () => {
        it('should return all positions diagonally adjacent to a man', () => {
            const board = [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ];

            const playablePositions = getPlayablePositions(board, 1, 1);
            expect(playablePositions).toEqual([[0, 0], [2, 0], [0, 2], [2, 2]]);
        });

        it('should forbid position outside the board', () => {
            const board = [
                [1, 0],
                [0, 0],
            ];

            const playablePositions = getPlayablePositions(board, 0, 0);
            expect(playablePositions).toEqual([[1, 1]]);
        });

        it('should forbid position occupied by an ally man', () => {
            const board = [
                0, 1,
                1, 0,
            ];

            const playablePositions = getPlayablePositions(board, 1, 0);
            expect(playablePositions).toEqual([]);
        });

        it('should allow position behind a single ennemy man (for capturing)', () => {
            const test = (board, x, y, expectedPlayablePositions) => {
                const playablePositions = getPlayablePositions(board, x, y);
                expect(playablePositions).toEqual(expectedPlayablePositions);
            }

            test([
                [1, 0, 0],
                [0, 2, 0],
                [0, 0, 0],
            ], 0, 0, [[2, 2]]);

            test([
                [0, 0, 2],
                [0, 1, 0],
                [0, 0, 0],
            ], 0, 2, [[2, 0]]);
        });

        it('should forbid diagonal occupied by more than one ennemy man', () => {
            const board = [
                [1, 0, 0],
                [0, 2, 0],
                [0, 0, 2],
            ];

            const playablePositions = getPlayablePositions(board, 0, 0);
            expect(playablePositions).toEqual([]);
        });

        it('should forbid all not capturing positions if a capture is possible');
        it('should use furthest position possible if multiple capture is allowed');
    });
});
