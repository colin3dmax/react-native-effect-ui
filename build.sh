#!/bin/bash
while true; do
    echo -e "\t\ti51TaoUK Build Menu"
    echo -e "1.Run Android"
    echo -e "2.Run iPhone Simulator 7"
    echo -e "3.Run iPhone Simulator 6"
    echo -e "4.Build Android Release"
    echo -e "5.Install Android Release"
    echo -e "6.Recode Android Screen"
    echo -e "0.Exit"
    echo -en "Enter option:" #-n表示不打印回车
    read -n1 option #读取一个字符
    echo ""
    case $option in
        1)
            react-native run-android
            ;;
        2)
            react-native run-ios --simulator "iPhone 7"
            ;;
        3)
            react-native run-ios --simulator "iPhone 6"
            ;;
        4)
            cd android && ./gradlew assembleRelease
            cd ..
            adb install ./android/app/build/outputs/apk/app-release.apk
            ;;
        5)
            adb install ./android/app/build/outputs/apk/app-release.apk
            ;;
        6)
            adb shell screenrecord /sdcard/i51Taouk_Android_Demo.mp4
            ;;
        0Quit)
            echo "Exit"
            break
            ;;
        *)
            echo "Enter error!"
            exit 2
    esac
done
