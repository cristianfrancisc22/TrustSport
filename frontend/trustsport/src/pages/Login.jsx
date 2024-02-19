import Login from "../components/form_components/Login"
import FormHeader from "../components/form_components/FormHeader"

export default function LoginPage(){
    return(
        <>
            <div className="min-h-full h-screen max-w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className=" max-w-lg w-fit space-y-8">
                    <FormHeader
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                        />
                    <Login/>
                </div>
            </div>
        </>
    )
}