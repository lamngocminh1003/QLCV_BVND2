const generalExceptionHandler = (res, e) => {
    const { returnedStatusCode, userError, serverError } = e;
    if (!returnedStatusCode){
        console.log(e)
        return res.status(500).send("Internal Server error")
    }
    if (userError) return res.status(returnedStatusCode).json(e)
    if (serverError) return res.status(returnedStatusCode).json(serverError)
    else return res.status(returnedStatusCode).json({
        returnedStatusCode: returnedStatusCode,
        serverError: 'Internal Server error'
    })
}

export const packedUncleansedQuery = async (req, res, callback, validator) => {
    try {
        const { isLegit, ...validationResult } = await validator(req.query)
        if (!isLegit) return res.status(400).json({ ...validationResult })
        const data = await callback(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return generalExceptionHandler(res, e)
    }
}

export const singleIdQuery = async (req, res, callback) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({
            returnedStatusCode: 400,
            userError: "Missing id query parameter"
        });
        const data = await callback(id);
        return res.status(200).json(data);
    } catch (e){
        return generalExceptionHandler(e)
    }
}
