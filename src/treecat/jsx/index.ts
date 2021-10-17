import { TreecatElement } from '../types'


// eslint-disable-next-line no-unused-vars
export namespace JSX {
  // eslint-disable-next-line no-unused-vars
  export interface IntrinsicElements {
    box: any;
    text: any;
    line: any;
    bigtext: any;
    list: any;
    filemanager: any;
    listtable: any;
    listbar: any;
    form: any;
    textarea: any;
    textbox: any;
    button: any;
    checkbox: any;
    radioset: any;
    radiobutton: any;
    prompt: any;
    question: any;
    message: any;
    loading: any;
    progressbar: any;
    log: any;
    table: any;
  }

  export interface ElementAttributesProperty {
    props: any; // specify the property name to use
  }

  export interface ElementChildrenAttribute {
    children: {}; // specify children name to use
  }
}

export function createElement (type: any, props: any, ...children: any): TreecatElement {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((child: any) =>
        typeof child === 'object'
          ? child
          : createTextElement(child)
      )

    }
  }
}


function createTextElement (text: string): TreecatElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: `${text}`,
      children: []
    }
  }
}

