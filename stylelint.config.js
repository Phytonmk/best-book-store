module.exports = {
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ],
    "order/properties-order": [
      [
        {
          groupName: "relative-layout",
          emptyLineBefore: "threshold",
          properties: [
            "z-index",
            "position",
            "left",
            "right",
            "top",
            "bottom",
            "flex",
            "align-self",
            "justify-self",
            "margin",
            "margin-left",
            "margin-right",
            "margin-top",
            "margin-bottom"
          ]
        },
        {
          groupName: "own-layout",
          emptyLineBefore: "threshold",
          properties: [
            "display",
            "flex-direction",
            "flex-wrap",
            "align-items",
            "justify-content"
          ]
        },
        {
          groupName: "size",
          emptyLineBefore: "threshold",
          properties: [
            "box-sizing",
            "overflow",
            "overflow-y",
            "overflow-x",
            "width",
            "height",
            "min-width",
            "max-width",
            "min-height",
            "max-height",
            "padding",
            "padding-top",
            "padding-bottom",
            "padding-left",
            "padding-right"
          ]
        },
        {
          groupName: "border",
          emptyLineBefore: "threshold",
          properties: [
            "border",
            "border-bottom",
            "border-bottom-color",
            "border-bottom-style",
            "border-bottom-width",
            "border-color",
            "border-left",
            "border-left-color",
            "border-left-style",
            "border-left-width",
            "border-radius",
            "border-right",
            "border-right-color",
            "border-right-style",
            "border-right-width",
            "border-style",
            "border-top",
            "border-top-color",
            "border-top-style",
            "border-top-width",
            "border-width",
            "border-radius"
          ]
        },
        {
          groupName: "font",
          emptyLineBefore: "threshold",
          properties: [
            "font",
            "font-family",
            "font-weight",
            "font-style",
            "font-stretch",
            "font-display",
            "font-feature-settings",
            "src",
            "text-transform",
            "line-height",
            "white-space",
            "word-break",
            "color"
          ]
        },
        {
          groupName: "effects",
          emptyLineBefore: "threshold",
          properties: [
            "transform",
            "transform-origin",
            "opacity",
            "cursor",
            "background",
            "background-color",
            "background-image",
            "background-size",
            "background-position",
            "outline",
            "box-shadow",
            "transition",
            "animation"
          ]
        }
      ],
      {
        unspecified: "bottomAlphabetical",
        emptyLineBeforeUnspecified: "always",
        emptyLineMinimumPropertyThreshold: 6
      }
    ],
    "function-calc-no-invalid": null
  },
  extends: "stylelint-config-recommended",
  plugins: ["stylelint-order"]
};
