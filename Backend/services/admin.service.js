const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");

const admin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return resolve({ flag: "fail", message: "Admin not found" });
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return resolve({ flag: "fail", message: "Invalid Credentials" });
            }
            resolve({ flag: "success", message: "Admin authenticated" });
        } catch (error) {
            reject(error);
        }
    });
}   

module.exports = {
    admin
}