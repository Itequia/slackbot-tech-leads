class HttpResult {

    ok (res, data) {
        return res.status(200).json(data)
    }

    error(res, error) {
        res.status(error.status || 500).send({
            error:   (process.env.ENV === 'development') ? error : {}
        })
    }

    badRequest (res, message = "Bad request. You did not enter the requred parameters for this request.") {
        res.status(400).json({ message })
    }

    unauthorized (res, message = "Unauthorized. You failed to provide valid credentials.") {
        res.status(401).json({ message })
    }

    forbidden(res, message = "Forbidden. This resource needs authentication.") {
        res.status(403).json({ message })
    }

    notFound(res, message = "Resource not found") {
        res.status(404).json({ message })
    }
}

module.exports = new HttpResult()