const path = require('path')
const osu = require('node-os-utils')
const si = require('systeminformation')

const cpu = osu.cpu
const mem = osu.mem
const os = osu.os

setInterval(() => {
    cpu.usage().then((info) => {
        document.getElementById('cpu-usage-bar').setAttribute("value", info)
        document.getElementById('cpu-percent').innerText = Math.trunc(info) + ' %'
    })

    si.graphics().then((info) => {
        document.getElementById('gpu-usage-bar').setAttribute("value", info.controllers[1].utilizationGpu)
        document.getElementById('gpu-percent').innerText = info.controllers[1].utilizationGpu + ' %'
    })

    si.cpuTemperature().then((info) => {
        console.log(info.main)
    })

}, 3000)