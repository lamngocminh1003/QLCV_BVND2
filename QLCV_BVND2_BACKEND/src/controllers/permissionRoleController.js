import PermissionApi from "../service/permissionApiService";
import RoleApi from "../service/roleApiService";
import {createQueryPk, deletePk, readPk, updateQueryPk} from "./crud";

const getPermissionById = async (req, res) => {
    return await readPk(req, res, PermissionApi.getPermissionById);
}

const getRoleById = async (req, res) => {
    return await readPk(req, res, RoleApi.getRoleById);
}

const createRole = async (req, res) => {
    return await createQueryPk(req, res, RoleApi.createRole, async (packed) => {
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
    return await updateQueryPk(req, res, RoleApi.updateRole, async (packed) => {
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
    return await deletePk(req, res, RoleApi.deleteRole)
}

const getPermissionsByRole = async (req, res) => {
    return await readPk(req, res, RoleApi.getPermissionsByRole)
}

const permissionRoleController = {
    getPermissionById,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getPermissionsByRole
}

export default permissionRoleController;

