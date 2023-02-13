import { TurboModule } from 'react-native';
type RNImageManipulatorResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
};
export interface Spec extends TurboModule {
    manipulate(uriString: string, actions: Object[], saveOptions: Object): Promise<RNImageManipulatorResult>;
}
declare const _default: Spec;
export default _default;
