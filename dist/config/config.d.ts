declare const _default: () => {
    database: {
        MONGODB_URI: string | undefined;
    };
    jwt: {
        SECRET: string | undefined;
    };
    googleOauthConfig: {
        googleClientId: string | undefined;
        googleClientSecret: string | undefined;
        googleCallbackUrl: string | undefined;
    };
    chapa: {
        secretKey: string | undefined;
        publicKey: string | undefined;
        encryptionKey: string | undefined;
    };
    frontendUrl: string | undefined;
    cloudinary: {
        cloudName: string | undefined;
        apiKey: string | undefined;
        apiSecret: string | undefined;
    };
};
export default _default;
