export const convertInputToValues = (data: any) => {
  const transformedData: { [key: string]: number } = {};

  Object.keys(data).forEach((key) => {
    const value = (data as any)[key];

    if (value === '') return;

    transformedData[key] = Number(value);
  });

  return transformedData;
};
