import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    let jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "HN", initialProperties: nil, launchOptions: launchOptions)
    rootView?.backgroundColor = UIColor.white
    
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()
    
    return true
  }
}
