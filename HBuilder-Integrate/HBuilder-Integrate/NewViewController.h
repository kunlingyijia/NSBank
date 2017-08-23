//
//  NewViewController.h
//  HBuilder-Integrate
//
//  Created by 席亚坤 on 2017/8/2.
//  Copyright © 2017年 DCloud. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NewViewController : UIViewController
@property (nonatomic, copy) void(^ NewViewControllerBlock)(NSString * str);
@property (nonatomic,strong)NSDictionary *dic;
@end
