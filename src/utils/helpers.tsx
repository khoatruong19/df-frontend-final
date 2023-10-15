// export const cleanEmptyStringValueProperties = <K extends PropertyKey, V>(
//   obj: Record<K, V>
// ) => {
//   const cleanedValues = {} as Record<K, V>;

//   Object.entries(obj).forEach(([key, value]) => {
//     if (!!value) {
//       cleanedValues[key as K] = value as V;
//     }
//   });
// };
