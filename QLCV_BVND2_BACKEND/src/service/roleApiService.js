import db from "../models";
import { sequelize } from "../config/connectDB";

const tryGetRoleById = async (roleId) => {
    try {
        return await db.role.findOne({
            where: { id: roleId }
        })
    } catch (e) {
        console.log(e)
        return {
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const tryCreateRole = async(packed) => {
    const { roleName } = packed
    if (!roleName) return { result: 0, returnedStatusCode: 400, userError: "No role name was supplied" };
    try {
        return await sequelize.transaction(async (t) => {
            const existed = await db.role.findOne({
                where: { roleName: roleName },
            }, { transaction: t })
            if (existed) return {
                result: 0,
                returnedStatusCode: 400,
                userError: "Role name existed"
            }
            const { dataValues } = await db.role.create({
                roleName: roleName
            }, { transaction: t })
            const newRole = dataValues
            return { result: 1, newRole }
        })
    } catch (e) {
        console.log(e)
        return {
            result: -1,
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const tryUpdateRole = async(packed) => {
    const { id, roleName } = packed
    if (!roleName) return { result: 0, returnedStatusCode: 400, userError: "No role name was supplied" };
    try {
        const ret = await db.role.update({
            roleName: roleName
        }, {
            where: { id: id }
        })
        return {
            result: 1,
            returned: ret
        }
    } catch (e) {
        console.log(e)
        return {
            result: -1,
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const tryDeleteRole = async (id) => {
    try {
        await db.role.destroy({
            where: { id: id }
        })
        return {
            result: 1
        }
    } catch (e) {
        console.log(e)
        return {
            result: -1,
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const tryGetPermissionsByRole = async (id) => {
    try {
        const perms = await db.role.findOne({
            where: { id: id },
            include: [
                {
                    model: db.permission,
                    attributes: ['id', 'permissionName']
                }
            ]
        })
        if (!perms) return {
            result: 0,
            returnedStatusCode: 400,
            userError: "Role with supplied id not found"
        }

        return {
            result: 1,
            perm: perms
        }
    } catch (e) {
        console.log(e)
        return {
            result: -1,
            returnedStatusCode: 500,
            serverError: 'Internal Server error'
        }
    }
}

const getRoleById = async (roleId) => {
    const role = await tryGetRoleById(roleId)
    if (!role) throw { returnedStatusCode: 400, userError: "Invalid index" }
    return {
        RID: role.id,
        RN: role.roleName
    }
}

const createRole = async (packed) => {
    const { result, ...other } = await tryCreateRole(packed);
    if (result === -1 || result === 0) throw { ...other }
    return { ...other }
}

const updateRole = async (packed) => {
    const { result, ...other } = await tryUpdateRole(packed);
    if (result === -1 || result === 0) throw { ...other }
    return { ...other }
}

const deleteRole = async (id) => {
    const { result, ...other } = await tryDeleteRole(id)
    if (result === -1 || result === 0) throw { ...other }
    return { completed: true }
}

const getPermissionsByRole = async (id) => {
    const { result, ...other } = await tryGetPermissionsByRole(id);
    if (result === -1 || result === 0) throw { ...other }
    return { ...other }
}

const RoleApi = {
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getPermissionsByRole
}

export default RoleApi;
