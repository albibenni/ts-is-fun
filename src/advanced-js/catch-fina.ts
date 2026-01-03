function a() {
  try {
    console.log("TRY");
    throw new Error("TRY ERROR");
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    throw new Error("FINALLY ERROR");
  }
}

a();
