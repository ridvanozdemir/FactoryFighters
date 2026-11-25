import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
function cap(...args) { execFileSync(npx, ['cap', ...args], {stdio:'inherit', shell:process.platform==='win32'}); }
if (!existsSync('www/index.html')) throw new Error('www/index.html eksik');
if (!existsSync('android/app/build.gradle')) cap('add','android');
cap('sync','android');
const manifest='android/app/src/main/AndroidManifest.xml';
let xml=readFileSync(manifest,'utf8');
if(!xml.includes('android:screenOrientation=')) xml=xml.replace(/(<activity\b[^>]*?)(>)/s,'$1 android:screenOrientation="sensorLandscape"$2');
if(!xml.includes('android.permission.VIBRATE')) xml=xml.replace('</manifest>','    <uses-permission android:name="android.permission.VIBRATE" />\n</manifest>');
writeFileSync(manifest,xml);
const main='android/app/src/main/java/com/factoryfighters/sonmesai/MainActivity.java';
writeFileSync(main,`package com.factoryfighters.sonmesai;
import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
  @Override public void onCreate(Bundle state) {
    super.onCreate(state);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    immersive();
  }
  private void immersive() {
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    c.hide(WindowInsetsCompat.Type.systemBars());
  }
  @Override public void onWindowFocusChanged(boolean focus) {
    super.onWindowFocusChanged(focus);
    if(focus) immersive();
  }
}
`);
const gradle='android/app/build.gradle';
let build=readFileSync(gradle,'utf8').replace(/versionCode\s+\d+/, 'versionCode 5').replace(/versionName\s+["'][^"']+["']/, 'versionName "0.5.0"');
writeFileSync(gradle,build);
