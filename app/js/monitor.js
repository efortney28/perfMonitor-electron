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
        document.getElementById('vram-total-used').innerText = (info.controllers[1].memoryUsed / 1024).toFixed(2)
        document.getElementById('vram-total').innerText = (info.controllers[1].memoryTotal / 1024).toFixed(2)
        document.getElementById('vram-percent').innerText = (info.controllers[1].memoryTotal / info.controllers[1].memoryUsed).toFixed(0) + " %"
        document.getElementById('gpu-temp').innerText = info.controllers[1].temperatureGpu
        document.getElementById('vram-usage-bar').setAttribute("value", info.controllers[1].utilizationGpu)
    })

    si.cpuTemperature().then((info) => {
        document.getElementById('cpu-temp').innerText = info.max || "N/A"
    })

    osu.mem.info().then((info) => {
        document.getElementById('ram-usage-bar').setAttribute("value", info.freeMemPercentage)
        document.getElementById('ram-total-used').innerText = (info.usedMemMb / 1024).toFixed(2)
        document.getElementById('ram-total').innerText = (info.totalMemMb / 1024).toFixed(2)
        document.getElementById('ram-percent').innerText = (info.totalMemMb / info.usedMemMb).toFixed(0) + ' %'
    })

    const currDate = new Date().toString().slice(0, 11)
    //const currTime = new Date().getTime().toLocaleString('en-US', {
    //    hour: 'numeric',
    //    minute: 'numeric'
    //  })
    const dateToTime = date => date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      });
      const userOffset = new Date().getTimezoneOffset()*60*1000;
    const localDate = new Date();
    document.getElementById('date').innerText = currDate.toString().slice(0, 11)
    document.getElementById('time').innerText = dateToTime(localDate)


}, 3000)