import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { LoginWithEmailAndPasswordSchema } from "../schema/loginWithEmailAndPassword";

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
}

export default TokenGenerator;
