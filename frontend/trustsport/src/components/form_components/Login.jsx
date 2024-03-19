import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const cookies = new Cookies();
    const navigate = useNavigate()

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        const credentials = btoa(`${loginState.username}:${loginState.password}`)
        const endpoint=`http://localhost:8080/api/auth/token`;
         fetch(endpoint,
             {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin 
                credentials: "same-origin", // include, *same-origin, omit
                headers: { "Authorization": `Basic ${credentials}` },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer",
             }).then(response=>response.text())
             .then(data=>{
                login(data)
                //API Success from LoginRadius Login API
             })
             .catch(error=>console.log(error))
    }

    const login = (jwt_token) => {
        const decoded = jwtDecode(jwt_token);

        cookies.set("jwt_authorization", jwt_token, {
          expires: new Date(decoded.exp * 1000),
        });
        navigate("/")
      };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}