module.exports = {
    "parser": "babel-eslint",
    "env": {
        "node": true,
        "mocha": true
    },
    globals: {
        navigator: true,
        assert: true,
        CONFIG : true,
        fetch: true,
        swfobject : true,
        sinon: true,
        window: true,
        document: true,
        Coati : true,
        bitmovin: true,
        Meister: true,
        Silverlight : true,
        localStorage: true,
        dataLayer: true
    },
    "extends": "airbnb",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "classes": true
    },
    "rules": {
        "import/prefer-default-export": 0,
		"linebreak-style":0,
        "class-methods-use-this": 0,
        "comma-dangle": 0,
        "generator-star-spacing": 0,
        "eol-last": 0,
        "max-len": 0,
        "import/no-extraneous-dependencies": 0,
        "new-cap": 0,
        "no-underscore-dangle": 0,
        "indent": [2, 4, {"SwitchCase": 1}],
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "no-console": ["warn", { allow: ["warn", "error", "info"]}],
        "no-restricted-syntax": 0,
        "no-return-await": 0,
        "no-await-in-loop": 0
    }
};
