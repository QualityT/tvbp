import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const WALLPAPER = 'https://fanmingming.com/bing'

const LIVES_TXT = {
    name: 'TXT',
    type: 0,
    playerType: 1,
    url: 'https://freetv.fun/test_channels_new.txt', // 直播源
    epg: 'https://epg.v1.mk/json?ch={name}&date={date}', // 节目地址
    logo: 'https://epg.v1.mk/logo/{name}.png', // 台标地址
    ua: 'okhttp/3.15', //用户代理
}

const LIVES_M3U = {
    name: 'M3U',
    type: 0,
    playerType: 1,
    url: 'https://raw.githubusercontent.com/BurningC4/Chinese-IPTV/blob/master/TV-IPV4.m3u', // 直播源
    epg: 'https://raw.githubusercontent.com/BurningC4/Chinese-IPTV/blob/master/guide.xml', // 节目地址
    ua: 'okhttp/3.15', //用户代理
}

const LIVES_M3U_MIRROR = {
    name: 'M3U镜像',
    type: 0,
    playerType: 1,
    url: 'https://hub.gitmirror.com/raw.githubusercontent.com/BurningC4/Chinese-IPTV/refs/heads/master/TV-IPV4.m3u', // 直播源
    epg: 'https://hub.gitmirror.com/raw.githubusercontent.com/BurningC4/Chinese-IPTV/blob/master/guide.xml', // 节目地址
    ua: 'okhttp/3.15', //用户代理
}

const RAW_PATH = 'raw'
const UPDATE_PATH = 'update'

const files = readdirSync(resolve(RAW_PATH))

let count = 1

files.map(f => {
    const data = readFileSync(resolve(RAW_PATH, f))
    const json = JSON.parse(data)
    json['wallpaper'] = WALLPAPER
    json['lives'] = [LIVES_TXT, LIVES_M3U, LIVES_M3U_MIRROR]
    writeFileSync(resolve(UPDATE_PATH, count++ + '.json'), JSON.stringify(json))
    writeFileSync(resolve(UPDATE_PATH, f), JSON.stringify(json))
})