import { createBoard, TILE_STATUSES, markedTilesCount, markTile } from "./mineswepper"

describe('#createBoard', () => {
    test('it creates a valid board', () => {
        const boardSize = 2
        const minePositions = [{x: 0, y: 1}]
        const expectedBoard = [[
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        const board = createBoard(boardSize, minePositions)
        expect(board).toEqual(expectedBoard)
    })
})

describe('#markedTilesCount', () => {
    test('with some tiles marked', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false}
        ]]
        expect(markedTilesCount(board)).toEqual(2)
    })

    test('with no tiles marked', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        expect(markedTilesCount(board)).toEqual(0)
    })

    test('with all tiles marked', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false}
        ]]
        expect(markedTilesCount(board)).toEqual(4)
    })
})

describe('#markTile', () => {
    test('with a hidden tile it marks it', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        const expectedBoard = [[
            { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        expect(markTile(board, { x: 0, y: 0})).toEqual(expectedBoard)
    })

    test('with a marked tile it un-marks it', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        const expectedBoard = [[
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        expect(markTile(board, { x: 0, y: 0})).toEqual(expectedBoard)
    })

    test('with a mine tile it does nothing', () => {
        const board = [[
            { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: false},
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true}
        ], [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false},
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false}
        ]]
        expect(markTile(board, { x: 0, y: 0})).toEqual(board)
    })
})