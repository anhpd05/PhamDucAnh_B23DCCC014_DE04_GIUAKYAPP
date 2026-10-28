tap(){ adb shell input tap $(( $1 * 191 / 100 )) $(( $2 * 191 / 100 )); sleep 1; }
hold(){ adb shell input swipe $(( $1 * 191 / 100 )) $(( $2 * 191 / 100 )) $(( $1 * 191 / 100 )) $(( $2 * 191 / 100 )) 900; sleep 1; }
shot(){ adb exec-out screencap -p > shots/$1.png; }
