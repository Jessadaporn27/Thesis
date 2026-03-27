/*
 * Browser-based Code Execution Engine
 * - Python: Uses Pyodide (Python compiled to WebAssembly)
 * - JavaScript: Runs natively in browser via Function constructor
 * No external API needed!
 */

let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadPromise = null;

// Load Pyodide from CDN (only once)
async function loadPyodide() {
    if (pyodideInstance) return pyodideInstance;

    if (pyodideLoading) {
        return pyodideLoadPromise;
    }

    pyodideLoading = true;
    pyodideLoadPromise = new Promise(async (resolve, reject) => {
        try {
            // Load Pyodide script
            if (!window.loadPyodide) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js';
                script.async = true;
                await new Promise((res, rej) => {
                    script.onload = res;
                    script.onerror = () => rej(new Error('ไม่สามารถโหลด Pyodide ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'));
                    document.head.appendChild(script);
                });
            }

            const pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/',
            });

            pyodideInstance = pyodide;
            pyodideLoading = false;
            resolve(pyodide);
        } catch (err) {
            pyodideLoading = false;
            reject(err);
        }
    });

    return pyodideLoadPromise;
}

// Execute Python code using Pyodide
async function executePython(code) {
    try {
        const pyodide = await loadPyodide();

        // Capture stdout and stderr
        pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        try {
            pyodide.runPython(code);
        } catch (err) {
            // Get stderr output
            const stderr = pyodide.runPython('sys.stderr.getvalue()');
            // Reset streams
            pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
            return {
                success: false,
                output: stderr || err.message,
                error: 'Runtime Error',
            };
        }

        // Get stdout output
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        // Reset streams
        pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

        return {
            success: true,
            output: stdout.trimEnd(),
            error: null,
        };
    } catch (err) {
        return {
            success: false,
            output: '',
            error: err.message || 'ไม่สามารถรัน Python ได้',
        };
    }
}

// Execute JavaScript code in browser
function executeJavaScript(code) {
    try {
        // Capture console.log output
        const logs = [];
        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
        };

        const fakeConsole = {
            log: (...args) => logs.push(args.map(formatArg).join(' ')),
            error: (...args) => logs.push(args.map(formatArg).join(' ')),
            warn: (...args) => logs.push(args.map(formatArg).join(' ')),
            info: (...args) => logs.push(args.map(formatArg).join(' ')),
        };

        // Create sandboxed execution
        const wrappedCode = `
      (function(console) {
        ${code}
      })
    `;

        const fn = eval(wrappedCode);
        fn(fakeConsole);

        return {
            success: true,
            output: logs.join('\n').trimEnd(),
            error: null,
        };
    } catch (err) {
        return {
            success: false,
            output: err.stack || err.message,
            error: 'Runtime Error',
        };
    }
}

// Format JS values for display
function formatArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') {
        try {
            return JSON.stringify(arg);
        } catch {
            return String(arg);
        }
    }
    return String(arg);
}

// Main execute function
export async function executeCode(code, language = 'python') {
    if (!code.trim()) {
        return {
            success: false,
            output: '',
            error: 'กรุณาเขียนโค้ดก่อนกดรัน',
        };
    }

    if (language === 'python') {
        return await executePython(code);
    }

    if (language === 'javascript') {
        return executeJavaScript(code);
    }

    return {
        success: false,
        output: '',
        error: `ภาษา "${language}" ยังไม่รองรับในขณะนี้ รองรับ Python และ JavaScript`,
    };
}

// Preload Pyodide in background
export function preloadPyodide() {
    loadPyodide().catch(() => { });
}
