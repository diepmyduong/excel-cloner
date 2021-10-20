import _ from 'lodash';

export default function parseString(text: string, context: any = {}) {
  let messageText = '' + text;
  const stringRegex = /{{(.*?)}}/g;
  messageText = messageText.replace(stringRegex, (__: any, field: string) => {
    let data = _.get(context, field.trim());
    if (_.isString(data) || _.isNumber(data)) {
      data = JSON.stringify(data)
        .replace(/\\n/g, '\\n')
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f')
        .replace(/^\"(.*)\"$/g, '$1');
    } else if (_.isObject(data) || _.isBoolean(data)) {
      data = `<<Object(${JSON.stringify(data)})Object>>`;
    }
    return data || '';
  });
  return messageText.replace(
    /\:\"(?: +)?<<Object\((true|false|[\{|\[].*?[\}|\]])\)Object>>(?: +)?\"/g,
    ':$1'
  );
}
