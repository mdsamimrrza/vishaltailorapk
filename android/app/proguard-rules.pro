# Safe baseline keep rules for release builds.
# NOTE: minification (R8) is currently DISABLED via gradle.properties
# (android.enableMinifyInReleaseBuilds=false) because the previous
# aggressive rules stripped runtime annotations React Native needs at
# startup, causing an instant crash before the splash screen.
# If you re-enable minification later, keep this rule set conservative.

# Runtime annotations must be preserved — RN native module lookup uses them.
-keepattributes *Annotation*,EnclosingMethod,InnerClasses,Signature

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.worklets.** { *; }

# react-native-maps (reflection-based view manager)
-keep class com.airbnb.android.react.maps.** { *; }

# react-native-svg
-keep class com.horcrux.svg.** { *; }

# @shopify/flash-list
-keep class com.shopify.reactnative.flash_list.** { *; }

# expo modules
-keep class expo.modules.** { *; }
