import type { LineType, Lines } from "@/stores/GameStore";

interface GetScoreForNewLine {
  lineIndex: number;
  lines: Lines;
  onBoxMade: (rowIndex: number, lineIndex: number) => void;
  rowIndex: number;
  type: LineType;
}

export const getScoreForNewLine = ({
  rowIndex,
  lineIndex,
  lines,
  type,
  onBoxMade
}: GetScoreForNewLine): number => {
  let score = 0;
  if (type === 'horizontals') {
    const lineAbove = lines.horizontals[rowIndex - 1]?.[lineIndex];
    const leftUpperLine = lines.verticals[rowIndex - 1]?.[lineIndex];
    const rightUpperLine = lines.verticals[rowIndex - 1]?.[lineIndex + 1];
    if (
      lineAbove &&
      leftUpperLine &&
      rightUpperLine &&
      lines.boxes[rowIndex - 1][lineIndex] === ''
    ) {
      onBoxMade(rowIndex - 1, lineIndex);
      score++;
    }

    const lineBelow = lines.horizontals[rowIndex + 1]?.[lineIndex];
    const leftLowerLine = lines.verticals[rowIndex]?.[lineIndex];
    const rightLowerLine = lines.verticals[rowIndex]?.[lineIndex + 1];
    if (
      lineBelow &&
      leftLowerLine &&
      rightLowerLine &&
      lines.boxes[rowIndex][lineIndex] === ''
    ) {
      onBoxMade(rowIndex, lineIndex);
      score++;
    }

    return score;
  }

  const lineLeft = lines.verticals[rowIndex]?.[lineIndex - 1];
  const leftUpperLine = lines.horizontals[rowIndex]?.[lineIndex - 1];
  const leftLowerLine = lines.horizontals[rowIndex + 1]?.[lineIndex - 1];
  if (
    lineLeft &&
    leftUpperLine &&
    leftLowerLine &&
    lines.boxes[rowIndex][lineIndex - 1] === ''
  ) {
    onBoxMade(rowIndex, lineIndex - 1);
    score++;
  }

  const lineRight = lines.verticals[rowIndex]?.[lineIndex + 1];
  const rightUpperLine = lines.horizontals[rowIndex]?.[lineIndex];
  const rightLowerLine = lines.horizontals[rowIndex + 1]?.[lineIndex];
  if (
    lineRight &&
    rightUpperLine &&
    rightLowerLine &&
    lines.boxes[rowIndex][lineIndex] === ''
  ) {
    onBoxMade(rowIndex, lineIndex);
    score++;
  }

  return score;
};
