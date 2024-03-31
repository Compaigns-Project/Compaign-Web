"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import { SnackbarProvider, useSnackbar, enqueueSnackbar } from 'notistack';
// import { SnackbarProvider, useSnackbar } from 'notistack';

// import { error } from "console";
// import { useToasts } from 'react-toast-notifications';






export default function Home() {
  // const { addToast } = useToasts();
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    let user = session["user"];
    console.log('Session User ', user);
    router.push('/dashboard');
  }



  

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
  
    try {
      const result = await signIn("credentials", {
        username: username as string,
        password: password as string,
        redirect: false,
      });
  
      if (result && !result.error) { // Check if result exists before accessing its properties

        enqueueSnackbar('Login Successfull',  {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top', // Customize the vertical position
            horizontal: 'right', // Customize the horizontal position
          },
          style: {
            backgroundColor: '#00ff00', // Customize the background color
            color: '#ffffff', // Customize the text color
            fontWeight: 'bold', // Customize the font weight
          },
        })  

        router.push("/dashboard");

      } else {
        // Check if result contains an error message
        if (result?.error) {
          


          enqueueSnackbar('Incorrect Username or Password',  {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top', // Customize the vertical position
              horizontal: 'right', // Customize the horizontal position
            },
            style: {
              backgroundColor: '#ff0000', // Customize the background color
              color: '#ffffff', // Customize the text color
              fontWeight: 'bold', // Customize the font weight
            },
          })
            // toast.error('Incorrect Username or Password', {

            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            //   transition: Bounce,
            //   });
          
          // Display error message to the user using React Toast
          // addToast(result.error, { appearance: 'error' });

        } else {
          console.error("Login failed: Unknown error");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      {/* Same as */}
      {/* <ToastContainer /> */}
      <SnackbarProvider maxSnack={3}>
      
      </SnackbarProvider>
      <div className="flex justify-center mt-16">
        <div style={{ minWidth: "30%" }}>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" onSubmit={handleSignIn} method="POST">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                  <div className="mt-2">
                    <input id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
