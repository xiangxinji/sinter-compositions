/**
 *  负责文件的导出/下载操作
 */

function exportFile(res: Blob, name: string) {//二进制文件流导出
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

function exportPath(path: string) {//通过文件地址下载
    const elink = document.createElement("a");
    elink.style.display = "none";
    elink.href = path
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
}


export function useCreateExporter () {
    return {
        exportFile,
        exportPath
    }
}
