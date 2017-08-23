//
//  PluginTest.h
//  HBuilder-Hello
//
//  Created by Mac Pro on 14-9-3.
//  Copyright (c) 2014年 DCloud. All rights reserved.
//

#include "PGPlugin.h"
#include "PGMethod.h"
#import <Foundation/Foundation.h>



@interface PGPluginTest : PGPlugin


- (void)PluginTestFunction:(PGMethod*)command;
//- (void)PluginTestFunctionArrayArgu:(PGMethod*)command;
// 调用指纹解锁
- (void)AuthenticateUser:(PGMethod*)command;
- (NSData*)PluginTestFunctionSync:(PGMethod*)command;
- (NSData*)PluginTestFunctionSyncArrayArgu:(PGMethod*)command;

///人脸识别
- (void)hgdqGotoNative:(PGMethod *)commands;
///通讯录
-(void)addressBookNative:(PGMethod *)commands;

@end
