module.exports = {
  extends: ["./stylelint-config-kuaigou.js"],
  rules: {
    "color-no-invalid-hex": true,
    "color-hex-case": "lower",
    "unit-whitelist": ["em", "rem", "%", "s", "px"],
  },
};
