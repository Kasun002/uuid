import { UUIDTypes } from './types.js';
import parse from './parse.js';
import { unsafeStringify } from './stringify.js';

/**
 * Convert a v6 UUID to a v1 UUID
 *
 * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6
 * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
export default function v6ToV1(uuid: string): string;
export default function v6ToV1(uuid: Uint8Array): Uint8Array;
export default function v6ToV1(uuid: UUIDTypes): UUIDTypes {
  const v6Bytes = typeof uuid === 'string' ? parse(uuid) : uuid;

  const v1Bytes = _v6ToV1(v6Bytes);

  return typeof uuid === 'string' ? unsafeStringify(v1Bytes) : v1Bytes;
}

// Do the field transformation needed for v6 -> v1
function _v6ToV1(v6Bytes: Uint8Array) {
  return Uint8Array.of(
    ((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f),
    ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4),
    ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f),
    v6Bytes[7],

    ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4),
    ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4),

    0x10 | ((v6Bytes[0] & 0xf0) >> 4),
    ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4),

    v6Bytes[8],
    v6Bytes[9],
    v6Bytes[10],
    v6Bytes[11],
    v6Bytes[12],
    v6Bytes[13],
    v6Bytes[14],
    v6Bytes[15]
  );
}
