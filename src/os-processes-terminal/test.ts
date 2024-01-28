import { exec } from "child_process";
import { log } from "console";

log("Hello World!");

const getCurrentFolderFileList = () => {
  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
      log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      log(`stderr: ${stderr}`);
      return;
    }
    log(`stdout: ${stdout}`);
  });
};

// getCurrentFolderFileList();
