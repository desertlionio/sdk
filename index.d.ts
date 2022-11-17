declare function init(params: {
    appId: string;
    userIdentifier?: string;
}): void;
declare function identifyUser(params: {
    userIdentifier: string;
}): void;
declare const _default: {
    init: typeof init;
    identifyUser: typeof identifyUser;
};

export { _default as default };
