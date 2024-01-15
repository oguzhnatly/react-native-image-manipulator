#ifdef RCT_NEW_ARCH_ENABLED
#import <rnimagemanipulator/rnimagemanipulator.h>
#else
#import <React/RCTBridge.h>
#endif

@interface RNImageManipulator : NSObject
#ifdef RCT_NEW_ARCH_ENABLED
                                   <NativeImageManipulatorModuleSpec>
#else
                                   <RCTBridgeModule>
#endif

@end
  
