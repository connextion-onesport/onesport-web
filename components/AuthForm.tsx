'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {loginFormSchema, registerFormSchema} from '@/lib/validator';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Dispatch, useCallback, useState} from 'react';
import {ArrowRightIcon, EyeNoneIcon, EyeOpenIcon} from '@radix-ui/react-icons';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';
import {Separator} from './ui/separator';

export default function AuthForm({
  authVariant,
  openAuth,
}: {
  authVariant: string;
  openAuth: Dispatch<boolean>;
}) {
  const [variant, setVariant] = useState<string>(authVariant);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [googleHover, setGoogleHover] = useState<boolean>(false);

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onRegister(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
  }

  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant => (currentVariant === 'login' ? 'register' : 'login'));

    registerForm.reset();
    loginForm.reset();
  }, [registerForm, loginForm]);

  return (
    <section className="my-auto flex min-w-full flex-col gap-8 rounded-none bg-background px-8 py-10 sm:min-w-[400px] sm:rounded-lg">
      <AuthLogo openAuth={openAuth} />
      <AuthTitle variant={variant} />
      <AuthSocial googleHover={googleHover} setGoogleHover={setGoogleHover} />
      <AuthFormSection
        variant={variant}
        registerForm={registerForm}
        loginForm={loginForm}
        onRegister={onRegister}
        onLogin={onLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isSubmitting={isSubmitting}
      />
      <AuthFooter variant={variant} toggleVariant={toggleVariant} />
    </section>
  );
}

function AuthLogo({openAuth}: {openAuth: Dispatch<boolean>}) {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        onClick={() => openAuth(false)}
        className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-md"
      >
        <Image
          src="/images/logo.svg"
          alt="OneSport Logo"
          width={48}
          height={48}
          className="rounded-md"
        />
      </div>
    </div>
  );
}

function AuthTitle({variant}: {variant: string}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="text-lg font-bold">
        {variant === 'login' ? 'Login to OneSport' : 'Create your account'}
      </h1>
      <p className="text-sm text-muted-foreground">
        {variant === 'login'
          ? 'Welcome back! Please login to continue'
          : 'Welcome! Please fill in the details to get started.'}
      </p>
    </div>
  );
}

function AuthSocial({
  googleHover,
  setGoogleHover,
}: {
  googleHover: boolean;
  setGoogleHover: Dispatch<boolean>;
}) {
  return (
    <div className="flex flex-col gap-10">
      <Button
        variant="outline"
        className="flex p-5 shadow-none"
        onMouseOver={() => setGoogleHover(true)}
        onMouseLeave={() => setGoogleHover(false)}
      >
        <span className="flex aspect-square h-5 w-5 items-center justify-center">
          <FcGoogle className="h-full w-full" />
        </span>
        <span className="ml-4 flex w-full items-center justify-between">
          <span className="w-fit text-sm">Continue with Google</span>
          {googleHover && <ArrowRightIcon className="h-4 w-4" />}
        </span>
      </Button>

      <Separator className="relative flex items-center justify-center">
        <span className="absolute bg-background px-4 text-sm text-muted-foreground">or</span>
      </Separator>
    </div>
  );
}

function AuthFormSection({
  variant,
  registerForm,
  loginForm,
  onRegister,
  onLogin,
  showPassword,
  setShowPassword,
  isSubmitting,
}: {
  variant: string;
  registerForm: any;
  loginForm: any;
  onRegister: (values: any) => void;
  onLogin: (values: any) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<boolean>;
  isSubmitting: boolean;
}) {
  return (
    <>
      {variant === 'register' && (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
            <FormField
              control={registerForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm">Email address or phone number</FormLabel>
                  <FormControl>
                    <Input type="email" className="shadow-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-9 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Continue'}
            </Button>
          </form>
        </Form>
      )}

      {variant === 'login' && (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm">Email address or phone number</FormLabel>
                  <FormControl>
                    <Input type="email" className="shadow-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({field}) => (
                <FormItem className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm">Password</FormLabel>
                    <span className="cursor-pointer text-xs text-primary hover:underline">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative flex w-full items-center">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <div className="absolute right-0.5 flex items-center justify-center rounded-e-md bg-background py-1 pl-2 pr-4">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent"
                          onClick={() => setShowPassword(false)}
                        >
                          <EyeNoneIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </span>
                      </div>
                    ) : (
                      <div className="absolute right-0.5 flex items-center justify-center rounded-e-md bg-background py-1 pl-2 pr-4">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent"
                          onClick={() => setShowPassword(true)}
                        >
                          <EyeOpenIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </span>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-9 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Continue'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

function AuthFooter({variant, toggleVariant}: {variant: string; toggleVariant: () => void}) {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="text-sm text-muted-foreground">
        {variant === 'login' ? `Don't have an account?` : 'Already have an account?'}
      </span>
      <span onClick={toggleVariant} className="cursor-pointer text-sm text-primary hover:underline">
        {variant === 'login' ? 'Register' : 'Login'}
      </span>
    </div>
  );
}
