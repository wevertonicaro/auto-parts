import 'reflect-metadata'
import { App } from './app'

export class Main {
    static start() {
        const app = new App()
        app.start()
    }
}

Main.start()