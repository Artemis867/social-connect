export const showToast = (payload) => ({
  type: "SHOWTOAST",
  payload,
});

export const closeToast = () => ({
  type: "CLOSETOAST",
});