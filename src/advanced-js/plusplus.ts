// x++ means:
function plusPlus(orig_x: number | string): number {
  let orig_x_coerced = Number(orig_x);
  return orig_x_coerced + 1;
}
