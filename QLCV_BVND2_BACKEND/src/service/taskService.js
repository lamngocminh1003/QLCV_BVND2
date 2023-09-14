import { where } from "sequelize";
import db from "../models/index";
const getAllTasksService = async () => {
  try {
    let tasks = await db.task.findAll({
      include: [
        { model: db.category, attributes: ["categoryName"] },
        {
          model: db.user,
          as: "sender", // Sử dụng biệt danh "sender" cho personalSendId
          attributes: ["fullName", "positionId", "departmentId"],
          include: [
            { model: db.position, attributes: ["positionName"] },
            { model: db.department, attributes: ["departmentName"] },
          ],
        },
        {
          model: db.user,
          as: "receiver", // Sử dụng biệt danh "receiver" cho personalReceiveId
          attributes: ["fullName", "positionId", "departmentId"],
          include: [
            { model: db.position, attributes: ["positionName"] },
            { model: db.department, attributes: ["departmentName"] },
          ],
        },
      ],
    });
    if (tasks) {
      return {
        EM: "Tasks's info",
        EC: 1,
        DT: tasks,
      };
    } else {
      return {
        EM: "Tasks's info null",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const createNewTaskService = async (data) => {
  let {
    title,
    content,
    categoryId,
    dateSend,
    dateEnd,
    personalReceiveId,
    personalSendId,
    state,
  } = data;
  try {
    if (!title || !categoryId || !personalReceiveId || !personalSendId) {
      return {
        EM: "Missing required parameters",
        EC: -2,
        DT: "",
      };
    } else {
      let dataTask = await db.task.create({
        title: title,
        content: content,
        categoryId: categoryId,
        dateSend: dateSend,
        dateEnd: dateEnd,
        personalReceiveId: personalReceiveId,
        personalSendId: personalSendId,
        state: state,
      });
      return {
        EM: "Create task successfully",
        EC: 1,
        DT: dataTask,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const updateTaskService = async (data) => {
  let {
    id,
    title,
    content,
    categoryId,
    dateSend,
    dateEnd,
    personalReceiveId,
    personalSendId,
    state,
  } = data;
  try {
    if (!id || !title || !categoryId || !personalReceiveId || !personalSendId) {
      return {
        EM: "Missing required parameters",
        EC: -2,
        DT: "",
      };
    } else {
      let dataTaskUpdate = await db.task.update(
        {
          title: title,
          content: content,
          categoryId: categoryId,
          dateSend: dateSend,
          dateEnd: dateEnd,
          personalReceiveId: personalReceiveId,
          personalSendId: personalSendId,
          state: state,
        },
        { where: { id: id } }
      );
      return {
        EM: "Update task successfully",
        EC: 1,
        DT: dataTaskUpdate,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const deleteTaskService = async (taskId) => {
  let { id } = taskId;
  try {
    if (!id) {
      return {
        EM: "Missing required parameters",
        EC: -2,
        DT: "",
      };
    } else {
      await db.task.destroy({
        where: { id: id },
      });
      return {
        EM: "Delete task successfully",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  getAllTasksService,
  createNewTaskService,
  updateTaskService,
  deleteTaskService,
};
