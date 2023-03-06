describe('#createBoard', () => {
    test('it creates a valid board', () => {
        const boardSize = 2
        const minePositions = [{x: 0, y: 1}]
        const expectedBoard = [[
            { x: 0, y: 0, status: TITLE_STATUSES.HIDDEN, mine: false}
        ]]
        const board = createBoard(boardSize, minePositions)
        expect(board).toEqual(expectedBoard)
    })
})