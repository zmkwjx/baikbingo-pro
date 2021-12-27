/**
 * 验证key是否存在
 *
 * @export
 * @param {(string | number | symbol)} key
 * @param {object} object
 * @return {*}  {key is keyof typeof object}
 */
export function validKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
