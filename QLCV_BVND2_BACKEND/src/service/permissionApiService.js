import db from "../models";

const tryGetPermissionById = async (permId) => {
    try {
        // console.log(Object.keys(db))
        return await db.permission.findOne({
            where: { id: permId }
        })
    } catch (e) {
        console.log(e)
        return {
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const getPermissionById = async (permId) => {
    const perm = await tryGetPermissionById(permId)
    if (!perm) throw { returnedStatusCode: 400, userError: "Invalid index" }
    return {
        PID: perm.id,
        PN: perm.permissionName
    }
}

const PermissionApi = {
    getPermissionById
}

export default PermissionApi;
