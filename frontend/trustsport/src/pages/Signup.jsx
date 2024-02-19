import FormHeader from "../components//form_components/FormHeader";
import Signup from "../components/form_components/Signup";

export default function SignupPage(){
    return(
        <div className="min-h-full h-screen max-w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className=" max-w-lg w-fit space-y-8">
            <FormHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
            />
            <Signup/>
            </div>
        </div>
    )
}