function a() {
  try {
    console.log("TRY");
    throw new Error("TRY ERROR");
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    throw new Error("FINALLY ERROR");
  }
}

function b(): string {
  try {
    throw new Error("Something went wrong!");
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return "Error jumped by return in finally!"; // The error is swallowed/lost
  }
}

console.log(b()); // Output: "Error jumped by return in finally!"

a();
