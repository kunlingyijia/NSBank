//
//  NewViewController.m
//  HBuilder-Integrate
//
//  Created by 席亚坤 on 2017/8/2.
//  Copyright © 2017年 DCloud. All rights reserved.
//

#import "NewViewController.h"

@interface NewViewController ()

@end

@implementation NewViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor greenColor];
    
    [self inintView];
    
    // Do any additional setup after loading the view from its nib.
}
// 新建一个按钮
- (void)inintView{
    UIButton *button = [[UIButton alloc] init];
    button.frame = CGRectMake(100, 200, 100, 50);
    [button setTitle:self.dic[@"title"] forState:UIControlStateNormal];
    [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [button setBackgroundColor: [UIColor yellowColor]];
    [button addTarget:self action:@selector(btnClick) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
}
// 按钮点击事件
- (void)btnClick{
    self.NewViewControllerBlock(@"你是谁??");
    [self dismissViewControllerAnimated:YES completion:^{
        
    }];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
