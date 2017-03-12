import expect from 'expect';
import { getAllPlayablePositions } from './checkers';

describe('Checkers Logic', () => {
    describe('getAllPlayablePositions', () => {
        describe.only('Men', () => {
            it('should return all foward positions diagonally adjacent to a man', () => {
                const board = [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0],
                ];

                const playablePositions = getAllPlayablePositions(board, 1, 1);
                expect(playablePositions).toEqual([[0, 2], [2, 2]]);
            });

            it('should forbid position outside the board', () => {
                const board = [
                    [1, 0],
                    [0, 0],
                ];

                const playablePositions = getAllPlayablePositions(board, 1);
                expect(playablePositions).toEqual([[1, 1]]);
            });

            it('should forbid position occupied by an ally man', () => {
                const board = [
                    0, 1,
                    1, 0,
                ];

                const playablePositions = getAllPlayablePositions(board, 1);
                expect(playablePositions).toEqual([]);
            });

            it('should allow position behind a single ennemy man (for capturing)', () => {
                const test = (board, player, expectedPlayablePositions) => {
                    const playablePositions = getAllPlayablePositions(board, player);
                    expect(playablePositions).toEqual(expectedPlayablePositions);
                }

                test([
                    [0, 0, 1],
                    [0, 2, 0],
                    [0, 0, 0],
                ], 1, [[0, 2]]);

                test([
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 2],
                ], 2, [[0, 0]]);
            });

            it('should forbid diagonal occupied by more than one ennemy man', () => {
                const board = [
                    [1, 0, 0],
                    [0, 2, 0],
                    [0, 0, 2],
                ];

                const playablePositions = getAllPlayablePositions(board, 1);
                expect(playablePositions).toEqual([]);
            });

            it('should forbid all not capturing positions if a capture is possible', () => {
                const board = [
                    [0, 1, 0, 0, 1, 0],
                    [0, 0, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0],
                    [1, 0, 0, 2, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ];

                const playablePositions = getAllPlayablePositions(board, 1);
                expect(playablePositions).toEqual([[3, 2], [2, 5]]);
            });

            it('should use furthest position possible if multiple capture is allowed');

            it('should forbid backward moves');
        });
    });
});
