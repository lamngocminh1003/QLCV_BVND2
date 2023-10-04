"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "department",
      [
        {
          departmentName: "Giám Đốc",
        },
        {
          departmentName: "Tổ Chức Cán Bộ",
        },
        {
          departmentName: "Hành Chính Quản Trị",
        },
        {
          departmentName: "Điều Dưỡng",
        },
        {
          departmentName: "Kế Hoạch Tổng Hợp",
        },
        {
          departmentName: "CDT",
        },
        {
          departmentName: "Vật tư, trang thiết bị y tế",
        },
        {
          departmentName: "P.QLCL",
        },
        {
          departmentName: "P.CTXH",
        },
        {
          departmentName: "P. CNTT",
        },
        {
          departmentName: "Dược",
        },
        {
          departmentName: "HHọc",
        },
        {
          departmentName: "SHoá",
        },
        {
          departmentName: "CĐHA",
        },
        {
          departmentName: "Vi sinh",
        },
        {
          departmentName: "GPBL",
        },
        {
          departmentName: "KSNK"
        },
        {
          departmentName: "Dinh Dưỡng",
        },
        {
          departmentName: "Khoa Khám bệnh",
        },
        {
          departmentName: "SKTE",
        },
        {
          departmentName: "PK CLC-Tâm lý",
        },
        {
          departmentName: "Liên chuyên khoa",
        },
        {
          departmentName: "Ngoại TH",
        },
        {
          departmentName: "Bỏng - CT",
        },
        {
          departmentName: "Thận Niệu",
        },
        {
          departmentName: "GMHS",
        },
        {
          departmentName: "Ngoại TK",
        },
        {
          departmentName: "H.Sức Sơ Sinh",
        },
        {
          departmentName: "Cấp Cứu",
        },
        {
          departmentName: "SSinh",
        },
        {
          departmentName: "Nội 1",
        },
        {
          departmentName: "Nội 2",
        },
        {
          departmentName: "Nội 3",
        },
        {
          departmentName: "Thận Nội Tiết"
        },
        {
          departmentName: "HH2",
        },
        {
          departmentName: "Nội Thợp",
        },
        {
          departmentName: "UBHH",
        },
        {
          departmentName: "Nội T. Hóa",
        },
        {
          departmentName: "Thần Kinh",
        },
        {
          departmentName: "Tim Mạch"
        },
        {
          departmentName: "Nhiễm"
        },
        {
          departmentName: "Hồi sức",
        },
        {
          departmentName: "Điều trị ban ngày",
        },
        {
          departmentName: "HH1",
        },
        {
          departmentName: "PTTN",
        },
        {
          departmentName: "Gan mật tụy - ghép gan",
        },
        {
          departmentName: "Khoa COVID-19"
        },
        {
          departmentName: "Khoa HSTC Nhiễm và COVID-19",
        },
        {
          departmentName: "Khoa PT Hồi sức tích cực Tim mạch-Lồng ngực"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
