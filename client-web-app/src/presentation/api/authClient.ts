import { AuthError } from "@/src/domain/errors/Errors";
import { createSupabaseServer } from "../../infrastructure/supabase";

async function signup({
  email,
  password,
  first_name,
  last_name,
  username,
}: SignupParmas) {
  try {
    const supabase = await createSupabaseServer();
  const response = await  supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                first_name,
                last_name,
                username
            }
        }
    })


    return {
        user:response.data.user,
        session:response.data.session
    }


  } catch (error: any) {
    throw new AuthError(error.message);
  }
}

async function signin({email, password} : SigninParams) {
    try {
        const supabase = await createSupabaseServer();
        const response = await supabase.auth.signInWithPassword({
            email,
            password
        })

        return {
            user:response.data.user,
            session:response.data.session
        }

    } catch (error:any) {
        throw new AuthError(error.message)
    }
}

async function forgotPassword({email}:forgotPasswordParams) {
    const supabase = await createSupabaseServer();
    const response = await supabase.auth.resetPasswordForEmail(email);

    return {
        response: response.data,
    }
}



export { signup, signin, forgotPassword,  };
