/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { extractEditorFileExtensionFromUrl, jsonParseWithDate } from "../../common/utils";

const supportedFileExtensions = ["bpmn", "dmn", "bpmn2", "myext"];

describe("utils::extractEditorFileExtensionFromUrl", () => {
  const originalLocation = window.location;
  const baseUrl = "https://kiegroup.github.io/kogito-online";

  function setWindowLocationHref(url: string) {
    delete (window as any).location;
    window.location = { href: `${baseUrl}/${url}` } as any;
  }

  afterEach(() => {
    window.location = originalLocation;
  });

  test("should be 'bpmn' when #/editor/bpmn", () => {
    setWindowLocationHref("#/editor/bpmn");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toEqual("bpmn");
  });

  test("should be 'dmn' when #/editor/dmn", () => {
    setWindowLocationHref("#/editor/dmn");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toEqual("dmn");
  });

  test("should be 'bpmn2' when #/editor/bpmn2?key=value", () => {
    setWindowLocationHref("#/editor/bpmn2?key=value");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toEqual("bpmn2");
  });

  test("should be 'bpmn2' when #/editor/myext?key=value", () => {
    setWindowLocationHref("#/editor/myext?key=value");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toEqual("myext");
  });

  test("should be undefined when #/editor/invalid", () => {
    setWindowLocationHref("#/editor/invalid");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toBeUndefined();
  });

  test("should be undefined when #/editor", () => {
    setWindowLocationHref("#/editor");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toBeUndefined();
  });

  test("should be undefined when #/editor?key=value", () => {
    setWindowLocationHref("#/editor?key=value");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toBeUndefined();
  });

  test("should be undefined when empty", () => {
    setWindowLocationHref("");
    expect(extractEditorFileExtensionFromUrl(supportedFileExtensions)).toBeUndefined();
  });
});

describe("utils::jsonParseWithDate", () => {
  it("should parse JSON strings with dates properly", () => {
    const myObject = {
      myNumber: 1,
      myString: "myValue",
      myBoolean: false,
      myUndefined: undefined,
      myObject: {
        myNumber: 2,
        myDate: Date.now(),
      },
      myDateOne: Date.now(),
      myDateTwo: new Date(Date.UTC(2021, 8, 18, 7, 59, 0, 0)),
      myDateThree: new Date(),
      myDateFour: new Date("August 18, 2021 07:59:00"),
      myDateFive: new Date("2021-08-18T07:59:00"),
      myDateSix: new Date(2021, 8, 18),
      myDateSeven: new Date(2021, 8, 18, 7, 59, 0),
    };
    const json = JSON.stringify(myObject);
    expect(JSON.parse(json)).not.toEqual(myObject);
    expect(jsonParseWithDate(json)).toEqual(myObject);
  });
});
