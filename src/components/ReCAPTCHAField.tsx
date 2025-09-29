import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCAPTCHAField = ({
  recaptchaRef,
}: {
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
}) => {
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    />
  );
};

export default ReCAPTCHAField;
