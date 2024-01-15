require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-image-manipulator"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']

  s.source       = { :git => "https://github.com/oguzhnatly/react-native-image-manipulator.git", :tag => "v#{s.version}" }

  s.source_files  = "ios/**/*.{h,m,mm}"

  if defined?(install_modules_dependencies()) != nil
    s.platform = :ios, "13.4"
    install_modules_dependencies(s)
  else
    s.platforms = { :ios => "9.0", :tvos => "9.0" }

    s.dependency "React-Core"
  end

end
