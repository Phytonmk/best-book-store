declare module "*.min.css" {
  const css: any;

  export default css;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };

  export default classes;
}
