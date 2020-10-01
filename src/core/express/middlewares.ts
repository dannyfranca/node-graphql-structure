export function setJsonHeader () {
  return function (req, res, next) {
    req.headers['content-type'] = 'application/json;charset=UTF-8'
    next()
  }
}
