const generalExceptionHandler = (res, e) => {
    const { returnedStatusCode, userError, serverError } = e;
    if (!returnedStatusCode){
        console.log(e)
        return res.status(500).send("Internal Server error")
    }
    if (userError) return res.status(returnedStatusCode).json(e)
    if (serverError) return res.status(returnedStatusCode).json(serverError)
    else return res.status(returnedStatusCode).send("Internal Server error")
}

export const createQueryPk = async (req, res, creator, validator) => {
    try {
        const { isLegit, ...validationResult } = await validator(req.query)
        if (!isLegit) return res.status(400).json({ ...validationResult })
        const data = await creator(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return generalExceptionHandler(res, e)
    }
}

export const readPk = async (req, res, reader) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({
            returnedStatusCode: 400,
            userError: "Missing id query parameter"
        });
        const data = await reader(id);
        return res.status(200).json(data);
    } catch (e) {
        return generalExceptionHandler(res, e)
    }
}

export const updateQueryPk = async (req, res, updater, validator) => {
    try {
        const { isLegit, ...validationResult } = await validator(req.query)
        if (!isLegit) return res.status(400).json({ ...validationResult })
        const data = await updater(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return generalExceptionHandler(res, e)
    }
}

export const deletePk = async (req, res, deleter) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({
            returnedStatusCode: 400,
            userError: "Missing id query parameter"
        });
        const data = await deleter(id);
        return res.status(200).json(data);
    } catch (e){
        return generalExceptionHandler(e)
    }
}
