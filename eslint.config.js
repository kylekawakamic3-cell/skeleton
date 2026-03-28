export default [
    {
        files: ["**/*.js"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "eqeqeq": "error",
            "curly": "error"
        },
        languageOptions: {
            globals: {
                document: "readonly",
                window: "readonly",
                console: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly"
            }
        }
    }
];
