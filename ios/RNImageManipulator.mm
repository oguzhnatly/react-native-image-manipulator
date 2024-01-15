#import "RNImageManipulator.h"
#import "ImageUtils.h"
#import <React/RCTLog.h>

@implementation RNImageManipulator

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(manipulate:(NSString *)uriString
                  actions:(NSArray *)actions
              saveOptions:(NSDictionary *)saveOptions
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject)
{
    [ImageUtils manipulate:uriString actions:actions saveOptions:saveOptions resolver:resolve rejecter:reject];
}

#if RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeImageManipulatorModuleSpecJSI>(params);
}
#endif

@end
