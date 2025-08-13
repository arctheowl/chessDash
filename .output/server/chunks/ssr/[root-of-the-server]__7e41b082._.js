module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/lib/themes.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "defaultTheme": ()=>defaultTheme,
    "themes": ()=>themes
});
const themes = [
    {
        name: 'Purple Night',
        description: 'Current dark theme with purple accents',
        colors: {
            primary: 'purple-600',
            secondary: 'purple-500',
            accent: 'purple-400',
            background: 'slate-900',
            surface: 'white/10',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-400'
            },
            border: 'white/20',
            gradient: {
                from: 'slate-900',
                via: 'purple-900',
                to: 'slate-900'
            }
        }
    },
    {
        name: 'Ocean Blue',
        description: 'Deep blue ocean theme',
        colors: {
            primary: 'blue-600',
            secondary: 'blue-500',
            accent: 'blue-400',
            background: 'slate-900',
            surface: 'white/10',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-400'
            },
            border: 'white/20',
            gradient: {
                from: 'slate-900',
                via: 'blue-900',
                to: 'slate-900'
            }
        }
    },
    {
        name: 'Emerald Forest',
        description: 'Green forest theme',
        colors: {
            primary: 'emerald-600',
            secondary: 'emerald-500',
            accent: 'emerald-400',
            background: 'slate-900',
            surface: 'white/10',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-400'
            },
            border: 'white/20',
            gradient: {
                from: 'slate-900',
                via: 'emerald-900',
                to: 'slate-900'
            }
        }
    },
    {
        name: 'Sunset Orange',
        description: 'Warm orange sunset theme',
        colors: {
            primary: 'orange-600',
            secondary: 'orange-500',
            accent: 'orange-400',
            background: 'slate-900',
            surface: 'white/10',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-400'
            },
            border: 'white/20',
            gradient: {
                from: 'slate-900',
                via: 'orange-900',
                to: 'slate-900'
            }
        }
    },
    {
        name: 'Rose Pink',
        description: 'Elegant pink theme',
        colors: {
            primary: 'rose-600',
            secondary: 'rose-500',
            accent: 'rose-400',
            background: 'slate-900',
            surface: 'white/10',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-400'
            },
            border: 'white/20',
            gradient: {
                from: 'slate-900',
                via: 'rose-900',
                to: 'slate-900'
            }
        }
    },
    {
        name: 'Classic Light',
        description: 'Clean light theme',
        colors: {
            primary: 'gray-800',
            secondary: 'gray-700',
            accent: 'gray-600',
            background: 'gray-50',
            surface: 'white',
            text: {
                primary: 'gray-900',
                secondary: 'gray-700',
                muted: 'gray-500'
            },
            border: 'gray-200',
            gradient: {
                from: 'gray-50',
                via: 'gray-100',
                to: 'gray-50'
            }
        }
    },
    {
        name: 'Midnight Dark',
        description: 'Pure dark theme',
        colors: {
            primary: 'gray-300',
            secondary: 'gray-400',
            accent: 'gray-500',
            background: 'black',
            surface: 'gray-900',
            text: {
                primary: 'white',
                secondary: 'gray-300',
                muted: 'gray-500'
            },
            border: 'gray-800',
            gradient: {
                from: 'black',
                via: 'gray-900',
                to: 'black'
            }
        }
    }
];
const defaultTheme = themes[0];
}),
"[project]/src/lib/ThemeContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ThemeProvider": ()=>ThemeProvider,
    "useTheme": ()=>useTheme
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/themes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultTheme"]);
    // Load theme from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedThemeName = localStorage.getItem('chess-dashboard-theme');
        if (savedThemeName) {
            const savedTheme = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themes"].find((theme)=>theme.name === savedThemeName);
            if (savedTheme) {
                setCurrentTheme(savedTheme);
            }
        }
    }, []);
    const setTheme = (theme)=>{
        setCurrentTheme(theme);
        localStorage.setItem('chess-dashboard-theme', theme.name);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            currentTheme,
            setTheme,
            themes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$themes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themes"]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/ThemeContext.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7e41b082._.js.map