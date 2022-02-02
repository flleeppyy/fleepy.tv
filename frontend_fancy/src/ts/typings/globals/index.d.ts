interface Window {
  $: JQueryStatic;
  dev: boolean;
  disableHue: boolean;
  randomizeChildren(element: HTMLElement);
}

declare let $: Window["$"];

interface Number {
  toPrecisionFloat(number?: number): number
  toInt(): number
}