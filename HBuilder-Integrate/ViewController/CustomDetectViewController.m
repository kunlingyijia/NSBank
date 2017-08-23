//
//  CustomDetectViewController.m
//  MegLiveDemo
//
//  Created by megviio on 2017/5/26.
//  Copyright © megvii. All rights reserved.
//

#import "CustomDetectViewController.h"
#import "DetectFinishViewController.h"
#import "MyBottomView.h"

@interface CustomDetectViewController ()

@end

@implementation CustomDetectViewController
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:animated];
    
    
}
- (void)viewDidLoad {
    [super viewDidLoad];
    self.topViewHeight = 0;
    self.title = @"人脸识别";
    
    //self.title = [NSString stringWithFormat:@"%@%@", NSLocalizedString(@"key_custom_UI", nil), NSLocalizedString(@"key_action_live_detect", nil)];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Default Setting
- (void)defaultSetting {
    if (!self.liveManager && !self.videoManager) {
        MGLiveActionManager *ActionManager = [MGLiveActionManager LiveActionRandom:NO
                                                                       actionArray:@[@1, @2, @3]
                                                                       actionCount:3];
        MGLiveErrorManager *errorManager = [[MGLiveErrorManager alloc] initWithFaceCenter:CGPointMake(0.5, 0.4)];
        
        MGVideoManager *videoManager = [MGVideoManager videoPreset:AVCaptureSessionPreset640x480
                                                    devicePosition:AVCaptureDevicePositionFront
                                                       videoRecord:NO
                                                        videoSound:NO];
        [videoManager setVideoOrientation:AVCaptureVideoOrientationLandscapeLeft];
        MGLiveDetectionManager *liveManager = [[MGLiveDetectionManager alloc]initWithActionTime:20
                                                                                  actionManager:ActionManager
                                                                                   errorManager:errorManager];
        
        [self setLiveManager:liveManager];
        [self setVideoManager:videoManager];
    }
}

#pragma mark - CreateV
-(void)creatView {
    self.headerView = [[UIImageView alloc] initWithFrame:CGRectZero];
    [self.headerView setImage:[MGLiveBundle LiveImageWithName:@"header_bg_img"]];
    [self.headerView setContentMode:UIViewContentModeScaleAspectFill];
    [self.headerView setFrame:CGRectMake(0, 0, MG_WIN_WIDTH, MG_WIN_WIDTH)];
    
    self.bottomView = [[MyBottomView alloc] initWithFrame:CGRectMake(0,
                                                                     MG_WIN_WIDTH + 0,
                                                                     MG_WIN_WIDTH,
                                                                     MG_WIN_HEIGHT - MG_WIN_WIDTH - 0)
                                         andCountDownType:MGCountDownTypeRing];
    
    [self.view addSubview:self.headerView];
    [self.view addSubview:self.bottomView];
}

#pragma mark - Detect Result
- (void)liveDetectionFinish:(MGLivenessDetectionFailedType)type checkOK:(BOOL)check liveDetectionType:(MGLiveDetectionType)detectionType {
    [super liveDetectionFinish:type checkOK:check liveDetectionType:detectionType];
        if (check == YES) {
            FaceIDData* faceData = [self.liveManager getFaceIDData];
            NSData* bestImageData = [faceData.images objectForKey:@"image_best"];
             //拿到图片
            UIImage* bestImage = [UIImage imageWithData:bestImageData scale:1.0];
                      //[self loadImageFinished:bestImage];
//            NSString *path_sandox = NSHomeDirectory();
//            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
//            formatter.dateFormat =@"yyyyMMddHHmmss";
//            NSString *str = [formatter stringFromDate:[NSDate date]];
//            NSString *filePath = [path_sandox stringByAppendingString:[NSString stringWithFormat: @"/Documents/%@.png",str]];
//            BOOL result = [UIImagePNGRepresentation(bestImage)writeToFile: filePath    atomically:YES]; // 保存成功会返回YES
                [self UP:bestImage];
            

         }else{
             self.CustomDetectViewControllerBlock(@"",@"",[NSString stringWithFormat:@"%u",type]);
             [self dismissViewControllerAnimated:YES completion:nil];

        }
}

#pragma mark - 图片上传
-(void)UP:(UIImage*)iamge{
    [SVProgressHUD setStatus:@"上传中"];
    AFHTTPSessionManager *UPmanager = [AFHTTPSessionManager manager];
    UPmanager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",
                                                           @"text/html",
                                                           @"image/jpeg",
                                                           @"image/png",
                                                           @"application/octet-stream",
                                                           @"text/json",
                                                           nil];
    [UPmanager POST:@"http://106.14.64.21:8380/image" parameters:@{} constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
            //1.把图片转换成二进制流
            NSData *imageData= [ UIImage scaleImage:iamge toKb:100];
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            formatter.dateFormat =@"yyyyMMddHHmmss";
            NSString *str = [formatter stringFromDate:[NSDate date]];
            NSString *fileName = [NSString stringWithFormat:@"%@.jpg", str];
            //2.上传图片
            [formData appendPartWithFileData:imageData name:[NSString stringWithFormat:@"file"] fileName:[NSString stringWithFormat:@"%@.jpg",fileName] mimeType:@"image/jpeg"];
        
        
    } progress:^(NSProgress * _Nonnull uploadProgress) {
//        [SVProgressHUD showProgress:uploadProgress.fractionCompleted status:@"上传中"];
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSArray * arr =responseObject;
        self.CustomDetectViewControllerBlock(arr[0],@"",@"-1");
        [SVProgressHUD dismiss];
        [self dismissViewControllerAnimated:YES completion:nil];

    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
         self.CustomDetectViewControllerBlock(@"",@"",@"-2");
        [SVProgressHUD dismiss];
        [self dismissViewControllerAnimated:YES completion:nil];


    }];

    
    
}



@end
