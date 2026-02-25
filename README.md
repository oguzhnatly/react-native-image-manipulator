# 🖼 react-native-image-manipulator

Crop, rotate, flip, and resize images in React Native without Expo or Unimodules. Fully typed. Built on the same API as `expo-image-manipulator` so it feels familiar, but works in any bare React Native project.

[![npm version](https://img.shields.io/npm/v/@oguzhnatly/react-native-image-manipulator.svg)](https://www.npmjs.com/package/@oguzhnatly/react-native-image-manipulator)
[![npm downloads](https://img.shields.io/npm/dw/@oguzhnatly/react-native-image-manipulator.svg)](https://www.npmjs.com/package/@oguzhnatly/react-native-image-manipulator)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![platforms](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://github.com/oguzhnatly/react-native-image-manipulator)

---

## Why this package?

Most image manipulation libraries for React Native either require Expo or pull in a heavy dependency tree through Unimodules. This package is a standalone drop-in that gives you the same clean, chainable API without any of that overhead. Crop, rotate, flip, resize, compress and export to JPEG or PNG in a single call.

---

## Features

- ✅ No Expo or Unimodules dependency
- ✅ Full TypeScript support with typed actions and return values
- ✅ Works on iOS and Android
- ✅ Crop, rotate, flip, and resize in a single invocation
- ✅ Chain multiple transformations in one call
- ✅ JPEG and PNG output formats
- ✅ Optional Base64 output alongside the file URI
- ✅ Configurable compression level

---

## Installation

```sh
npm install @oguzhnatly/react-native-image-manipulator
```

```sh
yarn add @oguzhnatly/react-native-image-manipulator
```

### iOS Setup

Install native pods after adding the package:

```sh
cd ios && pod install
```

### Mostly Automatic Installation (React Native < 0.60)

```sh
react-native link @oguzhnatly/react-native-image-manipulator
```

### Android Setup

No additional setup required for Android on React Native 0.60+. The package links automatically via autolinking.

### Manual Linking (React Native < 0.60)

#### iOS

1. In Xcode, right click `Libraries` and select `Add Files to [your project]`
2. Navigate to `node_modules/@oguzhnatly/react-native-image-manipulator` and add `RNImageManipulator.xcodeproj`
3. In your project target, go to `Build Phases` → `Link Binary With Libraries` and add `libRNImageManipulator.a`

#### Android

Add the following to `android/settings.gradle`:

```gradle
include ':react-native-image-manipulator'
project(':react-native-image-manipulator').projectDir = new File(rootProject.projectDir, '../node_modules/@oguzhnatly/react-native-image-manipulator/android')
```

Add the following to the `dependencies` block in `android/app/build.gradle`:

```gradle
implementation project(':react-native-image-manipulator')
```

Open `android/app/src/main/java/[...]/MainActivity.java` and add:

```java
import com.oguzhnatly.rnimagemanipulator.RNImageManipulatorPackage;
```

Then register the package inside `getPackages()`:

```java
new RNImageManipulatorPackage()
```

---

## Usage

### Basic Example

```typescript
import RNImageManipulator from '@oguzhnatly/react-native-image-manipulator';

const result = await RNImageManipulator.manipulate(
  imageUri,
  [{ rotate: 90 }, { flip: { vertical: true } }],
  { format: 'png' }
);

console.log(result.uri);    // URI of the output image
console.log(result.width);  // Output image width
console.log(result.height); // Output image height
```

### Resize with Aspect Ratio Preserved

Provide only one dimension and the other is calculated automatically:

```typescript
const result = await RNImageManipulator.manipulate(
  imageUri,
  [{ resize: { width: 800 } }],
  { format: 'jpeg', compress: 0.9 }
);
```

### Crop to a Specific Region

```typescript
const result = await RNImageManipulator.manipulate(
  imageUri,
  [{ crop: { originX: 50, originY: 50, width: 400, height: 400 } }],
  { format: 'jpeg', compress: 1 }
);
```

### Multiple Transformations in One Call

Actions are applied in the order they are provided:

```typescript
const result = await RNImageManipulator.manipulate(
  imageUri,
  [
    { rotate: 90 },
    { flip: { horizontal: true } },
    { resize: { width: 600 } },
    { crop: { originX: 0, originY: 0, width: 600, height: 400 } },
  ],
  { format: 'jpeg', compress: 0.85, base64: true }
);

// result.base64 is available when base64: true
const dataUri = `data:image/jpeg;base64,${result.base64}`;
```

---

## API

### `RNImageManipulator.manipulate(uri, actions, saveOptions)`

Applies a sequence of transformations to the image at `uri` and writes the result to a new file. The source file is never modified.

#### Parameters

| Parameter     | Type            | Required | Description                                           |
|---------------|-----------------|----------|-------------------------------------------------------|
| `uri`         | `string`        | Yes      | URI of the source image. Must be within app scope     |
| `actions`     | `Action[]`      | Yes      | Ordered array of transformations to apply             |
| `saveOptions` | `SaveOptions`   | Yes      | Output format, compression level, and base64 flag     |

#### Action Types

**`resize`**

```typescript
{ resize: { width?: number; height?: number } }
```

Resizes the image. If only one dimension is provided, the other is computed automatically to preserve the original aspect ratio.

**`rotate`**

```typescript
{ rotate: number }
```

Rotates the image by the given number of degrees. Positive values rotate clockwise, negative values rotate counter-clockwise.

**`flip`**

```typescript
{ flip: { vertical?: boolean; horizontal?: boolean } }
```

Flips the image along the specified axis or axes. Both can be set to `true` at the same time.

**`crop`**

```typescript
{ crop: { originX: number; originY: number; width: number; height: number } }
```

Crops the image to a rectangle. `originX` and `originY` define the top-left corner of the crop area in pixels relative to the current image size.

#### Save Options

| Option     | Type                   | Default    | Description                                                              |
|------------|------------------------|------------|--------------------------------------------------------------------------|
| `format`   | `'jpeg'` \| `'png'`    | `'jpeg'`   | Output format. PNG is lossless. JPEG produces smaller files with compression artifacts |
| `compress` | `number` (0 to 1)      | `1`        | Compression amount. `1` means no compression. `0` is maximum compression. Only applies to JPEG |
| `base64`   | `boolean`              | `false`    | When `true`, the result includes a `base64` string of the output image   |

#### Return Value

```typescript
{
  uri: string;      // URI to the output image file
  width: number;    // Width of the output image in pixels
  height: number;   // Height of the output image in pixels
  base64?: string;  // Base64 encoded image data, present only when saveOptions.base64 is true
}
```

Prepend `data:image/jpeg;base64,` or `data:image/png;base64,` to the `base64` value to construct a data URI usable directly in an `<Image>` source.

---

## Notes

- Each call to `manipulate` always produces a new file. Passing the same URI as input and overwriting is not supported due to how React Native caches images.
- Actions are applied sequentially in the order provided. The output of each action becomes the input for the next.
- Rotation that is not a multiple of 90 degrees may introduce transparent padding on iOS depending on the image dimensions.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

## License

MIT © [Oguzhan Atalay](https://github.com/oguzhnatly)
