# 🖼 react-native-image-manipulator

> Crop, rotate, flip, and resize images in React Native — **without Expo or Unimodules**. Fully typed. Based on Expo's ImageManipulator API.

[![npm version](https://img.shields.io/npm/v/@oguzhnatly/react-native-image-manipulator.svg)](https://www.npmjs.com/package/@oguzhnatly/react-native-image-manipulator)
[![npm downloads](https://img.shields.io/npm/dw/@oguzhnatly/react-native-image-manipulator.svg)](https://www.npmjs.com/package/@oguzhnatly/react-native-image-manipulator)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![platforms](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://github.com/oguzhnatly/react-native-image-manipulator)

---

## Why this package?

Most React Native image manipulation libraries require Expo or Unimodules. This one doesn't. It gives you the same clean API as `expo-image-manipulator` — crop, rotate, flip, resize, compress — as a standalone package that works in any bare React Native project.

**350+ weekly downloads. Running in production apps for 4+ years.**

---

## Features

- ✅ No Expo or Unimodules required
- ✅ Full TypeScript support
- ✅ iOS & Android
- ✅ Crop, rotate, flip, and resize in a single call
- ✅ JPEG / PNG output
- ✅ Base64 output option
- ✅ Chainable actions — apply multiple transforms at once

---

## Installation

```sh
npm install @oguzhnatly/react-native-image-manipulator
# or
yarn add @oguzhnatly/react-native-image-manipulator
```

### iOS

```sh
cd ios && pod install
```

### Android

No additional setup required.

---

## Usage

```typescript
import RNImageManipulator from '@oguzhnatly/react-native-image-manipulator';

const result = await RNImageManipulator.manipulate(
  imageUri,
  [
    { rotate: 90 },
    { flip: { vertical: true } },
    { resize: { width: 800 } },
    { crop: { originX: 0, originY: 0, width: 400, height: 400 } },
  ],
  { format: 'jpeg', compress: 0.8, base64: false }
);

console.log(result.uri);    // URI to the resulting image
console.log(result.width);  // Output width
console.log(result.height); // Output height
```

---

## API

### `RNImageManipulator.manipulate(uri, actions, saveOptions)`

| Parameter     | Type            | Description                                      |
|---------------|-----------------|--------------------------------------------------|
| `uri`         | `string`        | URI of the source image                          |
| `actions`     | `Action[]`      | Array of transformations to apply (in order)     |
| `saveOptions` | `SaveOptions`   | Output format, compression, and base64 settings  |

#### Actions

| Action   | Type                                              | Description                                                                 |
|----------|---------------------------------------------------|-----------------------------------------------------------------------------|
| `resize` | `{ width?: number; height?: number }`             | Resize the image. Omit one dimension to preserve aspect ratio               |
| `rotate` | `number`                                          | Rotate clockwise (positive) or counter-clockwise (negative) in degrees      |
| `flip`   | `{ vertical?: boolean; horizontal?: boolean }`    | Flip along the specified axis                                               |
| `crop`   | `{ originX, originY, width, height }`             | Crop to a rectangle. Origin is the top-left corner                          |

#### Save Options

| Option     | Type                  | Default    | Description                                          |
|------------|-----------------------|------------|------------------------------------------------------|
| `format`   | `'jpeg'` \| `'png'`   | `'jpeg'`   | Output format. PNG is lossless; JPEG is faster       |
| `compress` | `number` (0–1)        | `1`        | Compression level. `1` = no compression, `0` = max  |
| `base64`   | `boolean`             | `false`    | Include base64-encoded image data in the result      |

#### Returns

```typescript
{
  uri: string;     // URI to the resulting image
  width: number;
  height: number;
  base64?: string; // Only present if saveOptions.base64 = true
}
```

---

## License

MIT © [Oguzhan Atalay](https://github.com/oguzhnatly)
