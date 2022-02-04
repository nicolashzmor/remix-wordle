import {Cell, Row, Table} from './board.components'
import React from "react";
import {Attempts, GameConfig, Letter} from "../../declarations/game.declarations";

export interface BoardProps {
    config: GameConfig
    attempts: Attempts
}

export const Board: React.FC<BoardProps> = function ({attempts, config}) {
    const valueOnPosition = (attempt: number, position: number) => (attempts && attempts[attempt] && attempts[attempt][position]) || ''
    const renderedAttempts = () => Math.min(config.attemptsAllowed, attempts.length)

    const getCellValue = (cellLetter: Letter) => {
        return (cellLetter?.value || '').toUpperCase()
    }

    return (
        <Table>
            {Array.from({length: renderedAttempts()}, (_, attempt) =>
                <Row key={`wordle-attempt-${attempt}`}>
                    {Array.from({length: config.wordLength}, (_, cell) => {
                        const letter = valueOnPosition(attempt, cell)
                        return <Cell status={letter.status} key={`wordle-attempt-${attempt}-cell-${cell}`}>
                            {getCellValue(letter)}
                        </Cell>
                    })}
                </Row>
            )}
        </Table>
    )
}

export default Board