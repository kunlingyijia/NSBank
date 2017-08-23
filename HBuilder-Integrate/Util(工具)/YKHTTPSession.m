//
//  YKHTTPSession.m
//  DWduifubao
//
//  Created by 席亚坤 on 2017/7/12.
//  Copyright © 2017年 bianming. All rights reserved.
//
#import "YKHTTPSession.h"
#import "SVProgressHUD.h"
#import "AFNetworking.h"

@implementation YKHTTPSession{
    UIWebView *callPhoneWebview;
}

+ (YKHTTPSession *)shareSession; {
    static YKHTTPSession *session = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        session = [[YKHTTPSession alloc] init];
    });
    return session;
}
////网络请求
//- (nullable NSURLSessionDataTask *)requestDataWithParm:(nullable id)parm act:( nonnull NSString *)actName sign:(nullable id)sign method:(YKRequestMethod)method  showHUD:(BOOL)showHUD active:(BOOL)active success:(nullable YKSuccessCallback)success faild:(nullable YKFaildCallback)faild {
//    //showHUD ==YES ?[[LoadWaitSingle shareManager]showLoadWaitViewImage:@"兑富宝加载等待图"] :nil;
//    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeClear];
//    [SVProgressHUD setDefaultStyle:  SVProgressHUDStyleCustom];
//    //设置背景颜色为透明色
//    [SVProgressHUD setBackgroundColor:[UIColor clearColor]];
//    //[SVProgressHUD  setMinimumDismissTimeInterval:40];
//    //利用SVP提供类方法设置 通过UIImage分类方法返回的动态UIImage对象
//    NSData* data =[NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"兑富宝加载等待图" ofType:@"gif"]];
//    showHUD == YES ?  [SVProgressHUD showImage: [UIImage sd_animatedGIFWithData:data] status:@""] : nil;
////    [SVProgressHUD setForegroundColor :[UIColor colorWithHexString:kDarkGrey]];
////    [SVProgressHUD setFont:[UIFont systemFontOfSize:14.0*SizeScale]];
//    NSString * str = [actName substringWithRange:NSMakeRange(0, 3)];
//    NSString * ACTName = [str isEqualToString:@"act"] ? actName :[NSString stringWithFormat:@"%@%@",ACT_API,actName];
//    NSString *url = [NSString stringWithFormat:@"%@%@&sign=%@",kServerUrl,ACTName,sign];
//    YKAppClient*  manager = [YKAppClient sharedClient];
//    if (method == HTTPSRequestTypeGET) {
//     return   [manager GET:url parameters:[NSDictionary dictionaryWithObject:parm forKey:@"request"] progress:^(NSProgress * _Nonnull downloadProgress) {
//        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
//                 if (![responseObject[@"resultCode"]isEqualToString:@"1"]) {
//                   _BaseVC.view.userInteractionEnabled =YES;
//                 }
//            
//            [SVProgressHUD dismiss];
//            //[[LoadWaitSingle shareManager] hideLoadWaitView];
//            success(responseObject);
//        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
//            _BaseVC.view.userInteractionEnabled =YES;
//            faild(error);
//            NSString * errorStr =error.localizedDescription;
//            [SVProgressHUD setBackgroundColor:[UIColor whiteColor]];
//            if (![errorStr isEqualToString:@"已取消"]) {
//            if (errorStr.length>1) {
//            [SVProgressHUD showErrorWithStatus:  [error.localizedDescription   substringToIndex:error.localizedDescription.length-1]];
//            }else{
//                [SVProgressHUD showErrorWithStatus:@"网络连接失败"];
//            }
//        }
//            //[[LoadWaitSingle shareManager] hideLoadWaitView];
//        }];
//    }
//    
//    return  nil;
//}



///上传图片
-(void)UPImageToServer:(NSArray*)imageArr toKb:(NSInteger)kb success:(SuccessImageArr)success faild:(YKFaildCallback)faild{
//    NSString *password = [NSString stringWithFormat:@"%@%@%@",[YKDataTool getimage_account],[YKDataTool getimage_hostname],[YKDataTool getimage_password]];
//    NSDictionary * dic = @{@"image_account":[YKDataTool getimage_account],@"image_password":[password MD5Hash]};
    NSDictionary * dic;
//    AFHTTPSessionManager *UPmanager = [AFHTTPSessionManager manager];
//    UPmanager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",
//                                                           @"text/html",
//                                                           @"image/jpeg",
//                                                           @"image/png",
//                                                           @"application/octet-stream",
//                                                           @"text/json",
//                                                           nil];
//
//    [UPmanager POST:@"" parameters:[dic yy_modelToJSONObject] constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
//        for (int i= 0; i< imageArr.count; i++) {
//            UIImage * image =  [UIImage scaleImageAtPixel:imageArr [i] pixel:1024];
//            //1.把图片转换成二进制流
//            NSData *imageData= [ UIImage scaleImage:image toKb:kb];
//            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
//            formatter.dateFormat =@"yyyyMMddHHmmss";
//            NSString *str = [formatter stringFromDate:[NSDate date]];
//            NSString *fileName = [NSString stringWithFormat:@"%@.jpg", str];
//            //2.上传图片
//            [formData appendPartWithFileData:imageData name:[NSString stringWithFormat:@"file%d",i]fileName:[NSString stringWithFormat:@"%@%d.jpg",fileName, i] mimeType:@"image/jpeg"];
//        }
//    } progress:^(NSProgress * _Nonnull uploadProgress) {
//        //[SVProgressHUD showProgress:uploadProgress.fractionCompleted status:@"上传中"];
//    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
//        success(responseObject[@"data"]);
//        
//    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
//        faild(error);
//       
//        NSString * errorStr =error.localizedDescription;
//        if (errorStr.length>1) {
//            [SVProgressHUD showErrorWithStatus:  [error.localizedDescription   substringToIndex:error.localizedDescription.length-1]];
//        }else{
//            [SVProgressHUD showErrorWithStatus:@"网络连接失败"];
//        }
//    }];
}
/**
 *  拨打电话
 *
 *  @param phoneNumber 要拨打的号码
 *  @param view        拨号所在的页面
 */
- (void)CallPhoneNumber:(NSString *)phoneNumber inView:(UIView *)selfView
{
    if (!callPhoneWebview) {
        callPhoneWebview = [[UIWebView alloc] init];
    }
    if (![callPhoneWebview isDescendantOfView:selfView]) {
        [selfView addSubview:callPhoneWebview];
    }
    NSString *urlString = [NSString stringWithFormat:@"tel://%@", phoneNumber];
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:urlString]];
    [callPhoneWebview loadRequest:request];
}



@end
