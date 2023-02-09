import RNImageManipulator from './fabric/NativeImageManipulatorModule';

export type RNImageManipulatorResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
};

export default RNImageManipulator;
