/**
 * 日期格式化
 */
import { validKey } from "./validate";

export const calcDate = (date1: number, date2: number) => {
  const date3 = date2 - date1;

  const days = Math.floor(date3 / (24 * 3600 * 1000));

  const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));

  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));

  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(date3 / 1000);
  return {
    leave1,
    leave2,
    leave3,
    days,
    hours,
    minutes,
    seconds
  };
};

export function dateFormat(date: Date, s: string = ""): string {
  let format = s || "yyyy-MM-dd hh:mm:ss";
  const o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  // eslint-disable-next-line no-restricted-syntax
  Object.keys(o).forEach((k: string) => {
    if (validKey(k, o) && new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  });
  return format;
}

/**
 * 相差天数
 */
export function diffDay(date1: Date, date2: Date): string {
  const dateStart = new Date(date1).getTime();
  const dateEnd = new Date(date2).getTime();
  const difValue = Math.abs((dateEnd - dateStart) / (1000 * 60 * 60 * 24));
  return (difValue + 1).toFixed(1);
}

/**
 * 比较两个时间
 * date1 < date2 ? true : fales
 */
export function compareDate(date1: Date, date2: Date): boolean {
  const dateTime1 = new Date(date1).getTime();
  const dateTime2 = new Date(date2).getTime();
  return dateTime1 <= dateTime2;
}
