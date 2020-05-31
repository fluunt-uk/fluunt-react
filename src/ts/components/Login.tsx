import React from 'react';

const Login: React.FC = () => {
  return (
    <div>
      <form className="n_form" onSubmit={(e:any) =>{}} >
        <input autoComplete='username' id='user'  type="text" className="uname" placeholder={"Username"}/> 
        <input autoComplete='password' id='pass'  type="text" className="pwd"   placeholder={"Password"}/> 
      </form>
    </div>
  );
}

export default Login;
