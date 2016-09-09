import path from 'path'
import versionService from '../../../src/app/services/version'
import { expect } from 'chai'

describe('version service', () => {
    it('should load the version file from the provided location', () => {
        versionService.fileLocation = path.resolve(__dirname, 'version.json')
        return versionService.version().then((version) => {
            expect(version).to.eql({
                "test-version": "1234"
            })
        })
    })
})
