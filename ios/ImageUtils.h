#import <UIKit/UIKit.h>
#import <CoreMedia/CoreMedia.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>

@interface ImageUtils : NSObject

+ (UIImage *)cropImage:(UIImage *)image toRect:(CGRect)rect;
+ (void)manipulate:(NSString *)uri
          actions:(NSArray *)actions
          saveOptions:(NSDictionary *)saveOptions
          resolver:(RCTPromiseResolveBlock)resolve
          rejecter:(RCTPromiseRejectBlock)reject;
@end
