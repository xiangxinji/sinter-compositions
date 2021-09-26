export function isUpper(str: string): boolean {
    if (str === str.toUpperCase()) return true;
    return false;
}

export function isLower(str: string): boolean {
    return !isUpper(str)
}

// 驼峰命名 -> 分割命名
export function camelToKebabCase(str: string) {
    let r = "";
    let i = 0;
    while (i < str.length) {
        if (isUpper(str[i])) {
            r += "-" + str[i].toLowerCase();
        } else r += str[i];
        i++;
    }
    if (r[0] === "-") return r.substr(1);
    return r;
}
