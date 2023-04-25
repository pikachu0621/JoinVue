export function initEcharts(dom_id, echarts, option) {
    const init = echarts.init(document.getElementById(dom_id), "dark");
    option.backgroundColor = {
        type: 'radial',
        x: 0.3,
        y: 0.3,
        r: 0.8,
        colorStops: [
            {
                offset: 0,
                color: '#424859'
            },
            {
                offset: 1,
                color: '#424859'
            }
        ]
    }
    init.setOption(option)
    return init
}


export function isNullOrUndefined( ...values ){
    for (let i = 0; i < values.length; i++) {
        const v = values[i]
        if (v === null || v === undefined) return true
        if (isUtilString(v) && v.length <= 0) {
            console.log(55555)
            return true
        }
    }
    return false
}

export function isUtilString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
}