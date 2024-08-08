const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("PersonIdentify", (m: any) => {
  const personIdentify = m.contract("PersonIdentify");
  return { personIdentify };
});
