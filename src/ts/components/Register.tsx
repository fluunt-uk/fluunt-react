import React from 'react';


const Register: React.FC = () => {
  return (
    <div className="Register">
     
      Page Under Construction
      <form className="n_form" onSubmit={(e:any) =>{}} >
        <input autoComplete='username' id='user'  type="text" className="uname" placeholder={"Username"}/>
        <input autoComplete='email'    id='email' type="text" className="email" placeholder={"E-Mail "}/> 
        <input autoComplete='password' id='pass'  type="text" className="pwd"   placeholder={"Password"}/>
      </form>
    </div>
  );
}

export default Register;
