import { timeStamp } from "./timeStamp"
import dotenv from "dotenv"
dotenv.config()


class Monitor {
  log(...args: (string | undefined)[]) {
    console.log(`[${timeStamp()} Monitor ${process.env.npm_package_name}]`, args.filter(arg => arg !== undefined).join(' '))
  }
}

export const monitor = new Monitor()
