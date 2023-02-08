import RNImageManipulator from './fabric/NativeImageManipulator';

export type RNImageManipulatorResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
};

export default RNImageManipulator;
