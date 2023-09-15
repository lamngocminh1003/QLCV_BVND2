import PermissionApi from "../service/permissionApiService";
import RoleApi from "../service/roleApiService";
import { packedUncleansedQuery, singleIdQuery, singleIdQuery, packedUncleansedQuery } from "./crud";

const getPermissionById = async (req, res) => {
    return await singleIdQuery(req, res, PermissionApi.getPermissionById);
}

const getRoleById = async (req, res) => {
    return await singleIdQuery(req, res, RoleApi.getRoleById);
}

const createRole = async (req, res) => {
    return await packedUncleansedQuery(req, res, RoleApi.createRole, async (packed) => {
        const { roleName } = packed
        if (!roleName) return {
            isLegit: false,
            userError: "No role name was supplied"
        }
        return {
            isLegit: true
        }
    })
}

const updateRole = async (req, res) => {
    return await packedUncleansedQuery(req, res, RoleApi.updateRole, async (packed) => {
        const { id, roleName } = packed
        if (!id) return {
            isLegit: false,
            userError: "No role id was supplied"
        }
        if (!roleName) return {
            isLegit: false,
            userError: "No role name was supplied"
        }
        return {
            isLegit: true
        }
    })
}

const deleteRole = async (req, res) => {
    return await singleIdQuery(req, res, RoleApi.deleteRole)
}

const getPermissionsByRole = async (req, res) => {
    return await singleIdQuery(req, res, RoleApi.getPermissionsByRole)
}

const addPermissionToRole = async (req, res) => {
    return await packedUncleansedQuery(req, res, RoleApi.addPermissionToRole, async (packed) => {
        const { roleId, permId } = packed
        if (!roleId) return { isLegit: false, userError: "No role id was supplied" };
        if (!permId) return { isLegit: false, userError: "No permission id was supplied" };
        return { isLegit: false }
    })
}

const removePermissionFromRole = async (req, res) => {
    return await packedUncleansedQuery(req, res, RoleApi.removePermissionFromRole, async (packed) => {
        const { roleId, permId } = packed
        if (!roleId) return { isLegit: false, userError: "No role id was supplied" };
        if (!permId) return { isLegit: false, userError: "No permission id was supplied" };
        return { isLegit: false }
    })
}

const permissionRoleController = {
    getPermissionById,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getPermissionsByRole,
    addPermissionToRole,
    removePermissionFromRole
}

export default permissionRoleController;

