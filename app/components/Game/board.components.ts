import styled from "styled-components";
import {LETTER_MATCH_STATUS} from "../../declarations/game.declarations";

export const Table = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: .25em;
`;

export const Row = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .25em;
`;

const CellBackground: Record<LETTER_MATCH_STATUS, string> = {
    [LETTER_MATCH_STATUS.HIT]: '#6CAA64',
    [LETTER_MATCH_STATUS.MATCH]: '#C8B457',
    [LETTER_MATCH_STATUS.MISSED]: '#3A3A3C',
    [LETTER_MATCH_STATUS.NONE]: 'transparent'
}
const CellContrast: Record<LETTER_MATCH_STATUS, string> = {
    [LETTER_MATCH_STATUS.HIT]: 'white',
    [LETTER_MATCH_STATUS.MATCH]: 'white',
    [LETTER_MATCH_STATUS.MISSED]: 'white',
    [LETTER_MATCH_STATUS.NONE]: '#3A3A3C'
}

export const Cell = styled.p<{ status: LETTER_MATCH_STATUS }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 0.15em;
  border: 2px solid var(--primary-grey);
  font-size: 1.5em;
  margin: 0;

  background: ${props => CellBackground[props.status]};
  color: ${props => CellContrast[props.status]};
`;