import type { LineType } from "@/stores/GameStore";
import type { LineConfig } from "./lineConfigBuilder";

interface GetScoreForNewLine {
  lineIndex: number;
  lineConfig: LineConfig;
  onBoxMade: (rowIndex: number, lineIndex: number) => void;
  rowIndex: number;
  type: LineType;
}

export const getScoreForNewLine = ({
  rowIndex,
  lineIndex,
  lineConfig,
  type,
  onBoxMade
}: GetScoreForNewLine): number => {
  const { horizontals, verticals, boxes } = lineConfig;
  let score = 0;
  if (type === 'horizontals') {
    const lineAbove = horizontals[rowIndex - 1]?.[lineIndex];
    const leftUpperLine = verticals[rowIndex - 1]?.[lineIndex];
    const rightUpperLine = verticals[rowIndex - 1]?.[lineIndex + 1];
    if (
      lineAbove &&
      leftUpperLine &&
      rightUpperLine &&
      boxes[rowIndex - 1][lineIndex] === ''
    ) {
      onBoxMade(rowIndex - 1, lineIndex);
      score++;
    }

    const lineBelow = horizontals[rowIndex + 1]?.[lineIndex];
    const leftLowerLine = verticals[rowIndex]?.[lineIndex];
    const rightLowerLine = verticals[rowIndex]?.[lineIndex + 1];
    if (
      lineBelow &&
      leftLowerLine &&
      rightLowerLine &&
      boxes[rowIndex][lineIndex] === ''
    ) {
      onBoxMade(rowIndex, lineIndex);
      score++;
    }

    return score;
  }

  const lineLeft = verticals[rowIndex]?.[lineIndex - 1];
  const leftUpperLine = horizontals[rowIndex]?.[lineIndex - 1];
  const leftLowerLine = horizontals[rowIndex + 1]?.[lineIndex - 1];
  if (
    lineLeft &&
    leftUpperLine &&
    leftLowerLine &&
    boxes[rowIndex][lineIndex - 1] === ''
  ) {
    onBoxMade(rowIndex, lineIndex - 1);
    score++;
  }

  const lineRight = verticals[rowIndex]?.[lineIndex + 1];
  const rightUpperLine = horizontals[rowIndex]?.[lineIndex];
  const rightLowerLine = horizontals[rowIndex + 1]?.[lineIndex];
  if (
    lineRight &&
    rightUpperLine &&
    rightLowerLine &&
    boxes[rowIndex][lineIndex] === ''
  ) {
    onBoxMade(rowIndex, lineIndex);
    score++;
  }

  return score;
};
