const uuid = require("uuid");
const path = require("path");

class FileService {
  async saveFile(file) {
    try {
      const fileName = uuid.v4();
      const filePath = path.resolve("img", fileName);
      await file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new FileService();
