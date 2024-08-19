'use client';

import { Dispatch, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon, EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FcGoogle } from 'react-icons/fc';
import { RiUserLine, RiEdit2Fill } from 'react-icons/ri';

import { emailFormSchema, loginFormSchema, registerFormSchema } from '@/libs/validator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { FloatingLabelInput } from './ui/input-float';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

export default function AuthDialog({
  authVariant,
  showAuth,
  setShowAuth,
}: {
  authVariant: string;
  showAuth?: boolean;
  setShowAuth?: Dispatch<boolean>;
}) {
  const [isOpen, setIsOpen] = useState(false || showAuth);
  const [variant, setVariant] = useState<string>(authVariant);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [googleHover, setGoogleHover] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');

  if (!isOpen && setShowAuth) setShowAuth(false);

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  });

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
    setVariant(currentVariant => (currentVariant === 'login' ? 'email' : 'login'));

    registerForm.reset();
    loginForm.reset();
  }, [registerForm, loginForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={`${showAuth ? 'hidden' : 'block'}`} aria-label="Open Auth Dialog">
        <RiUserLine className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="flex h-dvh w-full flex-col items-center justify-center gap-0 overflow-auto p-0 sm:h-fit sm:w-fit">
        <AuthHeader variant={variant} />
        <section className="my-auto flex min-w-full flex-col gap-8 rounded-none bg-background px-6 py-10 sm:min-w-[448px]">
          <OTPTitle variant={variant} />

          <AuthForm
            variant={variant}
            setVariant={setVariant}
            emailForm={emailForm}
            registerForm={registerForm}
            loginForm={loginForm}
            onRegister={onRegister}
            onLogin={onLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isSubmitting={isSubmitting}
            otpValue={otpValue}
            setOtpValue={setOtpValue}
          />

          {(variant === 'login' || variant === 'email') && (
            <AuthSocial
              variant={variant}
              googleHover={googleHover}
              setGoogleHover={setGoogleHover}
            />
          )}

          {(variant === 'login' || variant === 'email') && (
            <AuthFooter variant={variant} toggleVariant={toggleVariant} />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}

function AuthHeader({variant}: {variant: string}) {
  return (
    <DialogHeader className="w-full border-b p-6">
      <DialogTitle>
        {variant === 'login' && 'Masuk'}
        {variant === 'email' && 'Daftar'}
        {variant === 'otp' && 'Verifikasi Email'}
        {variant === 'register' && 'Buat Akun'}
      </DialogTitle>
      <VisuallyHidden>
        <DialogDescription>
          {variant === 'login' && 'Masuk ke akun Anda untuk melanjutkan.'}
          {variant === 'email' && 'Daftarkan email Anda untuk membuat akun.'}
          {variant === 'otp' && 'Verifikasi email Anda dengan kode OTP.'}
          {variant === 'register' && 'Buat akun baru untuk memulai.'}
        </DialogDescription>
      </VisuallyHidden>
    </DialogHeader>
  );
}

function OTPTitle({variant}: {variant: string}) {
  return (
    variant === 'otp' && (
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-muted-foreground">
          {variant === 'otp' && 'Masukkan kode verifikasi yang kami kirimkan ke'}
        </p>

        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap text-sm font-medium">admin@onesport.com</p>
          <Button size="icon" variant="link" className="h-4 w-4 rounded-none">
            <RiEdit2Fill className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  );
}

function AuthForm({
  variant,
  setVariant,
  emailForm,
  registerForm,
  loginForm,
  onRegister,
  onLogin,
  showPassword,
  setShowPassword,
  isSubmitting,
  otpValue,
  setOtpValue,
}: {
  variant: string;
  setVariant: Dispatch<string>;
  emailForm: any;
  registerForm: any;
  loginForm: any;
  onRegister: (values: any) => void;
  onLogin: (values: any) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<boolean>;
  isSubmitting: boolean;
  otpValue: string;
  setOtpValue: Dispatch<string>;
}) {
  return (
    <>
      {variant === 'email' && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onRegister)} className="space-y-2">
            <FormField
              control={emailForm.control}
              name="email"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      type="email"
                      id="email"
                      label="Email atau nomor ponsel"
                      className="h-12"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-12 w-full"
              disabled={isSubmitting}
              onClick={() => setVariant('otp')}
            >
              {isSubmitting ? 'Registering...' : 'Daftar'}
            </Button>
          </form>
        </Form>
      )}

      {variant === 'login' && (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-2">
            <FormField
              control={loginForm.control}
              name="email"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      type="email"
                      id="email"
                      label="Email atau nomor ponsel"
                      className="h-12"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <div className="relative flex w-full items-center">
                    <FormControl>
                      <FloatingLabelInput
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        label="Password"
                        className="h-12"
                        required
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

            <div className="flex flex-col gap-2">
              <span className="cursor-pointer text-sm text-primary hover:underline">
                Lupa password?
              </span>
              <Button type="submit" className="h-12 w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Masuk'}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {variant === 'otp' && (
        <form className="flex flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={value => setOtpValue(value)}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              className="w-full"
            >
              <InputOTPGroup className="flex w-full items-center justify-center gap-2">
                <InputOTPSlot
                  index={0}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
                <InputOTPSlot
                  index={1}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
                <InputOTPSlot
                  index={2}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
                <InputOTPSlot
                  index={3}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
                <InputOTPSlot
                  index={4}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
                <InputOTPSlot
                  index={5}
                  className="h-11 w-11 rounded-md border shadow-none md:h-12 md:w-12"
                />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex w-full items-center justify-center gap-1">
              <p className="text-sm text-muted-foreground">Belum menerima kode?</p>
              <Button variant="link" className="h-fit w-fit rounded-none p-0 text-sm">
                Kirim ulang
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full"
            disabled={isSubmitting}
            onClick={() => setVariant('register')}
          >
            Verifikasi
          </Button>
        </form>
      )}

      {variant === 'register' && (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-2">
            <FormField
              control={registerForm.control}
              name="email"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      type="text"
                      id="name"
                      label="Nama Lengkap"
                      className="h-12"
                      required
                      {...field}
                    />
                  </FormControl>
                  {!registerForm.formState.errors.email && (
                    <FormDescription>Pastikan nama lengkap sesuai KTP/ID.</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      type="email"
                      id="email"
                      label="Email"
                      className="h-12"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      type="text"
                      id="nomor-ponsel"
                      label="Nomor Ponsel"
                      className="h-12"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({field}) => (
                <FormItem className="h-[68px] space-y-0">
                  <div className="relative flex w-full items-center">
                    <FormControl>
                      <FloatingLabelInput
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        label="Password"
                        className="h-12"
                        required
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
                  {!registerForm.formState.errors.password && (
                    <FormDescription>
                      Min 8 karakter, kombinasi angka, huruf besar, dan kecil
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-12 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Daftar'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

function AuthSocial({
  variant,
  googleHover,
  setGoogleHover,
}: {
  variant: string;
  googleHover: boolean;
  setGoogleHover: Dispatch<boolean>;
}) {
  return (
    <div className="flex flex-col gap-10">
      <Separator className="relative flex items-center justify-center">
        <span className="absolute bg-background px-4 text-sm text-muted-foreground">atau</span>
      </Separator>

      <Button
        variant="outline"
        className="flex h-12 p-5"
        onMouseOver={() => setGoogleHover(true)}
        onMouseLeave={() => setGoogleHover(false)}
      >
        <span className="flex aspect-square h-5 w-5 items-center justify-center">
          <FcGoogle className="h-full w-full" />
        </span>
        <span className="ml-4 flex w-full items-center justify-between">
          <span className="w-fit text-sm">
            {variant === 'login' ? 'Masuk' : 'Daftar'} menggunakan Google
          </span>
          {googleHover && <ArrowRightIcon className="h-4 w-4" />}
        </span>
      </Button>
    </div>
  );
}

function AuthFooter({variant, toggleVariant}: {variant: string; toggleVariant: () => void}) {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="text-sm text-muted-foreground">
        {variant === 'login' ? `Belum memiliki akun?` : 'Sudah memiliki akun?'}
      </span>
      <span onClick={toggleVariant} className="cursor-pointer text-sm text-primary hover:underline">
        {variant === 'login' ? 'Daftar' : 'Masuk'}
      </span>
    </div>
  );
}
