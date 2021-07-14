/**
 * use:
 * export default mockFilter({
  'POST /storehouse/storehouseBatchSortedRecord/getBatchSortedRecordPage': {
    code: 1000,
    data: [],
    message: 'mock error',
  },
});
 * @param mocks mocks list
 */
export default (mocks: { [n: string]: any }) => {
  return Object.keys(mocks).filter((n: string) => !disableMocks.includes(n));
};
// disable mocks paths
const disableMocks: string[] = [];
