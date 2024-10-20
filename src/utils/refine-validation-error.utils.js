function formatErrorMessage(msg) {
  // Regex to locate the appropriate space for inserting commas in numbers.
  const regex = /(?<!.*ISO \d)\B(?=(\d{3})+(?!\d))/g;

  // Remove quotation marks and insert comma to number if found.
  return `${msg.replaceAll('"', '').replace(regex, ',')}.`;
}

/**
 *
 * @param {import('joi').ValidationError} error
 * @returns
 */
export function refineError(error) {
  const refinedError = {};

  const reducer = (path, key) => {
    if (path === '') return path + key;
    return `${path}.${key}`;
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const detail of error.details) {
    refinedError.path = detail.path.reduce(reducer, '');
    refinedError.message = formatErrorMessage(detail.message.replace(/^"body\./, '"'));
  }

  return refinedError;
}
