/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
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

/**
 * Javascript API for lienzo that allows interactions with nodes and connectors
 * in Kogito editors.
 */
export interface CanvasApi {
  /**
   * Returns ID attributes of all nodes displayed in editors canvas.
   */
  getNodeIds(): string[];

  /**
   * Returns a background color of a node with provided UUID.
   * Returned string is a hex number of the color.
   *
   * @param uuid ID attribute of the queried node
   */
  getBackgroundColor(uuid: string): string;

  /**
   * Sets a background color of a node with provided UUID.
   *
   * @param uuid ID attribute of the target node
   * @param backgroundColor hex number of the desired color as string
   */
  setBackgroundColor(uuid: string, backgroundColor: string): void;

  /**
   * Returns a border color of a node with provided UUID.
   * Returned string is a hex number of the color.
   *
   * @param uuid ID attribute of the target node
   */
  getBorderColor(uuid: string): string;

  /**
   * Sets a border color of a node with provided UUID.
   *
   * @param uuid ID attribute of the target node
   * @param backgroundColor hex number of the desired color as string
   */
  setBorderColor(uuid: string, backgroundColor: string): void;

  /**
   * Returns a canvas location of a node with provided UUID.
   * Returns an array where first position is X-attribute
   * and second position is Y-attribute in the context of canvas.
   *
   * @param uuid ID attribute of the target node
   */
  getLocation(uuid: string): number[];

  /**
   * Returns a window location fo a node with provided UUID.
   * Returns an array where first position is X-attribute
   * and second position is Y-attribute in the context of window
   *
   * @param uuid ID attribute of target node
   */
  getAbsoluteLocation(uuid: string): number[];

  /**
   * Returns dimensions of a node with provided UUID.
   *
   * @param uuid ID attribute of a target node
   */
  getDimensions(uuid: string): number[];
}

/**
 * Bridge for Envelope to connect Javascript API for lienzo with envelope.
 * See {@see CanvasApi} for full documenation for the API.
 */
export interface CanvasEnvelopeApi {
  canvas_getNodeIds(): Promise<string[]>;

  canvas_getBackgroundColor(uuid: string): Promise<string>;

  canvas_setBackgroundColor(uuid: string, backgroundColor: string): Promise<void>;

  canvas_getBorderColor(uuid: string): Promise<string>;

  canvas_setBorderColor(uuid: string, borderColor: string): Promise<void>;

  canvas_getLocation(uuid: string): Promise<number[]>;

  canvas_getAbsoluteLocation(uuid: string): Promise<number[]>;

  canvas_getDimensions(uuid: string): Promise<number[]>;
}
