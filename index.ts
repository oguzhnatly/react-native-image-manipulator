import RNImageManipulator from './fabric/NativeImageManipulatorModule';

export type RNImageManipulatorResult = {
  uri: string;
  width: number;
  height: number;
  base64?: string;
};

export default {
  manipulate(
    uri: string,
    actions: Array<{
      resize?: {width?: number; height?: number};
      rotate?: number;
      flip?: {vertical?: boolean; horizontal?: boolean};
      crop?: {
        originX?: number;
        originY?: number;
        width?: number;
        height?: number;
      };
    }>,
    saveOptions: {
      compress?: number;
      format?: 'jpeg' | 'png';
      base64?: boolean;
    },
  ): Promise<RNImageManipulatorResult> {
    return RNImageManipulator.manipulate(uri, actions, saveOptions);
  },
};
