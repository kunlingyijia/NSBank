//
//  CustomDetectViewController.h
//  MegLiveDemo
//
//  Created by megviio on 2017/5/26.
//  Copyright © megvii. All rights reserved.
//

#import <MGLivenessDetection/MGLiveDetectViewController.h>

@interface CustomDetectViewController : MGLiveDetectViewController
@property (nonatomic, copy) void(^ CustomDetectViewControllerBlock)( NSString* path ,NSString * name, NSString * code);
@end
