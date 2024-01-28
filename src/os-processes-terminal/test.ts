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

const getRunningProcesses = () => {
  exec("ps -e", (error, stdout, stderr) => {
    if (error) {
      log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      log(`stderr: ${stderr}`);
      return;
    }
    // log(`stdout: ${stdout}`);
    const lines = stdout.split("\n");
    const processes = lines.filter((line) => line.includes("google"));
    log(processes);
    processes.forEach((process) => {
      const processInfo = process.split(" ");
      const pid = processInfo[0];
      const command = processInfo[3];
      log(`PID: ${pid} - Command: ${command}`);
    });
  });
};

const getRunningProcesses2 = (userID: string) => {
  exec(`pgrep -l -u ${userID}`, (error, stdout, stderr) => {
    if (error) {
      log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      log(`stderr: ${stderr}`);
      return;
    }
    // log(`stdout: ${stdout}`);
    const lines = stdout.split("\n");
    log(lines);
    const processes = lines.filter((line) =>
      line.toLowerCase().includes("discord"),
    );
    log(processes);
    processes.forEach((process) => {
      const processInfo = process.split(" ");
      const pid = processInfo[0];
      const command = processInfo[3];
      log(`PID: ${pid} - Command: ${command}`);
    });
  });
};

getRunningProcesses2("benni");
