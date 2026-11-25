# Factory Fighters: Son Mesai

Android v0.5 test sürümü, v0.4 HTML5 oyununu Capacitor ile paketler. Oyun `www/index.html` içindedir; görseller ve ses motoru dahildir. İnternetsiz oyun, iki mod, joystick, yedi boss ve dalgalı düello desteklenir. Çevrim içi ligler ve bildirimler henüz yoktur.

## APK derleme
`www/` değişiklikleri Actions derlemesini tetikler. Ayrıca Actions > Android APK (debug) > Run workflow ile manuel başlatılabilir. Başarılı çalışmanın Artifacts bölümünden `FactoryFighters-v0.5-debug` ZIP paketini indirip APK'yı çıkar. Debug APK yalnızca test içindir; Google Play sürümü değildir.

Yerel derleme: Node.js 22, Java 21 ve Android SDK 35 ile `npm install`, `npm run android:prepare`, ardından `cd android` ve `./gradlew assembleDebug` (Windows: `gradlew.bat assembleDebug`).

Markalar kurgusal oyun referanslarıdır; resmî marka ortaklığı yoktur. Görselleri yeniden dağıtmadan önce gerekli izinleri doğrulayın.
