Object.defineProperty(document, 'documentElement', {
    configurable: true,
    value: {}
});

delete document.documentElement.classList;
