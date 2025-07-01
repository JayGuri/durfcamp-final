'use server';
import {z} from 'zod';
import{subscribeService} from '@/data/services';
import { error } from 'console';

const subscribeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(prevState :any, formData: FormData) {
  console.log("Our first server action");
  const email = formData.get("email");

    const validatedFields = subscribeSchema.safeParse({
    email: formData.get("email"),
     });

    if (!validatedFields.success) {

    console.dir(validatedFields.error.flatten().fieldErrors, { depth: null})

    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await subscribeService(validatedFields.data.email);

  if (!responseData){
    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        errorMessage: "Oops!Something went wrong, please try again later.",
    };
  }

    if (responseData.error) {
        return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        errorMessage: "Failed to Subscribe.",
        };
    }

    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        errorMessage: null,
        successMessage: "Successfully Subscribed!",
    }

}
