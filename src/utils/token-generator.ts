import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
const PRIVATE_KEY = "PRIVATE_KEY";
const PUBLIC_KEY = "PUBLIC_KEY";
const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;

type JWTPayload = {
  email: string;
  id: string;
  name: string;
};

class TokenGenerator {
  private options: SignOptions;
  private secretOrPrivateKey: string;
  private secretOrPublicKey: string;

  constructor(
    secretOrPrivateKey: string,
    secretOrPublicKey: string,
    options: SignOptions
  ) {
    this.options = options;
    this.secretOrPrivateKey = secretOrPrivateKey;
    this.secretOrPublicKey = secretOrPublicKey;
  }

  sign(payload: JWTPayload, options?: SignOptions) {
    const jwtSignOptions = Object.assign({}, this.options, options);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  refresh(token: string, refreshOptions?: VerifyOptions) {
    const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions);
    // delete payload.iat;
    const jwtSignOptions = Object.assign({}, this.options, {
      jwtid: refreshOptions?.jwtid,
    });
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  verify(token: string, refreshOptions?: VerifyOptions) {
    const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions);
  }
}
const tokenGenerator = new TokenGenerator(PRIVATE_KEY, PUBLIC_KEY, {
  algorithm: "HS256",
  keyid: "1",
  noTimestamp: false,
  expiresIn: "7 days",
});

export default tokenGenerator;
