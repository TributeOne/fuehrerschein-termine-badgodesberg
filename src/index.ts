import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { getXPathMessage } from '../utils/getXPathMessage'
import { timeStamp } from "../utils/timeStamp"
const TelegramBot = require('node-telegram-bot-api')
import dotenv from "dotenv"
import { monitor } from '../utils/monitorLog'
const {executablePath} = require('puppeteer')
const settingsJSON = require('../../config/settings.json')
//=============================================
//            Monitor Config
const runHeadless = settingsJSON["config"]["runHeadless"]
dotenv.config()
const apiKey = process.env.TELEGRAM_BOT_API_KEY
const userID = process.env.TELEGRAM_USER_ID
//            Webhook Config
//            Other Config
//=============================================

const bot = new TelegramBot(apiKey, {polling: true})


const startMonitor = (URL: string) => {
    puppeteer.use(StealthPlugin()).launch({ headless: runHeadless, defaultViewport: null, args: ['--window-size=1920,1080'], executablePath: executablePath(),}).then(async browser => {
        const page = await browser.newPage()
        runMonitor(page, browser, URL)
    })
}

const runMonitor = async (page: Page, browser: Browser, url: string) => {
    await accessWebsite(page, browser, url)
}

const accessWebsite = async (page: Page, browser: Browser, url: string) => {
    try {
        await page.goto(url, {timeout: 30000})
        await selectService(page)
        await selectLocation(page)
        await checkIfDatesAreAvailable(page, browser)
        await page.waitForTimeout(10000)
        await process.exit()
    }
    catch(e){
        monitor.log(`Error, website ${url} unavailable: ${e}`)
        bot.sendMessage(userID, `Error while reaching: '${url}'`)
        await page.waitForTimeout(10000)
        await process.exit()
    }
}

const selectService = async (page: any) => {
    await buttonClicker(page, '//*[@id="category_afd8d87f-f4f0-4111-9b08-b10d537b8fa8"]', 'Führerscheinwesen')
    await buttonClicker(page, '//*[@id="category_content_afd8d87f-f4f0-4111-9b08-b10d537b8fa8"]/div[1]/div/div[2]/span[3]', 'Antrag auf Erteilung einer Fahrerlaubnis')
    await buttonClicker(page, '//*[@id="forward-service"]', 'Weiter')
}

const selectLocation = async (page: any) => {
    await page.waitForTimeout(5000)
    await buttonClicker(page, '//*[@id="872159da-c2fd-43ae-887a-1e477e3c4ae7"]', 'Bürgeramt Bad Godesberg')
        //await buttonClicker(page, '//*[@id="cbf55d01-6c88-4b56-872b-341b69eef2ac"]', 'Bürgeramt Hardtberg') 
    await page.waitForTimeout(5000)
    await buttonClicker(page, '//*[@id="navi_bottom"]/button[2]', 'Weiter2')
}

const checkIfDatesAreAvailable = async (page: any, browser: Browser) => {
    await page.waitForTimeout(10000)
    try {
        const message = await getXPathMessage(page, browser, '//*[@id="appointment_holder"]/h3')
        if (message == 'Keine freien Termine gefunden.') {
        monitor.log(`UNAVAILABLE 'Keine freien Termine gefunden.'`)}
    } catch (error) {
        try {
            await page.waitForXPath('//*[@id="calendar"]')
            monitor.log('Termine gefunden')
            bot.sendMessage(userID, 'Es sind wieder Termine verfügbar!')
        } catch (error) {
            monitor.log(`FEHLER BEIM ERMITTELN DER TERMINE`)
            bot.sendMessage(userID, 'Unbekannter fehler beim ermitteln der Terminvergabe, Restock Möglich.')
        }
    }
}

const buttonClicker = async (page: any, xpathButton: string, buttonName: string) => {
    try {
        await page.waitForXPath(xpathButton)
        monitor.log(`Click '${buttonName}'`)
        const elements = await page.$x(xpathButton)
        await elements[0].click()
    } catch (error) {
        monitor.log(`Error while Clicking button: '${buttonName}'`)
        bot.sendMessage(userID, `Error while Clicking button: '${buttonName}'`)
        await page.waitForTimeout(10000)
        await process.exit()
    }
}

startMonitor('https://termine.bonn.de/m/DLZ/extern/calendar/?uid=1f4c5347-ccf5-43c5-8325-5c5c4461d121')