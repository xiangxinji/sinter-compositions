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


export function exportFile(res: Blob, name: string) {//二进制文件流导出
    const url = window.URL.createObjectURL(new Blob([res], {type: 'application/vnd.ms-excel;charset=utf-8'}))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    let nd = new Date();
    const fileName = name || (nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate())
    link.setAttribute('download', fileName + '.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url);
}


export function exportPath(path: string) {//通过文件地址下载
    const elink = document.createElement("a");
    elink.style.display = "none";
    elink.href = path
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
}
