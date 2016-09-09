import fs from 'fs'
import path from 'path'

class VersionService {
    constructor(fileLocation) {
        if (typeof fileLocation !== 'string' || fileLocation.length === 0) {
            fileLocation =  path.resolve(__dirname, '../version.json')
        }

        this.fileLocation = fileLocation
    }

    _fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileLocation, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err)
                }
                try {
                    resolve(JSON.parse(data))
                } catch (e) {
                    return reject(e)
                }
            })
        })
    }

    version() {
        if (!this._version) {
            this._version = this._fetch()
        }

        return this._version
    }
}

export default new VersionService()
