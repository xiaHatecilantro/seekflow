# Stop Hook — VS Code / 终端任务栏闪烁

Add-Type -Name Win32 -Namespace SeekFlow -MemberDefinition @"
[DllImport("user32.dll")]
public static extern bool FlashWindowEx(ref FLASHWINFO pfwi);
public struct FLASHWINFO { public uint cbSize; public IntPtr hwnd; public uint dwFlags; public uint uCount; public uint dwTimeout; }
"@

# 找目标窗口：优先 VS Code，其次终端
$targetHwnd = [IntPtr]::Zero

# 方法 1：直接通过进程找到 VS Code 的主窗口
$vsCode = Get-Process -Name "code" -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero } |
    Select-Object -First 1
if ($vsCode) {
    $targetHwnd = $vsCode.MainWindowHandle
}

# 方法 2：通过父进程链找终端窗口
if ($targetHwnd -eq [IntPtr]::Zero) {
    $parent = (Get-CimInstance Win32_Process -Filter "ProcessId=$PID").ParentProcessId
    if ($parent) {
        try {
            $parentProc = Get-Process -Id $parent -ErrorAction Stop
            if ($parentProc.MainWindowHandle -ne [IntPtr]::Zero) {
                $targetHwnd = $parentProc.MainWindowHandle
            }
        } catch {}
    }
}

# 闪烁任务栏
if ($targetHwnd -ne [IntPtr]::Zero) {
    $flash = New-Object SeekFlow.Win32+FLASHWINFO
    $flash.cbSize = [System.Runtime.InteropServices.Marshal]::SizeOf($flash)
    $flash.hwnd = $targetHwnd
    $flash.dwFlags = 3 -bor 12
    $flash.uCount = 0
    [SeekFlow.Win32]::FlashWindowEx([ref]$flash) | Out-Null
}
