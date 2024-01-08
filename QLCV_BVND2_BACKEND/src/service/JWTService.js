import db from '../models/index'

const getPermissionWithRole = async (user) => {
    let permission = await db.role.findOne({
        where: { id: user.roleId },
        include: {
            model: db.permission,
            attributes: ["permissionName"],
            through: { attributes: [] }
        },
    })
    return permission ? permission : {};
}

module.exports = {
    getPermissionWithRole
}