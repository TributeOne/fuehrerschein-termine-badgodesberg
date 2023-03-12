import { Browser, Page } from "puppeteer"

export const getXPathMessage = async (page: Page, browser: Browser, messagexPath: string) => {
    //await console.log('Step 3')
    try {
        await page.waitForXPath(messagexPath, {timeout: 3000})
        let [element] = await page.$x(messagexPath)
        const xPathMessage = await page.evaluate(element => element.textContent, element)
        //await console.log(logname() + xPathMessage)
        return xPathMessage
    }
    catch(e){
        //await console.log(logname() + 'ERROR xPathMessage not found')
        /*
        TODO, Put this in his own function
        //await errorWebhook(e)
        //await browser.close()
        //await process.exit()
        */
    }
}