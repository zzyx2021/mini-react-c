import React from "../core/React";
import { it, expect, describe } from "vitest";

describe('createElement', () => {
  it('vdom',() => {
    const el = React.createElement('div', null, 'hi');

    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hi",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `)
  })
})