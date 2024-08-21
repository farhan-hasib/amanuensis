import AuthSignin from "@/components/AuthSignin";

const SigninPage = () => {
  return (
    <>
      <section className="signin-section">
        <div className="container">
          <div className="signin-container">
            <div className="signin-wrapper">
              <div className="signin-box">
                <h3 className="signin-title">Sign-in</h3>
                <p className="signin-description">
                  Sign-in to your account using google
                </p>
                <AuthSignin /> {}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
