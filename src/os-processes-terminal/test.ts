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

const getRunningProcesses = (): string[] => {
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
    return processes.map((process) => {
      const processInfo = process.split(" ");
      const pid = processInfo[0];
      const command = processInfo[3];
      log(`PID: ${pid} - Command: ${command}`);
      return pid;
    });
  });
  return [];
};

// const getRunningProcesses2 = (userID: string): Promise<string[]> => {
//   exec(`pgrep -l -u ${userID}`, (error, stdout, stderr) => {
//     if (error) {
//       log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       log(`stderr: ${stderr}`);
//       return;
//     }
//     // log(`stdout: ${stdout}`);
//     const lines = stdout.split("\n");
//     const processes = lines.filter((line) =>
//       line.toLowerCase().includes("discord"),
//     );
//     const pids = processes.map((process) => process.split(" ")[0]);
//     // processes.forEach((process) => {
//     //   const processInfo = process.split(" ");
//     //   const pid = processInfo[0];
//     //   const command = processInfo[3];
//     //   log(`PID: ${pid} - Command: ${command}`);
//     // });
//     log(pids);
//     return pids;
//   });
const getRunningProcesses2 = async (userID: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(`pgrep -l -u ${userID}`, (error, stdout, stderr) => {
      if (error) {
        log(`error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        log(`stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      const lines = stdout.split("\n");
      const processes = lines.filter((line) =>
        line.toLowerCase().includes("discord"),
      );
      const pids = processes.map((process) => process.split(" ")[0]);
      // log(pids);
      resolve(pids);
    });
  });
};

const killProcess = async (userID: string) => {
  const pids = await getRunningProcesses2(userID);
  log(pids);
  if (pids.length === 0) return;
  pids.forEach((pid) => {
    exec(`kill ${pid}`, (error, stdout, stderr) => {
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
  });
};

killProcess("benni");
