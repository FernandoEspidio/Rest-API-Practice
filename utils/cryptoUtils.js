import crypto from 'crypto';

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(12).toString("base64url");
    const pepper = process.env.PEPPER; 

    const hash = crypto
            .createHash('sha256')
            .update(salt + password + pepper)
            .digest("base64url");

    return `${salt}${hash}`;
};

export const verifyPassword = (hashedPassword, userPassword) => {
    const saltLength = 16;
    const salt = hashedPassword.slice(0, saltLength);
    const storedHash = hashedPassword.slice(saltLength);
    const pepper = process.env.PEPPER;

    const candidateHash = crypto
        .createHash('sha256')
        .update(salt + userPassword + pepper)
        .digest("base64url");

    console.log(candidateHash);
    return candidateHash === storedHash;
};
