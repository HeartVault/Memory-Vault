import { AuthError } from "@/src/domain/errors/Errors";
import { createSupabaseServer } from "../../infrastructure/supabase";

async function signup({
  email,
  password,
  first_name,
  last_name,
  username,
  redirectUrl,
}: SignupParmas) {
  try {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username,
        },
        emailRedirectTo: redirectUrl,
      },
      
    });

    if (error) {
      console.log(error)
      throw new AuthError(error.message);
    } else if (!data.user && !data.session) {
      throw new AuthError("Email already registered");
    }

    return {
      user: data.user,
      session: data.session,
    };
  } catch (error: any) {
    throw error;
  }
}

async function signin({ email, password }: SigninParams) {
  try {
    const supabase = await createSupabaseServer();
    const {data,error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
   
    if(error){
        console.log(error)
        throw new AuthError(error.message)
    }


    return {
      user: data.user,
      session: data.session,
    };
  } catch (error: any) {
    throw error;
  }
}

async function forgotPassword({ email }: forgotPasswordParams) {
  const supabase = await createSupabaseServer();
  const response = await supabase.auth.resetPasswordForEmail(email);

  return {
    response: response.data,
  };
}

export { signup, signin, forgotPassword };
