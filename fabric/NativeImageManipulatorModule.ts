import {TurboModuleRegistry, TurboModule} from 'react-native';

type RNImageManipulatorResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
};

export interface Spec extends TurboModule {
  manipulate(uriString: string, actions: Object[], saveOptions: Object): Promise<RNImageManipulatorResult>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNImageManipulator');