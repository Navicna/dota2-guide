export const isNumber = (n: any): boolean =>
  typeof n === 'number' && !Number.isNaN(n);

export const getCssValue = (value: any) => {
  if (!isNumber(value)) {
    return value || 0;
  }
  return value || 0;
};

type boldTextArray = Array<{match?: boolean; text: string}>;

export function parseDescription(descriptionBody: string): boldTextArray {
  const regex = /\*\*/g;
  const output: boldTextArray = [];

  if (!descriptionBody.length) {
    return output;
  }

  let remainText = descriptionBody;
  while (remainText.length) {
    const sepFoundAt = remainText.search(regex);
    switch (sepFoundAt) {
      case -1: {
        output.push({text: remainText});
        return output;
      }

      case 0:
        const nextSepFoundAt = remainText.slice(2).search(regex);

        output.push({
          text: remainText.slice(2, nextSepFoundAt + 2),
          match: true,
        });

        remainText = remainText.slice(nextSepFoundAt + 4);
        break;

      default:
        output.push({text: remainText.slice(0, sepFoundAt)});
        remainText = remainText.slice(sepFoundAt);
        break;
    }
  }

  return output;
}
