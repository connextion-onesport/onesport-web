import AuthHeader from './AuthHeader';
import AuthSocial from './AuthSocial';
import AuthFooter from './AuthFooter';

export default function AuthForm() {
  return (
    <>
      <AuthHeader />
      <div className="my-auto flex w-full flex-col gap-8 rounded-none bg-background px-6 py-10">
        <AuthSocial />
        <AuthFooter />
      </div>
    </>
  );
}
