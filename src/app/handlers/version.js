import versionService from '../services/version'

export function get(req, res, next) {
    versionService.version().then((version) => {
        res.send(version)
    }).catch((err) => {
        res.status(500)
        res.send(err)
    })
}
